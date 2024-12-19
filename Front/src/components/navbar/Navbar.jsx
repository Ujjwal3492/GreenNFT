import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-black bg-opacity-50 backdrop-blur-sm shadow-md z-10 w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-sans text-2xl font-bold text-gradient hover:scale-105 transition duration-300 text-white">
            GreenNFT
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/some" className="font-sans text-lg font-medium text-white hover:text-green-300 transition duration-300">
              Home
            </Link>
            <a href="#" className="font-sans text-lg font-medium text-white hover:text-green-300 transition duration-300">
              About
            </a>
            <a href="#" className="font-sans text-lg font-medium text-white hover:text-green-300 transition duration-300">
              Services
            </a>
            <a href="#" className="font-sans text-lg font-medium text-white hover:text-green-300 transition duration-300">
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-80 backdrop-blur-sm">
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Home</a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">About</a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Services</a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Contact</a>
        </div>
      )}
    </nav>
  );
}
