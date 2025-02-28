import React from 'react';
import ContactForm from '../components/ContactForm';

const NewContactPage = () => {
  const handleSuccess = () => {
    // For instance, redirect back to the ContactList page
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Contact</h1>
      <ContactForm onSuccess={handleSuccess} />
    </div>
  );
};

export default NewContactPage;
