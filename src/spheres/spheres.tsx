import { sphereData } from "./data";
import { Sphere } from "./Sphere/sphere";
import { useAppSelector } from "../store/hooks";

export const Spheres = () => {
  const selectedPlanetId = useAppSelector(
    (state) => state.planet.selectedPlanetId,
  );

  return (
    <>
      {sphereData.map((sphere) => (
        <Sphere
          key={sphere.title}
          {...sphere}
          isFocused={selectedPlanetId === sphere.id}
        />
      ))}
    </>
  );
};
