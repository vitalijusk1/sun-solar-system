import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type MarsProps = {
  isFocused?: boolean;
};

export const Mars = ({ isFocused = false }: MarsProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [marsTexture] = useTexture(["/src/assets/uv-maps/mars-uv/mars.jpg"]);

  useOrbit(groupRef, 13, 0.4);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.53, 32, 32]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={marsTexture}
          normalMap={marsTexture}
          sunIntensity={1}
          nightDarkness={0.05}
        />
      </mesh>
    </group>
  );
};
