import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';

const timelineExperience = [
  {
    role: 'Java Full Stack Developer Intern',
    company: 'Bridgeon Solutions',
    period: '2024 - Present',
    desc: 'Engaged in end-to-end web system engineering. Created high-concurrency microservices with Spring Boot and reactive client layouts with React. Participated in team agile sprints, system deployment checks, and API integration designs.',
  }
];

const timelineEducation = [
  {
    degree: 'Bachelor of Computer Science',
    college: 'NGM College',
    period: '2021 - 2024',
    desc: 'Acquired foundational knowledge in database systems, data structures, algorithms, object-oriented concepts, and enterprise architectures. Graduated with top-tier technical credits.',
  }
];

const certificates = [
  {
    title: 'IBM Cloud Envision Program',
    issuer: 'IBM Corporation',
    date: '2024',
    desc: 'Validated capabilities in cloud infrastructure design, virtual server provision standards, Kubernetes clusters scaling guidelines, and secure deployments over enterprise hybrid networks.',
    credentialId: 'IBM-CL-ENV-908'
  }
];

const TimelineItem = ({ title, subtitle, period, desc, type, delay }) => {
  const icon = type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 pb-10 border-l border-white/10 last:pb-0"
    >
      {/* Icon node */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_8px_rgba(255,0,0,0.4)]">
        {icon}
      </div>

      {/* Content wrapper */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-sans font-semibold">
          <Calendar size={12} /> {period}
        </span>
        <h4 className="text-white text-lg font-bold font-display uppercase tracking-wider">{title}</h4>
        <h5 className="text-primary text-xs font-semibold uppercase tracking-widest">{subtitle}</h5>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl font-sans mt-2">{desc}</p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-32 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Split anchors for navigation links scrolling */}
      <div id="education" className="absolute top-0" />

      {/* Page Title */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-3">
          Timeline & Credentials
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          Journey & Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side Timelines (Col Span 7) */}
        <div className="lg:col-span-7 space-y-12">
          {/* Work Experience */}
          <div>
            <h3 className="text-white font-display text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Professional Experience
            </h3>
            <div className="space-y-2">
              {timelineExperience.map((exp, idx) => (
                <TimelineItem
                  key={idx}
                  title={exp.role}
                  subtitle={exp.company}
                  period={exp.period}
                  desc={exp.desc}
                  type="work"
                  delay={idx * 0.15}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-white font-display text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Education History
            </h3>
            <div className="space-y-2">
              {timelineEducation.map((edu, idx) => (
                <TimelineItem
                  key={idx}
                  title={edu.degree}
                  subtitle={edu.college}
                  period={edu.period}
                  desc={edu.desc}
                  type="edu"
                  delay={idx * 0.15}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Certificates (Col Span 5) */}
        <div className="lg:col-span-5 space-y-8">
          <h3 className="text-white font-display text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            Certifications
          </h3>

          <div className="space-y-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative rounded-2xl glassmorphism p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 group"
              >
                {/* Decorative spotlight effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/70" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg font-display uppercase tracking-wider group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <span className="text-white/40 text-xs font-semibold block mt-0.5">
                      {cert.issuer} • {cert.date}
                    </span>
                    <p className="text-white/50 text-xs sm:text-sm mt-3 leading-relaxed">
                      {cert.desc}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-white/30">
                      <span>Credential ID</span>
                      <span className="text-white/60">{cert.credentialId}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
