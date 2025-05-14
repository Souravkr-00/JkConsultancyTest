import React from 'react'
import CollegesSection from '../components/collegesPage/CollegesSection'
import CollegeBanner from '../components/collegesPage/CollegeBanner'
import InternationalEducationHighlight from '../components/collegesPage/InternationalEducationHighlight'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'

function Colleges() {
  return (
    <div className='max-w-10xl mx-auto overflow-hidden'>
        <CollegeBanner/>
        <CollegesSection/>
        <InternationalEducationHighlight/>
        <TestimonialsSection/>
    </div>
  )
}

export default Colleges