import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const iconMap = {
  web: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  api: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  database: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
  custom: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
};

export default function Services() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const items = t('services.items', { returnObjects: true });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative max-w-5xl mx-auto"
      >
        <motion.div variants={item}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-4" />
          <p className="text-slate-400 max-w-2xl mb-12">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((service, i) => (
            <motion.div key={i} variants={item}>
              <div className="glass rounded-xl p-6 card-hover h-full group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center shrink-0 group-hover:from-cyan-500/30 group-hover:to-violet-500/30 transition-all">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconMap[service.icon] || iconMap.custom} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 text-sm text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('services.cta')}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
