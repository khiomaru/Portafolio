import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function ShapeGroup() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  const shapes = [
    { position: [-3.5, 0.5, -2], scale: 1.2, color: '#06b6d4', type: 'torus' },
    { position: [3.8, -0.8, -1.5], scale: 0.9, color: '#8b5cf6', type: 'octahedron' },
    { position: [-2, -1.5, 0], scale: 0.6, color: '#06b6d4', type: 'icosahedron' },
    { position: [2.5, 1.2, -3], scale: 0.7, color: '#8b5cf6', type: 'dodecahedron' },
    { position: [0, 2, -4], scale: 0.5, color: '#ec4899', type: 'torusKnot' },
  ];

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.3 + i * 0.1} floatIntensity={0.8 + i * 0.2}>
          <mesh position={shape.position} scale={shape.scale}>
            {shape.type === 'torus' && <torusGeometry args={[1, 0.3, 16, 32]} />}
            {shape.type === 'octahedron' && <octahedronGeometry args={[1]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[1]} />}
            {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[1]} />}
            {shape.type === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />}
            <MeshDistortMaterial
              color={shape.color}
              transparent
              opacity={0.15 + i * 0.05}
              wireframe
              distort={0.1 + i * 0.05}
              speed={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 20;
      pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 20;
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#06b6d4" />
        <ShapeGroup />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
