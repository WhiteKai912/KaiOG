'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import BackgroundVideo from '../../components/BackgroundVideo'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/Footer"
import GameMediaSlider from '../../components/GameMediaSlider'
import { useSettings } from '../../contexts/SettingsContext'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Updated import statement

export default function GamePage() {
  const { t, theme } = useSettings()
  const isDarkMode = theme === 'dark'

  const [gameUpdates, setGameUpdates] = useState({
    title: '',
    description: '',
    imageUrl: ''
  })

  useEffect(() => {
    const fetchGameUpdates = async () => {
      const { data, error } = await supabase
        .from('game_updates')
        .select('*')
        .eq('game', 'kainshiog')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (!error && data) {
        setGameUpdates({
          title: data.title,
          description: data.description,
          imageUrl: data.image_url
        })
      }
    }

    fetchGameUpdates()
  }, [])

  const featuresList = t('featuresList');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <BackgroundVideo />
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-overlay'}`}>
        <Header />
        <main className="container mx-auto py-8 sm:py-12 px-4 max-w-5xl">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[var(--primary-orange)] dark:text-[var(--teal-blue)] mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('kainshiogTitle')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <GameMediaSlider
              media={[
                { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kainshiog1-kWvZYuq5qZYU8euaQGRuvaaBbRhr6F.png', alt: t('kainshiogTitle') },
                { type: 'image', src: '/placeholder.svg?height=675&width=1200', alt: t('kainshiogTitle') },
                { type: 'video', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dragon213-EBt2T2kWW9WVkAEPjA46LmLp7pNd9T.mp4' },
              ]}
            />
          </motion.div>

          <Tabs defaultValue="about" className="w-full space-y-6 sm:space-y-8">
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 bg-[var(--light-cream)] dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger value="about" className="rounded-md dark:text-white">{t('about')}</TabsTrigger>
              <TabsTrigger value="features" className="rounded-md dark:text-white">{t('features')}</TabsTrigger>
              <TabsTrigger value="updates" className="rounded-md dark:text-white">{t('updates')}</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <Card className="bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 shadow-lg border-none">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('about')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-[var(--gray)] dark:text-gray-300">
                    {t('genre')}: {t('darkFantasy')}
                  </p>
                  <p className="text-base sm:text-lg text-[var(--gray)] dark:text-gray-300 mt-4">
                    {t('gameDescription')}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="features">
              <Card className="bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 shadow-lg border-none">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('features')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-[var(--gray)] dark:text-gray-300">
                    {Array.isArray(featuresList) ? featuresList.map((feature) => (
                      <li key={feature.id}>{feature.text}</li>
                    )) : <li>{featuresList}</li>}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="updates">
              <Card className="bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 shadow-lg border-none">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{gameUpdates.title || t('patchTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-medium mb-2 text-[var(--gray)] dark:text-gray-300">{t('patchDescription')}</h4>
                      <p className="text-[var(--gray)] dark:text-gray-300">{gameUpdates.description || t('noUpdates')}</p>
                    </div>
                    <div className="md:w-1/3">
                      {gameUpdates.imageUrl ? (
                        <img
                          src={gameUpdates.imageUrl}
                          alt={gameUpdates.title || t('patchTitle')}
                          className="rounded-lg shadow-sm w-full"
                        />
                      ) : (
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-48 flex items-center justify-center">
                          <p className="text-gray-500 dark:text-gray-400">{t('noImage')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <motion.div 
            className="mt-8 sm:mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="bg-[var(--primary-orange)] dark:bg-[var(--teal-blue)] text-[var(--light-cream)] px-6 sm:px-8 py-2 sm:py-3 rounded-full text-lg sm:text-xl font-bold hover:bg-[var(--teal-blue)] dark:hover:bg-[var(--primary-orange)] transition-colors duration-300 shadow-lg">
              {t('preorder')}
            </Button>
          </motion.div>

          <motion.div 
            className="mt-6 sm:mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="text-[var(--teal-blue)] dark:text-[var(--primary-orange)] hover:text-[var(--primary-orange)] dark:hover:text-[var(--teal-blue)] transition-colors duration-300 text-base sm:text-lg font-semibold">
              {t('backToHome')}
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
