import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, School, Users, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import collegesData from '../../data/data.json';
export default function CollegesSection() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [visibleCards, setVisibleCards] = useState({});
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const collegesRef = useRef(null);
  
  // Simulate fetching data from data.json
  useEffect(() => {
    // This would typically be a fetch call to your data.json file
    // For demonstration purposes, I'm using a sample dataset based on your example
    const fetchData = async () => {
      try {
        // In a real implementation, you would fetch from your data.json:
        // const response = await fetch('/data.json');
        const data = collegesData; // Replace with the actual fetch call
        // const data = await response.json();  
        setColleges(data);
        setFilteredColleges(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch college data:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Extract all unique countries and programs
  const allCountries = [...new Set(colleges.map(college => college.country))];
  const allPrograms = [...new Set(colleges.flatMap(college => college.programmes || []))];
  
  // Filter colleges based on search term, selected countries and programs
  useEffect(() => {
    const filtered = colleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = selectedCountries.length === 0 || 
                            selectedCountries.includes(college.country);
      
      const matchesProgram = selectedPrograms.length === 0 || 
                            selectedPrograms.some(program => 
                              college.programmes && college.programmes.some(p => 
                                p.toLowerCase().includes(program.toLowerCase())
                              )
                            );
      
      return matchesSearch && matchesCountry && matchesProgram;
    });
    
    setFilteredColleges(filtered);
  }, [searchTerm, selectedCountries, selectedPrograms, colleges]);
  
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
    
    const collegeCards = document.querySelectorAll('.college-card');
    collegeCards.forEach(card => observer.observe(card));
    
    return () => {
      collegeCards.forEach(card => observer.unobserve(card));
    };
  }, [filteredColleges]);
  
  const toggleCountry = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };
  
  const toggleProgram = (program) => {
    if (selectedPrograms.includes(program)) {
      setSelectedPrograms(selectedPrograms.filter(p => p !== program));
    } else {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };
  
  const toggleExpandCollege = (id) => {
    if (expandedCollege === id) {
      setExpandedCollege(null);
    } else {
      setExpandedCollege(id);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-9/10 mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Partner Medical Colleges</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our network of prestigious medical institutions around the world that offer
          internationally recognized degrees and exceptional education experiences.
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>
        
        <div className="mb-4">
          <h3 className="text-center text-gray-700 font-medium mb-2">Filter by Country</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {allCountries.map(country => (
              <button
                key={country}
                onClick={() => toggleCountry(country)}
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCountries.includes(country)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapPin className="w-3 h-3 mr-1" />
                {country}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-center text-gray-700 font-medium mb-2">Filter by Program</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {allPrograms.slice(0, 8).map((program, index) => (
              <button
                key={index}
                onClick={() => toggleProgram(program)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedPrograms.includes(program)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {program.split('(')[0].trim()}
              </button>
            ))}
            {allPrograms.length > 8 && (
              <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                +{allPrograms.length - 8} more
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Group colleges by country */}
      {allCountries
        .filter(country => selectedCountries.length === 0 || selectedCountries.includes(country))
        .filter(country => 
          filteredColleges.some(college => college.country === country)
        )
        .map(country => (
          <div key={country} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MapPin className="mr-2 text-blue-500" /> {country}
              <span className="ml-2 text-base font-normal text-gray-500">
                ({filteredColleges.filter(c => c.country === country).length} colleges)
              </span>
            </h3>
            
            <div ref={collegesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredColleges
                .filter(college => college.country === country)
                .map((college, index) => (
                  <a href={`colleges/college/${college.name}`}>
                  <div
                    key={college.id}
                    data-id={college.id}
                    className={`college-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 transform ${
                      visibleCards[college.id] 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <div className="h-40 bg-gray-200 relative overflow-hidden">
                      {/* We're using a placeholder div instead of an actual image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-semibold text-lg leading-tight">{college.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{college.country}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Est. {college.foundingYear}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{college.description}</p>
                      
                      <div className="mb-4">
                        <div className="text-xs font-medium text-gray-500 mb-1">Available Programs:</div>
                        <div className="flex flex-wrap gap-1">
                          {college.programmes && college.programmes.slice(0, 2).map((program, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">
                              {program.split('(')[0].trim()}
                            </span>
                          ))}
                          {college.programmes && college.programmes.length > 2 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded">
                              +{college.programmes.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4 text-sm">
                        <div className="font-medium">Tuition:</div>
                        <div className="text-blue-600">{college.tuitionFees?.internationalStudents || "Contact for details"}</div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <button 
                          onClick={() => toggleExpandCollege(college.id)}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {expandedCollege === college.id ? (
                            <>Less info <ChevronUp className="ml-1 w-4 h-4" /></>
                          ) : (
                            <>More info <ChevronDown className="ml-1 w-4 h-4" /></>
                          )}
                        </button>
                        
                        <a 
                          href={college.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                        >
                          Website <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                      </div>
                      
                      {/* Expanded info */}
                      {expandedCollege === college.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                          <p className="text-sm text-gray-600 mb-4">{college.longDescription}</p>
                          
                          <div className="mb-3">
                            <div className="text-xs font-medium text-gray-500 mb-1">Accreditation:</div>
                            <ul className="text-xs text-gray-600 list-disc pl-4">
                              {college.accreditation && college.accreditation.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mb-3">
                            <div className="text-xs font-medium text-gray-500 mb-1">Contact:</div>
                            <div className="text-xs text-gray-600">{college.email}</div>
                            <div className="text-xs text-gray-600">{college.contactNumber}</div>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            {college.address}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  </a>
                ))}
            </div>
          </div>
        ))}
      
      {filteredColleges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No colleges match your search criteria. Please try different keywords or filters.</p>
        </div>
      )}
    </div>
  );
}
