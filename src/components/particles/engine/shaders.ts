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
  // Hover lens (world units on the z = 0 plane, where the shape sits).
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uRadius;
  uniform float uZoom;

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

    // Hover: a soft magnifying lens under the cursor. Inside uRadius the patch is scaled up
    // around the cursor (1 + uZoom at the centre, easing back to 1 at the rim) and its dots
    // grow by the same amount, so that part of the shape looks zoomed in. The falloff
    // keeps the mapping one-to-one (no gap, no dots crossing) for uZoom up to ~2.
    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 away = world.xy - uMouse;
    float dist = length(away);
    float mag = 1.0;
    if (uHover > 0.0 && dist < uRadius) {
      float u = 1.0 - dist / uRadius;
      mag = 1.0 + uZoom * uHover * u * u;
      world.xy = uMouse + away * mag;
    }

    vec4 mv = viewMatrix * world;
    gl_PointSize = aSize * mag * uPR * (20.0 / -mv.z);
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
