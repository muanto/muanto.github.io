import React, { useEffect, useRef } from 'react';
import skillsData from '../skills.json';

interface Skill {
  name: string;
  level: number;
  gradient: string;
  customGradient?: string;
}

interface SkillGroup {
  category: string;
  icon: string;
  items: Skill[];
}

const icons: Record<string, string> = {
  frontend: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>`,
  backend: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>`,
  tools: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
};

const SkillCard: React.FC<{ skillGroup: SkillGroup }> = ({ skillGroup }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const iconSvg = icons[skillGroup.icon] || `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>`;

  return (
    <div ref={sectionRef} className="bg-secondary/50 rounded-2xl p-8 border border-border hover:border-accent transition-all skills-section">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: iconSvg }} />
        </div>
        <h3 className="text-xl font-bold text-accent font-sans mb-6">{skillGroup.category}</h3>
      </div>
      <div className="space-y-5">
        {skillGroup.items.map((skill, index) => {
          const barClass = skill.gradient === 'custom' && skill.customGradient
            ? 'skill-bar h-3 rounded-full'
            : `skill-bar bg-gradient-to-r ${skill.gradient} h-3 rounded-full`;
          const barStyle = skill.gradient === 'custom' && skill.customGradient
            ? { background: skill.customGradient }
            : {};

          return (
            <div key={index} className="skill-bar-container">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="font-semibold">{skill.level}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div className={barClass} style={barStyle} data-width={`${skill.level}%`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-accent">Competenze Tecniche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {skillsData.skills.map((skillGroup: SkillGroup, index: number) => (
            <SkillCard key={index} skillGroup={skillGroup} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
