import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

const SUN_POSITION = new Vector3(0, 0, 0);
const TEMP_LIGHT_DIRECTION = new Vector3();
const TEMP_WORLD_POSITION = new Vector3();

export const useSunLightDirection = (
  meshRef: MutableRefObject<Mesh | null>,
) => {
  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const material = mesh.material as any;
    const uniforms = material.uniforms;
    if (!uniforms || !uniforms.lightDirection) return;

    mesh.getWorldPosition(TEMP_WORLD_POSITION);
    TEMP_LIGHT_DIRECTION.subVectors(
      SUN_POSITION,
      TEMP_WORLD_POSITION,
    ).normalize();

    if (uniforms.lightDirection.value?.copy) {
      uniforms.lightDirection.value.copy(TEMP_LIGHT_DIRECTION);
    } else {
      uniforms.lightDirection.value = TEMP_LIGHT_DIRECTION.clone();
    }
  });
};
