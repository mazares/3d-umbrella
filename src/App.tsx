import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";

function App() {
  type THREE = {
    meshRef: object;
    MeshPhysicalMaterial: object;
    useFrame: object;
    Stage: object;
    ambientLight: object;
    pointLight: object;
    mesh: object;
    coneGeometry: object;
    OrbitControls: object;
  };

  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime / 2) + 5.5;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 2);
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime / 2);
  });

  const material = new MeshPhysicalMaterial({
    color: "#ff0000",
    roughness: 0,
    metalness: 1,
  });

  return (
    <Stage castShadow={true} adjustCamera={false}>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh
        ref={meshRef}
        material={material}
        onClick={() => {
          material.anisotropy = 32;
        }}
      >
        <coneGeometry args={[5, 1, 8]} />
      </mesh>
    </Stage>
  );
}

export default () => (
  <Canvas
    camera={{ position: [-10, 10, -50] }}
    style={{
      background: `radial-gradient(circle at 50% 10%, #6e3030, #210303)`,
    }}
  >
    <App />
    <OrbitControls />
    <ambientLight intensity={1} />
    <pointLight position={[10, 10, 10]} intensity={500} />
  </Canvas>
);
