import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLeadForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const submitLead = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/leads/public",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="flex-1 flex justify-center items-center">

        <form
          onSubmit={submitLead}
          className="bg-white p-8 rounded shadow w-[450px]"
        >

          <h2 className="text-2xl font-bold mb-5 text-center">
            Lead Capture Form
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded"
          >
            Submit Lead
          </button>

        </form>

      </div>

      <Footer />

    </div>

  );

}

export default PublicLeadForm;