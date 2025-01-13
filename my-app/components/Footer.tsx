'use client'

import Link from 'next/link'
import { useSettings } from '../contexts/SettingsContext'

export default function Footer() {
  const { t } = useSettings()

  return (
    <footer className="bg-[var(--dark-blue)] bg-opacity-90 text-[var(--light-cream)] py-6 sm:py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="mb-4 sm:mb-0">&copy; 2024 KaiOG. {t('rights')}</p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
            <Link href="/terms" className="hover:text-[var(--teal-blue)] transition-colors duration-300 mb-2 sm:mb-0">
              {t('terms')}
            </Link>
            <Link href="/privacy" className="hover:text-[var(--teal-blue)] transition-colors duration-300">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

