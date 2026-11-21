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
        <div className="flex justify-between items-center py-4 c-space">

          {/* LOGO */}
          <a href="/" className="brand-mark" aria-label="Home">
            chahd
          </a>

          {/* BUTTON MOBILE */}
          <button
            onClick={toggleMenu}
            className="nav-toggle sm:hidden flex"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <img
              src={isOpen ? "/assets/close.png" : "/assets/menu.png"}
              alt=""
              className="w-6 h-6"
            />
          </button>

          {/* DESKTOP MENU + THEME TOGGLE */}
          <nav className="nav-desktop hidden sm:flex items-center gap-4" aria-label="Primary">
            <NavItems />
            <span className="nav-sep" aria-hidden="true" />
            <ThemeToggle />
          </nav>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`nav-sidebar transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="nav-mobile p-5 flex flex-col gap-4" aria-label="Mobile">
          <NavItems onClick={closeMenu} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;