import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Project from "./components/project";
import About from "./components/about";
import Team from "./components/team";
import PriceList from "./components/pricelist";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Team />
      <PriceList /> 

      {/* Footer */}
      <footer className="bg-black/50 border-t border-purple-500/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2019 KangFoto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
