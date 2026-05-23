import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/projects';
import { useInView } from '../hooks/useInView';

export default function Certificates() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [preview, setPreview] = useState(null);

  return (
    <section id="certificados" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('certificates.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        {certificates.filter(cert => !cert.pending).map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <button onClick={() => setPreview(cert.link)} className="w-full text-left glass rounded-xl overflow-hidden card-hover border border-slate-700/50">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto bg-slate-800 shrink-0">
                  <img
                    src={cert.link}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
                  <p className="text-cyan-400 text-sm mb-2">{cert.issuer}</p>
                  <p className="text-slate-400 text-sm">{cert.description}</p>
                  <span className="mt-3 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors">Click para ver completo →</span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute -top-10 right-0 text-slate-400 hover:text-white transition-colors text-sm"
              >
                Cerrar ✕
              </button>
              <img
                src={preview}
                alt="Certificado"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <a
                href={preview}
                download
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg hover:from-cyan-400 hover:to-violet-400 transition-all"
              >
                Descargar imagen
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
