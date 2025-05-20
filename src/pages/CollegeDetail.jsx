import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Award, 
  BookOpen, 
  DollarSign, 
  Home, 
  Users, 
  Activity,
  ArrowLeft,
  Building,
  Book,
  Briefcase,
  NotebookPen,
} from 'lucide-react';
import collegesData from '../data/data.json'; // Adjust the path as necessary

export default function CollegeDetail() {
  const { collegeName } = useParams();
  const [college, setCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
   
  useEffect(() => {
    // Simulate fetching from data.json
    const fetchCollegeDetails = async () => {
      try {
        // In a real implementation, you might fetch from an API
        // For now, we'll filter from the imported data
        const decodedName = decodeURIComponent(collegeName);
        const foundCollege = collegesData.find(c => c.name === decodedName);
        
        if (foundCollege) {
          setCollege(foundCollege);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch college details:", error);
        setIsLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [collegeName]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">College Not Found</h2>
        <p className="text-gray-600 mb-6">The college you're looking for doesn't exist or has been removed.</p>
        <Link to="/colleges" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Back button */}
      <Link to="/colleges" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to colleges
      </Link>
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg mb-8">
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          {college.image ? (
            <img 
              src={college.image} 
              alt={college.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=No+Image+Available";
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Building className="w-24 h-24 text-white opacity-40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center text-white/80 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{college.country}</span>
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>Est. {college.foundingYear}</span>
              {college.ranking && (
                <>
                  <span className="mx-2">•</span>
                  <Award className="w-4 h-4 mr-1" />
                  <span>{college.ranking}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">{college.name}</h1>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Main info */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'programs' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Book className="mr-2 h-4 w-4" />
                Programs
              </button>
              <button
                onClick={() => setActiveTab('facilities')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'facilities' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building className="mr-2 h-4 w-4" />
                Facilities
              </button>
              <button
                onClick={() => setActiveTab('student-life')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'student-life' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="mr-2 h-4 w-4" />
                Student Life
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="pb-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">About {college.name}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {college.longDescription || college.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Accreditation</h3>
                  {college.accreditation && college.accreditation.length > 0 ? (
                    <ul className="space-y-2">
                      {college.accreditation.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Accreditation information not available</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                      Tuition Fees
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">International Students:</span>
                        <span className="font-medium text-gray-800">
                          {college.tuitionFees?.internationalStudents || "Contact for details"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Local Students:</span>
                        <span className="font-medium text-gray-800">
                          {college.tuitionFees?.localStudents || "Contact for details"}
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                      <Building className="h-5 w-5 text-blue-500 mr-2" />
                      Campus Information
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Campus Area:</span>
                        <span className="font-medium text-gray-800">{college.campusArea || "Not specified"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-800">{college.address?.split(',').pop().trim() || college.country}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Programs</h2>
                
                {college.programmes && college.programmes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.programmes.map((program, index) => {
                      // Extract program name and duration if available
                      const matches = program.match(/(.+?)(?:\s*\((\d+)\s*years?\))?$/i);
                      const programName = matches?.[1] || program;
                      const duration = matches?.[2] ? `${matches[2]} years` : null;
                      
                      return (
                        <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="font-medium text-gray-800">{programName}</h3>
                          {duration && (
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{duration}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Program information not available</p>
                )}
                
                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Interested in applying?</h3>
                  <p className="text-gray-600 mb-4">Contact the admissions office for detailed information about application requirements and deadlines.</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {college.email && (
                      <a href={`mailto:${college.email}`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Admissions
                      </a>
                    )}
                    
                    {college.website && (
                      <a href={college.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Facilities Tab */}
            {activeTab === 'facilities' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Academic Facilities</h2>
                
                {college.academicFacilities && college.academicFacilities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {college.academicFacilities.map((facility, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{facility}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Facility information not available</p>
                )}
                
                <div className="mt-8">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 italic">Campus photos would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Student Life Tab */}
            {activeTab === 'student-life' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Student Life</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Home className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">Accommodation</h3>
                    </div>
                    <p className="text-gray-600">
                      {college.studentLife?.accommodation || "Information about student accommodation not available"}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">International Student Support</h3>
                    </div>
                    <p className="text-gray-600">
                      {college.studentLife?.internationalStudentSupport 
                        ? "The college provides support services for international students."
                        : "Information about international student support not available"}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-800 mb-4">Extracurricular Activities</h3>
                
                {college.studentLife?.extracurricularActivities && college.studentLife.extracurricularActivities.length > 0 ? (
                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                    <ul className="divide-y divide-gray-100">
                      {college.studentLife.extracurricularActivities.map((activity, index) => (
                        <li key={index} className="py-3 flex items-start">
                          <Activity className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Information about extracurricular activities not available</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Contact info and key stats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-6">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
              <ul className="space-y-4">
                {college.email && (
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Email:</div>
                      <a href={`mailto:${college.email}`} className="text-blue-600 hover:underline">{college.email}</a>
                    </div>
                  </li>
                )}
                
                {college.contactNumber && (
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Phone:</div>
                      <a href={`tel:${college.contactNumber.replace(/\s/g, '')}`} className="text-gray-800">{college.contactNumber}</a>
                    </div>
                  </li>
                )}
                
                {college.website && (
                  <li className="flex items-start">
                    <Globe className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Website:</div>
                      <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
                        {college.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  </li>
                )}
                
                {college.address && (
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Address:</div>
                      <address className="not-italic text-gray-800">
                        {college.address}
                      </address>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                {college.foundingYear && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium text-gray-800">{college.foundingYear}</span>
                  </li>
                )}
                
                {college.ranking && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Ranking:</span>
                    <span className="font-medium text-gray-800">{college.ranking}</span>
                  </li>
                )}
                
                {college.programmes && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Programs:</span>
                    <span className="font-medium text-gray-800">{college.programmes.length}</span>
                  </li>
                )}
                
                {college.campusArea && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Campus Size:</span>
                    <span className="font-medium text-gray-800">{college.campusArea}</span>
                  </li>
                )}
              </ul>
              
              {college.website && (
                <div className="mt-6">
                  <a 
                    href={college.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors my-2"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Official Website
                  </a>
                  <a 
                    href={"/bookconsult"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors my-2"
                  >
                    <NotebookPen  className="mr-2 h-4 w-4" />
                    Book a Free Consultation
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}