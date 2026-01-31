import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Sun } from "./spheres/sun/sun";
import { Earth } from "./spheres/earth/earth";

function App() {
  return (
    <>
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
        <Sun />
        <Earth />
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
