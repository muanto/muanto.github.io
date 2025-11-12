import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="mb-8 animate-float relative">
          <img
            src="https://github.com/muanto.png"
            alt="Foto di Antonio Murolo"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-cosmic-blue shadow-cosmic object-cover relative z-10"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-slide-up font-sans">
          Antonio Murolo
        </h1>

        <div className="text-xl md:text-2xl text-ice-blue font-semibold mb-6 animate-slide-up font-mono" style={{ animationDelay: '0.2s' }}>
         Experienced Software Developer | Front end | Mobile | Full stack
        </div>

        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Sviluppatore software da oltre 20 anni, le mie esperienze vanno dall'automazione industriale allo sviluppo di app web e mobile.
          Negli ultimi 10 anni mi sono concentrato sulle tecnologie frontend in particolare{' '}
          <span className="text-cosmic-blue font-semibold">React.js</span> e{' '}
          <span className="text-cosmic-purple font-semibold">Flutter</span> consolidando una notevole esperienza
        </p>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#projects"
            className="bg-cosmic-blue text-white px-8 py-3 rounded-lg font-semibold transition-all border border-cosmic-blue"
          >
            🚀 Esplora i Progetti
          </a>
          <a
            href="https://github.com/muanto"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-cosmic-purple text-cosmic-purple px-8 py-3 rounded-lg font-semibold transition-all"
          >
            ⭐ GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
