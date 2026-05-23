import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { skills } from '../data/projects';
import { useInView } from '../hooks/useInView';

const categories = [
  { key: 'frontend', label: 'Frontend', color: '#06b6d4' },
  { key: 'backend', label: 'Backend', color: '#8b5cf6' },
  { key: 'databases', label: 'Bases de Datos', color: '#10b981' },
  { key: 'tools', label: 'Herramientas', color: '#f59e0b' },
  { key: 'networking', label: 'Redes', color: '#f43f5e' },
];

export default function Skills() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="habilidades" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative max-w-6xl mx-auto"
      >
        <motion.div variants={item}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('skills.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <motion.div key={cat.key} variants={item}>
              <div className="glass rounded-xl p-6 card-hover h-full">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  {t(`skills.categories.${cat.key}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills[cat.key].map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-800/60 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 hover:text-cyan-300 transition-all"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
