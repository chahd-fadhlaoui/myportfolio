import { memo } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Experience from './sections/Experience';
import StarField from './components/Starfield';

const App = () => {
  return (
    
   <main className='max-w-7xl mx-auto'>
          <StarField />   

    <Navbar/>
    <Hero/>
    <About/>
    <Projects/>
    <Experience/>
    <Contact/>
    <Footer/>
    </main>
  );
};

export default App;