import { SettingsProvider } from '../contexts/SettingsContext'
import { UserProvider } from '../contexts/UserContext'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}

