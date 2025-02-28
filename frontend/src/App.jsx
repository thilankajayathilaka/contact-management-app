import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ContactList = () => <div>Contact List Page (Placeholder)</div>;
const ContactForm = () => <div>Contact Form Page (Placeholder)</div>;

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/new" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
