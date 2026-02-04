import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, Group } from "three";

export const useRotation = (
  objectRef: MutableRefObject<Mesh | Group | null>,
  rotationSpeed: number,
) => {
  useFrame(() => {
    const object = objectRef.current;
    if (!object) return;

    // Rotate the object around its Y-axis (vertical axis)
    object.rotation.y += rotationSpeed;
  });
};
