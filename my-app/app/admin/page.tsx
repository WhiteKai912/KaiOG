'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import BackgroundVideo from '../../components/BackgroundVideo'
import Footer from '../../components/Footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSettings } from '../../contexts/SettingsContext'
import { useUser } from '../../contexts/UserContext'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [gameUpdates, setGameUpdates] = useState({
    kainshiog: { title: '', description: '', imageUrl: '' },
    kollig: { title: '', description: '', imageUrl: '' }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const router = useRouter()
  const { t, theme } = useSettings()
  const { user } = useUser()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        router.push('/auth')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (error || !data?.is_admin) {
        router.push('/')
        return
      }

      setIsLoading(false)
    }

    checkAdminStatus()
    loadGameUpdates()
  }, [user, router])

  const loadGameUpdates = async () => {
    const { data: kainshiogData, error: kainshiogError } = await supabase
      .from('game_updates')
      .select('*')
      .eq('game', 'kainshiog')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const { data: kolligData, error: kolligError } = await supabase
      .from('game_updates')
      .select('*')
      .eq('game', 'kollig')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!kainshiogError && kainshiogData) {
      setGameUpdates(prev => ({
        ...prev,
        kainshiog: {
          title: kainshiogData.title,
          description: kainshiogData.description,
          imageUrl: kainshiogData.image_url
        }
      }))
    }

    if (!kolligError && kolligData) {
      setGameUpdates(prev => ({
        ...prev,
        kollig: {
          title: kolligData.title,
          description: kolligData.description,
          imageUrl: kolligData.image_url
        }
      }))
    }
  }

  const handleUpdateGame = async (game: 'kainshiog' | 'kollig') => {
    const { title, description, imageUrl } = gameUpdates[game]
    const { data, error } = await supabase
      .from('game_updates')
      .insert([
        { game, title, description, image_url: imageUrl }
      ])

    if (error) {
      alert(t('updateError'))
    } else {
      alert(t('updateSuccess'))
      loadGameUpdates()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, game: 'kainshiog' | 'kollig') => {
    const file = e.target.files?.[0]
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `game-updates/${game}/${fileName}`

      let { error: uploadError, data } = await supabase.storage
        .from('game-images')
        .upload(filePath, file)

      if (uploadError) {
        alert(t('imageUploadError'))
        return
      }

      if (!data) {
        alert(t('imageUploadError'))
        return
      }

      const { data: publicData } = await supabase.storage
        .from('game-images')
        .getPublicUrl(filePath)

      const publicUrl = publicData?.publicUrl || ''

      setGameUpdates(prev => ({
        ...prev,
        [game]: {
          ...prev[game],
          imageUrl: publicUrl
        }
      }))
    }
  }

  const addNewAdmin = async () => {
    try {
      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()

      if (userError) {
        throw userError
      }

      const user = users.find(u => u.email === newAdminEmail)

      if (!user) {
        alert(t('userNotFound'))
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          is_admin: true,
          updated_at: new Date().toISOString()
        })

      if (updateError) {
        throw updateError
      }

      alert(t('adminAddedSuccess'))
      setNewAdminEmail('')
    } catch (error) {
      console.error('Error adding new admin:', error)
      alert(t('adminAddError'))
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <BackgroundVideo />
      <div className={`flex-grow flex flex-col ${theme === 'dark' ? 'bg-gray-900 bg-opacity-90' : 'bg-overlay'}`}>
        <Header />
        <main className="container mx-auto py-6 sm:py-8 md:py-12 px-4 flex-grow">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-[var(--primary-orange)] dark:text-[var(--teal-blue)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('adminPanel')}
          </motion.h1>
          <Tabs defaultValue="kainshiog" className="w-full max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap justify-center mb-6 sm:mb-8 gap-2">
              <TabsTrigger value="kainshiog" className="px-3 py-2 text-sm sm:text-base">Kainshiog</TabsTrigger>
              <TabsTrigger value="kollig" className="px-3 py-2 text-sm sm:text-base">Kollig</TabsTrigger>
              <TabsTrigger value="addAdmin" className="px-3 py-2 text-sm sm:text-base">{t('addAdmin')}</TabsTrigger>
            </TabsList>
            <TabsContent value="kainshiog">
              <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">Kainshiog Update</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); handleUpdateGame('kainshiog'); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="kainshiogTitle">{t('updateTitle')}</Label>
                      <Input 
                        id="kainshiogTitle" 
                        value={gameUpdates.kainshiog.title} 
                        onChange={(e) => setGameUpdates(prev => ({ ...prev, kainshiog: { ...prev.kainshiog, title: e.target.value } }))}
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kainshiogDescription">{t('updateDescription')}</Label>
                      <Textarea 
                        id="kainshiogDescription" 
                        value={gameUpdates.kainshiog.description} 
                        onChange={(e) => setGameUpdates(prev => ({ ...prev, kainshiog: { ...prev.kainshiog, description: e.target.value } }))}
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kainshiogImage">{t('updateImage')}</Label>
                      <Input 
                        id="kainshiogImage" 
                        type="file" 
                        onChange={(e) => handleImageUpload(e, 'kainshiog')}
                        accept="image/*"
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                      />
                    </div>
                    {gameUpdates.kainshiog.imageUrl && (
                      <img src={gameUpdates.kainshiog.imageUrl} alt="Kainshiog update" className="max-w-full h-auto" />
                    )}
                    <Button type="submit" className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                      {t('saveUpdate')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="kollig">
              <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">Kollig Update</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); handleUpdateGame('kollig'); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="kolligTitle">{t('updateTitle')}</Label>
                      <Input 
                        id="kolligTitle" 
                        value={gameUpdates.kollig.title} 
                        onChange={(e) => setGameUpdates(prev => ({ ...prev, kollig: { ...prev.kollig, title: e.target.value } }))}
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kolligDescription">{t('updateDescription')}</Label>
                      <Textarea 
                        id="kolligDescription" 
                        value={gameUpdates.kollig.description} 
                        onChange={(e) => setGameUpdates(prev => ({ ...prev, kollig: { ...prev.kollig, description: e.target.value } }))}
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kolligImage">{t('updateImage')}</Label>
                      <Input 
                        id="kolligImage" 
                        type="file" 
                        onChange={(e) => handleImageUpload(e, 'kollig')}
                        accept="image/*"
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                      />
                    </div>
                    {gameUpdates.kollig.imageUrl && (
                      <img src={gameUpdates.kollig.imageUrl} alt="Kollig update" className="max-w-full h-auto" />
                    )}
                    <Button type="submit" className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                      {t('saveUpdate')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="addAdmin">
              <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('addNewAdmin')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); addNewAdmin(); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newAdminEmail">{t('newAdminEmail')}</Label>
                      <Input 
                        id="newAdminEmail" 
                        type="email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                      {t('addAdmin')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  )
}
