import { BrowserRouter, Routes, Route } from "react-router";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // The file we just created
import TermsOfService from "./pages/TermsOfService";
import Home from "./pages/Home.tsx";
import Contact from "./pages/Contact.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Set the path to /privacy to match your footer link */}
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
