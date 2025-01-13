'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, TranslationKey, getTranslation } from '../utils/translations'

export type Theme = 'light' | 'dark' | 'system'

export type { Language } // Добавлен экспорт

interface SettingsContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  t: (key: TranslationKey) => string
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru')
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language
    const storedTheme = localStorage.getItem('theme') as Theme
    if (storedLanguage) setLanguage(storedLanguage)
    if (storedTheme) setTheme(storedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
    localStorage.setItem('theme', theme)

    // Apply theme
    document.documentElement.classList.remove('light', 'dark')
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      document.documentElement.classList.add(systemTheme)
    } else {
      document.documentElement.classList.add(theme)
    }
  }, [language, theme])

  const t = (key: TranslationKey) => getTranslation(language, key)

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </SettingsContext.Provider>
  )
}
