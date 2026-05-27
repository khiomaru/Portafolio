import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const K_PATH = 'M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z';

const ORBITAL_RADIUS = 28;
const NUM_ORBITS = 3;

function OrbitalDots({ size }) {
  const r = size === 'large' ? ORBITAL_RADIUS * 1.8 : ORBITAL_RADIUS * 0.9;
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="-30 -30 60 60">
      {Array.from({ length: NUM_ORBITS }).map((_, i) => (
        <motion.circle
          key={i}
          r={3 - i * 0.6}
          fill={i === 0 ? '#06b6d4' : i === 1 ? '#8b5cf6' : '#ec4899'}
          cx={0}
          cy={-r}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3 + i * 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.8 + 2,
          }}
          style={{ transformOrigin: 'center', originX: '0px', originY: '0px' }}
        />
      ))}
    </svg>
  );
}

const springBounce = { type: 'spring', stiffness: 200, damping: 12 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const ringVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: [0, 0.6, 0],
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 150, damping: 14, delay: 0.2 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 14,
      delay: 0.8 + i * 0.08,
    },
  }),
};

const bracketLeftVariants = {
  hidden: { opacity: 0, x: -30, rotate: 15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: springBounce,
  },
};

const bracketRightVariants = {
  hidden: { opacity: 0, x: 30, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: springBounce,
  },
};

function ParticleBurst() {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const dist = 40 + Math.random() * 30;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#06b6d4' : '#8b5cf6',
              left: '50%',
              top: '50%',
              boxShadow: '0 0 4px currentColor',
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, Math.cos((angle * Math.PI) / 180) * dist],
              y: [0, Math.sin((angle * Math.PI) / 180) * dist],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 1.6 + Math.random() * 0.5,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}

function ShimmerOverlay({ size }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.15) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
        delay: 2.5,
      }}
    />
  );
}

function UnderlineDraw({ size }) {
  return (
    <motion.div
      className="absolute -bottom-1 left-0 h-0.5 rounded-full"
      style={{
        background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #8b5cf6, #06b6d4)',
        backgroundSize: '200% 100%',
      }}
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: '100%',
        opacity: 1,
        backgroundPosition: ['0% 0', '200% 0'],
      }}
      transition={{
        width: { duration: 0.8, ease: 'easeInOut', delay: 2.2 },
        opacity: { duration: 0.3, delay: 2.2 },
        backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
      }}
    />
  );
}

export default function AnimatedLogo({ href, onClick, size = 'default' }) {
  const isLarge = size === 'large';
  const [typed, setTyped] = useState('');
  const fullText = 'khiomaru';
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState('init');
  const iconSize = isLarge ? 'w-16 h-16' : 'w-7 h-7';
  const textSize = isLarge ? 'text-4xl' : 'text-xl';
  const cursorSize = isLarge ? 'text-3xl' : 'text-lg';

  const typingSpeed = isLarge ? 140 : 80;

  useEffect(() => {
    if (!isLarge) {
      setTyped(fullText);
      setPhase('done');
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setPhase('done');
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  if (!isLarge) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className="flex items-center gap-2 font-mono font-bold cursor-pointer select-none group"
      >
        <div className={`relative ${iconSize} flex-shrink-0`}>
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-500 blur-xl"
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-violet-500 blur-lg"
            animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <svg viewBox="0 0 48 46" className="relative w-full h-full drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">
            <motion.path
              d={K_PATH}
              fill="url(#k-gradient)"
              animate={{ filter: ['drop-shadow(0 0 2px rgba(6,182,212,0.3))', 'drop-shadow(0 0 8px rgba(6,182,212,0.6))', 'drop-shadow(0 0 2px rgba(6,182,212,0.3))'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="k-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className={`${textSize} tracking-tight`}>
          <span className="text-gradient">&lt;k</span>
          <span className="text-white">hiomaru</span>
          <span className="text-gradient"> /&gt;</span>
        </span>
      </motion.a>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-2">
      <motion.div
        className="relative flex items-center gap-3 font-mono font-bold select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Expanding ring */}
        <motion.div
          className="absolute -inset-8 rounded-full border-2 border-cyan-500/40"
          variants={ringVariants}
        />
        <motion.div
          className="absolute -inset-12 rounded-full border border-violet-500/20"
          variants={ringVariants}
          custom={1}
        />

        {/* Icon section */}
        <motion.div className={`relative ${iconSize} flex-shrink-0`} variants={iconVariants}>
          {/* Multi-layer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-500 blur-2xl"
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-violet-500 blur-xl"
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-500/30 blur-lg"
            animate={{ opacity: [0, 0.3, 0], scale: [0.6, 1.1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
          />

          {/* Orbital dots */}
          <OrbitalDots size={size} />

          {/* K path */}
          <svg viewBox="0 0 48 46" className="relative w-full h-full z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <motion.path
              d={K_PATH}
              fill="url(#k-gradient-splash)"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: 'easeInOut' },
                fillOpacity: { duration: 0.6, delay: 1.8, ease: 'easeOut' },
              }}
            />
            <defs>
              <linearGradient id="k-gradient-splash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Bracket left */}
        <motion.span className={`${textSize} tracking-tight text-gradient`} variants={bracketLeftVariants}>
          &lt;
        </motion.span>

        {/* Typed letters */}
        <span className={`${textSize} tracking-tight text-white flex`}>
          {typed.split('').map((char, i) => (
            <motion.span key={i} custom={i} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </span>

        {/* Bracket right */}
        <motion.span className={`${textSize} tracking-tight text-gradient`} variants={bracketRightVariants}>
          {' />'}
        </motion.span>

        {/* Cursor */}
        <motion.span
          className={`${cursorSize} text-cyan-400 font-light`}
          animate={{ opacity: phase === 'done' ? (showCursor ? 1 : 0) : 0 }}
        >
          _
        </motion.span>

        {/* Shimmer */}
        <ShimmerOverlay size={size} />
        <UnderlineDraw size={size} />
      </motion.div>

      {/* Particle burst */}
      <ParticleBurst />
    </div>
  );
}
