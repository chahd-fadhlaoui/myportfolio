import { useState } from "react";
import { navLinks } from "../constants/index.js";
import ThemeToggle from "../components/ThemeToggle";

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a
          href={item.href}
          className="nav-link"
          onClick={onClick}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 c-space">

          {/* LOGO */}
          <a
            href="/"
            className="font-bold text-2xl"
            style={{
              background: "linear-gradient(90deg, #fe2aa2, #e563ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
             
            }}
          >
            chahd
          </a>

          {/* BUTTON MOBILE */}
          <button
            onClick={toggleMenu}
            className="sm:hidden flex"
            aria-label="Toggle menu"
            style={{
              background: "rgba(254,42,162,0.1)",
              border: "1px solid rgba(254,42,162,0.25)",
              borderRadius: "8px",
              padding: "6px",
            }}
          >
            <img
              src={isOpen ? "/assets/close.png" : "/assets/menu.png"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>

          {/* DESKTOP MENU + THEME TOGGLE */}
          <nav className="hidden sm:flex items-center gap-6">
            <NavItems />
            <ThemeToggle />
          </nav>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`nav-sidebar transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="p-5 flex flex-col gap-4">
          <NavItems onClick={closeMenu} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;