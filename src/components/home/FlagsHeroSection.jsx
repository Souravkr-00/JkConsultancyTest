import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FlagsHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // All country flags in a single array
  const countryFlags = [
    { name: "Russia", code: "ru" },
    { name: "Armenia", code: "am" },
    { name: "Vietnam", code: "vn" },
    { name: "Georgia", code: "ge" },
    { name: "Kazakhstan", code: "kz" },
    { name: "Uzbekistan", code: "uz" },
    { name: "Kyrgyzstan", code: "kg" },
    { name: "Bangladesh", code: "bd" },
    { name: "Nepal", code: "np" },
  ];

  useEffect(() => {
    // Create intersection observer to trigger animation when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset animation when scrolled away
        }
      },
      { threshold: 0.2 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className={`max-w-full md:max-w-9/10  mx-auto bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-1000 my-8 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="px-6 py-8 md:py-10">
        <div className="text-center mb-6">
          <h1 className="font-sans text-xl md:text-2xl lg:text-2xl font-medium text-gray-800 mb-2">
            Your Global Education Journey Starts Here
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connecting ambitious students with world-class education opportunities across these prestigious destinations
          </p>
        </div>
        
        {/* Flags infinite loop */}
        <div className="relative w-full overflow-hidden py-8 my-4">
          {/* Blur Effects on sides */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          {/* Main infinite slider */}
          <div className="slider">
            <div className={`slide-track ${isVisible ? 'animate' : ''}`}>
              {/* Generate flags multiple times to ensure continuous loop */}
              {[...Array(3)].map((_, setIndex) => (
                countryFlags.map((country, index) => (
                  <div
                    key={`set-${setIndex}-${country.code}-${index}`}
                    className="slide"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-12 md:w-14 md:h-14 overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <img 
                          src={`https://flagcdn.com/w80/${country.code}.png`}
                          alt={`Flag of ${country.name}`}
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <span className="mt-2 text-xs md:text-sm text-gray-700 font-medium">
                        {country.name}
                      </span>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
        
        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <a href = "colleges">

          <button className="group relative overflow-hidden rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-300/50">
            <span className="relative z-10 flex items-center gap-2 font-medium">
              Explore Destinations
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 -z-10 translate-y-[100%] rounded-full bg-blue-500 transition-transform duration-300 group-hover:translate-y-0"></span>
          </button>
        </a>
          <a href = "/bookconsult">

          
          <button className="group relative overflow-hidden rounded-full bg-transparent px-6 py-3 text-blue-600 border-2 border-blue-600 transition-all duration-300 hover:text-white">
            <span className="relative z-10 flex items-center gap-2 font-medium">
              Free Consultation
            </span>
            <span className="absolute inset-0 -z-10 scale-x-0 bg-blue-600 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
          </button>
          </a>
        </div>
      </div>
      
      {/* Essential CSS for true infinite loop animation */}
      <style jsx>{`
        .slider {
          width: 100%;
          height: 100px;
          margin: auto;
          overflow: hidden;
          position: relative;
        }
        
        .slide-track {
          display: flex;
          width: calc(180px * 27); /* Width of each slide  total number of duplicated slides */
          animation: none; /* Animation applied conditionally via class */
        }
        
        .slide-track.animate {
          animation: scroll 40s linear infinite;
        }
        
        .slide {
          width: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 15px;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-180px * 9)); /* Negative width of non-duplicated slides */
          }
        }
        
        /* Pause animation on hover */
        .slide-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}