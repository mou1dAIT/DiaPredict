import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../App.css';

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm font-medium transition
     ${isActive
       ? "text-emerald-500"
       : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"}`;

  
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit">
      <nav className="relative flex items-center gap-8 px-10 py-3 rounded-full
        bg-white/70 dark:bg-zinc-900/70
        backdrop-blur-md shadow-lg border border-black/5 dark:border-white/10">

       
        <div className="hidden xl:flex items-center gap-8">
            <NavLink to="/">
          <button onClick={() => scrollTo('home')} className={linkClass({isActive:false})}>
            Home
          </button>
          </NavLink>

            <NavLink to="/">
          <button onClick={() => scrollTo('informations')} className={linkClass({isActive:false})}>
            Informations
          </button>
          </NavLink>

          <NavLink
            to="/test"
            className="ml-4 px-6 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition shadow-md"
          >
            Diabetes Test
          </NavLink>
        </div>

        
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="xl:hidden text-4xl text-zinc-100 dark:text-zinc-200"
        >
          ☰
        </button>

        <div
          className={`absolute xl:hidden top-20 left-1/2 -translate-x-1/2
          w-64 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl
          flex flex-col items-center gap-6 py-6
          transition-all duration-300
          ${navOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        >
          <button onClick={() => { scrollTo('home'); setNavOpen(false); }} className={linkClass({isActive:false})}>
            Home
          </button>

          <button onClick={() => { scrollTo('informations'); setNavOpen(false); }} className={linkClass({isActive:false})}>
            Informations
          </button>

          <NavLink
            to="/test"
            onClick={() => setNavOpen(false)}
            className="px-6 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition shadow-md"
          >
            Diabetes Test
          </NavLink>
        </div>

      </nav>
    </header>
  );
}
