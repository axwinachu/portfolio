import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillGalaxy from '../components/SkillGalaxy';

const categories = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Spring Boot', level: 90 },
      { name: 'Spring MVC', level: 90 },
      { name: 'Spring Cloud', level: 85 },
      { name: 'Hibernate', level: 85 },
      { name: 'JPA', level: 90 },
      { name: 'REST API', level: 95 },
      { name: 'WebFlux', level: 80 }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Redux', level: 80 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 95 }
    ]
  },
  {
    id: 'database',
    title: 'Databases & Streaming',
    skills: [
      { name: 'MySQL', level: 90 },
      { name: 'Redis', level: 80 },
      { name: 'Kafka', level: 80 }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'GitHub Actions', level: 80 },
      { name: 'CI/CD', level: 80 },
      { name: 'AWS', level: 75 }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Security',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Swagger', level: 85 },
      { name: 'Postman', level: 90 },
      { name: 'Keycloak', level: 80 }
    ]
  }
];

const ProgressRing = ({ percentage, name }) => {
  const radius = 30;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:scale-105">
      <div className="relative w-18 h-18 flex items-center justify-center">
        {/* Track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={radius}
            className="stroke-white/10"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated fill circle */}
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            className="stroke-primary"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute text-white text-xs font-bold font-display">{percentage}%</span>
      </div>
      <span className="text-white/80 font-medium text-xs tracking-wide mt-3 text-center">{name}</span>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('backend');

  return (
    <section id="skills" className="relative py-32 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-3">
          Expertise & Stack
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          Technical Skill Galaxy
        </h2>
        <p className="text-white/50 text-sm max-w-lg mt-3">
          Interactive visualization of core engineering architectures and framework proficiencies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Skill Galaxy Constellation (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SkillGalaxy />
        </div>

        {/* Skill categories details list (Col span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Category Tabs Selector */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,0,0,0.4)]'
                    : 'bg-white/5 text-white/50 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.title.split(' ')[0]} {/* Grab first word for tab title */}
              </button>
            ))}
          </div>

          {/* Active Category Display grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {categories
              .find((cat) => cat.id === activeCategory)
              ?.skills.map((skill) => (
                <ProgressRing key={skill.name} percentage={skill.level} name={skill.name} />
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
