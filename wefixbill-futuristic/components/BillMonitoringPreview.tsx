'use client'

import { motion } from 'framer-motion'
import { MOCK_MONITORING_ALERTS } from '@/lib/mockData'
import { timeUntil } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface BillMonitoringPreviewProps {
  onOpenModal?: () => void
}

export default function BillMonitoringPreview({ onOpenModal }: BillMonitoringPreviewProps) {
  const getAlertStyles = (type: string, priority: string) => {
    const styles: Record<string, string> = {
      renewal: 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan',
      promo: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
      increase: 'bg-red-400/10 border-red-400/30 text-red-400',
      renegotiate: 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple',
    }
    return styles[type] || styles.renewal
  }

  const getAlertIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      renewal: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      promo: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      increase: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      renegotiate: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    }
    return icons[type] || icons.renewal
  }

  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-neon-purple/10 border border-neon-purple/30">
                <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
                <span className="text-sm font-medium text-neon-purple">Lifetime Plan Feature</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Never Overpay <span className="gradient-text-aurora">Again</span>
              </h2>

              <p className="text-lg text-frost-300 mb-8">
                Our bill monitoring system tracks your accounts 24/7, alerting you to price increases, 
                expiring promotions, and renegotiation opportunities. We handle everything automatically.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Proactive Alerts</h4>
                    <p className="text-frost-400 text-sm">Get notified before your bill increases or promotion expires</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/20 border border-neon-green/30 flex items-center justify-center text-neon-green flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Auto-Renegotiation</h4>
                    <p className="text-frost-400 text-sm">Up to 2 renegotiations per year, per bill — included free</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center text-neon-purple flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Price Protection</h4>
                    <p className="text-frost-400 text-sm">We fight rate hikes and restore your discounts automatically</p>
                  </div>
                </div>
              </div>

              <button onClick={onOpenModal} className="btn-primary">
                Start Monitoring
              </button>
            </motion.div>

            {/* Preview Dashboard */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="glass-panel p-6 relative overflow-hidden">
                {/* HUD corners */}
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                {/* Scanline effect */}
                <div className="scanline" />

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Monitoring Dashboard</h3>
                  <span className="flex items-center gap-2 text-neon-green text-sm">
                    <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="space-y-3">
                  {MOCK_MONITORING_ALERTS.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'p-4 rounded-lg border',
                        getAlertStyles(alert.type, alert.priority)
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white text-sm truncate">
                              {alert.title}
                            </h4>
                            <span className="text-frost-500 text-xs ml-2 flex-shrink-0">
                              {timeUntil(alert.date)}
                            </span>
                          </div>
                          <p className="text-frost-400 text-xs line-clamp-2">
                            {alert.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-frost-500 text-xs">{alert.provider}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-frost-500 text-xs text-center">
                    Demo data • Full dashboard available after signup
                  </p>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-neon-cyan/5 blur-3xl -z-10 rounded-3xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
