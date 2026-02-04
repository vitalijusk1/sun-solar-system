import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useTexture } from "@react-three/drei";
import { useOrbit } from "../../hooks/useOrbit";
import { useRotation } from "../../hooks/useRotation";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useCentralizedCameraFocus } from "../../hooks/useCentralizedCameraFocus";
import { PlanetMaterial } from "../../utils/shaders/shaders";

interface SphereProps {
  title: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  texture: string;
  sphereArgs: [number, number?, number?];
  sunIntensity: number;
  nightDarkness: number;
  isFocused: boolean;
}

export const Sphere = ({
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  texture,
  sphereArgs,
  sunIntensity,
  nightDarkness,
  isFocused,
}: SphereProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [loadedTexture] = useTexture([texture]);

  useOrbit(groupRef, orbitRadius, orbitSpeed);
  useRotation(meshRef, rotationSpeed);
  useSunLightDirection(meshRef);
  useCentralizedCameraFocus(groupRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={sphereArgs} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={loadedTexture}
          normalMap={loadedTexture}
          sunIntensity={sunIntensity}
          nightDarkness={nightDarkness}
        />
      </mesh>
    </group>
  );
};
