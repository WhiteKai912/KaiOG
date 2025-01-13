'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../../components/Header'
import BackgroundVideo from '../../components/BackgroundVideo'
import Footer from '../../components/Footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle, Mail, Calendar, Key, ShieldCheck, CreditCard, Bell, Settings, Gamepad2, Moon, Sun, Laptop, Eye, EyeOff } from 'lucide-react'
import { useSettings, Language, Theme } from '../../contexts/SettingsContext'
import { useUser } from '../../contexts/UserContext'
import { supabase } from '../../lib/supabase'
import { SettingsProvider } from '../../contexts/SettingsContext';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar_url: ''
  })
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true
  })
  const [newEmail, setNewEmail] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [emailChangeStep, setEmailChangeStep] = useState(0)
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  })
  const router = useRouter()
  const { language, setLanguage, theme, setTheme, t } = useSettings()
  const { user, loading } = useUser()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    } else if (user) {
      setUserData({
        name: user.user_metadata.full_name || '',
        email: user.email || '',
        avatar_url: user.user_metadata.avatar_url || '/placeholder.svg'
      })
      setCurrentEmail(user.email || '')
      setTwoFactorEnabled(user.user_metadata.two_factor_enabled || false)
    }
  }, [user, loading, router])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: userData.name }
      })

      if (error) throw error

      setIsEditing(false)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `avatars/${user?.id}/${fileName}`
  
        let { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(filePath, file)
  
        if (uploadError) {
          throw uploadError
        }
  
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
  
        if (!data) {
          throw new Error('Unable to get public URL');
        }
  
        const publicUrl = data.publicUrl;
  
        const { error: updateError } = await supabase.auth.updateUser({
          data: { avatar_url: publicUrl }
        });
  
        if (updateError) {
          throw updateError;
        }
  
        setUserData(prevData => ({ ...prevData, avatar_url: publicUrl }));
  
        // Refresh user data
        const { data: refreshedData, error: refreshError } = await supabase.auth.getUser();
        if (refreshError) throw refreshError;
        const refreshedUser = refreshedData.user;
  
        if (refreshedUser) {
          setUserData(prevData => ({
            ...prevData,
            name: refreshedUser.user_metadata.full_name || '',
            email: refreshedUser.email || '',
            avatar_url: refreshedUser.user_metadata.avatar_url || '/placeholder.svg'
          }));
        }
  
        alert(t('avatarUpdateSuccess'));
      } catch (error) {
        console.error('Error changing avatar:', error);
        alert(t('avatarUpdateError'));
      }
    }
  }
  
  
  

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      try {
        const { error } = await supabase.auth.updateUser({ 
          password: newPassword
        })
        if (error) throw error
        console.log('Password changed successfully')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } catch (error) {
        console.error('Error changing password:', error)
      }
    } else {
      console.log('Passwords do not match')
    }
  }

  const handleEmailChange = async () => {
    if (emailChangeStep === 0) {
      // Send verification to current email
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: currentEmail,
        })
        if (error) throw error
        setEmailChangeStep(1)
        alert(t('currentEmailVerificationSent'))
      } catch (error) {
        console.error('Error sending verification to current email:', error)
        alert(t('emailVerificationError'))
      }
    } else if (emailChangeStep === 1) {
      // Verify current email and proceed to new email input
      try {
        // Here you would typically verify the OTP sent to the current email
        // For this example, we'll just move to the next step
        setEmailChangeStep(2)
      } catch (error) {
        console.error('Error verifying current email:', error)
        alert(t('emailVerificationError'))
      }
    } else if (emailChangeStep === 2) {
      // Update email
      try {
        const { data, error } = await supabase.auth.updateUser({ email: newEmail })
        if (error) throw error
        setEmailChangeStep(0)
        setNewEmail('')
        setCurrentEmail('')
        alert(t('emailUpdateSent'))
      } catch (error) {
        console.error('Error changing email:', error)
        alert(t('emailUpdateError'))
      }
    }
  }

  const toggleTwoFactor = async () => {
    if (!twoFactorEnabled) {
      try {
        // Send 6-digit code to user's email
        const { error } = await supabase.auth.signInWithOtp({
          email: userData.email,
        })
        if (error) throw error
        setShowTwoFactorInput(true)
        alert(t('twoFactorCodeSent'))
      } catch (error) {
        console.error('Error sending two-factor code:', error)
        alert(t('twoFactorCodeError'))
      }
    } else {
      try {
        // Disable two-factor authentication
        const { error } = await supabase.auth.updateUser({
          data: { two_factor_enabled: false }
        })
        if (error) throw error
        setTwoFactorEnabled(false)
        setShowTwoFactorInput(false)
        alert(t('twoFactorDisabled'))
      } catch (error) {
        console.error('Error disabling two-factor authentication:', error)
        alert(t('twoFactorDisableError'))
      }
    }
  }

  const verifyTwoFactorCode = async () => {
    try {
      // Here you would typically verify the code with your backend
      // For this example, we'll just check if the code is 6 digits
      if (twoFactorCode.length === 6) {
        const { error } = await supabase.auth.updateUser({
          data: { two_factor_enabled: true }
        })
        if (error) throw error
        setTwoFactorEnabled(true)
        setShowTwoFactorInput(false)
        setTwoFactorCode('')
        alert(t('twoFactorEnabled'))
      } else {
        alert(t('invalidTwoFactorCode'))
      }
    } catch (error) {
      console.error('Error enabling two-factor authentication:', error)
      alert(t('twoFactorEnableError'))
    }
  }

  const toggleNotification = (type: 'email') => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
    // Here you would typically update these settings in your backend
  }

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const purchaseHistory = []

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <BackgroundVideo />
      <div className={`flex-grow flex flex-col ${theme === 'dark' ? 'bg-gray-900 bg-opacity-90' : 'bg-overlay'}`}>
        <Header />
        <main className="container mx-auto py-6 sm:py-8 md:py-12 px-4 flex-grow">
          <motion.h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-center text-[var(--primary-orange)] dark:text-[var(--teal-blue)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('profileTitle')}
          </motion.h1>
          <Tabs defaultValue="info" className="w-full max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap justify-center mb-4 sm:mb-6 gap-2">
              <TabsTrigger value="info" className="px-2 py-1 text-xs sm:text-sm">{t('info')}</TabsTrigger>
              <TabsTrigger value="security" className="px-2 py-1 text-xs sm:text-sm">{t('security')}</TabsTrigger>
              <TabsTrigger value="purchases" className="px-2 py-1 text-xs sm:text-sm">{t('purchases')}</TabsTrigger>
              <TabsTrigger value="settings" className="px-2 py-1 text-xs sm:text-sm">{t('settings')}</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="info">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('info')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      {isEditing ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-3 sm:space-y-4">
                          <div className="space-y-1 sm:space-y-2">
                            <Label htmlFor="name" className="text-sm sm:text-base">{t('name')}</Label>
                            <Input 
                              id="name" 
                              value={userData.name} 
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              className="text-sm sm:text-base bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                            />
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <Label htmlFor="avatar" className="text-sm sm:text-base">{t('avatar')}</Label>
                            <Input 
                              id="avatar" 
                              type="file" 
                              onChange={handleAvatarChange}
                              accept="image/*"
                              className="text-sm sm:text-base bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                            />
                          </div>
                          <Button type="submit" className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                            {t('save')}
                          </Button>
                        </form>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 md:gap-6">
                          <Avatar className="w-20 h-20 sm:w-32 sm:h-32 border-4 border-[var(--primary-orange)]">
                            <AvatarImage src={userData.avatar_url} alt={userData.name} />
                            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 sm:space-y-4 flex-grow text-center sm:text-left">
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                              <UserCircle className="text-[var(--primary-orange)]" />
                              <p className="dark:text-white"><strong>{t('name')}:</strong> {userData.name}</p>
                            </div>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                              <Mail className="text-[var(--primary-orange)]" />
                              <p className="dark:text-white"><strong>{t('email')}:</strong> {userData.email}</p>
                            </div>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                              <Calendar className="text-[var(--primary-orange)]" />
                              <p className="dark:text-white"><strong>{t('registrationDate')}:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <Button onClick={handleEdit} className="bg-[var(--teal-blue)] hover:bg-[var(--primary-orange)] transition-colors duration-300 mt-4 text-white">
                              {t('edit')}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              <TabsContent value="security">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('security')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white">{t('changePassword')}</h3>
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              type={showPassword.old ? "text" : "password"}
                              placeholder={t('oldPassword')}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('old')}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword.old ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                          </div>
                          <div className="relative">
                            <Input
                              type={showPassword.new ? "text" : "password"}
                              placeholder={t('newPassword')}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('new')}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword.new ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                          </div>
                          <div className="relative">
                            <Input
                              type={showPassword.confirm ? "text" : "password"}
                              placeholder={t('confirmPassword')}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('confirm')}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword.confirm ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                          </div>
                          <Button onClick={handlePasswordChange} className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                            {t('changePassword')}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white">{t('changeEmail')}</h3>
                        <div className="space-y-2">
                          {emailChangeStep === 0 && (
                            <Input
                              type="email"
                              placeholder={t('currentEmail')}
                              value={currentEmail}
                              onChange={(e) => setCurrentEmail(e.target.value)}
                              className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                            />
                          )}
                          {emailChangeStep === 2 && (
                            <Input
                              type="email"
                              placeholder={t('newEmail')}
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
                            />
                          )}
                          <Button onClick={handleEmailChange} className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                            {emailChangeStep === 0 ? t('verifyCurrentEmail') : emailChangeStep === 1 ? t('confirmVerification') : t('changeEmail')}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white">{t('twoFactor')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{t('twoFactorDescription')}</p>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={twoFactorEnabled}
                            onCheckedChange={toggleTwoFactor}
                          />
                          <Label>{twoFactorEnabled ? t('twoFactorEnabled') : t('twoFactor')}</Label>
                        </div>
                        {showTwoFactorInput && (
                          <div className="mt-4">
                            <Input
                              type="text"
                              placeholder={t('enterTwoFactorCode')}
                              value={twoFactorCode}
                              onChange={(e) => setTwoFactorCode(e.target.value)}
                              className="bg-white bg-opacity-50 backdrop-blur-sm dark:bg-gray-700 dark:bg-opacity-50 dark:text-white mb-2"
                            />
                            <Button onClick={verifyTwoFactorCode} className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                              {t('verifyTwoFactorCode')}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              <TabsContent value="purchases">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('purchases')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <p className="text-center text-gray-600 dark:text-gray-300">{t('noPurchases')}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              <TabsContent value="settings">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white bg-opacity-90 shadow-lg dark:bg-gray-800 dark:bg-opacity-90">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[var(--teal-blue)] dark:text-[var(--primary-orange)]">{t('settings')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white">{t('language')}</h3>
                        <Select
                          value={language}
                          onValueChange={(value: Language) => setLanguage(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('language')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white">{t('theme')}</h3>
                        <Select
                          value={theme}
                          onValueChange={(value: Theme) => setTheme(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('theme')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center">
                                <Sun className="mr-2 h-4 w-4" />
                                {t('light')}
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center">
                                <Moon className="mr-2 h-4 w-4" />
                                {t('dark')}
                              </div>
                            </SelectItem>
                            <SelectItem value="system">
                              <div className="flex items-center">
                                <Laptop className="mr-2 h-4 w-4" />
                                {t('system')}
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white">{t('notifications')}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={notifications.email}
                              onCheckedChange={() => toggleNotification('email')}
                            />
                            <Label>{t('emailNotifications')}</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  )
}

