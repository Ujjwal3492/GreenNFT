export default function Hero() {
  return (
    <div className="h-screen bg-cover bg-center relative" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Eco-Friendly Verification</h1>
        <p className="text-xl md:text-2xl mb-8">Ensure your products meet green standards</p>
        <div className="space-x-4">
          <a href="#" className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-300">Get Started</a>
          <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-300">Learn More</a>
        </div>
      </div>
    </div>
  )
}

