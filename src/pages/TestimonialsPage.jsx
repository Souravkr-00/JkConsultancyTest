import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Mock data for testimonials
const testimonialData = [
  {
    id: 1,
    name: "Emma Johnson",
    location: "London, UK",
    program: "Business Management",
    thumbnail: "/api/placeholder/480/270",
    video: "https://example.com/video1.mp4",
    quote: "My semester abroad transformed my perspective on global business practices."
  },
  {
    id: 2,
    name: "Miguel Sanchez",
    location: "Barcelona, Spain",
    program: "Computer Science",
    thumbnail: "/api/placeholder/360/240",
    video: "https://example.com/video2.mp4",
    quote: "The tech scene in Silicon Valley opened my eyes to innovation at scale."
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    program: "International Relations",
    thumbnail: "/api/placeholder/420/280",
    video: "https://example.com/video3.mp4",
    quote: "The cultural exchange was just as valuable as the academic experience."
  },
  {
    id: 4,
    name: "Aisha Patel",
    location: "Mumbai, India",
    program: "Architecture",
    thumbnail: "/api/placeholder/450/300",
    video: "https://example.com/video4.mp4",
    quote: "Studying historic European architecture in person was a dream come true."
  },
  {
    id: 5,
    name: "James Wilson",
    location: "Sydney, Australia",
    program: "Marine Biology",
    thumbnail: "/api/placeholder/400/300",
    video: "https://example.com/video5.mp4",
    quote: "The Great Barrier Reef research opportunity changed my career trajectory."
  },
  {
    id: 6,
    name: "Sofia Rodriguez",
    location: "Buenos Aires, Argentina",
    program: "Film Studies",
    thumbnail: "/api/placeholder/380/270",
    video: "https://example.com/video6.mp4",
    quote: "The film industry connections I made abroad led directly to my current job."
  },
  {
    id: 7,
    name: "Liam Chen",
    location: "Berlin, Germany",
    program: "Music Production",
    thumbnail: "/api/placeholder/410/260",
    video: "https://example.com/video7.mp4",
    quote: "Collaborating with German electronic artists revolutionized my sound."
  },
  {
    id: 8,
    name: "Zara Hassan",
    location: "Dubai, UAE",
    program: "Business Analytics",
    thumbnail: "/api/placeholder/390/280",
    video: "https://example.com/video8.mp4",
    quote: "The global finance perspective I gained was invaluable for my career."
  }
];

// Custom Video Player component
const VideoPlayer = ({ testimonial, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-play when mounted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Auto-play was prevented:", error);
      });
      setIsPlaying(true);
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="aspect-video w-full relative">
          {/* Using placeholder image for demo, in production use actual video */}
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={testimonial.thumbnail}
            src={testimonial.video}
            controls={false}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">{testimonial.name}</h3>
                <p className="text-gray-300 text-sm">{testimonial.program} | {testimonial.location}</p>
              </div>
              
              <div className="flex space-x-4">
                <button onClick={handleMuteToggle} className="text-white">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={handlePlayPause} className="text-white">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <p className="text-gray-800 italic">"<span className="font-medium">{testimonial.quote}</span>"</p>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card component
const TestimonialCard = ({ testimonial, onClick }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="aspect-video relative">
        <img 
          src={testimonial.thumbnail} 
          alt={`${testimonial.name} testimonial thumbnail`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 rounded-full p-3">
            <Play size={24} className="text-blue-600" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white font-medium text-sm md:text-base">{testimonial.name}</h3>
        <p className="text-gray-200 text-xs md:text-sm">{testimonial.program}</p>
      </div>
    </div>
  );
};

// Main Testimonials Page component
export default function TestimonialsPage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative" ref={containerRef}>
      {/* Header with parallax effect */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Student Stories
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white text-opacity-90 max-w-2xl">
              Hear directly from students who transformed their education through our study abroad programs
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialData.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`
                ${index % 3 === 0 ? 'md:col-span-1 lg:col-span-1' : ''}
                ${index % 5 === 0 ? 'md:col-span-2' : ''}
                ${index % 7 === 0 ? 'lg:row-span-2' : ''}
              `}
              style={{ 
                transform: `translateY(${scrollY * (0.03 * (index % 3 + 1))}px)`,
                transition: 'transform 0.1s ease-out' 
              }}
            >
              <TestimonialCard 
                testimonial={testimonial} 
                onClick={() => setSelectedTestimonial(testimonial)} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedTestimonial && (
        <VideoPlayer 
          testimonial={selectedTestimonial} 
          onClose={() => setSelectedTestimonial(null)} 
        />
      )}
      
      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Create Your Own Study Abroad Story?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students who have expanded their horizons, built international networks, and transformed their education through our programs.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}