import React from "react";
import { FaTimes } from "react-icons/fa";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor =
    type === "error"
      ? "bg-red-100 text-red-600 border-red-400"
      : "bg-green-100 text-green-600 border-green-400";

  return (
    <div
      className={`p-3 mb-4 border rounded ${bgColor} flex justify-between items-center`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-lg font-bold">
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;
