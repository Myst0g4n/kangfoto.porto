import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Project from "./components/project";
import About from "./components/about";
import Team from "./components/team";
import PriceList from "./components/pricelist";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-pink-800 to-pink-900">
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Team />
      <PriceList />

      <Footer />
    </div>
  );
}
