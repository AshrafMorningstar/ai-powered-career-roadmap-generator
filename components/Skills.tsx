
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../constants';
import { Cloud, Code, Database, Shield, Zap } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cloud: <Cloud className="w-5 h-5" />,
  IaC: <Database className="w-5 h-5" />,
  DevOps: <Zap className="w-5 h-5" />,
  Coding: <Code className="w-5 h-5" />,
  Cloud_Security: <Shield className="w-5 h-5" />
};

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Technical Arsenal</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Deep expertise across the modern cloud stack, from lower-level networking to high-level orchestration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                {iconMap[skill.category] || <Zap className="w-5 h-5" />}
              </div>
              <span className="text-xs font-black text-blue-600 group-hover:scale-110 transition-transform">{skill.level}%</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{skill.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {skill.description}
            </p>

            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
              />
            </div>

            <AnimatePresence>
              {hoveredSkill === skill.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap z-30 pointer-events-none"
                >
                  Expert Level Proficiency
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
