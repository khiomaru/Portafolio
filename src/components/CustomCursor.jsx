import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const springX = useSpring(0, { stiffness: 200, damping: 30 });
  const springY = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [springX, springY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/40 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{
          scale: hovering ? 1.8 : 1,
          borderColor: hovering ? 'rgba(139,92,246,0.6)' : 'rgba(6,182,212,0.4)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
