import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import { useCentralizedCameraFocus } from "../../hooks/useCentralizedCameraFocus";

type SunProps = {
  isFocused?: boolean;
};

export const Sun = ({ isFocused = false }: SunProps) => {
  const meshRef = useRef<Mesh>(null);
  const [texture] = useTexture(["/src/assets/uv-maps/sun-uv/sun.jpg"]);

  useCentralizedCameraFocus(meshRef, isFocused);

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[3.5, 32, 32]} />
      <meshPhongMaterial
        map={texture}
        emissive="orange"
        emissiveIntensity={2}
      />
    </mesh>
  );
};
