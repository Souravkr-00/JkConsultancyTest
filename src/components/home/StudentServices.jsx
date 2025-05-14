import React from "react";
import { useEffect, useRef, useState } from 'react';
import { GraduationCap, FileText, Plane, Home, Globe, Phone, MapPin, Award } from 'lucide-react';

// Animation clip paths
const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

// Animation utility hook
const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

// Animation hook similar to framer-motion's useAnimate
const useSimpleAnimate = () => {
  const ref = useRef(null);
  
  const animate = (element, { clipPath }) => {
    if (!element) return;
    
    const [startClip, endClip] = clipPath;
    
    element.style.clipPath = startClip;
    
    // Force a reflow to ensure the initial state is applied
    void element.offsetWidth;
    
    // Apply transition and final state
    element.style.transition = 'clip-path 0.5s ease-out';
    element.style.clipPath = endClip;
  };
  
  return [ref, animate];
};

const ServiceCard = ({ Icon, title, description, delay }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const [scope, animate] = useSimpleAnimate();

  const getNearestSide = (e) => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`transition-all duration-700 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white border border-gray-200 grid h-36 sm:h-40  place-content-center cursor-pointer rounded-lg overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="text-blue-600 mb-3">
            <Icon size={28} />
          </div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>

        <div
          ref={scope}
          style={{
            clipPath: BOTTOM_RIGHT_CLIP,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-5 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white"
        >
          <div className="mb-3">
            <Icon size={28} />
          </div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-xs text-blue-50 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function StudentServices() {
  const services = [
    {
      icon: GraduationCap,
      title: "Free Career Counselling",
      description: "Personalized guidance to help you choose the right course and university based on your profile and goals."
    },
    {
      icon: FileText,
      title: "Admission Assistance",
      description: "Complete support with university applications, document preparation, and meeting deadlines."
    },
    {
      icon: Globe,
      title: "Visa Assistance",
      description: "Expert guidance through the entire visa application process, including preparation for interviews."
    },
    {
      icon: Plane,
      title: "Travel Assistance",
      description: "Help with flight bookings, pre-departure briefings, and essential travel preparations."
    },
    {
      icon: Home,
      title: "Accommodation Assistance",
      description: "Support in finding suitable and affordable housing options near your university campus."
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock assistance for any queries or concerns before and after your departure."
    },
    {
      icon: MapPin,
      title: "Destination Guidance",
      description: "Comprehensive information about your study destination, including culture, weather, and lifestyle."
    },
    {
      icon: Award,
      title: "Scholarship Guidance",
      description: "Expert advice on available scholarships and financial aid opportunities to fund your education abroad."
    }
  ];

  // Animation for section heading
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 });

  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8 w-full md:max-w-9/10 my-20 mx-auto shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headingRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isHeadingInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Student Services</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            We provide comprehensive support throughout your study abroad journey, from choosing the right program to settling into your new home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              Icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}