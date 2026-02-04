import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export const useOrbit = (
  groupRef: MutableRefObject<Group | null>,
  orbitRadius: number,
  orbitSpeed: number,
) => {
  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.getElapsedTime();
    const angle = time * orbitSpeed;

    group.position.x = Math.cos(angle) * orbitRadius;
    group.position.z = Math.sin(angle) * orbitRadius;
  });
};
