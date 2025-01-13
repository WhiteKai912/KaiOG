'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import BackgroundVideo from '../../components/BackgroundVideo'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Footer from '../../components/Footer'
import { useSettings } from '../../contexts/SettingsContext'

export default function AboutPage() {
  const { t, theme } = useSettings()
  const isDarkMode = theme === 'dark'

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const valuesList = t('valuesList')

  if (typeof valuesList === 'string') {
    console.error('Expected valuesList to be an array, got string:', valuesList);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundVideo />
      <div className={`flex-grow flex flex-col ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-overlay'}`}>
        <Header />
        <main className="container mx-auto py-8 sm:py-12 px-4 flex-grow">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-[var(--primary-orange)] dark:text-[var(--teal-blue)]"
            {...fadeIn}
          >
            {t('aboutUs')}
          </motion.h1>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Card className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 h-full">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('ourMission')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--gray)] dark:text-gray-300">{t('missionDescription')}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <Card className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 h-full">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('ourHistory')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--gray)] dark:text-gray-300">{t('historyDescription')}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
              <Card className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 h-full">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('ourValues')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(valuesList) ? (
                    <ul className="list-disc list-inside space-y-2 text-[var(--gray)] dark:text-gray-300">
                      {valuesList.map((value, index) => (
                        <li key={index}>{value}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)] dark:text-gray-300">{valuesList}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  )
}
