import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// Testimonial data
const testimonialData = [
  {
    id: 1,
    name: "Aman",
    country: "Armenia",
    university: "Oxford University",
    image: "/api/placeholder/400/400",
    text: "Studying abroad in France completely changed my perspective on international education. The support from the program made my transition seamless.",
    rating: 5,
    program: "International Business"
  },
  {
    id: 2,
    name: "Raj Patel",
    country: "India",
    university: "University of Toronto",
    image: "/api/placeholder/400/400",
    text: "The cultural exposure I gained while studying in Canada has been invaluable for my personal and professional growth.",
    rating: 5,
    program: "Computer Science"
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    country: "Spain",
    university: "NYU",
    image: "/api/placeholder/400/400",
    text: "My experience in New York pushed me outside my comfort zone and helped me build an amazing international network.",
    rating: 4,
    program: "Media Studies"
  },
  {
    id: 4,
    name: "Liu Wei",
    country: "China",
    university: "University of Melbourne",
    image: "/api/placeholder/400/400",
    text: "The Australian education system encouraged critical thinking and practical application, which was exactly what I was looking for.",
    rating: 5,
    program: "Environmental Science"
  },
  {
    id: 5,
    name: "John Smith",
    country: "USA",
    university: "Sorbonne University",
    image: "/api/placeholder/400/400",
    text: "Learning French while studying in Paris gave me a competitive edge in the global job market that I wouldn't have gotten elsewhere.",
    rating: 4,
    program: "International Relations"
  },
  {
    id: 6,
    name: "Fatima Al-Hassan",
    country: "UAE",
    university: "Imperial College London",
    image: "/api/placeholder/400/400",
    text: "The research opportunities provided during my program were extraordinary and opened doors to collaborations worldwide.",
    rating: 5,
    program: "Biomedical Engineering"
  },
  {
    id: 7,
    name: "Hiroshi Tanaka",
    country: "Japan",
    university: "ETH Zurich",
    image: "/api/placeholder/400/400",
    text: "Switzerland's focus on precision and excellence aligned perfectly with my academic goals in engineering.",
    rating: 5,
    program: "Mechanical Engineering"
  },
  {
    id: 8,
    name: "Maria Costa",
    country: "Brazil",
    university: "McGill University",
    image: "/api/placeholder/400/400",
    text: "The diversity of perspectives in my classes enriched discussions and broadened my understanding of global challenges.",
    rating: 4,
    program: "Sustainable Development"
  },
  {
    id: 9,
    name: "Alexander Petrov",
    country: "Russia",
    university: "Seoul National University",
    image: "/api/placeholder/400/400",
    text: "Immersing myself in Korean culture while pursuing my studies gave me insights into Asian business practices I couldn't have learned from textbooks.",
    rating: 5,
    program: "International Business"
  },
  {
    id: 10,
    name: "Sarah Johnson",
    country: "Australia",
    university: "Technical University of Munich",
    image: "/api/placeholder/400/400",
    text: "Germany's approach to engineering education combines theory and practice in a way that prepares students for real-world challenges.",
    rating: 5,
    program: "Civil Engineering"
  },
  {
    id: 11,
    name: "Omar Hassan",
    country: "Egypt",
    university: "National University of Singapore",
    image: "/api/placeholder/400/400",
    text: "Singapore's strategic location gave me access to internship opportunities across all of Southeast Asia.",
    rating: 4,
    program: "Finance"
  },
  {
    id: 12,
    name: "Isabella Rossi",
    country: "Italy",
    university: "University of Cape Town",
    image: "/api/placeholder/400/400",
    text: "Studying in South Africa exposed me to unique healthcare challenges and innovative solutions that have shaped my career path.",
    rating: 5,
    program: "Public Health"
  },
  {
    id: 13,
    name: "Kim Min-ji",
    country: "South Korea",
    university: "University of Amsterdam",
    image: "/api/placeholder/400/400",
    text: "The Dutch education system's emphasis on student independence and critical thinking was challenging at first but ultimately rewarding.",
    rating: 4,
    program: "Psychology"
  },
  {
    id: 14,
    name: "Carlos Mendoza",
    country: "Mexico",
    university: "Stockholm University",
    image: "/api/placeholder/400/400",
    text: "Sweden's sustainability focus influenced not just my studies but my entire perspective on environmental policy.",
    rating: 5,
    program: "Environmental Policy"
  },
  {
    id: 15,
    name: "Aisha Okafor",
    country: "Nigeria",
    university: "University of British Columbia",
    image: "/api/placeholder/400/400",
    text: "The support services for international students made a huge difference in my ability to adapt and succeed academically.",
    rating: 5,
    program: "Economics"
  },
  {
    id: 16,
    name: "Pierre Dubois",
    country: "France",
    university: "National University of Ireland",
    image: "/api/placeholder/400/400",
    text: "Studying in Ireland connected me with industry partners that eventually led to my current position in tech.",
    rating: 4,
    program: "Data Science"
  }
];

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

// Testimonial Card Component
const TestimonialCard = ({ testimonial, delay }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px'
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-md p-6 overflow-hidden transform transition-all duration-700 ease-in-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 75}ms` }}
    >
      <div className="flex items-start mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-indigo-500">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.country} • {testimonial.program}</p>
          <p className="text-xs text-gray-500">{testimonial.university}</p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14}
                className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={i < testimonial.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <Quote size={20} className="text-indigo-100 absolute -left-1 -top-1" />
        <p className="text-gray-700 text-sm pl-5">{testimonial.text}</p>
      </div>
    </div>
  );
};

// Main Testimonials Component
const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1
  });
  
  // 8 testimonials per page
  const pageSize = 8;
  const totalPages = Math.ceil(testimonialData.length / pageSize);
  
  const nextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setIsAnimating(false);
    }, 300);
  };
  
  const prevPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setIsAnimating(false);
    }, 300);
  };

  const currentTestimonials = testimonialData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <section ref={ref} className="w-full py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Hear from students around the world who have transformed their education and careers through our study abroad programs.
          </p>
        </div>
        
        <div className={`relative transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {currentTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={index % 2 === 0 ? "transform translate-y-4" : ""}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  delay={index}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentPage(i);
                    setIsAnimating(false);
                  }, 300);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === i ? "bg-indigo-600 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute -translate-y-1/2 left-1/3 right-1/3 flex justify-between pointer-events-none">
            <button
              onClick={prevPage}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all transform -translate-x-1/2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="text-gray-700" />
            </button>
            <button
              onClick={nextPage}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all transform translate-x-1/2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Next testimonials"
            >
              <ChevronRight className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;