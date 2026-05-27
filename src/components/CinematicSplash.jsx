import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

const K_PATH = 'M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z';

const TOTAL_DURATION = 10;

let audioCtx = null;
let audioNodes = [];

function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch {}
}

function stopAudio() {
  audioNodes.forEach((n) => {
    try { n.stop(); } catch {}
    try { n.disconnect(); } catch {}
  });
  audioNodes = [];
}

function playCinematicSound() {
  initAudio();
  if (!audioCtx) return;
  stopAudio();

  const now = audioCtx.currentTime;
  const master = audioCtx.createGain();
  master.gain.setValueAtTime(0.4, now);
  master.connect(audioCtx.destination);

  // — Sub bass drone —
  const sub = audioCtx.createOscillator();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(32, now);
  sub.frequency.linearRampToValueAtTime(35, now + 5);
  sub.frequency.linearRampToValueAtTime(32, now + 10);
  const subGain = audioCtx.createGain();
  subGain.gain.setValueAtTime(0, now);
  subGain.gain.linearRampToValueAtTime(0.25, now + 2);
  subGain.gain.linearRampToValueAtTime(0.2, now + 8);
  subGain.gain.linearRampToValueAtTime(0, now + 10);
  sub.connect(subGain).connect(master);
  sub.start(now); sub.stop(now + 10);
  audioNodes.push(sub);

  // — Bass pad (filtered saw) —
  const pad = audioCtx.createOscillator();
  pad.type = 'sawtooth';
  pad.frequency.setValueAtTime(55, now);
  pad.frequency.linearRampToValueAtTime(65, now + 10);
  const padFilter = audioCtx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.setValueAtTime(100, now);
  padFilter.frequency.exponentialRampToValueAtTime(800, now + 6);
  padFilter.frequency.exponentialRampToValueAtTime(300, now + 10);
  const padGain = audioCtx.createGain();
  padGain.gain.setValueAtTime(0, now);
  padGain.gain.linearRampToValueAtTime(0.15, now + 3);
  padGain.gain.linearRampToValueAtTime(0.1, now + 9);
  padGain.gain.linearRampToValueAtTime(0, now + 10);
  pad.connect(padFilter).connect(padGain).connect(master);
  pad.start(now); pad.stop(now + 10);
  audioNodes.push(pad);

  // — High shimmer (at reveal) —
  const shimmer = audioCtx.createOscillator();
  shimmer.type = 'sine';
  shimmer.frequency.setValueAtTime(880, now);
  shimmer.frequency.exponentialRampToValueAtTime(1760, now + 5);
  shimmer.frequency.exponentialRampToValueAtTime(880, now + 10);
  const shimmerGain = audioCtx.createGain();
  shimmerGain.gain.setValueAtTime(0, now);
  shimmerGain.gain.linearRampToValueAtTime(0, now + 4);
  shimmerGain.gain.linearRampToValueAtTime(0.06, now + 4.5);
  shimmerGain.gain.linearRampToValueAtTime(0.04, now + 8);
  shimmerGain.gain.linearRampToValueAtTime(0, now + 10);
  const shimmerFilter = audioCtx.createBiquadFilter();
  shimmerFilter.type = 'bandpass';
  shimmerFilter.frequency.setValueAtTime(1200, now);
  shimmerFilter.Q.setValueAtTime(2, now);
  shimmer.connect(shimmerFilter).connect(shimmerGain).connect(master);
  shimmer.start(now); shimmer.stop(now + 10);
  audioNodes.push(shimmer);

  // — Reveal impact (short noise burst at ~4.5s) —
  const bufferSize = audioCtx.sampleRate * 0.3;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.setValueAtTime(2000, now);
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0, now + 4.3);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 4.5);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);
  noise.connect(noiseFilter).connect(noiseGain).connect(master);
  noise.start(now + 4.3); noise.stop(now + 4.8);
  audioNodes.push(noise);

  // — Final chord (sustained at ~7.5s) —
  [262, 330, 392].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    const oGain = audioCtx.createGain();
    oGain.gain.setValueAtTime(0, now);
    oGain.gain.linearRampToValueAtTime(0, now + 7.2);
    oGain.gain.linearRampToValueAtTime(0.04 - i * 0.01, now + 7.5);
    oGain.gain.linearRampToValueAtTime(0.02, now + 9);
    oGain.gain.linearRampToValueAtTime(0, now + 10);
    osc.connect(oGain).connect(master);
    osc.start(now); osc.stop(now + 10);
    audioNodes.push(osc);
  });
}

