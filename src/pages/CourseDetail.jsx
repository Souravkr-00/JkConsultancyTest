import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Book, Briefcase, Award, Clock, DollarSign, TrendingUp, Map } from 'lucide-react';

// This would be imported from your data file in a real application
// Here I'm importing it directly from a hypothetical courses.js file
// You would replace this with your actual data import
import coursesData from "../data/coursesData.json"

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    // Find the course with the matching slug
    const foundCourse = coursesData.find(c => c.slug === slug);
    
    if (foundCourse) {
      setCourse(foundCourse);
      document.title = `${foundCourse.name} Programs | Course Details`;
    }
    
    // Add a small delay to show loading animation
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading course information...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Course Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">We couldn't find the course you're looking for.</p>
        <Link to="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <ArrowLeft className="mr-2" size={18} />
          Back to Courses
        </Link>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="prose max-w-none lg:prose-lg"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{course.longDescription}</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Why Study {course.name}?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whyStudyThis.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      
      case 'careers':
        return (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Career Paths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.careerPaths.map((career, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <Briefcase className="text-blue-600 mb-3" size={24} />
                    <h4 className="font-medium text-gray-800">{career}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Trending Subfields</h3>
              <div className="flex flex-wrap gap-3">
                {course.trendingSubfields.map((field, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full flex items-center">
                    <TrendingUp size={16} className="mr-2" />
                    {field}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 'requirements':
        return (
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Requirements</h3>
              <p className="text-gray-700">{course.requirements.academic}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Required Skills</h3>
              <p className="text-gray-700">{course.requirements.skills}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Other Requirements</h3>
              <p className="text-gray-700">{course.requirements.others}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex">
                <div className="mr-4 bg-blue-100 rounded-full p-3">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Program Duration</h4>
                  <p className="text-gray-700">{course.averageDuration}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex">
                <div className="mr-4 bg-blue-100 rounded-full p-3">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Typical Cost Range</h4>
                  <p className="text-gray-700">{course.costRange}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'destinations':
        return (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 variants={fadeIn} className="text-xl font-semibold text-gray-800 mb-6">Top Study Destinations</motion.h3>
            
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {course.topDestinations.map((destination, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="h-32 bg-blue-600 flex items-center justify-center">
                    <Globe className="text-white" size={48} />
                  </div>
                  <div className="p-5">
                    <h4 className="font-medium text-lg text-gray-800">{destination}</h4>
                    <Link to={`/destinations/${destination.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 flex items-center mt-2 text-sm">
                      Learn more about studying in {destination}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-blue-700 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <Link to="/courses" className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to All Courses
              </Link>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                {course.name} Programs
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-blue-100 max-w-2xl"
              >
                {course.shortDescription}
              </motion.p>
            </div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex-shrink-0 bg-white rounded-full p-3 shadow-lg"
            >
              <Book size={48} className="text-blue-600" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="flex flex-col items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
            <Clock className="text-blue-600 mb-3" size={24} />
            <h3 className="text-gray-500 text-sm font-medium mb-1">Duration</h3>
            <p className="text-lg font-semibold text-gray-800 text-center">{course.averageDuration}</p>
          </div>
          
          <div className="flex flex-col items-center p-4 border-b md:border-b-0 lg:border-r border-gray-200">
            <DollarSign className="text-blue-600 mb-3" size={24} />
            <h3 className="text-gray-500 text-sm font-medium mb-1">Cost Range</h3>
            <p className="text-lg font-semibold text-gray-800 text-center">{course.costRange}</p>
          </div>
          
          <div className="flex flex-col items-center p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
            <Map className="text-blue-600 mb-3" size={24} />
            <h3 className="text-gray-500 text-sm font-medium mb-1">Top Destinations</h3>
            <p className="text-lg font-semibold text-gray-800 text-center">{course.topDestinations.slice(0, 3).join(', ')}</p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <Award className="text-blue-600 mb-3" size={24} />
            <h3 className="text-gray-500 text-sm font-medium mb-1">Popular Specializations</h3>
            <p className="text-lg font-semibold text-gray-800 text-center">{course.popularSpecializations.length} options</p>
          </div>
        </motion.div>
        
        {/* Tabs Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 border-b border-gray-200"
        >
          <nav className="flex flex-wrap -mb-px">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'careers', label: 'Careers' },
              { id: 'requirements', label: 'Requirements' },
              { id: 'destinations', label: 'Study Destinations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-4 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>
        
        {/* Tab Content */}
        <div className="py-6">
          {renderTabContent()}
        </div>
        
        {/* Specializations Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Specializations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.popularSpecializations.map((specialization, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{specialization}</h3>
                  <p className="text-gray-600 mb-4">
                    Specialized program focusing on {specialization.toLowerCase()} theory and practice.
                  </p>
                  <Link 
                    to={`/specialization/${course.slug}/${specialization.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 inline-flex items-center"
                  >
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-gray-900 text-white mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ready to start your education journey?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300">
                Get personalized guidance on programs, applications, and scholarships for studying {course.name.toLowerCase()}.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Contact an Advisor
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  Browse Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetail;