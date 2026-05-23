import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyHireMe from './components/WhyHireMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import CVModal from './components/CVModal';
import { CVModalProvider } from './context/CVModalContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CVModalProvider>
      <CustomCursor />
      <SplashScreen isVisible={showSplash} />
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main>
          <Hero />
          <WhyHireMe />
          <Projects />
          <Skills />
          <Experience />
          <Achievements />
          <AboutMe />
          <Testimonials />
          <Blog />
          <Education />
          <Certificates />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <CVModal />
      </div>
    </CVModalProvider>
  );
}