function StarField({ progress }) {
  const count = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);
  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) s[i] = 0.5 + Math.random() * 1.5;
    return s;
  }, []);
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.015;
    meshRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
    const opacity = Math.min(progress * 2, 1);
    meshRef.current.material.opacity = opacity * 0.7;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#06b6d4"
        transparent
        opacity={0}
        sizeAttenuation
        blending={2}
        depthWrite={false}
      />
    </points>
  );
}

function EnergyRings({ progress }) {
  const groupRef = useRef();
  const rings = useMemo(() => [
    { radius: 2.5, color: '#06b6d4', speed: 0.3, offset: 0 },
    { radius: 3.2, color: '#8b5cf6', speed: -0.2, offset: 0.5 },
    { radius: 4, color: '#06b6d4', speed: 0.15, offset: 1 },
    { radius: 1.8, color: '#ec4899', speed: -0.4, offset: 1.5 },
  ], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    groupRef.current.rotation.z = Math.cos(t * 0.08) * 0.1;
    groupRef.current.children.forEach((child, i) => {
      const ring = rings[i];
      const ringProgress = Math.max(0, Math.min(1, (progress - 0.15 - ring.offset * 0.08) * 3));
      child.scale.setScalar(ringProgress);
      child.material.opacity = ringProgress * (0.15 + i * 0.04);
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + (i * 0.3), 0, 0]}>
          <ringGeometry args={[ring.radius - 0.02, ring.radius, 64]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0}
            side={2}
            depthWrite={false}
            blending={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function EnergyLines({ progress }) {
  const groupRef = useRef();
  const seeds = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * Math.PI * 2,
    radius: 1.5 + Math.random() * 2.5,
    speed: 0.5 + Math.random(),
    delay: Math.random() * 0.3,
  })), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = Math.max(0, (progress - 0.2) * 2.5);
    groupRef.current.children.forEach((child, i) => {
      const seed = seeds[i];
      const lineProgress = Math.max(0, Math.min(1, (p - seed.delay) * 2));
      child.material.opacity = lineProgress * 0.5;
      child.scale.x = lineProgress;
      child.position.x = Math.cos(seed.angle + t * seed.speed * 0.05) * seed.radius * lineProgress;
      child.position.y = Math.sin(seed.angle + t * seed.speed * 0.05) * seed.radius * lineProgress;
    });
  });

  return (
    <group ref={groupRef}>
      {seeds.map((seed, i) => (
        <mesh key={i} position={[0, 0, -2 + Math.random() * 4]}>
          <planeGeometry args={[0.5 + Math.random() * 1.5, 0.008]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#06b6d4' : '#8b5cf6'}
            transparent
            opacity={0}
            depthWrite={false}
            blending={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function CoreGlow({ progress }) {
  const intensity = Math.max(0, (progress - 0.4) * 3);
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={intensity * 0.6}
        depthWrite={false}
        blending={2}
      />
    </mesh>
  );
}

function Scene3D({ progress }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#8b5cf6" />
      <StarField progress={progress} />
      <EnergyRings progress={progress} />
      <EnergyLines progress={progress} />
      <CoreGlow progress={progress} />

      <EffectComposer>
        <Bloom
          intensity={0.4 + progress * 0.3}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002 * progress, 0.002 * progress]}
        />
      </EffectComposer>
    </>
  );
}

const textChars = 'khiomaru';

export default function CinematicSplash({ isVisible, onFinish }) {
  const progressRef = useRef(0);
  const startTimeRef = useRef(null);
  const audioStartedRef = useRef(false);

  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    startTimeRef.current = Date.now();
    progressRef.current = 0;
    audioStartedRef.current = false;

    const phaseTimers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => {
        setPhase(3);
        setShowLogo(true);
      }, 5000),
      setTimeout(() => {
        setPhase(4);
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setTypedText(textChars.slice(0, i));
          if (i >= textChars.length) clearInterval(interval);
        }, 250);
      }, 6000),
    ];

    const glitchInterval = setInterval(() => {
      if (Date.now() - startTimeRef.current > 4500) return;
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 1200);

    const finishTimer = setTimeout(() => {
      stopAudio();
      onFinish?.();
    }, TOTAL_DURATION * 1000);

    return () => {
      phaseTimers.forEach(clearTimeout);
      clearInterval(glitchInterval);
      clearTimeout(finishTimer);
      stopAudio();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || audioStartedRef.current) return;
    const start = Date.now();
    const check = setInterval(() => {
      if (Date.now() - start > 100) {
        audioStartedRef.current = true;
        playCinematicSound();
        clearInterval(check);
      }
    }, 50);
    return () => clearInterval(check);
  }, [isVisible]);

  const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
  const progress = Math.min(elapsed / TOTAL_DURATION, 1);

  const scanlineStyle = {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.03) 2px, rgba(6,182,212,0.03) 4px)',
    pointerEvents: 'none',
    zIndex: 5,
  };

  const vignetteStyle = {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.8) 100%)',
    pointerEvents: 'none',
    zIndex: 3,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-slate-950 overflow-hidden"
        >
          {/* 3D Scene */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false }}
            >
              <Scene3D progress={progress} />
            </Canvas>
          </div>

          {/* Vignette */}
          <div style={vignetteStyle} />

          {/* Scanlines */}
          <div className="hidden sm:block" style={scanlineStyle} />

          {/* Glitch overlay */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            animate={{
              opacity: glitchActive ? 1 : 0,
              x: glitchActive ? [0, -3, 4, -2, 0] : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{
              background: glitchActive ? 'rgba(6,182,212,0.05)' : 'transparent',
            }}
          />

          {/* Logo reveal */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 16,
                  delay: 0.2,
                }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <div className="relative flex flex-col items-center">
                  {/* Glow backdrop */}
                  <motion.div
                    className="absolute w-40 h-40 rounded-full blur-3xl"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      background: 'radial-gradient(circle, rgba(6,182,212,0.3), rgba(139,92,246,0.1), transparent)',
                    }}
                  />

                  {/* Logo */}
                  <motion.div
                    className="relative flex items-center gap-3 font-mono font-bold select-none"
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(6,182,212,0.3)',
                        '0 0 50px rgba(6,182,212,0.7)',
                        '0 0 20px rgba(6,182,212,0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {/* K icon */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <motion.div
                        className="absolute inset-0 rounded-full blur-2xl"
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: 'rgba(6,182,212,0.4)' }}
                      />
                      <svg viewBox="0 0 48 46" className="relative w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                        <motion.path
                          d={K_PATH}
                          fill="url(#k-cine-grad)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                        <defs>
                          <linearGradient id="k-cine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Text */}
                    <div className="relative">
                      <span className="text-3xl tracking-tight">
                        <span
                          className="text-gradient"
                          style={{
                            filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.4))',
                          }}
                        >
                          &lt;
                        </span>
                        {typedText.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: i * 0.05, type: 'spring', stiffness: 150, damping: 12 }}
                            className="text-white"
                          >
                            {char}
                          </motion.span>
                        ))}
                        <span
                          className="text-gradient"
                          style={{
                            filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.4))',
                          }}
                        >
                          {' />'}
                        </span>
                      </span>

                      {/* Underline glow */}
                      <motion.div
                        className="h-0.5 mt-1 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        transition={{ duration: 0.8, delay: 2.5 }}
                        style={{
                          background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #8b5cf6, #06b6d4)',
                          backgroundSize: '200% 100%',
                          boxShadow: '0 0 15px rgba(6,182,212,0.6)',
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.8 }}
                    className="mt-6 text-sm text-slate-500 font-mono tracking-[0.3em] uppercase"
                  >
                    Full Stack Developer
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
