"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle,
  GraduationCap,
  Lightbulb,
  Target,
  Globe,
  Star,
  ArrowRight,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react"
import servicesData from "../data/servicesData.json"
import { motion } from "framer-motion"

export default function ServiceDetailsPage() {
  const { serviceName } = useParams()
  console.log("Service slug from URL:", serviceName)

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  // Find the service with the matching slug
  useEffect(() => {
    setLoading(true)
    if (serviceName) {
      const decodedName = decodeURIComponent(serviceName)
      console.log("Decoded service slug:", decodedName)

      const foundService = servicesData.find((s) => s.slug === decodedName)
      if (foundService) {
        setService(foundService)
        console.log("Service found:", foundService)
      } else {
        console.log("Service not found for slug:", decodedName)
      }
    }
    setLoading(false)
  }, [serviceName])

  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    requirements: false,
    locations: false,
    trending: false,
  })

  // Toggle accordion sections
  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    })
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Show loading state while fetching service
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <div className="text-xl text-gray-600">Loading service details...</div>
        </div>
      </div>
    )
  }

  // Show error state if service not found
  if (!service) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the service you're looking for. Please check the URL and try again.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative">
        <div className="h-64 md:h-96 w-full bg-gradient-to-r from-blue-600 to-indigo-800 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            ></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute inset-0 flex items-center"
          >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center"
              >
                <Sparkles className="h-8 w-8 mr-3 text-yellow-300" />
                {service.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-white max-w-2xl"
              >
                {service.shortDescription}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Service Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="mb-8 rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl"
            >
              
            </motion.div>

            {/* Service Description */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-indigo-600" />
                About This Service
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{service.longDescription}</p>
            </motion.div>

            {/* Why Choose This Service */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-indigo-600" />
                Why Choose This Service
              </h2>
              <motion.ul variants={staggerChildren} className="space-y-3">
                {service.whyStudyThis.map((reason, index) => (
                  <motion.li
                    key={index}
                    variants={slideUp}
                    className="flex items-start p-3 rounded-md transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{reason}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Popular Specializations */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Star className="h-6 w-6 mr-2 text-indigo-600" />
                Popular Specializations
              </h2>
              <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.popularSpecializations.map((specialization, index) => (
                  <motion.div
                    key={index}
                    variants={slideUp}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50"
                  >
                    <BookOpen className="h-5 w-5 text-indigo-600 mb-2" />
                    <p className="text-gray-800 font-medium">{specialization}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Requirements - Accordion */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleSection("requirements")}
              >
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2 text-indigo-600" />
                  Requirements
                </h2>
                {openSections.requirements ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>

              {openSections.requirements && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                      Academic
                    </h3>
                    <p className="text-gray-700">{service.requirements.academic}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-indigo-600" />
                      Skills
                    </h3>
                    <p className="text-gray-700">{service.requirements.skills}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-indigo-600" />
                      Other Requirements
                    </h3>
                    <p className="text-gray-700">{service.requirements.others}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Career Paths */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-indigo-600" />
                Career Paths
              </h2>
              <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.careerPaths.map((career, index) => (
                  <motion.div
                    key={index}
                    variants={slideUp}
                    className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-gray-50"
                  >
                    <Briefcase className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">{career}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Service Details Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-4 transform transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                Service Details
              </h3>

              <div className="space-y-4">
                {/* Average Duration */}
                <div className="flex items-start p-3 rounded-md transition-colors duration-200 hover:bg-gray-50">
                  <Clock className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Average Duration</p>
                    <p className="text-gray-800 font-medium">{service.averageDuration}</p>
                  </div>
                </div>

                {/* Cost Range */}
                <div className="flex items-start p-3 rounded-md transition-colors duration-200 hover:bg-gray-50">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Cost Range</p>
                    <p className="text-gray-800 font-medium">{service.costRange}</p>
                  </div>
                </div>

                {/* Top Destinations - Accordion */}
                <div className="border-t border-gray-100 pt-3">
                  <button
                    className="w-full flex justify-between items-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-50"
                    onClick={() => toggleSection("locations")}
                  >
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-indigo-600 mr-3" />
                      <p className="text-sm text-gray-500">Top Destinations</p>
                    </div>
                    {openSections.locations ? (
                      <ChevronUp className="h-4 w-4 text-gray-500 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300" />
                    )}
                  </button>

                  {openSections.locations && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-8"
                    >
                      <ul className="space-y-1">
                        {service.topDestinations.map((destination, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="text-gray-700 flex items-center py-1"
                          >
                            <MapPin className="h-3 w-3 text-indigo-400 mr-2" />
                            {destination}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Trending Subfields - Accordion */}
                <div className="border-t border-gray-100 pt-3">
                  <button
                    className="w-full flex justify-between items-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-50"
                    onClick={() => toggleSection("trending")}
                  >
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-indigo-600 mr-3" />
                      <p className="text-sm text-gray-500">Trending Subfields</p>
                    </div>
                    {openSections.trending ? (
                      <ChevronUp className="h-4 w-4 text-gray-500 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300" />
                    )}
                  </button>

                  {openSections.trending && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-8"
                    >
                      <ul className="space-y-1">
                        {service.trendingSubfields.map((subfield, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="text-gray-700 flex items-center py-1"
                          >
                            <Star className="h-3 w-3 text-indigo-400 mr-2" />
                            {subfield}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-300 flex items-center justify-center"
              >
                Request This Service
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-indigo-800">Next Available Slot</p>
                    <p className="text-sm text-indigo-600">Contact us for availability</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
