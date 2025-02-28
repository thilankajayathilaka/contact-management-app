import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
  const navigate = useNavigate();

  return (
    <li className="flex justify-between items-center bg-white p-3 rounded shadow mb-2 border">
      <div>
        <p className="font-semibold">{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/edit/${contact.id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </li>
  );
};

export default ContactCard;
