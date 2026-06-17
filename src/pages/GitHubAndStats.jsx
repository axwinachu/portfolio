import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, GitFork, Users, Code, BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const CountUpNumber = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center items-center">
      <span className="text-4xl sm:text-5xl font-display font-black text-primary text-glow select-none">
        {count}+
      </span>
      <span className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
};

const GitHubAndStats = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch profile
        const userRes = await fetch('https://api.github.com/users/axwinachu');
        const userData = await userRes.json();
        
        // Fetch repositories
        const reposRes = await fetch('https://api.github.com/users/axwinachu/repos?sort=updated&per_page=15');
        const reposData = await reposRes.json();

        if (Array.isArray(reposData)) {
          setProfile(userData);
          setRepos(reposData.slice(0, 4));

          // Calculate stars and languages
          let starsCount = 0;
          const langMap = {};
          
          reposData.forEach(repo => {
            starsCount += repo.stargazers_count;
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });

          setTotalStars(starsCount);

          // Convert languages map to sorted array
          const sortedLangs = Object.entries(langMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 4);
          
          setLanguages(sortedLangs);
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Contribution graph mockup data (53 weeks * 7 days)
  const renderContributionGraph = () => {
    const grid = [];
    const colors = ['bg-white/5', 'bg-red-950/40', 'bg-red-900/60', 'bg-red-600/80', 'bg-red-500'];
    
    // We render a smaller layout on mobile for responsiveness
    const weeksCount = window.innerWidth < 640 ? 24 : 53;

    for (let w = 0; w < weeksCount; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        // Randomize weight to mimic contributions
        const weight = Math.floor(Math.random() * colors.length);
        week.push(colors[weight]);
      }
      grid.push(week);
    }

    return (
      <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-none select-none">
        {grid.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
            {week.map((colorClass, dIdx) => (
              <div
                key={dIdx}
                className={`w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-130 ${colorClass}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="statistics" className="relative py-32 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Dynamic anchor */}
      <div id="github" className="absolute top-0" />

      {/* Grid of stats counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <CountUpNumber value="15" label="Projects Created" />
        <CountUpNumber value="1" label="Years Experience" />
        <CountUpNumber value="250" label="GitHub Commits" />
        <CountUpNumber value="25" label="Technologies Used" />
      </div>

      {/* GitHub Overview Panel */}
      <div className="rounded-3xl glassmorphism border border-white/5 overflow-hidden p-8 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <FaGithub size={22} />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold font-display uppercase tracking-wider">
                GitHub Dashboard
              </h3>
              <p className="text-white/40 text-xs">
                Real-time profile statistics for <span className="text-white">@axwinachu</span>
              </p>
            </div>
          </div>
          
          <a
            href="https://github.com/axwinachu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all hover:bg-white/5 cursor-pointer self-start sm:self-auto"
          >
            Visit Profile
          </a>
        </div>

        {/* Dynamic Statistics counters */}
        {!loading && profile ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-5 rounded-2xl border border-white/5">
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-2xl font-display">{profile.followers}</span>
              <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold mt-1 flex items-center gap-1">
                <Users size={10} /> Followers
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-2xl font-display">{profile.public_repos}</span>
              <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold mt-1 flex items-center gap-1">
                <BookOpen size={10} /> Public Repos
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-2xl font-display">{totalStars}</span>
              <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold mt-1 flex items-center gap-1">
                <Star size={10} /> Total Stars
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-2xl font-display">
                {languages[0] ? languages[0].name : 'Java'}
              </span>
              <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold mt-1 flex items-center gap-1">
                <Code size={10} /> Primary Lang
              </span>
            </div>
          </div>
        ) : (
          <div className="h-14 flex items-center justify-center text-xs text-white/30 uppercase tracking-widest animate-pulse">
            Connecting to GitHub API...
          </div>
        )}

        {/* Contribution Graph */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/30">
            <span>Contribution Activity</span>
            <span>Red Alert Grid</span>
          </div>
          <div className="bg-black/60 border border-white/5 rounded-2xl p-5 overflow-hidden">
            {renderContributionGraph()}
          </div>
        </div>

        {/* Repositories layout */}
        {!loading && repos.length > 0 && (
          <div className="space-y-4">
            <div className="text-[10px] uppercase font-bold tracking-widest text-white/30">
              Active Repositories
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[120px] group cursor-pointer"
                >
                  <div>
                    <h4 className="text-white font-bold font-display text-base tracking-wide group-hover:text-primary transition-colors">
                      {repo.name}
                    </h4>
                    <p className="text-white/40 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {repo.description || 'No description provided.'}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4 text-[10px] text-white/50 font-semibold">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-primary" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} className="text-primary" /> {repo.forks_count}
                    </span>
                    {repo.language && (
                      <span className="ml-auto text-primary uppercase font-bold">
                        {repo.language}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubAndStats;
