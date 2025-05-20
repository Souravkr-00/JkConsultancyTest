import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Book, School, FileCheck, CreditCard, Home, Globe } from 'lucide-react';
import countriesData from "../data/countriesData.json";
import CountryCollegeCarousel from '../components/collegesPage/CountryCollegeCarousel';
// This would typically be fetched from an API or imported
// For this example, we'll use a mock fetch function


const CountryPage = () => {
  const { countrySlug } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        setLoading(true);
        const data = countriesData;
        const countryData = data.filter(c => c.slug === countrySlug)[0];
        console.log(countrySlug);
        
        console.log(countriesData);
        console.log(countryData[0]);
        
        if (countryData) {
          setCountry(countryData);
        } else {
          setError('Country not found');
        }
      } catch (err) {
        setError('Failed to fetch country data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [countrySlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error || 'Country not found'}</p>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-96" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${country.image})`,
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Study in {country.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              {country.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 leading-relaxed">
              {country.longDescription}
            </p>
          </div>
        </motion.section>
        <CountryCollegeCarousel countrySlug = {countrySlug}/>

        {/* Why Study Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex items-center mb-6">
            <Book className="text-blue-600 mr-3" size={24} />
            <h2 className="text-3xl font-bold text-gray-800">Why Study in {country.name}</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {country.whyStudyHere.map((reason, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <ChevronRight className="text-blue-500 mr-2 flex-shrink-0" size={20} />
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Top Universities */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <School className="text-blue-600 mr-3" size={24} />
              <h2 className="text-3xl font-bold text-gray-800">Top Universities</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <ul className="space-y-3">
                {country.topUniversities.map((university, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <ChevronRight className="text-blue-500 mr-2 flex-shrink-0" size={20} />
                    <span>{university}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Popular Courses */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <Book className="text-blue-600 mr-3" size={24} />
              <h2 className="text-3xl font-bold text-gray-800">Popular Courses</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {country.popularCourses.map((course, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-50 text-blue-800 px-4 py-2 rounded-md flex items-center"
                  >
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Requirements Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex items-center mb-6">
            <FileCheck className="text-blue-600 mr-3" size={24} />
            <h2 className="text-3xl font-bold text-gray-800">Requirements</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="border-l-4 border-blue-500 pl-4"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Academic</h3>
                <p className="text-gray-700">{country.requirements.academic}</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border-l-4 border-green-500 pl-4"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Language</h3>
                <p className="text-gray-700">{country.requirements.language}</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border-l-4 border-purple-500 pl-4"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Others</h3>
                <p className="text-gray-700">{country.requirements.others}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Visa Process */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex items-center mb-6">
            <Globe className="text-blue-600 mr-3" size={24} />
            <h2 className="text-3xl font-bold text-gray-800">Visa Process</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 leading-relaxed">
              {country.visaProcess}
            </p>
          </div>
        </motion.section>

        {/* Costs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Tuition Fees */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <CreditCard className="text-blue-600 mr-3" size={24} />
              <h2 className="text-3xl font-bold text-gray-800">Tuition Fees</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-sm text-gray-500 uppercase mb-2">Average Annual Cost</p>
                  <p className="text-4xl font-bold text-blue-600">{country.tuitionFeeRange}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Living Costs */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <Home className="text-blue-600 mr-3" size={24} />
              <h2 className="text-3xl font-bold text-gray-800">Living Costs</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-sm text-gray-500 uppercase mb-2">Monthly Expenses</p>
                  <p className="text-4xl font-bold text-green-600">{country.livingCost}</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your journey?</h2>
            <p className="text-lg text-blue-100 mb-6">Get personalized guidance from our education consultants</p>
            <button className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md">
              Book a Free Consultation
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CountryPage;