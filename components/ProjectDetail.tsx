
import React from 'react';
import { Project, RoadmapStep } from '../types';

interface ProjectDetailProps {
  project: Project;
  step: RoadmapStep;
  onBack: () => void;
  onAskAI: (context: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, step, onBack, onAskAI }) => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Roadmap
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 md:p-12 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-500/50 backdrop-blur-sm border border-blue-400 text-xs font-bold rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">{project.name}</h1>
          <p className="text-blue-100 text-lg max-w-2xl">{project.objective}</p>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-mono">01</span>
              Implementation Roadmap
            </h2>
            <div className="grid gap-4">
              {project.tasks.map((task, idx) => (
                <div key={idx} className="flex items-start p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="mt-1 mr-4">
                    <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100"></div>
                    </div>
                  </div>
                  <p className="text-slate-700">{task}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Getting Started Tips</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="mb-4">For this {project.difficulty.toLowerCase()} level project, focus on <span className="font-semibold text-slate-800">documentation</span> first.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Check out the official documentation for {step.keySkills[0]}.</li>
                <li>Set up your git repository with a proper <code>.gitignore</code> (especially for cloud credentials!).</li>
                <li>Draw the architecture on a whiteboard or digital tool before writing a single line of code.</li>
              </ul>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 pt-8 border-t border-slate-100">
            <button 
              onClick={() => onAskAI(`How do I start the project '${project.name}'? Please provide a high-level architecture explanation and the first 3 steps in Terraform/Python.`)}
              className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get AI Architecture Advice
            </button>
            <a 
              href={`https://github.com/search?q=${project.tags[0]}+cloud+project`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Search Similar on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
