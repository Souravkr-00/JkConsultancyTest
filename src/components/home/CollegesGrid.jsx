import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

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

// College Card Component
const CollegeCard = ({ college, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { threshold: 0.1 });
  
  return (
    <a href={`/colleges/college/${college.name}`}>
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <img 
          src={college.image} 
          alt={college.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {college.country && (
          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-medium z-20">
            {college.country}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">{college.name}</h3>
        <div className="flex items-center text-xs text-gray-600 space-x-2 mb-2">
          <span>{college.location}</span>
          {college.ranking && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span className="font-medium">Rank: #{college.ranking}</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-blue-600 font-medium">
            {college.programs} Programs
          </div>
          <div className="text-xs text-gray-500">
            {college.fees}
          </div>
        </div>
      </div>
    </div>
    </a>
  );
};

// Main Component
export default function CollegesGrid() {
  // Sample college data
  const colleges = [
    {
      name: "Erebuni Medical Academy Foundation",
      location: "Yerevan, Armenia",
      country: "Armenia",
      image: "https://www.erebuniacademy.am/media/erebuni_academy_site/blogs/main/351874006_794689005380590_836841605669193073_n.jpg"
    },
    {
      name: "University of Oxford",
      location: "Ulitsa Komsomol'skaya, 95, Oryol, Oryol Oblast, Russia, 302026",
      country: "Russia",
      image: "https://www.kp.ru/best/vrn/vuz/images/tild3935-6166-4033-b630-323139306430__111.jpg"
    },
    {
      name: "Georgian National University SEU",
      location: "9 Tsinandali Street, Tbilisi, Georgia",
      country: "Georgia",
      image: "https://blog.rmgoe.org/wp-content/uploads/2023/11/Georgian-National-University.jpg"
    },
    {
      name: "Yerevan State Medical University",
      location: "2 Koryun St, Yerevan 0025, Armenia",
      country: "Armenia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0YjHO6rA6UVoRh3Mao2VK66oogU30SvaXng&s"
    },
    {
      name: "Bashkir State Medical University",
      location: "Ulitsa Lenina, 3, Ufa, Republic of Bashkortostan, Russia, 450008",
      country: "Russia",
      image: "https://www.ruseducation.in/wp-content/uploads/2022/01/Bashkir-State-Medical-University.webp"
    },
    {
      name: "University of Toronto",
      location: "N2 University St, Tbilisi 0177, Georgia",
      country: "Georgia",
      image: "https://d3d0lqu00lnqvz.cloudfront.net/media/media/UofT_cmh2315fl.jpg"
    },
    {
      name: "International Medical University",
      location: "1/17, Bishkek, Kyrgyzstan",
      country: "Krgyzstan",
      image: "https://static.wixstatic.com/media/9cdbfb_5e435595fab544d59c3eddbddbc2a052~mv2.jpg/v1/fill/w_2362,h_1575,al_c,q_90/International%20Medical%20University%20Malaysia.jpg"
    },
    {
      name: "Orel State University",
      location: "Ulitsa Komsomol'skaya, 95, Oryol, Oryol Oblast, Russia, 302026",
      country: "Russia",
      image: "https://www.kp.ru/best/vrn/vuz/images/tild3935-6166-4033-b630-323139306430__111.jpg"
    }
  ];

  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { threshold: 0.1 });
  
  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef, { threshold: 0.1 });

  return (
    <section className="w-full md:max-w-9/10 mx-auto shadow-xl py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={sectionRef}
          className={`mb-10 transition-all duration-700 ease-out ${
            isSectionInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col justify-center items-center flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top-Ranked Colleges</h2>
              <p className="text-gray-600 mt-2">Explore prestigious universities around the world</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {colleges.map((college, index) => (
              <CollegeCard key={index} college={college} index={index} />
            ))}
          </div>
          
          <div 
            ref={buttonRef}
            className={`flex justify-end mt-8 transition-all duration-500 ease-out ${
              isButtonInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}
          >
          <a href="/colleges" className="w-full sm:w-auto">
            <button className="group flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
              <span>Explore More Colleges</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}