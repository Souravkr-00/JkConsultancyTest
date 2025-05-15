import React from 'react'

import FlagsHeroSection from '../components/home/FlagsHeroSection.jsx'
import CollegesGrid from '../components/home/CollegesGrid.jsx'
import { AuroraHero } from '../components/common/AuroraHero.jsx'
import StudentServices from '../components/home/StudentServices.jsx'
import StudyAbroadSteps from '../components/home/StudyAbroadSteps.jsx'
import CoursesSection from '../components/home/CoursesSection.jsx'
import VideoTestimonials from '../components/home/VideoTestimonials.jsx'
import FAQSection from '../components/common/FAQSection.jsx'
import VideoHeroBanner from '../components/common/VideoHeroBanner.jsx'

function Home() {
  return (
    <div className='max-w-10xl mx-auto'>
        <VideoHeroBanner/>
        {/* <HeroCarousel/> */}
        <FlagsHeroSection/>
        <CollegesGrid/>
        <StudentServices/>
        <CoursesSection/>
        <StudyAbroadSteps/>
        <VideoTestimonials/>
        <AuroraHero/>
         <FAQSection/>
         
        
    </div>
  )
}

export default Home