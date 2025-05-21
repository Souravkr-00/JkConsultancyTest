import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Aman',
    country: 'Armenia',
    program: 'Medical Student (5th Year)',
    youtubeLink: 'https://www.youtube.com/embed/IcWcXRCs5zs?si=RR5V2vOdqhbWy4IU',
    quote: 'My study abroad experience was life-changing. I learned so much about myself and the world!'
  },
  {
    id: 2,
    name: 'Paras',
    country: 'Armenia',
    program: 'Medical Student (5th Year)',
    youtubeLink: 'https://youtube.com/embed/TJ0kSqoiLF4?si=vJPegMWi6qAVzlgn',
    quote: 'Immersing myself in Armenia culture was an incredible journey of personal growth.'
  },
  {
    id: 3,
    name: 'Mir Aftash',
    country: 'Armenia',
    program: 'Medical Student (5th Year)',
    youtubeLink: 'https://youtube.com/embed/jwnbx7Q3ABY?si=OEg2dAS0lzz5xR2B',
    quote: 'Studying Medical Science in Armenia brought textbooks to life in ways I never imagined.'
  },
  {
    id: 4,
    name: 'Disha',
    country: 'Armenia', 
    program: 'Medical Student (5th Year)',
    youtubeLink: 'https://youtube.com/embed/b8eoIG8zl_U?si=eV6l3WtIfyIpRKxw',
    quote: 'Living and studying in Armenia transformed my language skills and Medical Science.'
  },
  {
    id: 5,
    name: 'Divy Mukheshkumar Patel',
    country: 'Armenia',
    program: 'Medical Student (6th Year)',
    youtubeLink: 'https://youtube.com/embed/1YlkIKv1Wew?si=od5_L_6PQbIgBnGN',
    quote: 'Studying in Armenia was something I had never imagined, but JK Consultancy made the entire journey incredibly easy and stress-free. The cost of education is affordable, and the clinical exposure I’m receiving here is world-class. Thanks to JK Consultancy, I’m now one step closer to becoming a successful doctor without the heavy financial burden.'
  },
  {
    id: 6,
    name: 'Akshay Kumar',
    country: 'Armenia',
    program: 'Medical Student (6th Year)',
    youtubeLink: 'https://youtube.com/embed/gr_O37BpUuI?si=2xBhDQf1iW_irlUX',
    quote: 'When I first thought of studying abroad, I was scared of the entire process. JK Consultancy not only guided me academically but also prepared me mentally for the move. They are professional, caring, and always available when I have questions. Studying MBBS in Armenia has turned out to be more enriching than I ever imagined.'
  },
  {
    id: 7,
    name: 'Tanya Chaudhary',
    country: 'Armenia',
    program: 'Medical Student (6th Year)',
    youtubeLink: 'https://youtube.com/embed/jBC2m_fcXZk?si=Bh8I92R1i8RJ7yfg',
    quote: 'JK Consultancy was recommended by a friend and now I recommend it to everyone. They are honest, knowledgeable, and efficient. From my first counseling session to arriving in Armenia, every step was well-handled. My university provides solid practical experience and great student life. Thank you JK Consultancy for turning my dream into reality!'
  },
  {
    id: 8,
    name: 'Ashly Anna Renjan',
    country: 'Armenia',
    program: 'Medical Student (5th Year)',
    youtubeLink: 'https://youtube.com/embed/Xm8_yv7e67E?si=N1JVrQ35MhKucK1d',
    quote: 'Living and studying in Armenia transformed my language skills in Medical Studies.'
  }
];

const VideoTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
          Student Experiences
        </h2>
        <p className="text-gray-700 italic text-center mb-15">
                  "Hear from the students who turned their dreams into reality with us. From personalized guidance to smooth admissions and reliable post-arrival support, our students share how JK Consultancy helped them kickstart their medical journey in Armenia. Their stories reflect the trust, commitment, and excellence we bring to every student’s abroad education experience."
                </p>
        
        <div className="relative w-full">
          {/* Carousel Navigation */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-all"
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </button>

          {/* Carousel Slide */}
          <div className="flex items-center justify-center w-full">
            <div 
              key={currentTestimonial.id}
              className="w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row animate-fade-in relative"
            >
              {/* Video Container */}
              <div className="md:w-1/2 relative">
                <div className="w-full h-64 md:h-96">
                  <iframe 
                    src={`${currentTestimonial.youtubeLink}?autoplay=0`}
                    title={`${currentTestimonial.name} Testimonial`}
                    className="w-full h-full"
                    allow="encrypted-media;"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <div className="flex items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentTestimonial.program}, {currentTestimonial.country}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{currentTestimonial.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-blue-500 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonials;