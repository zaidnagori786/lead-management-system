import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getLeads = async () => {

    try {

      const res = await API.get(
        `/leads?page=${page}&search=${search}&status=${status}`
      );

      setLeads(res.data.leads);
      setTotalPages(res.data.totalPages);

    } catch (err) {

      console.log(err);
      alert("Unable to fetch leads");

    }

    setLoading(false);

  };

  const updateStatus = async (id, status) => {

    try {

      await API.patch(`/leads/${id}/status`, {
        status,
      });

      getLeads();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to update status"
      );

    }

  };

  useEffect(() => {

    getLeads();

  }, [page, search, status]);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading...
      </h2>
    );
  }

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Lead Dashboard
        </h1>

        {/* Search & Filter */}

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded w-72"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >

            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>

          </select>

        </div>

        <table className="w-full border border-gray-300">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Company</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Assigned</th>
              <th className="border p-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr key={lead._id}>

                <td className="border p-3">{lead.name}</td>

                <td className="border p-3">{lead.email}</td>

                <td className="border p-3">{lead.phone}</td>

                <td className="border p-3">{lead.company}</td>

                <td className="border p-3">

                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(
                        lead._id,
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  >

                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>

                  </select>

                </td>

                <td className="border p-3">

                  {lead.assignedTo
                    ? lead.assignedTo.name
                    : "Not Assigned"}

                </td>

                <td className="border p-3">

                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/lead/${lead._id}`)}
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-center gap-5 mt-8">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-700 text-white px-5 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white px-5 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;