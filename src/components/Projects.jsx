import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { useInView } from '../hooks/useInView';
import TiltCard from './TiltCard';

const gradientMap = {
  afer: 'from-cyan-600/30 via-slate-900 to-violet-600/30',
  farmacia: 'from-emerald-600/30 via-slate-900 to-teal-600/30',
  hamburgueseria: 'from-amber-600/30 via-slate-900 to-orange-600/30',
  cafeteria: 'from-rose-600/30 via-slate-900 to-pink-600/30',
  tienda: 'from-blue-600/30 via-slate-900 to-indigo-600/30',
  api: 'from-violet-600/30 via-slate-900 to-purple-600/30',
};

function ProjectCard({ project, index, featured }) {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [imgIndex, setImgIndex] = useState(0);

  const p = t(`projects.items.${project.tKey}`, { returnObjects: true });

  const statusColor = project.completed
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

  const gradient = gradientMap[project.tKey] || 'from-slate-700 via-slate-800 to-slate-900';

  if (featured) {
    const hasImages = project.images && project.images.length > 0;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <TiltCard intensity={6} glare>
          <div className="glass rounded-xl overflow-hidden md:flex border border-slate-700/50">
            <div className={`md:w-2/5 h-52 md:h-auto ${hasImages ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-700/50 relative overflow-hidden group`}>
              {hasImages ? (
                <div className="w-full h-full relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={project.images[imgIndex]}
                      alt={`${p.name} - ${imgIndex + 1}`}
                      className="w-full h-full object-cover object-top absolute inset-0"
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={() => setImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === imgIndex ? 'bg-cyan-400 w-4' : 'bg-white/40 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.15) 0%, transparent 50%)`,
                    }} />
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-2 opacity-30 font-bold text-gradient">★</div>
                    <span className="px-4 py-1.5 text-xs font-medium text-cyan-400 bg-cyan-500/15 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                      {t('projects.featured')}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColor}`}>
                  {p.status}
                </span>
                <span className="text-slate-500 text-xs font-mono">{p.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{p.name}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{p.description}</p>
              {p.problem && (
                <div className="mb-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                  <p className="text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">Problema</p>
                  <p className="text-sm text-slate-400">{p.problem}</p>
                </div>
              )}
              {p.result && (
                <div className="mb-4 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                  <p className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wider">Resultado</p>
                  <p className="text-sm text-slate-400">{p.result}</p>
                </div>
              )}
              {p.details && (
                <ul className="space-y-1.5 mb-4">
                  {p.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techs.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono text-violet-400 bg-violet-500/10 rounded border border-violet-500/20">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.repoBack && (
                  <a href={project.repoBack} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    {t('projects.backend')}
                  </a>
                )}
                {!project.repoBack && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  {t('projects.backend')}
                </a>
                )}
                {project.repoFront && (
                  <a href={project.repoFront} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    {t('projects.frontend')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="glass rounded-xl overflow-hidden border border-slate-700/50 h-full flex flex-col">
        <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center border-b border-slate-700/50 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)`,
          }} />
          <span className="relative text-3xl font-bold text-gradient opacity-30">
            {String(index).padStart(2, '0')}
          </span>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColor}`}>
              {p.status}
            </span>
            <span className="text-slate-600 text-xs font-mono">{project.year}</span>
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">{p.name}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">{p.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techs.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs font-mono text-violet-400 bg-violet-500/10 rounded border border-violet-500/20">
                {tech}
              </span>
            ))}
            {project.techs.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-slate-500">+{project.techs.length - 4}</span>
            )}
          </div>
          {project.repo !== '#' ? (
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 transition-colors mt-auto">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              {t('projects.code')}
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-slate-600 mt-auto">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              {t('projects.comingSoon')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [filter, setFilter] = useState('All');

  const allTechs = useMemo(() => {
    const techSet = new Set();
    projects.forEach((p) => p.techs.forEach((tech) => techSet.add(tech)));
    return ['All', ...Array.from(techSet).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.techs.some((tech) => tech === filter));
  }, [filter]);

  const featuredFiltered = filtered.filter((p) => p.featured)[0] || null;
  const restFiltered = filtered.filter((p) => !p.featured).slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  return (
    <section id="proyectos" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={container}
        className="relative max-w-6xl mx-auto"
      >
        <motion.div variants={{ hidden: {}, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-3" />
          <p className="text-slate-400 mb-6 max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Tech filter */}
        <motion.div variants={{ hidden: {}, visible: { opacity: 1, y: 0 } }} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  filter === tech
                    ? 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10'
                    : 'text-slate-500 border-slate-700 hover:text-slate-300 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {featuredFiltered && (
            <ProjectCard project={featuredFiltered} index={0} featured />
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restFiltered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 py-12">{t('projects.noResults')}</p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="https://github.com/Manuel-Adolfo-Soto?tab=repositories" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800/80 border border-slate-700 text-slate-200 rounded-xl hover:border-cyan-500/50 hover:bg-slate-700/80 transition-all backdrop-blur-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            {t('projects.viewAll')}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
