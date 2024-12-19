import Navbar from './components/navbar/Navbar.jsx'
import Hero from './components/hero/Hero.jsx'
import VerificationSteps from './components/verification/VerificationSteps.jsx'
import Form from './components/form/Form.jsx'
import Results from './components/results/Results.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <VerificationSteps />
        <Form />
        <Results />
      </main>
    </div>
  )
}

