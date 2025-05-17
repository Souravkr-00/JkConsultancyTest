"use client"

import { useState, useEffect, useRef } from "react"
import { Play, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react"

// Custom hook for detecting if on mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

// YouTube video component with play overlay
const VideoThumbnail = ({ videoId, size }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  const sizeClasses = {
    small: "h-48 md:h-56",
    medium: "h-56 md:h-72",
    large: "h-64 md:h-96",
  }

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg ${sizeClasses[size]} w-full transition-transform duration-300 hover:scale-[1.02]`}
    >
      {!isPlaying ? (
        <div className="relative h-full w-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
          <img src={thumbnailUrl || "/placeholder.svg"} alt="Video thumbnail" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-300">
              <Play className="w-8 h-8 text-primary fill-current ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center">
              <ExternalLink className="w-4 h-4 text-white mr-2" />
              <span className="text-white text-sm font-medium">YouTube Shorts</span>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}

// Main testimonial component
const TestimonialsPage = () => {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(0)
  const containerRef = useRef(null)

  // Sample testimonial data with YouTube video IDs
  const testimonials = [
    { id: 1, videoId: "dQw4w9WgXcQ", size: "medium", parallaxSpeed: 1.1 },
    { id: 2, videoId: "dQw4w9WgXcQ", size: "large", parallaxSpeed: 0.9 },
    { id: 3, videoId: "dQw4w9WgXcQ", size: "small", parallaxSpeed: 1.2 },
    { id: 4, videoId: "dQw4w9WgXcQ", size: "medium", parallaxSpeed: 0.8 },
    { id: 5, videoId: "dQw4w9WgXcQ", size: "large", parallaxSpeed: 1.0 },
    { id: 6, videoId: "dQw4w9WgXcQ", size: "small", parallaxSpeed: 1.3 },
    { id: 7, videoId: "dQw4w9WgXcQ", size: "medium", parallaxSpeed: 0.7 },
    { id: 8, videoId: "dQw4w9WgXcQ", size: "large", parallaxSpeed: 1.1 },
    { id: 9, videoId: "dQw4w9WgXcQ", size: "small", parallaxSpeed: 0.9 },
    { id: 10, videoId: "dQw4w9WgXcQ", size: "medium", parallaxSpeed: 1.2 },
    { id: 11, videoId: "dQw4w9WgXcQ", size: "large", parallaxSpeed: 0.8 },
    { id: 12, videoId: "dQw4w9WgXcQ", size: "small", parallaxSpeed: 1.0 },
  ]

  // Parallax effect
  useEffect(() => {
    if (isMobile) return // Disable parallax on mobile for performance

    const handleScroll = () => {
      const elements = document.querySelectorAll(".parallax-item")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed"))
        const yPos = -((window.scrollY * speed) / 10)
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMobile])

  // For mobile, we'll paginate the testimonials
  const itemsPerPage = 4
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const paginatedTestimonials = isMobile
    ? testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : testimonials

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Student Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear directly from our students about their life-changing experiences studying abroad.
          </p>
        </div>

        {/* Desktop layout with parallax */}
        {!isMobile && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6" ref={containerRef}>
            <div className="space-y-6">
              {testimonials
                .filter((_, i) => i % 3 === 0)
                .map((testimonial) => (
                  <div key={testimonial.id} className="parallax-item" data-speed={testimonial.parallaxSpeed}>
                    <VideoThumbnail videoId={testimonial.videoId} size={testimonial.size} />
                  </div>
                ))}
            </div>
            <div className="space-y-6 mt-12">
              {testimonials
                .filter((_, i) => i % 3 === 1)
                .map((testimonial) => (
                  <div key={testimonial.id} className="parallax-item" data-speed={testimonial.parallaxSpeed}>
                    <VideoThumbnail videoId={testimonial.videoId} size={testimonial.size} />
                  </div>
                ))}
            </div>
            <div className="space-y-6 mt-24">
              {testimonials
                .filter((_, i) => i % 3 === 2)
                .map((testimonial) => (
                  <div key={testimonial.id} className="parallax-item" data-speed={testimonial.parallaxSpeed}>
                    <VideoThumbnail videoId={testimonial.videoId} size={testimonial.size} />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Mobile layout with pagination */}
        {isMobile && (
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paginatedTestimonials.map((testimonial) => (
                <div key={testimonial.id}>
                  <VideoThumbnail videoId={testimonial.videoId} size={testimonial.size} />
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button onClick={prevPage} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="text-gray-600">
                {currentPage + 1} / {totalPages}
              </div>
              <button onClick={nextPage} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestimonialsPage
