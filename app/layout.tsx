import './globals.css'

export const metadata = {
  title: '文字数カウンター',
  description: 'シンプルな文字数カウンターアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
} 