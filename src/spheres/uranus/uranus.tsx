import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type UranusProps = {
  isFocused?: boolean;
};

export const Uranus = ({ isFocused = false }: UranusProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [uranusTexture] = useTexture([
    "/src/assets/uv-maps/uranus-uv/uranus.jpg",
  ]);

  useOrbit(groupRef, 34, 0.1);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={uranusTexture}
          normalMap={uranusTexture}
          sunIntensity={0.3}
          nightDarkness={0.03}
        />
      </mesh>
    </group>
  );
};
