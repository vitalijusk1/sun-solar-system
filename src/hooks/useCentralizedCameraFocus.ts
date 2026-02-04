import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three";

const TEMP_TARGET = new Vector3();
let activeTargetRef: React.RefObject<any> | null = null;
let hasInitializedOffset = false;

export const useCentralizedCameraFocus = (
  targetRef: React.RefObject<any>,
  isActive: boolean,
) => {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (isActive && targetRef.current) {
      // Set this as the active target
      activeTargetRef = targetRef;
      hasInitializedOffset = false;

      if (controls && "target" in controls) {
        targetRef.current.getWorldPosition(TEMP_TARGET);
        hasInitializedOffset = true;
      }
    } else if (!isActive && activeTargetRef === targetRef) {
      // Clear if this was the active target
      activeTargetRef = null;
      hasInitializedOffset = false;
    }
  }, [isActive, targetRef, controls, camera]);

  useFrame(() => {
    if (activeTargetRef && activeTargetRef.current && hasInitializedOffset) {
      const target = activeTargetRef.current;
      target.getWorldPosition(TEMP_TARGET);

      if (controls && "target" in controls) {
        const orbitControls = controls as any;

        // Calculate the movement of the planet since last frame
        const planetMovement = new Vector3()
          .copy(TEMP_TARGET)
          .sub(orbitControls.target);

        // Update orbit controls target to planet position
        orbitControls.target.copy(TEMP_TARGET);

        // Move camera by the same amount the planet moved (follow the planet)
        camera.position.add(planetMovement);

        orbitControls.update();
      }
    }
  });
};
