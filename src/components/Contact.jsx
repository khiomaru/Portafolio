import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const mailto = `mailto:sotomanueladolfo1@gmail.com?subject=Contacto%20desde%20Portafolio%20-%20${encodeURIComponent(form.name.value)}&body=${encodeURIComponent(`De: ${form.name.value} (${form.email.value})\n\n${form.message.value}`)}`;
    window.location.href = mailto;
  };

  const contacts = [
    { key: 'email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: t('contact.email'), value: 'sotomanueladolfo1@gmail.com' },
    { key: 'whatsapp', icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z', label: t('contact.whatsapp'), value: '+591 75431507', href: 'https://wa.me/59175431507' },
    { key: 'linkedin', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: t('contact.linkedin'), value: 'linkedin.com/in/khiomaru', href: 'https://www.linkedin.com/in/khiomaru' },
    { key: 'github', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', label: t('contact.github'), value: 'github.com/Manuel-Adolfo-Soto', href: 'https://github.com/Manuel-Adolfo-Soto' },
  ];

  return (
    <section id="contacto" className="relative py-28 px-4 overflow-hidden">
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
            <span className="text-gradient">/</span> {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={item} className="space-y-6">
            <div className="glass rounded-xl p-6 card-hover">
              <h3 className="text-lg font-semibold text-white mb-4">{t('contact.letsTalk')}</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                {t('contact.description')}
              </p>

              <div className="space-y-4">
                {contacts.map((item) => (
                  <div key={item.key} className="flex items-center gap-4 text-slate-300 group">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0 group-hover:bg-cyan-500/10 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 card-hover space-y-4">
              <h3 className="text-lg font-semibold text-white mb-2">{t('contact.form.title')}</h3>
              <div>
                <label htmlFor="contact-name" className="sr-only">{t('contact.form.name')}</label>
                <input id="contact-name" type="text" name="name" required placeholder={t('contact.form.name')}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">{t('contact.form.email')}</label>
                <input id="contact-email" type="email" name="email" required placeholder={t('contact.form.email')}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">{t('contact.form.message')}</label>
                <textarea id="contact-message" name="message" required rows={4} placeholder={t('contact.form.message')}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-violet-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
                {t('contact.form.send')}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
