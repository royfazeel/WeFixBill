'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButton from '@/components/FloatingButton'
import IntakeModal from '@/components/IntakeModal'

const services = [
  {
    id: 'internet',
    name: 'Internet Bills',
    icon: '🌐',
    description: 'We negotiate with major ISPs like Comcast, Spectrum, AT&T, Verizon, and more to get you the best rates.',
    avgSavings: '$45/month',
    yearlySavings: '$540/year',
    providers: ['Comcast/Xfinity', 'Spectrum', 'AT&T', 'Verizon', 'Cox', 'Frontier'],
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'cable',
    name: 'Cable & TV',
    icon: '📺',
    description: 'Cut your cable bill without cutting the cord. We find hidden discounts and negotiate promotional rates.',
    avgSavings: '$38/month',
    yearlySavings: '$456/year',
    providers: ['DirecTV', 'Dish Network', 'YouTube TV', 'Hulu Live', 'Sling TV'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'wireless',
    name: 'Wireless Plans',
    icon: '📱',
    description: 'Mobile phone bills are often inflated. We analyze your usage and find the perfect plan at a better price.',
    avgSavings: '$52/month',
    yearlySavings: '$624/year',
    providers: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'US Cellular'],
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: '⚡',
    description: 'Energy bills can be negotiated in deregulated markets. We find competitive rates and manage provider switches.',
    avgSavings: '$35/month',
    yearlySavings: '$420/year',
    providers: ['Electric providers', 'Gas companies', 'Water services'],
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    icon: '💳',
    description: 'Streaming services, software subscriptions, gym memberships - we find discounts and cancel unused services.',
    avgSavings: '$28/month',
    yearlySavings: '$336/year',
    providers: ['Netflix', 'Spotify', 'Adobe', 'Microsoft', 'Gym memberships'],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: '🛡️',
    description: 'Home, auto, and renters insurance often have negotiable rates. We shop around and find better coverage for less.',
    avgSavings: '$67/month',
    yearlySavings: '$804/year',
    providers: ['Home insurance', 'Auto insurance', 'Renters insurance', 'Life insurance'],
    gradient: 'from-pink-500 to-rose-500',
  },
]

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="section-container text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-50 border border-purple-100">
              <span className="text-sm font-medium text-purple-700">All Bill Types</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Bills We <span className="gradient-text">Negotiate</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              From internet to insurance, we handle negotiations for all your recurring bills. 
              If it&apos;s a monthly expense, we can probably lower it.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="section-container mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="stripe-card p-8"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{service.description}</p>
                
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
                    <div className="text-emerald-600 font-bold">{service.avgSavings}</div>
                    <div className="text-emerald-600 text-xs">Avg. Savings</div>
                  </div>
                  <div className="flex-1 bg-indigo-50 rounded-xl p-3 text-center">
                    <div className="text-indigo-600 font-bold">{service.yearlySavings}</div>
                    <div className="text-indigo-600 text-xs">Per Year</div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Providers we negotiate with</p>
                  <div className="flex flex-wrap gap-1">
                    {service.providers.slice(0, 4).map((provider, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {provider}
                      </span>
                    ))}
                    {service.providers.length > 4 && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        +{service.providers.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <FloatingButton
                  onClick={() => setIsModalOpen(true)}
                  variant="secondary"
                  size="sm"
                  fullWidth
                >
                  Get Quote
                </FloatingButton>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-12 text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Don&apos;t See Your Bill Listed?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              We negotiate all types of recurring bills. If you&apos;re paying for it monthly, 
              there&apos;s a good chance we can lower it.
            </p>
            <FloatingButton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="lg"
            >
              Contact Us
            </FloatingButton>
          </motion.div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
