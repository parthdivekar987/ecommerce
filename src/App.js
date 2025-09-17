import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRouters from "./Routers/AdminRouters";

// --- FIX 1: Correct the import path for your customer routes ---
// Make sure this path points to your actual customer routers file.
import CustomerRouters from "./Routers/CustomerRouters"; 


function App() {
  return (
    <>
      <Routes>
        {/* --- FIX 2: The most specific routes must come FIRST --- */}

        {/* This will now correctly handle any URL starting with /admin */}
        <Route path="/admin/*" element={<AdminRouters />} />

        {/* This will handle all OTHER URLs for your customers (homepage, products, etc.) */}
        <Route path="/*" element={<CustomerRouters />} />
      </Routes>
    </>
  );
}

export default App;