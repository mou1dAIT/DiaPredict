import { motion } from "framer-motion";

export default function Partie2() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] overflow-x-hidden relative">
      
      <section className="min-h-screen flex items-center bg-transparent relative px-8 md:px-16 lg:px-24 py-20">
        
      
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-40 h-40 bg-emerald-300 rounded-full opacity-15 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        
        <svg
  className="absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 1920 1080"
  preserveAspectRatio="none"
>
  <motion.path
    d="M 0 200 C 400 900, 700 50, 900 600 S 1300 1000, 1600 300 L 2000 500"
    stroke="url(#gradient)"
    strokeWidth="15" 
    fill="none"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}

    whileInView={{ pathLength: 1, opacity: 1 }} 
    transition={{ duration: 2.5, ease: "easeInOut" }}
  />
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
     
      <stop offset="0%" stopColor="#065F46" stopOpacity="1" />
      <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
      <stop offset="100%" stopColor="#065F46" stopOpacity="1" />
    </linearGradient>
  </defs>
</svg>

        
        <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="w-full max-w-3xl"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter text-left">
              <span className="text-black">Why this</span>
              <br />
              <span className="text-black">test is</span>
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-green-900">
                  important ?
                </span>
                
                <motion.svg
                  className="absolute -bottom-4 left-0 w-full h-5"
                  viewBox="0 0 300 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                >
                  <motion.path
                    d="M 0 5 Q 150 10 300 5"
                    stroke="#00452eff"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>

                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
                  className="absolute -right-2 -top-2 w-3 h-3 bg-green-900 rounded-full"
                />

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                  className="absolute -right-6 top-1 w-2 h-2 bg-green-900 rounded-full"
                />
              </span>
            </h1>
          </motion.div>

        
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="relative"
          >
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg z-20"
            >
               Note
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[40px] shadow-[0_40px_80px_rgba(6,95,70,0.12)] p-10 md:p-12 border border-emerald-100/50 relative overflow-hidden"
            >
              
             
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-2xl opacity-30" />

              <div className="relative z-10 space-y-8">
                
                
                <div className="flex items-center gap-4 pb-6 border-b border-emerald-100">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    N
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-black text-[#065F46]">Medical Advice</h2>
                  </div>
                </div>

              
                <div className="space-y-5 text-zinc-700 text-base leading-relaxed">
                  <p>
                    This test is essential to{" "}
                    <span className="text-[#065F46] font-bold relative">
                      accurately evaluate
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-emerald-200 -z-10"></span>
                    </span>{" "}
                    your health condition and detect early signs.
                  </p>

                  <p>
                    By analyzing key health indicators, we can make informed decisions.
                  </p>

                  <p>
                    Detection is the key to managing health effectively and living a longer, healthier life.
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-5 rounded-2xl border-l-4 border-emerald-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 text-6xl text-emerald-200 opacity-50">"</div>
                    <p className="italic text-emerald-800 font-medium relative z-10">
                      "Early diagnosis improves prevention and ensures a better quality of life."
                    </p>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>
      
    </main>
  );
}