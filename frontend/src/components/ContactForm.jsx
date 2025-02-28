import React, { useState } from 'react';
import { createContact, updateContact } from '../api/contactsApi';

const ContactForm = ({ contact, onSuccess }) => {
  // Initialize form data; if editing, pre-fill with contact details.
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (contact) {
        // Update existing contact.
        await updateContact(contact.id, formData);
      } else {
        // Create a new contact.
        await createContact(formData);
      }
      onSuccess(); // Callback to refresh the list or navigate.
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Submission failed. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {contact ? 'Update' : 'Create'} Contact
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name:
          </label>
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
          <label className="block text-sm font-medium mb-1">
            Email:
          </label>
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
          <label className="block text-sm font-medium mb-1">
            Phone:
          </label>
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
          {loading ? 'Submitting...' : (contact ? 'Update' : 'Create')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
