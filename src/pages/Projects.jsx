import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldAlert, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    id: 'vendora',
    name: 'Vendora',
    github: 'https://github.com/axwinachu/Vendora',
    description: 'Microservices Based Service Marketplace Platform built for extreme scalability and real-time operations.',
    tech: ['Spring Boot', 'React', 'Kafka', 'Redis', 'Keycloak', 'JWT', 'Docker', 'Eureka', 'API Gateway', 'MySQL'],
    features: [
      'Real Time Chat utilizing WebSocket messaging systems',
      'Scalable service booking & appointment orchestrator',
      'Secure centralized authorization via Keycloak IAM',
      'Robust discovery server and load balanced API Gateway',
      'Fast database query caching using Redis instances',
      'Event-driven transaction log ingestion with Apache Kafka'
    ],
    live: '#'
  },
  {
    id: 'rxflow',
    name: 'RxFlow',
    github: 'https://github.com/axwinachu/RxFlow',
    description: 'A lightning-fast Concurrent Task Orchestration Engine built on Java high-concurrency patterns.',
    tech: ['Java', 'Concurrency', 'ForkJoinPool', 'Queue structures', 'REST API', 'React UI Monitor'],
    features: [
      'Asynchronous DAG execution workflow orchestrator',
      'Dynamic work stealing utilizing custom ForkJoinPool configurations',
      'Interactive React UI monitoring dashboard for tasks tracking',
      'Deadlock prevention mechanisms and resource locking layers',
      'High-throughput message queues designed for low latency'
    ],
    live: '#'
  },
  {
    id: 'shalljewels',
    name: 'Shall Jewels',
    github: 'https://github.com/axwinachu/shall-jewlels',
    description: 'A Distributed E-Commerce Backend orchestrating multi-service customer order lifecycles.',
    tech: ['Spring Boot', 'Eureka Server', 'Hibernate', 'PostgreSQL', 'REST APIs', 'Docker', 'JWT'],
    features: [
      'Distributed inventory lock-control structures',
      'Secured customer payment & user session credentials validation via JWT',
      'Dynamic Eureka client routing & service registering configuration',
      'Optimized database layer queries with Hibernate ORM',
      'Complete Dockerized configuration mapping for easy cloud deployment'
    ],
    live: '#'
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-32 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-3">
          My Creations
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          Featured Engineering <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Architectures</span>
        </h2>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={setSelectedProject}
          />
        ))}
      </div>

      {/* Premium Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            {/* Scrollable Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#090909] border border-white/10 overflow-hidden max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(255,0,0,0.25)]"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-8 border-b border-white/5 bg-black/40">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary">
                    Project Architecture
                  </span>
                  <h3 className="text-white text-3xl font-display font-black uppercase mt-1">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                  aria-label="Close details"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div>
                  <h4 className="text-white font-display text-sm font-semibold tracking-wider uppercase mb-2">
                    Overview
                  </h4>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div>
                  <h4 className="text-white font-display text-sm font-semibold tracking-wider uppercase mb-3">
                    Core Engineering Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/50">
                        <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Grid */}
                <div>
                  <h4 className="text-white font-display text-sm font-semibold tracking-wider uppercase mb-3">
                    Technologies Employed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-white/80 bg-white/5 px-3.5 py-1.5 rounded-lg border border-white/10 font-medium font-sans"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-8 border-t border-white/5 bg-black/40 flex justify-end gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <FaGithub size={16} /> GitHub Repo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
