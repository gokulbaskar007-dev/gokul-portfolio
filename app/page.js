"use client";

import { useState } from "react";
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
import LivePreviewModal from "./components/LivePreviewModal";

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState(null);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Tools />
        <Projects onPreview={setPreviewUrl} />
        <WebsiteCheck />
        <Journey />
        <Contact />
        <Faq />
        <div style={{ height: "70px" }} />
        <Marquee flat />
      </main>
      <Footer />
      <LivePreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
    </>
  );
}
