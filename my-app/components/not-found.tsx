'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackgroundVideo from '../components/BackgroundVideo'
import { Button } from "@/components/ui/button"
import { useSettings } from '../contexts/SettingsContext'

export default function NotFound() {
  const { t } = useSettings()

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundVideo />
      <div className="flex-grow bg-overlay">
        <Header />
        <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--primary-orange)] mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--teal-blue)] mb-6">
              {t('pageNotFound')}
            </h2>
            <p className="text-lg sm:text-xl text-[var(--gray)] mb-8 max-w-md mx-auto">
              {t('pageNotFoundDescription')}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/">
                <Button className="bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] text-white transition-colors duration-300">
                  {t('backToHome')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

