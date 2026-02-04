import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import { useCameraFocus } from "../../hooks/useCameraFocus";

type SunProps = {
  isFocused?: boolean;
};

export const Sun = ({ isFocused = false }: SunProps) => {
  const meshRef = useRef<Mesh>(null);
  const [sunTexture, normalMap, specularMap] = useTexture([
    "/src/assets/uv-maps/sun-uv/sun.jpg",
    "/src/assets/uv-maps/sun-uv/sun-normal.png",
    "/src/assets/uv-maps/sun-uv/sun-specular.png",
  ]);

  useCameraFocus(meshRef, isFocused);

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[2, 32, 32]} />
      <meshPhongMaterial
        map={sunTexture}
        normalMap={normalMap}
        specularMap={specularMap}
        emissive="orange"
        emissiveIntensity={2}
      />
    </mesh>
  );
};
