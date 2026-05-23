import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function AboutMe() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

  const metrics = t('about.metrics', { returnObjects: true });
  const bio = t('about.bio', { returnObjects: true });
  const highlights = t('about.timeline.items', { returnObjects: true });
  const methodology = t('about.methodology.items', { returnObjects: true });
  const interests = t('about.interests.items', { returnObjects: true });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="sobre-mi" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative max-w-5xl mx-auto"
      >
        <motion.div variants={item}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        {/* Metrics strip */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((m) => (
            <div key={m.label} className="glass rounded-xl p-5 text-center card-hover group">
              <div className="text-2xl font-bold text-gradient mb-1">{m.value}</div>
              <div className="text-white font-medium text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{m.sub}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Bio */}
          <motion.div variants={item} className="md:col-span-3 space-y-4">
            {bio.map((p, i) => (
              <div key={i} className="glass rounded-xl p-6 card-hover">
                <p className="text-slate-300 leading-relaxed">{p}</p>
              </div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div variants={item} className="md:col-span-2">
            <div className="glass rounded-xl p-6 card-hover">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                {t('about.timeline.title')}
              </h3>
              <div className="space-y-0">
                {highlights.map((h, i) => (
                  <div key={i} className="relative pl-8 pb-6 last:pb-0 group">
                    {i < highlights.length - 1 && (
                      <div className="absolute left-2.5 top-3 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-violet-500/50" />
                    )}
                    <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center group-hover:border-violet-500 transition-colors z-10 text-[10px]">
                      {h.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-400 font-mono">{h.year}</span>
                      <h4 className="text-white text-sm font-medium mt-0.5">{h.label}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills / Method */}
        <motion.div variants={item} className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-white font-semibold mb-4">{t('about.methodology.title')}</h3>
            <div className="space-y-3">
              {methodology.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-white font-semibold mb-4">{t('about.interests.title')}</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded-full border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
