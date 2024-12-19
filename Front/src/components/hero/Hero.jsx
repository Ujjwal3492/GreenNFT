
import Navbar from '../navbar/Navbar';
import './herocss.css'
const Hero = () => {
  return (
    <>
    <Navbar/>
    <div className="h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h1 
          className="text-4xl md:text-6xl font-bold mb-4 opacity-0"
          style={{
            animation: 'slideInFromLeft 0.6s ease-out forwards'
          }}
        >
          Revolutionizing Sustainability with NFTs
        </h1>
        
        <p 
          className="text-xl md:text-2xl mb-8 opacity-0"
          style={{
            animation: 'slideInFromLeft 0.6s ease-out 0.3s forwards'
          }}
        >
          Plant, Verify, and Tokenize — Transforming reforestation into a transparent and rewarding ecosystem.
        </p>

        <div 
          className="space-x-4 opacity-0"
          style={{
            animation: 'fadeIn 1s ease-out 1.2s forwards'
          }}
        >
          <a
            href="#"
            className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-300"
          >
            Get Started
          </a>
          <a
            href="#"
            className="inline-block bg-gray-800 bg-opacity-80 hover:bg-opacity-90 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
      </div>
      </>
  );
};

export default Hero;