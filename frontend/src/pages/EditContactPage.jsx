import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../api/contactsApi";
import Notification from "../components/Notification";

const EditContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const contact = await getContact(id);
        setFormData(contact);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
        setError("⚠ Unable to fetch contact details.");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form input before submission
  const validateForm = () => {
    if (!formData.name.trim()) {
      return "⚠ Name is required.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "⚠ Please enter a valid email address.";
    }
    if (!/^\d+$/.test(formData.phone)) {
      return "⚠ Phone number must contain only digits.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    // Perform frontend validation before hitting API
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      console.log("Updating Contact Data:", formData);

      const { id, createdAt: _, ...updatedData } = formData;

      await updateContact(id, updatedData);
      setSuccessMessage("✅ Contact updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Failed to update contact:", err);

      if (err.response && err.response.data.message) {
        if (Array.isArray(err.response.data.message)) {
          // If the response is an array (multiple errors), join them
          setError(err.response.data.message.join("\n"));
        } else {
          setError(`⚠ ${err.response.data.message}`);
        }
      } else {
        setError("⚠ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>

      {/* Notifications */}
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
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;
