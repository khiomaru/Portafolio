import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { experience } from '../data/projects';
import { useInView } from '../hooks/useInView';
import TiltCard from './TiltCard';

const typeConfig = {
  internship: { label: 'Pasantía', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30', accent: '#06b6d4' },
  academic: { label: 'Académico', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30', accent: '#8b5cf6' },
};

export default function Experience() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="experiencia" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative max-w-4xl mx-auto"
      >
        <motion.div variants={item}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent" />

          <div className="space-y-8">
            {experience.map((exp, i) => {
              const config = typeConfig[exp.type];
              const itemText = t(`experience.items.${exp.tKey}`, { returnObjects: true });
              return (
                <motion.div key={i} variants={item}>
                  <TiltCard intensity={5} glare={false}>
                    <div className="relative pl-0 md:pl-20 group">
                      <div className="absolute left-0 md:left-4 top-6 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-slate-950 group-hover:ring-cyan-500/30 transition-all hidden md:block shadow-lg shadow-cyan-500/50" />

                      <div className={`rounded-xl p-6 bg-gradient-to-br ${config.color} border card-hover ml-0 md:ml-4`}>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{itemText.title}</h3>
                            <p className="text-cyan-400 text-sm">{itemText.company}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="px-3 py-1 text-xs font-medium rounded-full border"
                              style={{ borderColor: `${config.accent}40`, color: config.accent, backgroundColor: `${config.accent}15` }}
                            >
                              {t(`experience.types.${exp.type}`)}
                            </span>
                            <span className="text-slate-500 text-sm font-mono">{itemText.period}</span>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">{itemText.description}</p>
                        {exp.techs && (
                          <div className="flex flex-wrap gap-2">
                            {exp.techs.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-mono text-cyan-400 bg-cyan-500/10 rounded-md border border-cyan-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
