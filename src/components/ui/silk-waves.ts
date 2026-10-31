/**
 * The renderer behind SilkWaves.astro: a WebGL2 shader that warps a sine
 * field like draped silk and colours it with an 8-stop gradient. The field
 * is clipped at both ends, so the silk has a lit core and a flat dark
 * ground, and where the warp squeezes it the folds turn into fine streaks.
 * It only draws a frame for a given time; the component drives it.
 *
 * The constants were fitted, frame by frame, to screen recordings of React
 * Bits Pro's Silk Waves at its defaults: the share of ground, edge and core,
 * the change between frames half a second apart, and how many band edges
 * a row and a column cross.
 */

export type Rgb = readonly [number, number, number];

export interface SilkOptions {
  speed: number;
  scale: number;
  distortion: number;
  curve: number;
  frequency: number;
  complexity: number;
  contrast: number;
  brightness: number;
  opacity: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  /** Eight stops, from the ground to the lit core. */
  colors: readonly Rgb[];
}

/** The pointer in CSS pixels from the canvas's top left, and how present it is (0–1). */
export interface SilkPointer {
  x: number;
  y: number;
  strength: number;
}

export type SilkRender = (seconds: number, pointer: SilkPointer) => void;

/** Shader time per second at speed 1. */
const TIME_SCALE = 0.175;

const VERTEX = `#version 300 es
void main() {
  // One triangle that covers the viewport, no buffers needed.
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_pointerStrength;
uniform float u_scale;
uniform float u_distortion;
uniform float u_curve;
uniform float u_frequency;
uniform float u_contrast;
uniform float u_brightness;
uniform float u_opacity;
uniform float u_rotation;
uniform vec2 u_offset;
uniform int u_iterations;
uniform vec3 u_colors[8];

out vec4 outColor;

vec3 gradient(float x) {
  float position = clamp(x, 0.0, 1.0) * 7.0;
  int index = int(floor(position));
  return mix(u_colors[index], u_colors[min(index + 1, 7)], fract(position));
}

void main() {
  float c = cos(u_rotation);
  float s = sin(u_rotation);
  mat2 rotation = mat2(c, -s, s, c);
  vec2 uv = rotation * ((gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y);
  vec2 pointer = rotation * ((u_pointer - 0.5 * u_resolution) / u_resolution.y);

  // Around the pointer the silk is pushed aside a little and lit a little.
  vec2 toPointer = uv - pointer;
  float near = u_pointerStrength * exp(-dot(toPointer, toPointer) * 6.0);

  // Domain warping: each pass bends the space less, and its frequency grows
  // slowly, so the silk keeps long S-curves instead of zigzags.
  vec2 p = (uv + toPointer * near * 0.15) * u_scale + u_offset;
  for (int i = 1; i < u_iterations; i++) {
    float n = float(i);
    float k = (0.75 + 0.6 * (n - 1.0)) * u_curve;
    p.x += u_distortion * 0.6 / n * sin(k * p.y + u_time + 0.3 * n);
    p.y += u_distortion * 0.4 / n * sin(k * p.x + u_time + 0.3 * n + 1.6);
  }

  // Diagonal bands, clipped into a core and a ground; the second harmonic
  // makes one edge crisp and the other soft, like a lit fold. The threshold
  // drifts, so a sheet widens and thins along its length.
  float phase = u_frequency * 2.2 * (p.x + 0.35 * p.y);
  float body = 1.45 * sin(phase) + 0.28 * sin(2.0 * phase + 0.5);
  float threshold = -0.38 + 0.28 * sin(0.9 * p.y - 0.6 * p.x + 0.7 * u_time);
  float light = clamp(threshold + u_contrast * body, 0.0, 1.0);
  // Sheen: folds along the bands, thin dark gaps between the threads, then
  // a dim haze around them.
  light *= 1.3 * (0.76 + 0.14 * sin(2.7 * phase + 1.3) + 0.1 * sin(6.3 * phase + 2.1) + 0.06 * sin(11.0 * phase + 0.4));
  light *= 1.0 - 0.22 * pow(0.5 + 0.5 * sin(9.0 * phase + 0.7), 6.0);
  light += 0.06 * pow(0.5 + 0.5 * sin(phase), 3.0);
  light *= u_brightness * (1.0 + 0.25 * near);

  outColor = vec4(gradient(light) * u_opacity, u_opacity);
}`;

export function hexToRgb(hex: string): Rgb {
  const value = Number.parseInt(hex.trim().slice(1), 16);
  return [(value >> 16) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Silk waves: no shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Silk waves: ${gl.getShaderInfoLog(shader) ?? ""}`);
  }
  return shader;
}

/** Sets up the shader on the canvas; undefined without WebGL2. */
export function createSilkWaves(
  canvas: HTMLCanvasElement,
  options: SilkOptions,
): SilkRender | undefined {
  const gl = canvas.getContext("webgl2", { antialias: false });
  if (!gl) return undefined;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Silk waves: ${gl.getProgramInfoLog(program) ?? ""}`);
  }
  gl.useProgram(program);

  const at = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1f(at("u_scale"), options.scale);
  gl.uniform1f(at("u_distortion"), options.distortion);
  gl.uniform1f(at("u_curve"), options.curve);
  gl.uniform1f(at("u_frequency"), options.frequency);
  gl.uniform1f(at("u_contrast"), options.contrast);
  gl.uniform1f(at("u_brightness"), options.brightness);
  gl.uniform1f(at("u_opacity"), options.opacity);
  gl.uniform1f(at("u_rotation"), (options.rotation * Math.PI) / 180);
  gl.uniform2f(at("u_offset"), options.offsetX, options.offsetY);
  gl.uniform1i(
    at("u_iterations"),
    Math.round(8 * Math.min(Math.max(options.complexity, 0.5), 2)),
  );
  gl.uniform3fv(at("u_colors"), options.colors.flat());
  const resolution = at("u_resolution");
  const time = at("u_time");
  const pointerAt = at("u_pointer");
  const strengthAt = at("u_pointerStrength");

  // The silk is soft, so 1.5x is enough even on denser screens.
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  const resize = () => {
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
  };
  // Sized now as well, so the first frame never divides by a zero height.
  resize();
  new ResizeObserver(resize).observe(canvas);

  return (seconds, pointer) => {
    gl.uniform1f(time, seconds * options.speed * TIME_SCALE);
    gl.uniform2f(pointerAt, pointer.x * dpr, canvas.height - pointer.y * dpr);
    gl.uniform1f(strengthAt, pointer.strength);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}
