import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type JupiterProps = {
  isFocused?: boolean;
};

export const Jupiter = ({ isFocused = false }: JupiterProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [jupiterTexture] = useTexture([
    "/src/assets/uv-maps/jupiter-uv/jupiter.jpg",
  ]);

  useOrbit(groupRef, 20, 0.2);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3.5, 64, 64]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={jupiterTexture}
          normalMap={jupiterTexture}
          sunIntensity={0.7}
          nightDarkness={0.03}
        />
      </mesh>
    </group>
  );
};
