import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, University } from 'lucide-react';

const CollegeBanner = () => {
  const colleges = [
    {
      name: "Erebuni Medical Academy Foundation",
      location: "Yerevan, Armenia",
      country: "Armenia",
      image: "https://www.erebuniacademy.am/media/erebuni_academy_site/blogs/main/351874006_794689005380590_836841605669193073_n.jpg"
    },
    {
      name: "University of Oxford",
      location: "Ulitsa Komsomol'skaya, 95, Oryol, Russia",
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
      location: "Ulitsa Lenina, 3, Ufa, Russia",
      country: "Russia",
      image: "https://www.ruseducation.in/wp-content/uploads/2022/01/Bashkir-State-Medical-University.webp"
    },
    {
      name: "University of Toronto",
      location: "N2 University St, Tbilisi, Georgia",
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
      location: "Ulitsa Komsomol'skaya, 95, Oryol, Russia",
      country: "Russia",
      image: "https://www.kp.ru/best/vrn/vuz/images/tild3935-6166-4033-b630-323139306430__111.jpg"
    }
  ];

  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (column1Ref.current && column2Ref.current) {
      // Column 1 moves upward (negative value) - smoother animation with reduced speed
      column1Ref.current.style.transform = `translateY(-${scrollY * 0.5}px)`;
      // Column 2 moves downward (positive value) - smoother animation with reduced speed
      column2Ref.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  }, [scrollY]);

  // Split colleges into two equal groups
  const midPoint = Math.ceil(colleges.length / 2);
  const column1Colleges = colleges.slice(0, midPoint);
  const column2Colleges = colleges.slice(midPoint);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      {/* Reduced height as requested */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-5/12 text-white z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
              Discover <span className="text-sky-400">Global</span> Educational Opportunities
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-6 max-w-xl opacity-0 animate-[fade-in_0.8s_0.3s_forwards]">
              Explore top universities and medical academies worldwide to launch your international academic journey.
            </p>
            <div className="flex flex-wrap gap-3 opacity-0 animate-[fade-in_0.8s_0.6s_forwards]">
              <button className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-md transition-all duration-300 flex items-center text-sm md:text-base shadow-lg hover:shadow-sky-500/20">
                View Universities <ChevronRight className="ml-1.5 h-4 w-4" />
              </button>
              <a href='/bookconsult'>
              <button className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-md transition-all duration-300 text-sm md:text-base cursor-pointer shadow-lg hover:shadow-sky-500/20 flex items-center">
                Get Free Consultation
              </button>
              </a>
            </div>
          </div>

          {/* Right Side - Two-Column Scrollable Image Collage */}
          <div className="w-full md:w-7/12 h-[350px] md:h-[400px] relative overflow-hidden mt-6 md:mt-0">
            <div className="grid grid-cols-2 gap-2.5 h-full">
              {/* Column 1 - Moves Upward on Scroll */}
              <div ref={column1Ref} className="space-y-2.5 transition-transform duration-300 ease-out">
                {column1Colleges.map((college, index) => (
                  <div 
                    key={`col1-${index}`} 
                    className="relative overflow-hidden rounded-lg shadow-lg transform transition-all hover:scale-[1.02] duration-500 hover:shadow-xl"
                    style={{
                      opacity: 0,
                      animation: `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`,
                    }}
                  >
                    <img 
                      src={college.image || "/placeholder.svg"} 
                      alt={college.name}
                      className="w-full h-36 object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Column 2 - Moves Downward on Scroll */}
              <div ref={column2Ref} className="space-y-2.5 transition-transform duration-300 ease-out">
                {column2Colleges.map((college, index) => (
                  <div 
                    key={`col2-${index}`}
                    className="relative overflow-hidden rounded-lg shadow-lg transform transition-all hover:scale-[1.02] duration-500 hover:shadow-xl"
                    style={{
                      opacity: 0,
                      animation: `fadeInUp 0.8s ease-out ${(index + column1Colleges.length) * 0.1}s forwards`,
                      animationDelay: `${0.2 + index * 0.1}s`,
                    }}
                  >
                    <img 
                      src={college.image || "/placeholder.svg"} 
                      alt={college.name}
                      className="w-full h-36 object-cover"
                    />
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern background decoration with subtle glow effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute right-10 top-10 w-64 h-64 rounded-full bg-sky-400 blur-[100px]"></div>
        <div className="absolute left-10 bottom-10 w-64 h-64 rounded-full bg-indigo-500 blur-[100px]"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CollegeBanner;
