import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion"; 
import MobileMenu from "./MobileMenu"; 
import "../App.css"

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm font-medium transition
     ${isActive
       ? "text-emerald-500"
       : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"}`;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit">
      <nav className="relative flex items-center gap-8 px-10 py-3 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg border border-black/5 dark:border-white/10">
        
        <div className="hidden xl:flex items-center gap-8">
            <NavLink to="/" onClick={() => scrollTo('home')} className={linkClass({isActive:false})}>Home</NavLink>
            <NavLink to="/" onClick={() => scrollTo('informations')} className={linkClass({isActive:false})}>Informations</NavLink>
            <NavLink to="/test" className="ml-4 px-6 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition shadow-md">
                Diabetes Test
            </NavLink>
        </div>

        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setNavOpen(!navOpen)}
          className="xl:hidden flex items-center justify-center p-2 rounded-xl text-zinc-800 dark:text-zinc-200"
        >
          
          <motion.span 
            animate={{ rotate: navOpen ? 90 : 0 }}
            className="text-2xl"
          >
            {navOpen ? "✕" : "☰"}
          </motion.span>
        </motion.button>

        <MobileMenu 
          isOpen={navOpen} 
          setIsOpen={setNavOpen} 
          scrollTo={scrollTo} 
        />

      </nav>
    </header>
  );
}