export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">KangFoto</h1>
                <ul className="hidden md:flex gap-8 text-gray-300">
                    <li><a href="#pricelist" className="hover:text-purple-400 transition">Price List</a></li>
                    <li><a href="#team" className="hover:text-purple-400 transition">Teams</a></li>
                    <li><a href="#portfolio" className="hover:text-purple-400 transition">Portfolio</a></li>
                    <li><a href="#about" className="hover:text-purple-400 transition">About</a></li>
                    <li><a href="#contact" className="hover:text-purple-400 transition">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}