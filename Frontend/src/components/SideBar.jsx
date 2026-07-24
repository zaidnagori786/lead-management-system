import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">

        Lead CRM

      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="block hover:text-blue-400"
        >
          Dashboard
        </Link>

        <button

          onClick={logout}

          className="bg-red-600 px-4 py-2 rounded mt-6"

        >

          Logout

        </button>

      </nav>

    </div>

  );

}

export default Sidebar;