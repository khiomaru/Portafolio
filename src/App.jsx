import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Certificates from './components/Certificates';
import WhyHireMe from './components/WhyHireMe';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import BackToTop from './components/BackToTop';
import DotNav from './components/DotNav';
import CVModal from './components/CVModal';
import { CVModalProvider } from './context/CVModalContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CVModalProvider>
      <SplashScreen isVisible={showSplash} />
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <DotNav />
        <main>
          <Hero />
          <Experience />
          <Achievements />
          <Projects />
          <Skills />
          <AboutMe />
          <Education />
          <Certificates />
          <WhyHireMe />
          <Services />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <CVModal />
      </div>
    </CVModalProvider>
  );
}
