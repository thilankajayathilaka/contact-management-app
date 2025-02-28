import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: baseURL,
});

// Fetch all contacts
export const fetchContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};

// Create a new contact
export const createContact = async (contact) => {
  const response = await api.post("/contacts", contact);
  return response.data;
};

// Update an existing contact
export const updateContact = async (id, contact) => {
  const response = await api.put(`/contacts/${id}`, contact);
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  await api.delete(`/contacts/${id}`);
};
