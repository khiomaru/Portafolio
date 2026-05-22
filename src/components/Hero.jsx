import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCVModal } from '../context/useCVModal';

export default function Hero() {
  const { t } = useTranslation();
  const { openCV } = useCVModal();
  const [Hero3D, setHero3D] = useState(null);
  const roles = t('hero.roles', { returnObjects: true });
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!roles.length) return;
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    import('./FloatingShapes').then((mod) => setHero3D(() => mod.default));
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {Hero3D ? <Hero3D /> : (
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)',
        }} />
      )}

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2,6,23,0.3) 50%, rgba(2,6,23,0.8) 100%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Avatar */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 rounded-full opacity-60 group-hover:opacity-100 blur-xl transition-all duration-700" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500">
              <img
                src="https://avatars.githubusercontent.com/u/167497822?v=4"
                alt="Manuel Adolfo Soto"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Glowing badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('hero.available')}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none">
            <span className="text-white">Manuel Adolfo</span>
            <br />
            <span className="text-gradient inline-block" style={{ filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.3))' }}>
              Soto
            </span>
          </h1>
        </motion.div>

        {/* Subtitle line */}
        <motion.div variants={itemVariants} className="h-14 mb-8 flex items-center justify-center">
          <p className="text-xl sm:text-2xl text-slate-400 font-mono">
            <span className="text-cyan-400">&gt; </span>
            <span>{displayText}</span>
            <span className="animate-pulse text-cyan-400 font-light">|</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t('hero.description')}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollTo('#proyectos')}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
          >
            <span className="relative z-10">{t('hero.viewProjects')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <a
            href="https://github.com/khiomaru"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3.5 bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-700/80 hover:scale-105 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/khiomaru"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3.5 bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:bg-slate-700/80 hover:scale-105 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </span>
          </a>

          <button
            onClick={openCV}
            className="group relative px-8 py-3.5 bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-700/80 hover:scale-105 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              {t('nav.cvShort')}
            </span>
          </button>
        </motion.div>

        {/* Tech stack indicator */}
        <motion.div variants={itemVariants} className="mt-16">
          <p className="text-xs text-slate-600 mb-3 font-mono tracking-widest uppercase">{t('hero.mainStack')}</p>
          <div className="flex justify-center gap-6 flex-wrap">
            {['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker'].map((tech) => (
              <span key={tech} className="text-sm text-slate-500 hover:text-cyan-400 transition-colors font-mono">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
