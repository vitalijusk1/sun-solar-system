import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Texture, Vector3 } from "three";

const planetVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const planetFragmentShader = /* glsl */ `
  uniform sampler2D dayTexture;
  uniform sampler2D normalMap;
  uniform vec3 lightDirection;
  uniform float sunIntensity;
  uniform float nightDarkness;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec4 dayColor = texture2D(dayTexture, vUv);

    vec3 normal = normalize(vNormal);
    float lightIntensity = max(dot(normal, lightDirection), 0.0);

    float dayNightMix = smoothstep(-0.1, 0.1, lightIntensity);

    vec3 dayLight = dayColor.rgb * sunIntensity * lightIntensity;
    vec3 nightLight = dayColor.rgb * nightDarkness;

    vec3 finalColor = mix(nightLight, dayLight, dayNightMix);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export type PlanetMaterialUniforms = {
  dayTexture: Texture | null;
  normalMap: Texture | null;
  lightDirection: Vector3;
  sunIntensity: number;
  nightDarkness: number;
};

export const PlanetMaterial = shaderMaterial(
  {
    dayTexture: null,
    normalMap: null,
    lightDirection: new Vector3(1, 0, 0),
    sunIntensity: 1,
    nightDarkness: 0.2,
  },
  planetVertexShader,
  planetFragmentShader,
);

extend({ PlanetMaterial });
