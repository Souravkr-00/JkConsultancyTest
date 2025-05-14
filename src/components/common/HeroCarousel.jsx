import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../../hooks/use-mobile"; // Make sure this file is in .js format now
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    alt: "Study abroad landscape",
    title: "Explore New Horizons",
    description: "Discover world-class educational opportunities abroad",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Student studying",
    title: "Shape Your Future",
    description: "Get personalized guidance for your academic journey",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Student with laptop",
    title: "Global Education",
    description: "Connect with top universities worldwide",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    alt: "International campus",
    title: "Begin Your Journey",
    description: "From application to graduation, we're with you every step",
  },
];

export function HeroCarousel() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    const heroSection = document.getElementById("hero-carousel");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliding) {
        handleNextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, sliding]);

  const handlePrevSlide = useCallback(() => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setSliding(false), 500);
  }, [sliding]);

  const handleNextSlide = useCallback(() => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setSliding(false), 500);
  }, [sliding]);

  const goToSlide = useCallback((index) => {
    if (sliding || index === activeIndex) return;
    setSliding(true);
    setActiveIndex(index);
    setTimeout(() => setSliding(false), 500);
  }, [activeIndex, sliding]);

  return (
    <div
      id="hero-carousel"
      className={`w-[95%] h-[300px] md:h-[320px] shadow-xl rounded-md mx-auto my-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out h-[300px] md:h-[320px]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6 md:px-12">
                  <h2
                    className={`text-white text-2xl md:text-4xl font-bold mb-2 transition-all duration-500 ${
                      activeIndex === index
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-10 opacity-0"
                    }`}
                  >
                    {image.title}
                  </h2>
                  <p
                    className={`text-white/90 text-sm md:text-lg mb-4 max-w-md transition-all duration-500 delay-100 ${
                      activeIndex === index
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-10 opacity-0"
                    }`}
                  >
                    {image.description}
                  </p>
                  <button
                    className={`px-4 py-2 rounded-md w-fit button-3d bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-500 delay-200 ${
                      activeIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isMobile && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;