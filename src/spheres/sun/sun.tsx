import { useTexture } from "@react-three/drei";

export const Sun = () => {
  const [sunTexture, normalMap, specularMap] = useTexture([
    "/src/assets/uv-maps/sun/sun.jpg",
    "/src/assets/uv-maps/sun/sun-normal.png",
    "/src/assets/uv-maps/sun/sun-specular.png",
  ]);

  return (
    <mesh castShadow>
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
