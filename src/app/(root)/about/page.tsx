import Details from '@/components/about/Details'
import Header from '@/components/about/Header'
import Instructors from '@/components/about/Instructors'
import Values from '@/components/about/Values'
import Cta from '@/components/Cta'
import Features from '@/components/Features'
import React from 'react'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Estelle's mission to empower professionals with personal branding skills. Meet our team and discover our vision.",
};

const AboutPage = () => {
  return (
    <div>
      <Header />
      <Details />
      <Values />
      <Features />
      <Instructors />
      <Cta />
    </div>
  )
}

export default AboutPage
