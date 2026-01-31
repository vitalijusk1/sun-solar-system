import { useTexture, shaderMaterial } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useFrame, extend } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      earthMaterial: any;
    }
  }
}

const EarthMaterial = shaderMaterial(
  {
    dayTexture: null,
    normalMap: null,
    lightDirection: new Vector3(1, 0, 0),
    sunIntensity: 1.5,
    nightDarkness: 0.15,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      // Use world-space normal instead of view-space
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
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
      
      // Calculate lighting based on sun direction
      vec3 normal = normalize(vNormal);
      float lightIntensity = max(dot(normal, lightDirection), 0.0);
      
      // Create smooth day/night transition
      float dayNightMix = smoothstep(-0.1, 0.1, lightIntensity);
      
      // Day side: full color with sun intensity
      vec3 dayLight = dayColor.rgb * sunIntensity * lightIntensity;
      
      // Night side: darker with ambient light
      vec3 nightLight = dayColor.rgb * nightDarkness;
      
      // Mix day and night
      vec3 finalColor = mix(nightLight, dayLight, dayNightMix);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
);

extend({ EarthMaterial });

export const Earth = () => {
  const meshRef = useRef<Mesh>(null);
  const [earthTexture, normalMap] = useTexture([
    "/src/assets/uv-maps/earth/earth-day.jpg",
    "/src/assets/uv-maps/earth/earth-normal.png",
  ]);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as any;
      if (material.uniforms) {
        const earthPos = meshRef.current.position;
        const sunPos = new Vector3(0, 0, 0);
        const lightDir = new Vector3().subVectors(sunPos, earthPos).normalize();
        material.uniforms.lightDirection.value = lightDir;
      }
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[10, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive
          object={new EarthMaterial()}
          attach="material"
          dayTexture={earthTexture}
          normalMap={normalMap}
          sunIntensity={1.5}
          nightDarkness={0.15}
        />
      </mesh>
    </group>
  );
};
