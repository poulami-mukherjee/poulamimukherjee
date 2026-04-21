import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import SelectedWork from "@/components/sections/SelectedWork";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import GitHubSection from "@/components/sections/GitHubSection";
import AskPoulami from "@/components/sections/AskPoulami";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problems />
      <SelectedWork />
      <Services />
      <Testimonials />
      <About />
      <GitHubSection />
      <Contact />
      <AskPoulami />
    </main>
  );
}
