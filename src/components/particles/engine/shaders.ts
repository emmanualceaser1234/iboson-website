/**
 * Morph shader: every particle travels from its spot in shape A to its spot in shape B,
 * bursting outward mid-way (uScatter) and twinkling gently (uTwinkle).
 */
export const vertexShader = /* glsl */ `
  attribute vec3 aTo;
  attribute vec3 cFrom;
  attribute vec3 cTo;
  attribute vec3 aRand;
  attribute float aSeed;
  attribute float aSize;

  uniform float uT;
  uniform float uTime;
  uniform float uPR;
  uniform float uSpinA;
  uniform float uSpinB;
  uniform float uScatter;
  uniform float uTwinkle;
  // Cursor repulsion (world units on the z = 0 plane, where the shape sits).
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uRadius;
  uniform float uPush;

  varying vec3 vCol;
  varying float vA;

  vec3 rotY(vec3 p, float a) {
    float c = cos(a), s = sin(a);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  }

  void main() {
    // Stagger: each particle starts its trip at a slightly different moment.
    float st = aSeed * 0.35;
    float lt = smoothstep(st, st + 0.65, uT);

    vec3 a = rotY(position, uTime * uSpinA);
    vec3 b = rotY(aTo, uTime * uSpinB);
    vec3 pos = mix(a, b, lt) + aRand * sin(lt * 3.14159) * uScatter;
    pos += 0.02 * vec3(sin(uTime * 0.9 + aSeed * 40.0), cos(uTime * 0.8 + aSeed * 31.0), sin(uTime * 0.7 + aSeed * 17.0));

    vCol = mix(cFrom, cTo, lt);
    vA = (1.0 - uTwinkle) + uTwinkle * sin(uTime * 2.2 + aSeed * 90.0);

    // Hover: particles near the cursor are pushed straight away from it, strongest at the
    // centre and fading to nothing at uRadius, so a hole opens under the mouse.
    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 away = world.xy - uMouse;
    float dist = length(away);
    if (uHover > 0.0 && dist < uRadius && dist > 1e-4) {
      float push = (1.0 - dist / uRadius) * uPush * uHover * (0.75 + 0.5 * aSeed);
      world.xy += away / dist * push;
    }

    vec4 mv = viewMatrix * world;
    gl_PointSize = aSize * uPR * (20.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

export const fragmentShader = /* glsl */ `
  varying vec3 vCol;
  varying float vA;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vCol, smoothstep(0.5, 0.1, d) * vA);
  }
`;
