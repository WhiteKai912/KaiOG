'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import BackgroundVideo from '../components/BackgroundVideo'
import Footer from '../components/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSettings } from '../contexts/SettingsContext'

export default function Home() {
  const { t, theme } = useSettings()
  const isDarkMode = theme === 'dark'

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <BackgroundVideo />
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-overlay'}`}>
        <Header />

        <main className="flex-grow container mx-auto py-8 sm:py-12 px-4">
          <motion.div 
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-[var(--primary-orange)] dark:text-[var(--teal-blue)]">
              {t('welcome')}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--gray)] dark:text-gray-300 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className={`bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 overflow-hidden h-full flex flex-col`}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kainshiog1-kWvZYuq5qZYU8euaQGRuvaaBbRhr6F.png"
                  alt={t('kainshiogTitle')}
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary-orange)] dark:text-[var(--teal-blue)] mb-2 sm:mb-4">{t('kainshiogTitle')}</h2>
                  <p className="text-[var(--gray)] dark:text-gray-300 mb-4 sm:mb-6 flex-grow">
                    {t('kainshiogDescription')}
                  </p>
                  <Link href="/game">
                    <Button className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] text-white transition-colors duration-300">
                      {t('learnMore')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className={`bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 overflow-hidden h-full flex flex-col`}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kollig1-Fp0r81ZwoFQ9WLAy5ZPw7nTRAWhdb0.png"
                  alt={t('kolligTitle')}
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary-orange)] dark:text-[var(--teal-blue)] mb-2 sm:mb-4">{t('kolligTitle')}</h2>
                  <p className="text-[var(--gray)] dark:text-gray-300 mb-4 sm:mb-6 flex-grow">
                    {t('kolligDescription')}
                  </p>
                  <Link href="/kollig">
                    <Button className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] text-white transition-colors duration-300">
                      {t('learnMore')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

