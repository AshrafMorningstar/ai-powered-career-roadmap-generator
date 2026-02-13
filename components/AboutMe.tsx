
import React from 'react';
import { motion } from 'framer-motion';
import { ASHRAF_BIO } from '../constants';
import { Star, Award, Code, Globe } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-200 shadow-2xl relative z-10 border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="Ashraf Morningstar" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600 rounded-3xl -z-0"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl -z-0"></div>
          
          <div className="absolute bottom-10 -right-12 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-100 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Top Rated Expert</p>
                <p className="text-xs text-slate-500">Cloud Infrastructure</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">About the Architect</span>
          <h2 className="text-4xl font-black text-slate-900 mb-6">{ASHRAF_BIO.name}</h2>
          <p className="text-xl text-slate-600 italic mb-8 border-l-4 border-blue-500 pl-6">
            "{ASHRAF_BIO.philosophy}"
          </p>
          <p className="text-slate-600 mb-10 leading-relaxed text-lg">
            {ASHRAF_BIO.bio}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {ASHRAF_BIO.softSkills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                <span className="font-semibold text-slate-800">{skill}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              Key Accomplishments
            </h3>
            <ul className="space-y-3">
              {ASHRAF_BIO.accomplishments.map((acc, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Award className="w-4 h-4 text-emerald-500" />
                  </div>
                  {acc}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
