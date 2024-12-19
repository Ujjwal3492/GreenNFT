export default function Results() {
    const results = [
      { name: "Product A", status: "Verified", score: 95 },
      { name: "Product B", status: "Pending", score: null },
      { name: "Product C", status: "Not Verified", score: 60 },
    ]
  
    return (
      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12">Verification Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
              <p className={`text-lg ${result.status === 'Verified' ? 'text-green-600' : result.status === 'Not Verified' ? 'text-red-600' : 'text-yellow-600'} font-semibold`}>
                {result.status}
              </p>
              {result.score !== null && (
                <p className="mt-2">Eco Score: <span className="font-semibold">{result.score}/100</span></p>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  