'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Navbar onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        <HowItWorks onOpenModal={openModal} />
        <FinalCTA onOpenModal={openModal} />
      </main>

      <Footer />

      <IntakeModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
