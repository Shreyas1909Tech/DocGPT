
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-xl">D</span>
          </div>
          <span className="text-xl font-medium">DocGPT</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/compare" active={location.pathname === "/compare"}>Compare</NavLink>
          <NavLink to="/encode-decode" active={location.pathname === "/encode-decode"}>Encode/Decode</NavLink>
          <NavLink to="/translate" active={location.pathname === "/translate"}>Translate</NavLink>
          <NavLink to="/qa" active={location.pathname === "/qa"}>Q&A</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-primary px-5 py-2 rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/20 button-shine">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link
    to={to}
    className={`relative font-medium transition-colors hover:text-primary ${
      active ? "text-primary" : "text-foreground/70"
    }`}
  >
    {children}
    {active && (
      <motion.span
        layoutId="underline"
        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary rounded-full"
      />
    )}
  </Link>
);

export default Header;
