import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Sun } from "./spheres/sun/sun";
import { Mercury } from "./spheres/mercury/mercury";
import { Venus } from "./spheres/venus/venus";
import { Earth } from "./spheres/earth/earth";
import { Mars } from "./spheres/mars/mars";
import { Jupiter } from "./spheres/jupiter/jupiter";
import { Saturn } from "./spheres/saturn/saturn";
import { Uranus } from "./spheres/uranus/uranus";
import { Neptune } from "./spheres/neptune/neptune";
import { PlanetSelector } from "./components/PlanetSelector";
import { useState } from "react";

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState("sun");

  return (
    <>
      <PlanetSelector
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
      />
      <Canvas camera={{ position: [0, 0, 5] }} shadows>
        <ambientLight intensity={0.01} />
        <Stars
          radius={300}
          depth={60}
          count={20000}
          factor={7}
          saturation={0}
          fade
        />
        <color attach="background" args={["black"]} />
        <pointLight
          position={[0, 0, 0]}
          intensity={3}
          distance={100}
          decay={1}
          color="orange"
          castShadow
        />
        <Sun isFocused={selectedPlanet === "sun"} />
        <Mercury isFocused={selectedPlanet === "mercury"} />
        <Venus isFocused={selectedPlanet === "venus"} />
        <Earth isFocused={selectedPlanet === "earth"} />
        <Mars isFocused={selectedPlanet === "mars"} />
        <Jupiter isFocused={selectedPlanet === "jupiter"} />
        <Saturn isFocused={selectedPlanet === "saturn"} />
        <Uranus isFocused={selectedPlanet === "uranus"} />
        <Neptune isFocused={selectedPlanet === "neptune"} />
        <OrbitControls />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
