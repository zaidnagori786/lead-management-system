import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Lead Manager
      </h1>

      <div className="space-x-5">
        <Link to="/">Public Form</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/login">Login</Link>
      </div>

    </nav>
  );
}

export default Navbar;