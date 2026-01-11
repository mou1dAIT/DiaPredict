import { motion } from "framer-motion";
import { FaCheckCircle, FaDatabase, FaClock, FaHeart } from "react-icons/fa";

export default function Partie3() {
  const cards = [
    {
      icon: <FaCheckCircle size={32} />,
      title: "High Accuracy",
      description: "Our model achieves 95% accuracy in predicting diabetes risk."
    },
    {
      icon: <FaDatabase size={32} />,
      title: "Reliable Data",
      description: "Based on a Kaggle dataset of 100,000 people, including diverse health profiles."
    },
    {
      icon: <FaClock size={32} />,
      title: "Quick & Easy",
      description: "Complete the test in under 5 minutes with simple, easy-to-understand questions."
    },
    {
      icon: <FaHeart size={32} />,
      title: "Preventive Impact",
      description: "Early detection helps prevent complications and improve health outcomes."
    },
  ];

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="informations" className="py-24 bg-[#FAF7F2] px-8 md:px-16 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
          Why trust our <span className="text-[#065F46]">Analysis?</span>
        </h2>
        <div className="h-1.5 w-24 bg-[#34FFC8] mx-auto rounded-full" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-start"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 40px rgba(6, 95, 70, 0.08)"
            }}
            
            className={`group bg-white rounded-[32px] p-8 flex flex-col items-center text-center border border-emerald-50/50 transition-all duration-300 
              ${(index === 1 || index === 2) ? "lg:mt-16" : ""}`}
          >
           
            <div className="mb-6 w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#065F46] group-hover:bg-[#065F46] group-hover:text-[#34FFC8] transition-colors duration-300">
              {card.icon}
            </div>
            
            <h3 className="text-xl font-extrabold text-[#065F46] mb-3 leading-tight">
              {card.title}
            </h3>
            
            <p className="text-zinc-500 leading-relaxed text-sm">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}