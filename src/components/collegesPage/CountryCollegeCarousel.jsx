import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import collegesData from "../../data/data.json";
export default function CountryCollegeCarousel({ countrySlug }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  
  // Configure how many cards to display based on screen size
  const [cardsToShow, setCardsToShow] = useState(4);
  
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        // In a real application, this would be a proper API fetch
        // For now, we're simulating the fetch from a data.json file
        
        const data = collegesData; // Replace with actual API call if needed
        
        // Filter colleges by country slug
        // Convert countrySlug to proper country name (e.g., "armenia" -> "Armenia")
        const countryName = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1);
        const filteredColleges = data.filter(college => college.country === countryName);
        
        setColleges(filteredColleges);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching college data:", error);
        setLoading(false);
      }
    };
    
    fetchColleges();
    
    // Set up responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 768) {
        setCardsToShow(2);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };
    
    // Initial setup
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [countrySlug]);
  
  // Handle navigation
  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex + cardsToShow >= colleges.length ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? Math.max(0, colleges.length - cardsToShow) : prevIndex - 1
    );
  };
  
  // Touch swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="animate-pulse text-gray-500">Loading colleges...</div>
      </div>
    );
  }
  
  if (colleges.length === 0) {
    return (
      <div className="w-full text-center p-8">
        <p className="text-gray-600">No colleges found for this country.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full relative py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Colleges in {colleges[0]?.country || countrySlug}
      </h2>
      
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            width: `${(colleges.length / cardsToShow) * 100}%`
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {colleges.map((college) => (
            <a href={`/colleges/college/${college.name}`} key={college.id}>
            <div 
              key={college.id} 
              className="px-2"
              style={{ width: `${100 / colleges.length * cardsToShow}%` }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={college.image || "/api/placeholder/400/320"} 
                    alt={college.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{college.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{college.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {college.programmes?.slice(0, 2).map((program, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {program.split(' ')[0]}
                      </span>
                    ))}
                    {college.programmes?.length > 2 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{college.programmes.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      {college.foundingYear ? `Est. ${college.foundingYear}` : ''}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </a>
          ))}
        </div>
        
        {/* Navigation Buttons - Hidden on mobile */}
        {colleges.length > cardsToShow && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </>
        )}
      </div>
      
      {/* Pagination Indicators */}
      {colleges.length > cardsToShow && (
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: Math.ceil((colleges.length - cardsToShow + 1) / 1) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}