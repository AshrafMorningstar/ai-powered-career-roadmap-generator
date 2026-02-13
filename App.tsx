
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { AppTab, Project, RoadmapStep } from './types';
import { PORTFOLIO_TIPS } from './constants';
import RoadmapView from './components/RoadmapView';
import ProjectDetail from './components/ProjectDetail';
import AITutor from './components/AITutor';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Layout, MessageSquare, Briefcase, Book, Menu, X, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ROADMAP);
  const [selectedProject, setSelectedProject] = useState<{ project: Project, step: RoadmapStep } | null>(null);
  const [aiContext, setAiContext] = useState<string | undefined>();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectSelect = (project: Project, step: RoadmapStep) => {
    setSelectedProject({ project, step });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAI = (context: string) => {
    setAiContext(context);
    setActiveTab(AppTab.AI_TUTOR);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroCTA = (target: 'roadmap' | 'contact') => {
    const id = target === 'roadmap' ? 'roadmap-start' : 'contact';
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for any fixed header or spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderContent = () => {
    if (selectedProject) {
      return (
        <ProjectDetail 
          project={selectedProject.project} 
          step={selectedProject.step} 
          onBack={() => setSelectedProject(null)}
          onAskAI={handleAskAI}
        />
      );
    }

    switch (activeTab) {
      case AppTab.ROADMAP:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-24"
          >
            <Hero onCTA={handleHeroCTA} />
            
            <AboutMe />
            
            <Skills />
            
            <div id="roadmap-start" className="pt-20">
              <RoadmapView onSelectProject={handleProjectSelect} />
            </div>

            <Contact />
          </motion.div>
        );
      case AppTab.AI_TUTOR:
        return <AITutor initialPrompt={aiContext} />;
      case AppTab.PORTFOLIO:
        return (
          <div className="space-y-12 pb-20 max-w-4xl">
            <header>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Portfolio Strategy</h1>
              <p className="text-lg text-slate-600">How to present your projects so they stand out in a pile of resumes.</p>
            </header>
            <div className="grid md:grid-cols-2 gap-6">
              {PORTFOLIO_TIPS.map((tip, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-sm font-bold">✓</span>
                    {tip.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{tip.content}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-6">Interview Preparation Tip</h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-2xl">
                  When asked about your projects, use the <span className="font-bold underline decoration-blue-300 italic">STAR method</span> (Situation, Task, Action, Result). 
                  Focus heavily on the <span className="font-bold">Action</span> (What specific AWS/Azure service did you use?) 
                  and the <span className="font-bold text-white">Result</span> (How much did it cost? How fast did it deploy?).
                </p>
                <button 
                  onClick={() => setActiveTab(AppTab.AI_TUTOR)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  Start Mock Interview
                </button>
              </div>
              <Sparkles className="absolute top-10 right-10 w-24 h-24 text-white/10" />
            </div>
          </div>
        );
      case AppTab.RESOURCES:
        return (
          <div className="space-y-12 pb-20">
            <header>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Top Learning Resources</h1>
              <p className="text-lg text-slate-600">The best platforms to deepen your knowledge alongside this roadmap.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Cloud Academy', type: 'Hands-on Labs', desc: 'The best for real environment sandbox testing.' },
                { name: 'Adrian Cantrill', type: 'Deep Dives', desc: 'Arguably the best AWS certification courses in existence.' },
                { name: 'Terraform Docs', type: 'Official Docs', desc: 'The "Bible" for Infrastructure as Code.' },
                { name: 'KodeKloud', type: 'DevOps & K8s', desc: 'Hands-on labs for Kubernetes and Docker.' },
                { name: 'Azure Learn', type: 'Microsoft Ecosystem', desc: 'Free learning paths from Microsoft.' },
                { name: 'GitHub Explore', type: 'Open Source', desc: 'Search for "DevOps Roadmap" repositories.' }
              ].map((res, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all"
                >
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{res.type}</span>
                  <h3 className="text-lg font-black text-slate-900 mt-2 mb-3">{res.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{res.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isPageLoaded) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white font-mono text-sm tracking-widest"
        >
          INITIALIZING ARCHITECTURE...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Sidebar Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 md:top-0 md:bottom-0 md:w-24 lg:w-72 bg-white border-t md:border-t-0 md:border-r border-slate-200 z-[60] flex md:flex-col items-center py-4 md:py-10 transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : 'md:translate-x-0'}`}>
        <div className="hidden lg:flex items-center px-8 mb-16 w-full group cursor-pointer" onClick={() => { setActiveTab(AppTab.ROADMAP); setSelectedProject(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-blue-200 group-hover:rotate-12 transition-transform">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">MORNINGSTAR</span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Cloud Forge</span>
          </div>
        </div>

        <div className="flex flex-1 md:flex-col justify-around w-full px-4 space-y-0 md:space-y-3">
          {[
            { id: AppTab.ROADMAP, icon: <Briefcase />, label: 'Architecture' },
            { id: AppTab.AI_TUTOR, icon: <MessageSquare />, label: 'AI Mentor' },
            { id: AppTab.PORTFOLIO, icon: <Sparkles />, label: 'Portfolio' },
            { id: AppTab.RESOURCES, icon: <Book />, label: 'Resources' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSelectedProject(null);
                setAiContext(undefined);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col lg:flex-row items-center lg:px-6 py-4 rounded-2xl transition-all relative group ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={`w-6 h-6 lg:mr-4 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-white' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] lg:text-sm font-black uppercase lg:normal-case tracking-widest lg:tracking-normal mt-1 lg:mt-0">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-l-full hidden lg:block"
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Footer info for sidebar */}
        <div className="hidden lg:block px-8 w-full mt-auto">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cloud Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">All Systems Operational</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="md:hidden fixed top-4 right-4 z-[70] bg-blue-600 text-white p-3 rounded-full shadow-xl"
      >
        {isNavOpen ? <X /> : <Menu />}
      </button>

      {/* Main Content Area */}
      <main className={`md:ml-24 lg:ml-72 min-h-screen transition-all duration-300`}>
        <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedProject ? '-project' : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Decorative radial gradients for high-end feel */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -mr-96 -mt-96 pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full -ml-48 -mb-48 pointer-events-none z-[-1]"></div>
    </div>
  );
};

export default App;
