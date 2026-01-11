import { motion } from "framer-motion";
import { NavLink } from "react-router-dom"; 
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Test", path: "/test" },
  
  ];

  const params=[
    {name:"GitHub",path:"https://github.com/mou1dAIT",icon:<FaGithub size={20}/>}
  ]

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-[#1E1E1C] pt-24 pb-12 text-[#FAF7F2] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
       
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">
                D
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#FAF7F2]">
                Dia<span className="text-emerald-500">Predict</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Advanced health analysis using Logistic Regression.
            </p>
          </div>

        
          <div>
            <h4 className="text-emerald-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  className="list-none"
                >
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-emerald-500" : "text-slate-300 hover:text-emerald-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

         
          <div>
            <h4 className="text-emerald-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Legal</h4>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li>
                <NavLink to="/privacy" className="hover:text-white transition-colors text-sm">
                  Privacy Policy
                </NavLink>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 italic leading-relaxed">
                 Note: This AI tool is for educational purposes and provides estimates based on clinical data.

              </li>
            </ul>
          </div>
        </div>

        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-[11px] font-bold tracking-widest uppercase">
            © 2026 DiaPredict AI
          </div>
          <div className="flex gap-3">
             <div className="flex gap-3">
            {params.map((i) => (
              <motion.div 
                key={i.name}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center cursor-pointer transition-colors" 
              >
              <NavLink to={i.path} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {i.icon}
                </NavLink>
              </motion.div>
            ))}
          </div>   
          </div>
        </div>
      </div>
    </motion.footer>
  );
}