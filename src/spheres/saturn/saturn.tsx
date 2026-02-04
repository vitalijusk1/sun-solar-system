import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type SaturnProps = {
  isFocused?: boolean;
};

export const Saturn = ({ isFocused = false }: SaturnProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [saturnTexture, ringTexture] = useTexture([
    "/src/assets/uv-maps/saturn-uv/saturn.jpg",
    "/src/assets/uv-maps/saturn-uv/saturn-ring-uv.png",
  ]);

  useOrbit(groupRef, 27, 0.15);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.9, 64, 64]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={saturnTexture}
          normalMap={saturnTexture}
          sunIntensity={0.6}
          nightDarkness={0.03}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 4.8, 64]} />
        <meshBasicMaterial map={ringTexture} transparent opacity={1} side={2} />
      </mesh>
    </group>
  );
};
