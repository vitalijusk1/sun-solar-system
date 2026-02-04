import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type NeptuneProps = {
  isFocused?: boolean;
};

export const Neptune = ({ isFocused = false }: NeptuneProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [neptuneTexture] = useTexture([
    "/src/assets/uv-maps/neptune-uv/neptune.jpg",
  ]);

  useOrbit(groupRef, 40, 0.08);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={neptuneTexture}
          normalMap={neptuneTexture}
          sunIntensity={0.3}
          nightDarkness={0.01}
        />
      </mesh>
    </group>
  );
};
