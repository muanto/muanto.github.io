import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="bg-primary min-h-screen text-text-primary font-sans relative overflow-x-hidden"
      style={{
        background: `
        radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0f 0%, #151520 50%, #0a0a0f 100%)
      `,
      }}
    >
      {/* Star field layers - simulate body::before and body::after */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `
          radial-gradient(2px 2px at 50% 50%, rgba(255,255,255,0.9), transparent),
          radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.7), transparent),
          radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 20% 80%, rgba(255,255,255,0.6), transparent)
        `,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundPosition: "center",
          animation: "starField 20s linear infinite",
          perspective: "800px",
          transformOrigin: "center center",
        }}
      ></div>

      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `
          radial-gradient(1px 1px at 50% 50%, rgba(14, 165, 233, 0.8), transparent),
          radial-gradient(1px 1px at 25% 25%, rgba(6, 182, 212, 0.6), transparent),
          radial-gradient(1px 1px at 75% 75%, rgba(34, 211, 238, 0.7), transparent),
          radial-gradient(1px 1px at 25% 75%, rgba(14, 165, 233, 0.5), transparent),
          radial-gradient(1px 1px at 75% 25%, rgba(6, 182, 212, 0.6), transparent)
        `,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          backgroundPosition: "center",
          animation: "starField2 25s linear infinite",
          perspective: "800px",
          transformOrigin: "center center",
        }}
      ></div>

      {/* Cosmic background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="warp-stars"></div>
        <div className="warp-stars-2"></div>
        <div className="warp-stars-3"></div>
      </div>

      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
