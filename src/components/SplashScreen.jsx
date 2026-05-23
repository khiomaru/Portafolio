import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-5xl font-bold font-mono"
          >
            <span className="text-gradient">&lt;k</span>
            <span className="text-white">hiomaru</span>
            <span className="text-gradient"> /&gt;</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
