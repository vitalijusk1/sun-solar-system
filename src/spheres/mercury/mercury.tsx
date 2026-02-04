import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type MercuryProps = {
  isFocused?: boolean;
};

export const Mercury = ({ isFocused = false }: MercuryProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [surfaceTexture] = useTexture([
    "/src/assets/uv-maps/mercury-uv/mercury.jpg",
  ]);

  useOrbit(groupRef, 4, 0.8);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={surfaceTexture}
          normalMap={surfaceTexture}
          sunIntensity={1.2}
          nightDarkness={0.05}
        />
      </mesh>
    </group>
  );
};
