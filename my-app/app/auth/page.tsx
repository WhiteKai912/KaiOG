'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import BackgroundVideo from '../../components/BackgroundVideo'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Footer from '../../components/Footer'
import { useSettings } from '../../contexts/SettingsContext'
import { useUser } from '../../contexts/UserContext'
import { UserCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { t, theme } = useSettings()
  const { signIn, signUp } = useUser()

  const isDarkTheme = theme === 'dark'

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
  
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        if (password !== confirmPassword) {
          setError(t('passwordsDoNotMatch'))
          return
        }
        await signUp(email, password)
      }
      router.push('/profile')
    } catch (err: any) {
      setError(err.message)
    }
  }
  

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <BackgroundVideo />
      <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 bg-opacity-90' : 'bg-overlay'} flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto py-8 sm:py-12 px-4 flex items-center justify-center">
          <Card className={`w-full max-w-md ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} bg-opacity-90 backdrop-blur-md shadow-xl relative overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/2 w-full h-full"
              >
                <div className="w-full h-full bg-gradient-to-br from-[var(--primary-orange)] to-[var(--teal-blue)] opacity-10 rounded-full" />
              </motion.div>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -right-1/2 w-full h-full"
              >
                <div className="w-full h-full bg-gradient-to-tl from-[var(--teal-blue)] to-[var(--primary-orange)] opacity-10 rounded-full" />
              </motion.div>
            </div>

            <CardHeader>
              <CardTitle className={`text-2xl sm:text-3xl font-bold text-center ${isDarkTheme ? 'text-[var(--light-cream)]' : 'text-[var(--primary-orange)]'}`}>
                {isLogin ? t('loginWelcome') : t('registerWelcome')}
              </CardTitle>
              <CardDescription className={`text-center ${isDarkTheme ? 'text-gray-300' : 'text-[var(--gray)]'}`}>
                {isLogin ? t('loginDescription') : t('registerDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'register'}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={inputVariants} initial="hidden" animate="visible">
                      <div className="space-y-2">
                        <Label htmlFor="email" className={`flex items-center gap-2 ${isDarkTheme ? 'text-[var(--light-cream)]' : 'text-[var(--gray)]'}`}>
                          <Mail className="w-5 h-5 text-[var(--primary-orange)]" />
                          {t('email')}
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-[var(--gray)]'} bg-opacity-50 backdrop-blur-sm`} 
                        />
                      </div>
                    </motion.div>
                    <motion.div variants={inputVariants} initial="hidden" animate="visible">
                      <div className="space-y-2">
                        <Label htmlFor="password" className={`flex items-center gap-2 ${isDarkTheme ? 'text-[var(--light-cream)]' : 'text-[var(--gray)]'}`}>
                          <Lock className="w-5 h-5 text-[var(--primary-orange)]" />
                          {t('password')}
                        </Label>
                        <div className="relative">
                          <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-[var(--gray)]'} bg-opacity-50 backdrop-blur-sm pr-10`} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    {!isLogin && (
                      <motion.div variants={inputVariants} initial="hidden" animate="visible">
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className={`flex items-center gap-2 ${isDarkTheme ? 'text-[var(--light-cream)]' : 'text-[var(--gray)]'}`}>
                            <Lock className="w-5 h-5 text-[var(--primary-orange)]" />
                            {t('confirmPassword')}
                          </Label>
                          <div className="relative">
                            <Input 
                              id="confirmPassword" 
                              type={showConfirmPassword ? "text" : "password"}
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className={`${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-[var(--gray)]'} bg-opacity-50 backdrop-blur-sm pr-10`} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button type="submit" className="w-full bg-[var(--primary-orange)] hover:bg-[var(--teal-blue)] transition-colors duration-300 text-white">
                        {isLogin ? t('login') : t('register')}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </CardContent>
            <CardFooter>
              <p className={`text-center w-full ${isDarkTheme ? 'text-gray-300' : 'text-[var(--gray)]'}`}>
                {isLogin ? t('noAccount') : t('haveAccount')}
                <motion.button
                  onClick={toggleForm}
                  className={`ml-2 ${isDarkTheme ? 'text-[var(--teal-blue)] hover:text-[var(--primary-orange)]' : 'text-[var(--primary-orange)] hover:text-[var(--teal-blue)]'} transition-colors duration-300 focus:outline-none`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? t('register') : t('login')}
                </motion.button>
              </p>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  )
}

