import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";
import { PlanetMaterial } from "../../utils/shaders/shaders";
import { useSunLightDirection } from "../../hooks/useSunLightDirection";
import { useOrbit } from "../../hooks/useOrbit";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type VenusProps = {
  isFocused?: boolean;
};

export const Venus = ({ isFocused = false }: VenusProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [venusTexture] = useTexture(["/src/assets/uv-maps/venus-uv/venus.jpg"]);

  useOrbit(groupRef, 7, 0.6);
  useSunLightDirection(meshRef);
  useCameraFocus(meshRef, isFocused);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <primitive
          object={new PlanetMaterial()}
          attach="material"
          dayTexture={venusTexture}
          normalMap={venusTexture}
          sunIntensity={1}
          nightDarkness={0.05}
        />
      </mesh>
    </group>
  );
};
