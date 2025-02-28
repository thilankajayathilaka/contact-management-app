import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: baseURL,
});

// Fetch all contacts
export const fetchContacts = async () => {
  try {
    const response = await api.get("/contacts");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching contacts:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch contacts."
    );
  }
};

// Fetch a single contact by ID
export const getContact = async (id) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching contact ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch contact."
    );
  }
};

// Create a new contact
export const createContact = async (contact) => {
  try {
    const response = await api.post("/contacts", contact);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating contact:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create contact."
    );
  }
};

// Update an existing contact
export const updateContact = async (id, contact) => {
  try {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating contact ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update contact."
    );
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    await api.delete(`/contacts/${id}`);
  } catch (error) {
    console.error(
      `Error deleting contact ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to delete contact."
    );
  }
};
