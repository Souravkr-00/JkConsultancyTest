import { useState, useEffect, useRef } from 'react';
import video from "../../assets/videos/bannervideo.mp4";
export default function VideoHeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <div 
      
      className="relative h-[70vh] w-full overflow-hidden"
    >
      {/* Video Background */}
      <div 
        className="absolute top-0 inset-0 w-full h-full transform">
        <video
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay for better text visibility */}
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-white/5 "></div>

      {/* Content */}
      {/* <div 
        className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ opacity }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white transition-all duration-700 ease-in-out transform">
            <span className={`inline-block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              Your Captivating Headline
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-700 mb-8 transition-all duration-700 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            A brief description of your brand or website. Keep it concise and impactful.
          </p>
          
          <button className={`px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '600ms' }}>
            Get Started
          </button>
        </div>
      </div> */}

      
      
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out opacity-100`}>
        <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-800 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
}