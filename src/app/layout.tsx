import classNames from 'classnames'
import Header from 'components/organisms/Header/Header'
import type { Metadata } from 'next'
import { Inter, Bitter } from 'next/font/google'
import 'styles/global.scss'

const inter = Inter({
  weight: ['400', '500'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-inter',
})
const bitter = Bitter({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-bitter',
})

export const metadata: Metadata = {
  title: 'Inbank',
  description: 'Inbank mini loans',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={classNames(inter.variable, bitter.variable)}>
        <Header />
        <div className="mainContainer">{children}</div>
      </body>
    </html>
  )
}
