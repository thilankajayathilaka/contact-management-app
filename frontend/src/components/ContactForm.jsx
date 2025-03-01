import React, { useState } from "react";
import { createContact, updateContact } from "../api/contactsApi";
import Notification from "../components/Notification";

const ContactForm = ({ contact, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Real-time validation on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear errors when user starts typing
  };

  // Validate form input before submission
  const validateForm = () => {
    if (!formData.name.trim()) {
      return "⚠ Name is required.";
    }

    // Strict Email Validation based on RFC 5322 (practical version)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      return "⚠ Please enter a valid email address.";
    }

    // Phone number validation: 7-15 digits only
    if (!/^\d{7,15}$/.test(formData.phone)) {
      return "⚠ Phone number must contain only digits and be between 7 to 15 characters long.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      if (contact) {
        await updateContact(contact.id, formData);
        setSuccessMessage("✅ Contact updated successfully!");
      } else {
        await createContact(formData);
        setSuccessMessage("✅ Contact created successfully!");
      }

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(`⚠ ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {contact ? "Update" : "Create"} Contact
      </h2>

      {/* ✅ Error & Success Notifications */}
      <Notification
        message={error}
        type="error"
        onClose={() => setError(null)}
      />
      <Notification
        message={successMessage}
        type="success"
        onClose={() => setSuccessMessage("")}
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : contact ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
