import React from 'react';
import { BookOpen, Shield, Building, DollarSign, Gift, Home, Briefcase, Globe, GraduationCap } from 'lucide-react';

export default function StudentServices() {
  const services = [
    {
      id: 1,
      title: "Course Selection",
      description: "Get personalized guidance on choosing the right courses that align with your career goals and academic interests. Our experts analyze your profile and recommend programs that maximize your potential.",
      icon: <BookOpen size={48} />,
    },
    {
      id: 2,
      title: "Visa Approval",
      description: "Navigate the complex visa application process with our step-by-step assistance. We help with documentation preparation, interview coaching, and provide updated information on visa requirements for different countries.",
      icon: <Shield size={48} />,
    },
    {
      id: 3,
      title: "University Selection",
      description: "Find your perfect educational match from our network of over 5,000 universities worldwide. We consider factors like academic reputation, program strength, location, and career opportunities to recommend institutions that best suit your profile.",
      icon: <Building size={48} />,
    },
    {
      id: 4,
      title: "Loan Assistance",
      description: "Access affordable education financing options tailored to your needs. We connect you with trusted lenders offering competitive interest rates, flexible repayment terms, and help you understand the application process for educational loans.",
      icon: <DollarSign size={48} />,
    },
    {
      id: 5,
      title: "Scholarship Application",
      description: "Discover and apply for scholarships that can fund your education. Our scholarship database is regularly updated with opportunities from universities, governments, and private organizations worldwide. We assist with application essays and requirements.",
      icon: <Gift size={48} />,
    },
    {
      id: 6,
      title: "Accommodation Support",
      description: "Find safe and affordable housing options near your university. We provide information on on-campus dormitories, off-campus apartments, homestays, and shared accommodations, helping you make informed decisions about your living arrangements.",
      icon: <Home size={48} />,
    },
    {
      id: 7,
      title: "Career Counseling",
      description: "Plan your future with expert career guidance. Our counselors help you identify your strengths, explore career paths aligned with your academic background, develop job search strategies, and prepare for internships and employment opportunities.",
      icon: <Briefcase size={48} />,
    },
    {
      id: 8,
      title: "Language Support",
      description: "Improve your language proficiency for academic success. We offer preparation courses for IELTS, TOEFL, and other language tests, as well as ongoing language tutoring to help you excel in your studies and adapt to a new linguistic environment.",
      icon: <Globe size={48} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-0 w-60 h-60 bg-indigo-300 rounded-full blur-3xl transform translate-x-1/3"></div>
          <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6">
                For Students Worldwide
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Unlock Your <span className="text-indigo-200">Global</span> Education Potential
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-lg mx-auto lg:mx-0">
                Comprehensive support services designed to guide students through every step of their international education journey.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 bg-white text-indigo-700 rounded-lg font-semibold shadow-lg hover:bg-indigo-50 transition-colors duration-300">
                  Explore Services
                </button>
                <button className="px-8 py-3 border-2 border-indigo-200 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
                  Book Consultation
                </button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-white">5000+</p>
                  <p className="text-indigo-200">Universities</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">98%</p>
                  <p className="text-indigo-200">Success Rate</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-3xl font-bold text-white">120+</p>
                  <p className="text-indigo-200">Countries</p>
                </div>
              </div>
            </div>
            
            {/* Right Content - Image/Illustration */}
            <div className="lg:w-1/2 flex justify-center items-center">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-lg rotate-12 opacity-70"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-pink-500 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -right-4 w-8 h-8 bg-green-400 rounded-lg rotate-45 opacity-70"></div>
                
                {/* Main Visual */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <GraduationCap size={50} className="text-indigo-100" />
                      <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Globe size={24} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="w-full h-3 bg-indigo-200 bg-opacity-30 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-indigo-300"></div>
                      </div>
                      <div className="w-full h-3 bg-indigo-200 bg-opacity-30 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-purple-300"></div>
                      </div>
                      <div className="w-full h-3 bg-indigo-200 bg-opacity-30 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-blue-300"></div>
                      </div>
                      
                      <p className="text-lg font-medium text-white">Your Educational Journey</p>
                      <p className="text-indigo-200">Guidance at every step</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Heading */}
      <div className="bg-white py-12 border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Student Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive support designed to help you navigate every aspect of your educational journey
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="bg-gray-100 p-6 flex justify-center items-center">
                <div className="text-indigo-600">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                <button 
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Student Services Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}