import React from "react";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <p className="font-semibold">{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.email}</p>
      </div>
      <button
        onClick={() => onDelete(contact.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default ContactCard;
