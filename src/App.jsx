import Home from "./pages/Home"
import Footer from "./components/common/Footer"
import './App.css'
import Navbar from "./components/common/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Colleges from "./pages/Colleges";
import WhatsAppButton from "./components/common/WhatsAppButton";
import BookConsultancy from "./pages/BookConsultancy";
import ContactUs from "./pages/ContactUs";
import CollegeDetail from "./pages/CollegeDetail";
import StudentServicesPage from "./pages/StudentServicesPage";
import CountryPage from "./pages/CountryPage";
import AboutUs from "./pages/AboutUs";
import TestimonialsPage from "./pages/TestimonialsPage";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import ServiceDetailsPage from "./pages/ServicesDetailsPage";

function App() {
  

  return (
    <>
    <Navbar/>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges/>} />
        <Route path="/courses" element = {<Courses/>}/>
        <Route path="/bookconsult" element={<BookConsultancy/>} />
        <Route path="/about-us/contact-us" element={<ContactUs/>} />
        <Route path="/student-services" element={<StudentServicesPage/>} />
        <Route path="/about-us/our-story" element={<AboutUs/>} />
        <Route path="/about-us/testimonials" element={<TestimonialsPage/>} />

        <Route path="/colleges/college/:collegeName" element={<CollegeDetail/>} />
        <Route path="/colleges/:countrySlug" element={<CountryPage/>} />
        <Route path="/courses/:slug" element = {<CourseDetail/>}/>
        <Route path="/student-services/:serviceName" element={<ServiceDetailsPage/>} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
    <WhatsAppButton/>
    <Footer/>
      
    </>
  )
}

export default App
