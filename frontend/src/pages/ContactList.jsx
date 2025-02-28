import React, { useEffect, useState } from "react";
import { fetchContacts, deleteContact } from "../api/contactsApi";
import ContactCard from "../components/ContactCard";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  // Load contacts from the API
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

  useEffect(() => {
    loadContacts();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      loadContacts(); // Refresh list after deletion
    } catch (err) {
      console.error("Failed to delete contact:", err);
      setError("Failed to delete contact. Please try again.");
    }
  };

  // Search filtering
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerSearch) ||
        contact.email.toLowerCase().includes(lowerSearch)
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  // Sorting functionality
  const handleSort = () => {
    const sorted = [...filteredContacts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredContacts(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  if (loading) {
    return <div className="text-center p-4">Loading contacts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Sort Button */}
      <div className="mb-4">
        <button
          onClick={handleSort}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
