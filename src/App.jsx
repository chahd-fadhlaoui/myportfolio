import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StarField from './components/Starfield';

const App = () => {
  return (
    // <main> is now full-width. The old `max-w-7xl mx-auto` here was what
    // capped the Hero to ~1280px; it now lives on a wrapper around the
    // other sections only, so they keep exactly the same layout as before.
    <main className="w-full overflow-x-clip">
      <StarField />
      <Navbar />

      <Hero />

      <div className="max-w-7xl mx-auto">
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default App;