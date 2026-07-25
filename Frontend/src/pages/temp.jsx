import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function LeadDetails() {

  const { id } = useParams();

  const [lead, setLead] = useState(null);

  const [note, setNote] = useState("");

  const [members, setMembers] = useState([]);

  const [selectedMember, setSelectedMember] = useState("");

  // Get Lead Details
  const getLead = async () => {

    try {

      const res = await API.get(`/leads/${id}`);

      setLead(res.data.lead);

    } catch (err) {

      alert("Unable to load lead");

    }

  };

  // Get Members
  const getMembers = async () => {

    try {

      const res = await API.get("/auth/members");

      setMembers(res.data.members);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getLead();

    getMembers();

  }, []);

  // Add Note
  const addNote = async () => {

    if (!note) return;

    try {

      await API.post(`/leads/${id}/notes`, {
        text: note,
      });

      setNote("");

      getLead();

    } catch (err) {

      alert("Unable to add note");

    }

  };

  // Assign Lead
  const assignLead = async () => {

    if (!selectedMember) {

      return alert("Please select a member");

    }

    try {

      await API.patch(
        `/leads/${id}/assign`,
        {
          assignedTo: selectedMember,
        }
      );

      alert("Lead Assigned Successfully");

      setSelectedMember("");

      getLead();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to assign lead"
      );

    }

  };

  if (!lead) {

    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );

  }

  return (

    <div className="max-w-5xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Lead Details
      </h1>

      {/* Lead Information */}

      <div className="bg-white shadow rounded p-6">

        <p>
          <b>Name:</b> {lead.name}
        </p>

        <p>
          <b>Email:</b> {lead.email}
        </p>

        <p>
          <b>Phone:</b> {lead.phone}
        </p>

        <p>
          <b>Company:</b> {lead.company}
        </p>

        <p>
          <b>Status:</b> {lead.status}
        </p>

      {JSON.parse(localStorage.getItem("user"))?.role ===
"admin" && (

<>
  // Assign Member section here
</>

)}

        <h2 className="text-xl font-bold mb-3">

          Assign Member

        </h2>

        <select

          className="border p-2 rounded w-full"

          value={selectedMember}

          onChange={(e) =>
            setSelectedMember(e.target.value)
          }

        >

          <option value="">
            Select Member
          </option>

          {members.map((member) => (

            <option
              key={member._id}
              value={member._id}
            >

              {member.name}

            </option>

          ))}

        </select>

        <button

          onClick={assignLead}

          className="bg-blue-600 text-white px-5 py-2 rounded mt-4"

        >

          Assign Lead

        </button>

        {lead.assignedTo && (

          <p className="mt-4">

            <b>Currently Assigned To:</b>{" "}

            {lead.assignedTo.name}

          </p>

        )}

      </div>

      {/* Add Note */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">

          Add Note

        </h2>

        <textarea

          className="border w-full p-3 rounded"

          rows="4"

          value={note}

          onChange={(e) =>
            setNote(e.target.value)
          }

        />

        <button

          onClick={addNote}

          className="bg-green-600 text-white px-5 py-2 rounded mt-3"

        >

          Add Note

        </button>

      </div>

      {/* Notes */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">

          Notes

        </h2>

        {lead.notes.length === 0 ? (

          <p>No Notes</p>

        ) : (

          lead.notes.map((item, index) => (

            <div

              key={index}

              className="border rounded p-3 mb-3"

            >

              <p>{item.text}</p>

              <small>

                {new Date(
                  item.createdAt
                ).toLocaleString()}

              </small>

            </div>

          ))

        )}

      </div>

      {/* Activity Trail */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">

          Activity Trail

        </h2>

        {lead.activities.map((activity, index) => (

          <div

            key={index}

            className="border rounded p-3 mb-3"

          >

            <p>{activity.action}</p>

            <small>

              {new Date(
                activity.createdAt
              ).toLocaleString()}

            </small>

          </div>

        ))}

      </div>

    </div>

  );

}

export default LeadDetails;