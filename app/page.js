import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Statement from "./components/Statement";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import WebsiteCheck from "./components/WebsiteCheck";
import Journey from "./components/Journey";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import { clients, toolkit } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee items={clients} label="Brands I've built for" />
        <Statement />
        <Services />
        <Work />
        <Marquee items={toolkit} reverse variant="marquee--big" label="My toolkit" />
        <Process />
        <WebsiteCheck />
        <Journey />
        <Faq />
      </main>
      <Contact />
    </>
  );
}
