import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";


const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
};

export default function MobileMenu({ isOpen, setIsOpen, scrollTo }) {
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="absolute top-20 left-1/2 -translate-x-1/2 w-64 xl:hidden"
    >
      <motion.ul
        className="flex flex-col items-center gap-6 py-8 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden"
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 20px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.5,
              delayChildren: 0.2,
              staggerChildren: 0.1
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 20px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li variants={itemVariants}>
          <NavLink to="/"
            onClick={() => { scrollTo('home'); setIsOpen(false); }}
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-emerald-500 transition"
          >
            Home
          </NavLink>
        </motion.li>

        <motion.li variants={itemVariants}>
          <NavLink to="/"
            onClick={() => { scrollTo('informations'); setIsOpen(false); }}
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-emerald-500 transition"
          >
            Informations
          </NavLink>
        </motion.li>

        <motion.li variants={itemVariants} className="pt-2">
          <NavLink
            to="/test"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition shadow-md block"
          >
            Diabetes Test
          </NavLink>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
}