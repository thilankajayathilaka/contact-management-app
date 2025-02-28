import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./pages/ContactList";

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
