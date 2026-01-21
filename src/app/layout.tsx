/**
 * Root layout - pass-through only.
 * <html> and <body> are rendered by route group layouts:
 * - (ja)/layout.tsx → <html lang="ja">
 * - (en)/layout.tsx → <html lang="en">
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
