import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  ChevronUp
} from 'lucide-react';
import logo from "../../assets/images/LOGO.png"; // Adjust the path as necessary

// Custom hook for intersection observer
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

const Footer = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  
  // Animation refs
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [linksRef, linksVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [newsletterRef, newsletterVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [copyrightRef, copyrightVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigationData = {
    "Countries": [
      "USA",
      "UK",
      "Russia",
      "Europe",
      "Armenia"
    ],
    "Courses": [
      "Medical",
      "Engineering",
      "Business",
      "Arts and Humanities",
      "Science",
      "Masters"
    ],
    "Student Services": [
      "Course Selection",
      "Visa Approval",
      "University Selection",
      "Loan Assistance"
    ],
    "About Us": [
      "Our Story",
      "Team",
      "Testimonials"
    ]
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div 
            ref={contactRef}
            className={`transition-all duration-500 transform ${
              contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="mb-6 w-40">
              <a href="/">
                <img src={logo || "/placeholder.svg"} alt="JK Consultancy Logo" className="w-full" />
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">South Extension II, G-25, New Delhi, Delhi 110049</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-700 mr-3 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-gray-700 hover:text-blue-700 transition-colors">
                   +91 93190 56757
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-700 mr-3 flex-shrink-0" />
                <a href="mailto:info@studyabroad.com" className="text-sm text-gray-700 hover:text-blue-700 transition-colors">
                  jkconsult.in@gmail.com
                </a>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links - Desktop: 2 columns, Mobile: 1 column */}
          <div 
            ref={linksRef}
            className={`lg:col-span-2 transition-all duration-500 delay-100 transform ${
              linksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(navigationData).slice(0, 2).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h4 className="font-medium text-blue-800 mb-3">{category}</h4>
                  <ul className="space-y-2">
                    {items.slice(0, 4).map((item) => (
                      <li key={item} className="group">
                        <a 
                          href={`/${category.toLowerCase().replace(/ /g, "-")}/${item.toLowerCase().replace(/ /g, "-")}`}
                          className="text-sm text-gray-600 hover:text-blue-700 transition-colors flex items-center"
                        >
                          <ArrowRight className="h-3 w-3 text-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-200 mr-1" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {Object.entries(navigationData).slice(2, 4).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h4 className="font-medium text-blue-800 mb-3">{category}</h4>
                  <ul className="space-y-2">
                    {items.slice(0, 4).map((item) => (
                      <li key={item} className="group">
                        <a 
                          href={`/${category.toLowerCase().replace(/ /g, "-")}/${item.toLowerCase().replace(/ /g, "-")}`}
                          className="text-sm text-gray-600 hover:text-blue-700 transition-colors flex items-center"
                        >
                          <ArrowRight className="h-3 w-3 text-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-200 mr-1" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div 
            ref={newsletterRef}
            className={`transition-all duration-500 delay-200 transform ${
              newsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for the latest updates on study abroad opportunities.</p>
            <form className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full py-2 px-4 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="p-2 text-blue-700 hover:text-blue-900 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 text-blue-700 hover:text-blue-900 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 text-blue-700 hover:text-blue-900 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 text-blue-700 hover:text-blue-900 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 text-blue-700 hover:text-blue-900 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div 
          ref={copyrightRef}
          className={`mt-12 pt-8 border-t border-gray-200 transition-all duration-500 delay-300 transform ${
            copyrightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Study Abroad Consultancy. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-700 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-sm text-gray-600 hover:text-blue-700 transition-colors">Terms of Service</a>
              <a href="/faq" className="text-sm text-gray-600 hover:text-blue-700 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={handleScrollToTop}
        className={`fixed right-6 bottom-6 bg-white p-3 rounded-full shadow-md text-blue-700 hover:bg-blue-700 hover:text-white border border-gray-200 transition-all duration-300 z-50 ${
          scrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;