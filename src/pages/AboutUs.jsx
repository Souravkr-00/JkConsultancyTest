import { useState, useEffect, useRef } from 'react';
import { Users, Award, Clock, Globe, BookOpen, Star, Building, Phone } from 'lucide-react';

const AboutUs = () => {
  // For intersection observer animations
  const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);

    const observer = useRef(null);

    useEffect(() => {
      if (elements.length) {
        observer.current = new IntersectionObserver((observedEntries) => {
          setEntries(observedEntries);
        }, options);
        
        elements.forEach((element) => observer.current.observe(element));
      }
      
      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }, [elements, options]);

    return {
      ref: (element) => {
        if (element && !elements.includes(element)) {
          setElements((prevElements) => [...prevElements, element]);
        }
      },
      entries
    };
  };

  // Stats counter animation
  const Counter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const { ref, entries } = useIntersectionObserver({
      threshold: 0.5,
      triggerOnce: true
    });
    
    useEffect(() => {
      const isVisible = entries.some((entry) => entry.isIntersecting);
      
      if (isVisible) {
        let startTime;
        let requestId;
        
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          
          setCount(Math.floor(percentage * end));
          
          if (percentage < 1) {
            requestId = requestAnimationFrame(animate);
          }
        };
        
        requestId = requestAnimationFrame(animate);
        
        return () => cancelAnimationFrame(requestId);
      }
    }, [entries, end, duration]);
    
    return <span ref={(node) => { nodeRef.current = node; ref(node); }}>{count}+</span>;
  };

  // For animated sections
  const AnimatedSection = ({ children, className = "" }) => {
    const sectionRef = useRef(null);
    const { ref, entries } = useIntersectionObserver({
      threshold: 0.1,
      triggerOnce: true
    });
    
    const isVisible = entries.some((entry) => entry.isIntersecting);
    
    return (
      <div 
        ref={(node) => { sectionRef.current = node; ref(node); }}
        className={`transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        } ${className}`}
      >
        {children}
      </div>
    );
  };

  // Team member data
  const teamMembers = [
    {
      name: "Dr. Jaspreet Kaur",
      position: "Founder & CEO",
      image: "/api/placeholder/400/400",
      bio: "With over 15 years of experience in international education consulting, Dr. Kaur has helped thousands of students achieve their academic dreams abroad."
    },
    {
      name: "Arjun Singh",
      position: "Head of Admissions",
      image: "/api/placeholder/400/400",
      bio: "Arjun specializes in university admissions and has established partnerships with top institutions across the globe."
    },
    {
      name: "Priya Sharma",
      position: "Visa Specialist",
      image: "/api/placeholder/400/400",
      bio: "With a background in immigration law, Priya ensures a smooth visa application process for all our students."
    },
    {
      name: "Rahul Mehta",
      position: "Academic Counselor",
      image: "/api/placeholder/400/400",
      bio: "Rahul provides personalized guidance to students, helping them choose the right courses and universities aligned with their career goals."
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      name: "Ananya Patel",
      university: "University of Toronto, Canada",
      text: "JK Consultancy made my dream of studying in Canada a reality. Their step-by-step guidance throughout the application and visa process was invaluable.",
      image: "/api/placeholder/100/100"
    },
    {
      name: "Vikram Malhotra",
      university: "Lomonosov Moscow State University, Russia",
      text: "I couldn't have navigated the complex admission process for medical studies in Russia without the expert help from JK Consultancy. They're simply the best!",
      image: "/api/placeholder/100/100"
    },
    {
      name: "Neha Gupta",
      university: "University of Melbourne, Australia",
      text: "From choosing the right university to settling in Australia, JK Consultancy supported me at every step. Highly recommended for anyone planning to study abroad.",
      image: "/api/placeholder/100/100"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/api/placeholder/1600/800')" }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            About JK Consultancy
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl animate-fade-in-up">
            Guiding students towards global academic excellence since 2010
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Section 1: Our Story */}
        <AnimatedSection className="mb-24">
          <section>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
                  <span className="inline-block relative">
                    Our Story
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
                  </span>
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  JK Consultancy was founded in 2010 with a mission to connect ambitious students with world-class educational opportunities across the globe. What began as a small office with a team of three has now grown into one of the leading study abroad consultancies in the region.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our founder, Dr. Jaspreet Kaur, established JK Consultancy after experiencing firsthand the challenges international students face when applying to universities abroad. Her vision was to create a supportive ecosystem that simplifies the complex process of studying abroad, making quality education accessible to deserving students.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-lg"></div>
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="JK Consultancy Office" 
                    className="w-full h-auto object-cover rounded-lg shadow-lg relative z-10"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Section 2: Our Mission & Vision */}
        <AnimatedSection className="mb-24">
          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Star className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To empower students with comprehensive guidance and support for their international education journey, enabling them to make informed decisions that align with their academic aspirations and career goals. We strive to make quality education accessible by providing transparent, personalized, and ethical counseling services.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Globe className="text-purple-600" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To be the most trusted name in international education consulting, known for our integrity, student-centric approach, and excellence in service. We envision creating a global community of successful professionals who contribute meaningfully to society and serve as ambassadors of international education.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Section 3: Our Values */}
        <AnimatedSection className="mb-24">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 relative">
              <span className="inline-block relative">
                Our Core Values
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Excellence</h3>
                <p className="text-gray-700 text-center">
                  We strive for excellence in all our services, ensuring the highest quality guidance for our students.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Student-Centric</h3>
                <p className="text-gray-700 text-center">
                  Our students' success and well-being are at the heart of everything we do.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Integrity</h3>
                <p className="text-gray-700 text-center">
                  We uphold the highest standards of honesty, transparency, and ethical conduct.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Innovation</h3>
                <p className="text-gray-700 text-center">
                  We continuously evolve our services to meet the changing needs of global education.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Section 4: Our Impact (Statistics) */}
        <AnimatedSection className="mb-24">
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-10 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2"><Counter end={5000} /></div>
                <p className="text-lg">Students Placed</p>
              </div>
              
              <div>
                <div className="text-5xl font-bold mb-2"><Counter end={50} /></div>
                <p className="text-lg">Countries Covered</p>
              </div>
              
              <div>
                <div className="text-5xl font-bold mb-2"><Counter end={300} /></div>
                <p className="text-lg">University Partners</p>
              </div>
              
              <div>
                <div className="text-5xl font-bold mb-2"><Counter end={95} /></div>
                <p className="text-lg">Success Rate</p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Section 5: Our Services */}
        <AnimatedSection className="mb-24">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 relative">
              <span className="inline-block relative">
                Our Services
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  <BookOpen className="text-blue-600" size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Academic Counseling</h3>
                  <p className="text-gray-700 mb-4">
                    Personalized guidance to help students choose the right courses and universities based on their academic profile and career aspirations.
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                    Learn More &rarr;
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-green-100 flex items-center justify-center">
                  <Building className="text-green-600" size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">University Admissions</h3>
                  <p className="text-gray-700 mb-4">
                    End-to-end application assistance including university selection, document preparation, application submission, and admission follow-ups.
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                    Learn More &rarr;
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-purple-100 flex items-center justify-center">
                  <Globe className="text-purple-600" size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Visa Assistance</h3>
                  <p className="text-gray-700 mb-4">
                    Comprehensive support for student visa applications, including documentation, preparation for visa interviews, and guidance on visa regulations.
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                    Learn More &rarr;
                  </button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Section 6: Our Team */}
        <AnimatedSection className="mb-24">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 relative">
              <span className="inline-block relative">
                Meet Our Team
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Section 7: Testimonials */}
        <AnimatedSection className="mb-24">
          <section className="bg-gray-100 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 relative">
              <span className="inline-block relative">
                Student Success Stories
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 relative">
                  <div className="absolute -top-5 left-6 bg-blue-100 rounded-full p-1">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white"
                    />
                  </div>
                  <div className="pt-12">
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-blue-600">{testimonial.university}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Section 8: Contact Us */}
        <AnimatedSection>
          <section className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-gray-700 mb-8">
                  Have questions about studying abroad? Contact our expert counselors for a free consultation.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Building className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Our Office</h3>
                      <p className="text-gray-700">
                        123 Education Street, Knowledge Park<br />
                        New Delhi, 110001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Contact</h3>
                      <p className="text-gray-700">
                        Phone: +91 9876543210<br />
                        Email: info@jkconsultancy.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Clock className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
                      <p className="text-gray-700">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600 p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-md bg-blue-500 text-white placeholder-blue-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-md bg-blue-500 text-white placeholder-blue-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 rounded-md bg-blue-500 text-white placeholder-blue-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      className="w-full px-4 py-2 rounded-md bg-blue-500 text-white placeholder-blue-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 h-32"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutUs;