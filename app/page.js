import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import About from "./components/About";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import WebsiteCheck from "./components/WebsiteCheck";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Tools />
        <Projects />
        <WebsiteCheck />
        <Journey />
        <Contact />
        <Faq />
        <div style={{ height: "70px" }} />
        <Marquee flat />
      </main>
      <Footer />
    </>
  );
}
