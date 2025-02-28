import React, { useEffect, useState } from "react";
import { fetchContacts, deleteContact } from "../api/contactsApi";
import {
  FaTrash,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchContacts();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        loadContacts();
      } catch (err) {
        console.error("Failed to delete contact:", err);
        setError("Failed to delete contact. Please try again.");
      }
    }
  };

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerSearch) ||
        contact.email.toLowerCase().includes(lowerSearch) ||
        (contact.phone && contact.phone.includes(lowerSearch))
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleSort = () => {
    const sorted = [...filteredContacts].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredContacts(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading)
    return <div className="text-center p-4">Loading contacts...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-white bg-gradient-to-r from-blue-500 to-purple-600 py-4 text-center rounded-md shadow-lg">
        Contact Management
      </h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/new")}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Contact
        </button>

        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full md:w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSort}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 shadow-md transition"
        >
          Sort {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition duration-200`}
              >
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                <td className="px-4 py-3 text-gray-600">
                  {contact.phone || "N/A"}
                </td>
                <td className="px-4 py-3 text-right flex gap-2 justify-end">
                  <button
                    onClick={() => navigate(`/edit/${contact.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-2 shadow-md transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2 shadow-md transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredContacts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
