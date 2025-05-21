"use client"

import { useState, useRef, useEffect } from "react"
import emailjs from "@emailjs/browser"

export default function BookConsultancy() {
  const form = useRef()

  // Initialize EmailJS when component mounts
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("dc_ttwnSUummX3wGs")
  }, [])

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    countryInterest: "",
    studyLevel: "undergraduate",
    preferredProgramme: "",
    budget: "",
    englishProficiency: "none",
    additionalInfo: "",
  })

  // Time slots
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ]

  // Countries
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "New Zealand",
    "Germany",
    "France",
    "Netherlands",
    "Singapore",
    "Japan",
    "Other",
  ]

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    // Ensure all form data is properly set as template parameters
    // This helps if your form fields don't exactly match template variables
    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      countryInterest: formData.countryInterest,
      studyLevel: formData.studyLevel,
      preferredProgramme: formData.preferredProgramme || "Not specified",
      budget: formData.budget || "Not specified",
      englishProficiency: formData.englishProficiency,
      additionalInfo: formData.additionalInfo || "No additional information provided",
    }

    // EmailJS configuration
    const serviceId = "service_jq13kt8"
    const templateId = "template_m2gw5wg"
    const publicKey = "dc_ttwnSUummX3wGs"

    // Try both methods to send email
    // Method 1: Using sendForm with the form reference
    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log("Email sent successfully with sendForm:", result.text)
        handleSuccessfulSubmission()
      })
      .catch((error) => {
        console.error("Email sending failed with sendForm:", error)

        // Method 2: Try using send with template parameters as fallback
        emailjs
          .send(serviceId, templateId, templateParams, publicKey)
          .then((result) => {
            console.log("Email sent successfully with send method:", result.text)
            handleSuccessfulSubmission()
          })
          .catch((error) => {
            console.error("Email sending failed with both methods:", error)
            setIsSubmitting(false)
            setErrorMessage(
              "Failed to send your booking. Please try again or contact us directly. Error: " +
                (error.text || error.message || "Unknown error"),
            )
          })
      })
  }

  const handleSuccessfulSubmission = () => {
    setIsSubmitting(false)
    setSubmissionStatus("success")

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmissionStatus(null)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        countryInterest: "",
        studyLevel: "undergraduate",
        preferredProgramme: "",
        budget: "",
        englishProficiency: "none",
        additionalInfo: "",
      })
    }, 3000)
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Information Side */}
          <div className="w-full lg:w-2/5 lg:pr-12 mb-10 lg:mb-0">
            <div className="sticky top-20">
              <div className="mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  FREE CONSULTATION
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Book Your Abroad Studies Consultation
              </h1>
              <p className="text-gray-600 mb-8">
                Schedule a personalized consultation with our expert advisors to discuss your study abroad options,
                application process, visa requirements, and more.
              </p>

              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What to expect:</h3>
                <ul className="space-y-3">
                  {[
                    "Personalized guidance on choosing the right country and institution",
                    "Information on admission requirements and application timelines",
                    "Scholarship and funding opportunities",
                    "Visa application assistance",
                    "Accommodation and living costs overview",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-900 font-medium">Phone</p>
                      <p className="text-gray-600">+91 93190 56757</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-900 font-medium">Email</p>
                      <p className="text-gray-600">jkconsult.in@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-900 font-medium">Office Address</p>
                      <p className="text-gray-600">South Extension II, G-25, New Delhi, Delhi 110049</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-10">
              {submissionStatus === "success" ? (
                <div className="text-center py-10">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your consultation request has been received. We'll contact you shortly to confirm your appointment.
                  </p>
                  <button
                    onClick={() => setSubmissionStatus(null)}
                    className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Book Another Consultation
                  </button>
                </div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{errorMessage}</div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {/* Consultation Schedule */}
                    <div className="col-span-2">
                      <div className="border-b border-gray-200 my-4"></div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-2">Consultation Schedule</h3>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="preferredDate" className="block text-gray-700 font-medium mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="preferredTime" className="block text-gray-700 font-medium mb-2">
                        Preferred Time *
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-colors duration-200"
                        required
                      >
                        <option value="" disabled>
                          Select a time slot
                        </option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Study Preferences */}
                    <div className="col-span-2">
                      <div className="border-b border-gray-200 my-4"></div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-2">Study Preferences</h3>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="countryInterest" className="block text-gray-700 font-medium mb-2">
                        Interested Country *
                      </label>
                      <select
                        id="countryInterest"
                        name="countryInterest"
                        value={formData.countryInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-colors duration-200"
                        required
                      >
                        <option value="" disabled>
                          Select a country
                        </option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="studyLevel" className="block text-gray-700 font-medium mb-2">
                        Study Level *
                      </label>
                      <select
                        id="studyLevel"
                        name="studyLevel"
                        value={formData.studyLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-colors duration-200"
                        required
                      >
                        <option value="undergraduate">Undergraduate (Bachelor's)</option>
                        <option value="postgraduate">Postgraduate (Master's)</option>
                        <option value="phd">PhD / Doctoral</option>
                        <option value="diploma">Diploma / Certificate</option>
                        <option value="language">Language Course</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="preferredProgramme" className="block text-gray-700 font-medium mb-2">
                        Preferred Programme/Course
                      </label>
                      <input
                        type="text"
                        id="preferredProgramme"
                        name="preferredProgramme"
                        value={formData.preferredProgramme}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="E.g., Computer Science, Business Administration, etc."
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
                        Approximate Budget (USD/year)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-colors duration-200"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-10000">Under $10,000</option>
                        <option value="10000-20000">$10,000 - $20,000</option>
                        <option value="20000-30000">$20,000 - $30,000</option>
                        <option value="30000-40000">$30,000 - $40,000</option>
                        <option value="40000-plus">$40,000+</option>
                      </select>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="englishProficiency" className="block text-gray-700 font-medium mb-2">
                        English Proficiency Test Status
                      </label>
                      <select
                        id="englishProficiency"
                        name="englishProficiency"
                        value={formData.englishProficiency}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-colors duration-200"
                      >
                        <option value="none">Not taken yet</option>
                        <option value="ielts">IELTS</option>
                        <option value="toefl">TOEFL</option>
                        <option value="pte">PTE Academic</option>
                        <option value="duolingo">Duolingo English Test</option>
                        <option value="cambridge">Cambridge English</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="Share any specific questions or information that would help us prepare for your consultation."
                      ></textarea>
                    </div>

                    <div className="col-span-2">
                      <div className="border-t border-gray-200 pt-6 mt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-all duration-200 ${
                            isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            "Book My Consultation"
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 text-center mt-4">Fields marked with * are required</p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
