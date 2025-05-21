import { useState } from 'react';

export default function FAQSection() {
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What are the key requirements for studying abroad?",
      answer: "Key requirements typically include academic transcripts, language proficiency tests (like IELTS or TOEFL), a valid passport, financial proof, letters of recommendation, and a statement of purpose. Requirements may vary by country and institution, so always check specific university guidelines."
    },
    {
      id: 2,
      question: "How do I choose the right country for my studies?",
      answer: "Consider factors like education quality, course availability, tuition costs, living expenses, scholarship opportunities, language requirements, work permits, visa policies, and cultural fit. Research the job market in your field and potential for post-graduation work opportunities."
    },
    {
      id: 3,
      question: "What scholarships are available for international students?",
      answer: "International students can apply for merit-based scholarships, need-based grants, government-funded scholarships, university-specific awards, and field-specific funding. Look into options like Fulbright, Chevening, Commonwealth Scholarships, and Erasmus Mundus, as well as scholarships offered by your home country."
    },
    {
      id: 4,
      question: "How far in advance should I start my application process?",
      answer: "Begin at least 12-18 months before your intended start date. This gives you time to research programs, prepare for and take standardized tests, gather documents, apply for scholarships, and complete visa applications. Application deadlines vary, but many universities have deadlines 6-9 months before the academic year begins."
    },
    {
      id: 5,
      question: "Can I work while studying abroad?",
      answer: "Work regulations vary by country. Many popular destinations allow international students to work part-time (typically 10-20 hours per week) during the semester and full-time during breaks. Some countries also offer post-study work visas. Check the specific work rights attached to your student visa before making plans."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Heading with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-24 h-1 bg-blue-500 rounded-full opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about studying abroad and planning your international education journey.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'ring-2 ring-blue-100' : 'hover:shadow-lg'
              }`}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className={`font-medium text-lg ${openIndex === index ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'} transition-colors duration-200`}>
                  {faq.question}
                </span>
                <span className={`ml-6 flex-shrink-0 p-2 rounded-full ${openIndex === index ? 'bg-blue-50' : 'bg-gray-50 group-hover:bg-blue-50'} transition-colors duration-200`}>
                  <svg
                    className={`w-5 h-5 ${openIndex === index ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'} transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="mt-14 text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our education consultants are here to help you navigate your study abroad journey.</p>
          <a 
            href="/about-us/contact-us" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Contact an Advisor
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}