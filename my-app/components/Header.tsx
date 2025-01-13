'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserCircle, Globe, Sun, Moon, Menu, X, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSettings, Language, Theme } from '../contexts/SettingsContext'
import { useUser } from '../contexts/UserContext'
import { supabase } from '../lib/supabase'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false); // Add state for admin status
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { t, language, setLanguage, theme, setTheme } = useSettings()
  const { user, loading, signOut } = useUser()

  const handleMouseEnter = () => {
    setIsMenuOpen(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 300)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en')
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        // Добавим console.log для отладки
        console.log('Checking admin status for user:', user.id);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        // Добавим console.log для отладки
        console.log('Admin check result:', { data, error });

        if (!error && data?.is_admin) {
          setIsAdmin(true);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className="bg-[var(--dark-blue)] text-[var(--light-cream)] py-4 px-4 sm:px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-[var(--primary-orange)] hover:text-[var(--teal-blue)] transition-colors">
            KaiOG
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4 items-center">
            <li><Link href="/" className="hover:text-[var(--teal-blue)]">{t('home')}</Link></li>
            <li><Link href="/about" className="hover:text-[var(--teal-blue)]">{t('about')}</Link></li>
          </ul>
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={t('language')}
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={t('theme')}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {user ? (
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user.user_metadata.avatar_url || '/placeholder.svg'} alt="User avatar" />
                <AvatarFallback><UserCircle className="h-6 w-6" /></AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle className="h-6 w-6 cursor-pointer text-[var(--teal-blue)]" />
            )}
            {isMenuOpen && (
              <div 
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-[var(--light-cream)] rounded-md shadow-lg py-1 z-10"
              >
                {user ? (
                  <>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-[var(--dark-blue)] hover:bg-[var(--teal-blue)] hover:text-[var(--light-cream)]">
                      {t('profile')}
                    </Link>
                    {isAdmin && ( // Use isAdmin state here
                      <Link href="/admin" className="block px-4 py-2 text-sm text-[var(--dark-blue)] hover:bg-[var(--teal-blue)] hover:text-[var(--light-cream)]">
                        {t('adminPanel')}
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-[var(--dark-blue)] hover:bg-[var(--teal-blue)] hover:text-[var(--light-cream)]"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <Link href="/auth" className="block px-4 py-2 text-sm text-[var(--dark-blue)] hover:bg-[var(--teal-blue)] hover:text-[var(--light-cream)]">
                    {t('login')}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <nav>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/" className="block py-2 hover:text-[var(--teal-blue)]">{t('home')}</Link></li>
              <li><Link href="/about" className="block py-2 hover:text-[var(--teal-blue)]">{t('about')}</Link></li>
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-start"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  {t('language')}
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                  {t('theme')}
                </Button>
              </li>
              <li>
                {user ? (
                  <>
                    <Link href="/profile" className="block py-2 hover:text-[var(--teal-blue)]">{t('profile')}</Link>
                    {isAdmin && ( // Use isAdmin state here
                      <Link href="/admin" className="block py-2 hover:text-[var(--teal-blue)]">{t('adminPanel')}</Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left py-2 hover:text-[var(--teal-blue)]"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <Link href="/auth" className="block py-2 hover:text-[var(--teal-blue)]">{t('login')}</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

