import Details from '@/components/about/Details'
import Header from '@/components/about/Header'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Details />
      <Footer />
    </div>
  )
}

export default page
