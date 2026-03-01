import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
function App() {
  const [pair, setPair] = useState("XAU/USD");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl=import.meta.env.VITE_API_URL
  const createAlert = async () => {
    if (!price) return alert("Enter alert price");

    setLoading(true);

    try {
   const response=   await axios.post(`${baseUrl}/create-alert`, {
        pair,
        price,
      });

         if (response.status === 200) {
      toast.success("Alert created successfully 🚀");
      setPrice("");
    } 
    } catch (err) {
        toast.error("Server Error");
      setPrice("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-6">
        
  <ToastContainer position="top-right" autoClose={3000} />

        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Forex Price Alert
        </h1>

        {/* Pair Select */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm">Select Pair</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white focus:outline-none"
          >
            <option>XAU/USD</option>
            <option>EUR/USD</option>
            <option>GBP/USD</option>
            <option>USD/JPY</option>
            <option>BTC/USD</option>
          </select>
        </div>

        {/* Price Input */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm">Alert Price</label>
          <input
            type="number"
            placeholder="Enter price (example: 5200)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={createAlert}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition"
        >
          {loading ? "Creating..." : "Create Alert"}
        </button>

        {/* Info Box */}
        <div className="mt-6 text-sm text-gray-400 text-center">
          Get notified instantly when the market hits your level.
        </div>
      </div>
    </div>
  );
}

export default App;