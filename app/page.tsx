'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import SavingsCalculator from '@/components/SavingsCalculator'
import PricingPreview from '@/components/PricingPreview'
import ResultsPreview from '@/components/ResultsPreview'
import Testimonials from '@/components/Testimonials'
import BillMonitoringPreview from '@/components/BillMonitoringPreview'
import FAQAccordion from '@/components/FAQAccordion'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import MobileBottomCTA from '@/components/MobileBottomCTA'

// Dynamic imports for performance
const AmbientFXCanvas = dynamic(() => import('@/components/AmbientFXCanvas'), {
  ssr: false,
})
const AssistantWidget = dynamic(() => import('@/components/AssistantWidget'), {
  ssr: false,
})

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Ambient FX Canvas */}
      <AmbientFXCanvas />

      {/* Navigation */}
      <Navbar onOpenModal={openModal} />

      {/* Main Content */}
      <main>
        <Hero onOpenModal={openModal} />
        <HowItWorks onOpenModal={openModal} />
        <SavingsCalculator onOpenModal={openModal} />
        <PricingPreview onOpenModal={openModal} />
        <ResultsPreview />
        <Testimonials />
        <BillMonitoringPreview onOpenModal={openModal} />
        <FAQAccordion />
        <FinalCTA onOpenModal={openModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Intake Modal */}
      <IntakeModal isOpen={isModalOpen} onClose={closeModal} />

      {/* AI Assistant Widget */}
      <AssistantWidget />

      {/* Mobile Sticky CTA */}
      <MobileBottomCTA onOpenModal={openModal} />
    </>
  )
}
