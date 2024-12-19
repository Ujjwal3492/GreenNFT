export default function Form() {
    return (
      <section className="my-16">
        <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Product</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input type="text" id="productName" name="productName" className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent" required />
            </div>
            <div className="mb-4">
              <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">Product Description</label>
              <textarea id="productDescription" name="productDescription" rows={4} className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent" required></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="productCategory" className="block text-gray-700 text-sm font-bold mb-2">Product Category</label>
              <select id="productCategory" name="productCategory" className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent" required>
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Submit for Verification</button>
          </form>
        </div>
      </section>
    )
  }
  
  