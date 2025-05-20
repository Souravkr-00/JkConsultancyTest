import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';
import logo from "../../assets/images/LOGO.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    if (isDropdownOpen === dropdown) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(dropdown);
    }
  };
  
  const toggleMobileAccordion = (category) => {
    if (mobileAccordion === category) {
      setMobileAccordion(null);
    } else {
      setMobileAccordion(category);
    }
  };

  const navigationData = {
    "Colleges": [
      "Russia",
      "Armenia",
      "Georgia",
      "Europe",
      "Kazakhstan",
      "Uzbekistan",
      "Kyrgyzstan",
      "Nepal",
      "Vietnam",
      "Bangladesh",
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
      "Testimonials",
      "Contact Us",
    ]
  };

  // Display names for the navigation items
  const navDisplayNames = {
    "Colleges": "Study Abroad",
    "Courses": "Courses",
    "Student Services": "Student Services",
    "About Us": "About Us"
  };

  return (
    <nav className={`relative shadow-md top-0 w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'py-3' : 'py-4'}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex-shrink-0 w-36 md:w-70">
            <a href='/'>
              <img src={logo || "/placeholder.svg"} alt="JK Consultancy Logo" className="w-full" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {Object.keys(navigationData).map((category) => (
              <div key={category} className="relative dropdown-container">
                <button 
                  className={`flex items-center text-gray-800 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-all duration-200 ${
                    isDropdownOpen === category ? 'text-blue-600' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(category);
                  }}
                >
                  {navDisplayNames[category]} 
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen === category ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isDropdownOpen === category && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-100 p-3 z-20">
                    <h3 className="font-medium text-sm text-gray-700 mb-2 border-b border-gray-100 pb-1">{category}</h3>
                    <ul className="space-y-1">
                      {navigationData[category].map((item) => (
                        <li key={item}>
                          <a 
                            href={`/${category.toLowerCase().replace(/ /g, "-")}/${item.toLowerCase().replace(/ /g, "-")}`} 
                            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded p-2 transition-all duration-200"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                      <li className="pt-1 mt-1 border-t border-gray-100">
                        <a 
                          href={`/${category.toLowerCase().replace(/ /g, "-")}`}
                          className="block text-sm text-blue-600 hover:text-blue-700 font-medium p-2"
                        >
                          View all {category}
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Book Appointment Button */}
          <div className="hidden md:block">
            <a href='/bookconsult'>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200">
                Book Consult
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Clean slide from right */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 transition-all duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="w-32">
              <a href='/'>
                <img src={logo || "/placeholder.svg"} alt="JK Consultancy Logo" className="w-full" />
              </a>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-2">
            {/* Simple Mobile Accordion Menu */}
            {Object.keys(navigationData).map((category) => (
              <div key={category} className="border-b border-gray-100 last:border-b-0">
                <button 
                  className="w-full flex items-center justify-between py-3 px-1 text-left focus:outline-none"
                  onClick={() => toggleMobileAccordion(category)}
                >
                  <span className="text-sm font-medium text-gray-800">{navDisplayNames[category]}</span>
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      mobileAccordion === category ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div 
                  className={`transition-all duration-200 ease-in-out overflow-hidden ${
                    mobileAccordion === category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="py-2 px-2 space-y-1">
                    {navigationData[category].map((item) => (
                      <li key={item}>
                        <a
                          href={`/${category.toLowerCase().replace(/ /g, "-")}/${item.toLowerCase().replace(/ /g, "-")}`}
                          className="block text-sm text-gray-600 hover:text-blue-600 py-2 px-3 rounded transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                    <li className="pt-1">
                      <a
                        href={`/${category.toLowerCase().replace(/ /g, "-")}`}
                        className="block text-sm text-blue-600 font-medium py-2 px-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        View all {category}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Book Appointment Button */}
          <div className="mt-6">
            <a href='/appointmentbooking'>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-3 text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Consult
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
