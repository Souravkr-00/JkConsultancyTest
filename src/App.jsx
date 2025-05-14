import Home from "./pages/Home"
import Footer from "./components/common/Footer"
import './App.css'
import Navbar from "./components/common/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Colleges from "./pages/Colleges";
import WhatsAppButton from "./components/common/WhatsAppButton";
import BookConsultancy from "./pages/BookConsultancy";
import ContactUs from "./pages/ContactUs";

function App() {
  

  return (
    <>
    <Navbar/>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges/>} />
        <Route path="/bookconsult" element={<BookConsultancy/>} />
        <Route path="/about-us/contact-us" element={<ContactUs/>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
    <WhatsAppButton/>
    <Footer/>
      
    </>
  )
}

export default App
