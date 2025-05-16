import { useState, useEffect, useRef } from 'react';
import { Search, Tag, ArrowRight } from 'lucide-react';

export default function CoursesSection() {
  const allMedicalProgrammes = [
    {
      title: "General Medicine",
      duration: "6 years",
      tags: ["medicine", "popular"],
      description: "Complete medical education preparing students to become general practitioners."
    },
    {
      title: "Dentistry",
      duration: "5 years",
      tags: ["medicine", "dental"],
      description: "Comprehensive program focused on oral health and dental procedures."
    },
    {
      title: "Pharmacy",
      duration: "5 years",
      tags: ["medicine", "pharmacy"],
      description: "Training in pharmaceutical sciences and medication management."
    },
    {
      title: "Postgraduate Medical Education",
      duration: "Varies",
      tags: ["medicine", "postgraduate"],
      description: "Advanced specialization for medical graduates."
    },
    {
      title: "Public Health",
      duration: "4 years",
      tags: ["medicine", "health"],
      description: "Focus on population health, prevention, and health policy."
    },
    {
      title: "Military Medicine",
      duration: "6 years",
      tags: ["medicine", "military"],
      description: "Medical training with focus on military-specific healthcare needs."
    },
    {
      title: "Nursing",
      duration: "4 years",
      tags: ["medicine", "nursing"],
      description: "Professional education for nursing practice and patient care."
    },
    {
      title: "Traditional Medicine",
      duration: "6 years",
      tags: ["medicine", "traditional", "alternative"],
      description: "Integration of traditional medical practices with modern healthcare."
    },
    {
      title: "Traditional Pharmacy",
      duration: "5 years",
      tags: ["medicine", "pharmacy", "traditional"],
      description: "Study of herbal and traditional pharmaceutical approaches."
    },
    {
      title: "Acupuncture and Eastern Medicine",
      duration: "5 years",
      tags: ["medicine", "traditional", "eastern"],
      description: "Training in acupuncture techniques and Eastern medical philosophy."
    },
    {
      title: "Medical Rehabilitation",
      duration: "4 years",
      tags: ["medicine", "rehabilitation"],
      description: "Focus on helping patients recover physical functions after injury or illness."
    },
    {
      title: "Medical Psychology",
      duration: "5 years",
      tags: ["medicine", "psychology"],
      description: "Integration of psychological principles in healthcare settings."
    },
    {
      title: "Pediatrics",
      duration: "6 years",
      tags: ["medicine", "pediatric"],
      description: "Specialized focus on children's health and development."
    },
    {
      title: "Preventive Medicine",
      duration: "6 years",
      tags: ["medicine", "preventive"],
      description: "Focus on disease prevention and health promotion strategies."
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(allMedicalProgrammes);
  const [visibleCards, setVisibleCards] = useState({});
  
  const coursesRef = useRef(null);
  
  // Extract all unique tags
  const allTags = [...new Set(allMedicalProgrammes.flatMap(course => course.tags))];
  
  // Filter courses based on search term and selected tags
  useEffect(() => {
    const filtered = allMedicalProgrammes.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => course.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedTags]);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          setVisibleCards(prev => ({ ...prev, [id]: true }));
        }
      });
    }, options);
    
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => observer.observe(card));
    
    return () => {
      courseCards.forEach(card => observer.unobserve(card));
    };
  }, [filteredCourses]);
  
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Our Medical Programs</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive range of international medical programs, designed to
          provide world-class education for your future healthcare career.
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Course Cards */}
      <div ref={coursesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course, index) => (
          <a href="">
          <div
            key={index}
            data-id={index}
            className={`course-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 transform ${
              visibleCards[index] 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <div className="flex gap-1 mb-3">
                  {course.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-blue-600 mb-3">{course.duration}</p>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              </div>
              
              <div className="mt-auto">
                <button className="group flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Learn more 
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
          </a>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No courses match your search criteria. Please try different keywords or filters.</p>
        </div>
      )}
    </div>
  );
}