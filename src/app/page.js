import Navbar from './components/navbar';
import HeroSection from './components/herosection';
import WelcomeVision from './components/welcomeVision';
import Blog from './components/blog';
import YogicTechniques from './components/yogicTechniques';
import YogicLibrary from './components/yogicLibrary';
import YogicResearch from './components/yogicResearch';
import ContactUs from './components/contactUs';
import Footer from './components/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WelcomeVision />
      <Blog />
      <YogicTechniques />
      <YogicLibrary />
      <YogicResearch />
      <ContactUs />
      <Footer />
    </>
  );
}