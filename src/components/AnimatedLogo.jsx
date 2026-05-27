import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const K_PATHS = [
  'M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z',
];

const glowVariants = {
  animate: {
    opacity: [0.3, 0.8, 0.3],
    scale: [1, 1.15, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function AnimatedLogo({ href, onClick, size = 'default' }) {
  const [typed, setTyped] = useState('');
  const fullText = 'hiomaru';
  const [showCursor, setShowCursor] = useState(true);

  const typingSpeed = size === 'large' ? 200 : 100;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  const iconSize = size === 'large' ? 'w-14 h-14' : 'w-7 h-7';
  const textSize = size === 'large' ? 'text-4xl' : 'text-xl';
  const bracketSize = size === 'large' ? 'text-3xl' : 'text-lg';

  return (
    <motion.a
      href={href}
      onClick={onClick}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-2 font-mono font-bold cursor-pointer select-none"
    >
      {/* K Icon */}
      <div className={`relative ${iconSize} flex-shrink-0`}>
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-500 blur-xl"
          variants={glowVariants}
          animate="animate"
        />
        <svg
          viewBox="0 0 48 46"
          className="relative w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
        >
          <motion.path
            d={K_PATHS[0]}
            fill="url(#k-gradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: size === 'large' ? 2.5 : 1.5, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="k-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      <span className={`${textSize} tracking-tight`}>
        <span className="text-gradient">&lt;</span>
        <span className="text-white">{typed}</span>
        <span className="text-gradient"> /&gt;</span>
      </span>

      {/* Cursor */}
      <motion.span
        className={`${bracketSize} text-cyan-400 font-light`}
        animate={{ opacity: showCursor ? 1 : 0 }}
      >
        _
      </motion.span>
    </motion.a>
  );
}
