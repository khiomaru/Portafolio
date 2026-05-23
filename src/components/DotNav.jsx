import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'educacion', label: 'Educación' },
  { id: 'contacto', label: 'Contacto' },
];

export default function DotNav() {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const ids = sections.map(s => s.id);
      for (const id of ids.toReversed()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative flex items-center justify-center"
          aria-label={s.label}
        >
          <motion.span
            className="absolute right-full mr-3 px-2 py-1 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          >
            {s.label}
          </motion.span>
          <div
            className={`rounded-full transition-all duration-300 ${
              active === s.id
                ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
