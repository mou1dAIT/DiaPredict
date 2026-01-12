import { motion } from "framer-motion";
import img1 from '../photo/medecin.png';
import { FaBriefcaseMedical } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function HomeSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main id="home" className='min-h-screen bg-[#FAF7F2] overflow-x-hidden relative'>
      
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="pt-24 md:pt-40 pb-12 px-4 md:px-12 relative z-10" id="home">
        <div className="max-w-[1200px] mx-auto relative">
          
          <div className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-[40px] relative overflow-hidden flex flex-col md:flex-row min-h-[600px] shadow-[0_18px_18px_rgba(4,120,87,0.15)]">
            
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />

            
            <div className="flex-1 p-8 md:p-12 lg:p-16 z-30 flex flex-col justify-between md:order-2">
              
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                variants={fadeUp}
                
                className="space-y-6 md:ml-auto md:max-w-[50%] lg:max-w-xl text-center md:text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Know Your <span className="text-[#34FFC8] drop-shadow-[0_0_15px_rgba(52,255,200,0.4)]">Risk</span>
                  <br />
                  <span className="text-3xl md:text-4xl lg:text-5xl text-emerald-50">
                    Take Control <span className="text-[#34FFC8] drop-shadow-[0_0_15px_rgba(52,255,200,0.4)]">Today</span>
                  </span>
                </h1>
                
                <p className="text-sm md:text-base lg:text-lg text-emerald-100/80 max-w-sm mx-auto md:ml-0 leading-relaxed">
                  Take a few minutes to complete the diabetes risk test. 
                  Early detection can help prevent complications.
                </p>

                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#065F46',boxShadow: '0 10px 20px rgba(220, 215, 215, 0.81)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-2xl bg-white text-[#065F46] font-bold text-lg shadow-xl transition-all duration-300"
                >
                <NavLink to="/test">
                  Start Your Test
                  </NavLink>
                </motion.button>
              </motion.div>

             
              <div className="mt-12 md:ml-auto md:w-[50%] lg:w-full flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8">
                <div className="flex items-center justify-center gap-3 md:ml-auto">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white border border-white/10">
                    <FaBriefcaseMedical size={20} />
                  </div>
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white border border-white/10">
                    <span className="font-bold text-sm">24h</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 rounded-xl shadow-lg">
                    <span className="w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-[#065F46]">Free & Quick</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="relative md:absolute bottom-0 left-0 z-20 w-full md:w-[50%] lg:w-[48%] flex justify-center md:justify-start items-end pointer-events-none">
              <img 
                src={img1} 
                alt="Doctor" 
                
                className="block w-[90%] md:w-full h-auto object-contain max-h-[420px] md:max-h-[600px] lg:max-h-[750px] translate-y-[1px]" 
                style={{ 
                    filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.3))',
                }}
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}