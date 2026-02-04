import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

const TEMP_TARGET = new Vector3();
const TEMP_CAMERA_OFFSET = new Vector3();

export const useCameraFocus = (
  targetRef: React.RefObject<any>,
  isActive: boolean,
) => {
  const { camera, controls } = useThree();
  const lerpSpeed = 0.05;
  const isTransitioning = useRef(false);
  const targetCameraPos = useRef(new Vector3());

  useFrame(() => {
    if (!isActive || !targetRef.current) return;

    const target = targetRef.current;
    target.getWorldPosition(TEMP_TARGET);

    if (controls && "target" in controls) {
      const orbitControls = controls as any;
      orbitControls.target.lerp(TEMP_TARGET, lerpSpeed);
      orbitControls.update();
    }

    if (isTransitioning.current) {
      camera.position.lerp(targetCameraPos.current, lerpSpeed);

      if (camera.position.distanceTo(targetCameraPos.current) < 0.1) {
        isTransitioning.current = false;
      }
    }
  });

  useEffect(() => {
    if (isActive && targetRef.current && controls && "target" in controls) {
      const orbitControls = controls as any;
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.05;

      targetRef.current.getWorldPosition(TEMP_TARGET);

      TEMP_CAMERA_OFFSET.copy(camera.position).sub(orbitControls.target);
      const distance = TEMP_CAMERA_OFFSET.length();

      TEMP_CAMERA_OFFSET.normalize().multiplyScalar(Math.max(distance, 5));
      targetCameraPos.current.copy(TEMP_TARGET).add(TEMP_CAMERA_OFFSET);

      isTransitioning.current = true;
    }
  }, [isActive, targetRef, controls, camera]);
};
