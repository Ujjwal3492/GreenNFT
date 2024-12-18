import mainimg from './back.jpg';

function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${mainimg})`, // Use the imported image
        backgroundSize: 'cover',           // Ensures the image covers the container
        backgroundRepeat: 'no-repeat',     // Prevents repetition
        backgroundPosition: 'center',      // Centers the image
        height: '100vh',                   // Ensures the section takes the full viewport height
        width: '100%',                     // Ensures full width
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-4 md:px-10">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Making Trees Count in the Digital Age
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Turn every tree planting into a digital certificate of commitment to
          the environment. Mint NFTs to track your impact and inspire others.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition duration-300">
            Get Started
          </button>
          <button className="border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-green-600 shadow-lg transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
