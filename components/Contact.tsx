
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/20 blur-[100px] -ml-48 -mb-48"></div>

        <div className="relative z-10 grid lg:grid-cols-2">
          <div className="p-12 md:p-20 text-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Build the <span className="text-blue-400 underline decoration-blue-500/30">Next Generation</span> of Infrastructure</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
                Ready to take your cloud career to the next level? Or have a project that needs the Morningstar touch? Reach out today.
              </p>

              <div className="space-y-6">
                <a href="mailto:hello@ashraf.dev" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-semibold tracking-tight">hello@ashraf.dev</span>
                </a>
                <div className="flex gap-4">
                  {[
                    { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                    { icon: <Github className="w-5 h-5" />, href: "#" }
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-8 md:p-16 bg-white/5 backdrop-blur-sm border-l border-white/10 flex items-center">
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Your Name</label>
                  <input type="text" className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                  <input type="email" className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">How can I help?</label>
                <textarea rows={4} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all resize-none" placeholder="Tell me about your project or goal..."></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 transition-all hover:translate-y-[-2px]">
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
