
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROADMAP_DATA } from '../constants';
import { RoadmapStep, Project } from '../types';
import { Filter, Search, BookOpen } from 'lucide-react';

interface RoadmapViewProps {
  onSelectProject: (project: Project, step: RoadmapStep) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading skeletons
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const allTags = ['All', ...new Set(ROADMAP_DATA.flatMap(s => s.projects.flatMap(p => p.tags)))];

  const Skeleton = () => (
    <div className="animate-pulse bg-slate-200 h-32 w-full rounded-xl mb-4"></div>
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-extrabold text-slate-900 mb-4"
        >
          The 3-Month Cloud Master Plan
        </motion.h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          From theory to production. This roadmap focuses on the <span className="text-blue-600 font-semibold italic">Marketable Three</span>: 
          Infrastructure as Code, Automation, and Observability.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-4 z-40">
        <div className="flex items-center gap-2 text-slate-500 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          <Filter className="w-4 h-4 mr-2 hidden sm:block" />
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                filter === tag ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-16">
        {ROADMAP_DATA.map((step, stepIdx) => {
          const filteredProjects = filter === 'All' 
            ? step.projects 
            : step.projects.filter(p => p.tags.includes(filter));

          if (filteredProjects.length === 0 && filter !== 'All') return null;

          return (
            <motion.div 
              key={step.id} 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stepIdx * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-0 w-5 h-5 bg-white border-4 border-blue-500 rounded-full shadow-sm"></div>
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                    {step.week} • Phase {step.phase}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mb-3">{step.title}</h2>
                  <p className="text-slate-600 mb-5 leading-relaxed">{step.description}</p>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-5 mb-8 rounded-r-2xl shadow-sm">
                    <p className="text-sm text-amber-900 italic flex items-start gap-2">
                      <BookOpen className="w-5 h-5 mt-0.5 text-amber-600 shrink-0" />
                      <span><span className="font-bold">Recruiter Insight:</span> {step.importance}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {step.keySkills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-lg border border-slate-200 font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">Milestone Projects</h3>
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {isLoading ? (
                        [1, 2].map(i => <Skeleton key={i} />)
                      ) : (
                        filteredProjects.map((project, idx) => (
                          <motion.button
                            key={project.name}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02, translateX: 8 }}
                            onClick={() => onSelectProject(project, step)}
                            className="w-full text-left group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all relative overflow-hidden"
                          >
                            {/* Blue border accent on hover */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-black text-slate-800 group-hover:text-blue-600 transition-colors text-lg">{project.name}</h4>
                              <span className={`text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter ${
                                project.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                                project.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {project.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{project.objective}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map(t => (
                                <span key={t} className="text-[9px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded border border-slate-100">#{t}</span>
                              ))}
                            </div>

                            <div className="flex items-center text-blue-600 text-xs font-black uppercase tracking-wider group-hover:gap-2 transition-all">
                              Deep Dive
                              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          </motion.button>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapView;
