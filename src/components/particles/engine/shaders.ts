/**
 * Morph shader: every particle travels from its spot in shape A to its spot in shape B,
 * bursting outward mid-way (uScatter). Nothing here depends on time, so particles stay
 * perfectly still unless you scroll or move the mouse.
 */
export const vertexShader = /* glsl */ `
  attribute vec3 aTo;
  attribute vec3 cFrom;
  attribute vec3 cTo;
  attribute vec3 aRand;
  attribute float aSeed;
  attribute float aSize;

  uniform float uT;
  uniform float uPR;
  uniform float uScatter;
  // Cursor repulsion (world units on the z = 0 plane, where the shape sits).
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uRadius;
  uniform float uPush;

  varying vec3 vCol;
  varying float vAlpha;
  varying float vSize;

  void main() {
    // Each dot has its own opacity, like the Figma artwork's 0.42 / 0.74 / 0.9 fills.
    vAlpha = 0.45 + 0.5 * fract(aSeed * 91.7);

    // Stagger: each particle starts its trip at a slightly different moment.
    float st = aSeed * 0.35;
    float lt = smoothstep(st, st + 0.65, uT);

    vec3 pos = mix(position, aTo, lt) + aRand * sin(lt * 3.14159) * uScatter;
    vCol = mix(cFrom, cTo, lt);

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
    vSize = gl_PointSize;
    gl_Position = projectionMatrix * mv;
  }
`;

/** Crisp round dot: solid disc with a one-pixel anti-aliased edge (no soft glow). */
export const fragmentShader = /* glsl */ `
  varying vec3 vCol;
  varying float vAlpha;
  varying float vSize;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float edge = 1.0 / max(vSize, 1.0);
    float disc = 1.0 - smoothstep(0.5 - edge, 0.5, d);
    if (disc <= 0.0) discard;
    gl_FragColor = vec4(vCol, disc * vAlpha);
  }
`;
