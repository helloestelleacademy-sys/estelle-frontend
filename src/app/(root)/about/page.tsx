import Details from '@/components/about/Details'
import Header from '@/components/about/Header'
import Instructors from '@/components/about/Instructors'
import Values from '@/components/about/Values'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Details />
      <Values />
      <Instructors />
      <Footer />
    </div>
  )
}

export default page
