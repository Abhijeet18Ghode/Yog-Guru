import Navbar from './components/navbar';
import HeroSection from './components/herosection';
import ContactUs from './components/contactUs';
import BookSession from './components/bookSession';
import Blog from './components/blog';
import Footer from './components/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Blog />
      <BookSession />
      <ContactUs />
      <Footer />
    </>
  );
}