import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {

        email,

        password,

      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <div className="flex-1 flex justify-center items-center">

        <form
          onSubmit={loginUser}
          className="bg-white p-8 rounded shadow w-96"
        >

          <h2 className="text-2xl font-bold mb-5">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded"
          >
            Login
          </button>

        </form>

      </div>

      <Footer />

    </div>

  );

}

export default Login;