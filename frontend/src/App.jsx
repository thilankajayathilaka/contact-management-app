import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./pages/ContactList";
import NewContactPage from "./pages/NewContactPage";
import EditContactPage from "./pages/EditContactPage";
function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/new" element={<NewContactPage />} />
          <Route path="/edit/:id" element={<EditContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
