import { useState, useRef } from 'react';
import { 
  Target, 
  Compass, 
  Link2, 
  Globe,
  ArrowUpRight
} from 'lucide-react';

export default function InternationalEducationHighlight() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const cardRefs = useRef([]);

  const educationStatistics = [
    {
      icon: Globe,
      title: "Global Reach",
      value: "500+",
      suffix: "Universities",
      description: "Extensive network of partnered institutions spanning multiple continents, offering diverse learning opportunities.",
      color: "from-blue-500 to-indigo-600",
      hoverBackground: "bg-blue-50"
    },
    {
      icon: Compass,
      title: "Student Success",
      value: "95%",
      suffix: "Placement",
      description: "Impressive career success rate, with graduates securing positions in prestigious medical institutions worldwide.",
      color: "from-green-500 to-teal-600",
      hoverBackground: "bg-green-50"
    },
    {
      icon: Link2,
      title: "International Network",
      value: "40+",
      suffix: "Countries",
      description: "Comprehensive global connections providing students with unparalleled international exposure and opportunities.",
      color: "from-purple-500 to-pink-600",
      hoverBackground: "bg-purple-50"
    },
    {
      icon: Target,
      title: "Academic Excellence",
      value: "Top 1%",
      suffix: "Programs",
      description: "Meticulously curated programs recognized globally for their exceptional quality and innovative approach.",
      color: "from-orange-500 to-red-600",
      hoverBackground: "bg-orange-50"
    }
  ];

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    
    // 3D tilt effect
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1.05)';
      card.style.boxShadow = '0 20px 30px rgba(0,0,0,0.1)';
      card.style.zIndex = '10';
    }
  };

  const handleMouseLeave = (index) => {
    setHoveredItem(null);
    
    // Reset 3D tilt
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
      card.style.zIndex = '1';
    }
  };

  return (
    <section className="relative py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your Global Medical Education Journey
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Transforming medical education through global perspectives and innovative learning.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {educationStatistics.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredItem === index;

            return (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className={`
                  relative group overflow-hidden rounded-xl p-5 text-center transition-all duration-500 ease-in-out
                  transform hover:scale-105 cursor-pointer
                  ${isHovered ? stat.hoverBackground : 'bg-gray-50'}
                  border border-transparent hover:border-gray-100
                `}
              >
                {/* Animated Background Glow */}
                {isHovered && (
                  <div 
                    className={`
                      absolute -inset-px blur-xl opacity-50 
                      bg-gradient-to-r ${stat.color}
                    `}
                  ></div>
                )}

                <div className="relative z-10">
                  <div className={`
                    mx-auto w-14 h-14 mb-3 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isHovered 
                      ? `bg-gradient-to-br ${stat.color} text-white` 
                      : 'bg-gray-100 group-hover:bg-gray-200'}
                  `}>
                    <IconComponent 
                      className={`w-7 h-7 
                        ${isHovered 
                          ? 'text-white' 
                          : 'text-gray-600 group-hover:text-gray-800'}
                      `} 
                    />
                  </div>

                  <div className="font-bold text-xl mb-1">
                    {stat.value}
                    <span className="text-sm ml-1 opacity-70">{stat.suffix}</span>
                  </div>

                  <p className={`
                    text-xs text-gray-600 transition-all duration-300
                    ${isHovered 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2'}
                  `}>
                    {stat.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className={`
                    absolute bottom-2 right-2 transition-all duration-300
                    ${isHovered 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-2'}
                  `}>
                    <ArrowUpRight 
                      className={`
                        w-5 h-5 
                        ${isHovered 
                          ? 'text-blue-600' 
                          : 'text-transparent'}
                      `} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Blurred Backgrounds */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
}