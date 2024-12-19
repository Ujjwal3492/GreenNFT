

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="#" className="font-sans text-2xl font-bold text-green-600">EcoVerify</a>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="font-sans text-lg font-medium text-gray-700 hover:text-green-600">Home</a>
            <a href="#" className="font-sans text-lg font-medium text-gray-700 hover:text-green-600">About</a>
            <a href="#" className="font-sans text-lg font-medium text-gray-700 hover:text-green-600">Services</a>
            <a href="#" className="font-sans text-lg font-medium text-gray-700 hover:text-green-600">Contact</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">About</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Services</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</a>
        </div>
      )}
    </nav>
  )
}

