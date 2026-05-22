import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useCVModal } from '../context/useCVModal';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { openCV } = useCVModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const navLinks = [
    { href: '#inicio', label: t('nav.inicio') },
    { href: '#sobre-mi', label: t('nav.sobre-mi') },
    { href: '#habilidades', label: t('nav.habilidades') },
    { href: '#experiencia', label: t('nav.experiencia') },
    { href: '#proyectos', label: t('nav.proyectos') },
    { href: '#contacto', label: t('nav.contacto') },
  ];

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(l => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.15) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-cyan-500/5 border-b border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#inicio"
            onClick={(e) => scrollTo(e, '#inicio')}
            className="text-xl font-bold font-mono"
          >
            <span className="text-gradient">&lt;k</span>
            <span className="text-white">hiomaru</span>
            <span className="text-gradient"> /&gt;</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`relative px-3 py-2 text-sm transition-colors rounded-lg ${
                  activeSection === link.href
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}

            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-1.5 text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/50 rounded-lg transition-all bg-slate-800/50"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              onClick={openCV}
              className="ml-3 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg hover:from-cyan-400 hover:to-violet-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              {t('nav.cvShort')}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 border border-slate-700 rounded-lg transition-all"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === link.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { openCV(); setMenuOpen(false); }}
                className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg mt-2"
              >
                {t('nav.cv')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  );
}
