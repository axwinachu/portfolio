import React, { useState } from 'react';
import CinematicLoader from './components/CinematicLoader';
import CustomCursor from './components/CustomCursor';
import LenisScroll from './components/LenisScroll';
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import GitHubAndStats from './pages/GitHubAndStats';
import Contact from './pages/Contact';
import CommandPalette from './components/CommandPalette';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Cinematic Loader */}
      <CinematicLoader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative w-full min-h-screen bg-background-dark text-white selection:bg-primary/30 selection:text-white">
          {/* Custom interactive elements */}
          <CustomCursor />
          <LenisScroll />
          <BackgroundGrid />
          <CommandPalette />
          
          {/* Noise Film Overlay */}
          <div className="noise-bg" />

          {/* Sticky Header Nav */}
          <Navbar />

          {/* Page Layout Wrapper */}
          <main className="relative z-10 w-full flex flex-col items-center">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <GitHubAndStats />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
