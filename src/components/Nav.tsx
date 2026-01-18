'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'What I Do', href: '#what-i-do' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Availability', href: '#availability' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine current locale from pathname
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ja';

  // Get the alternate locale path
  const getAlternateLocalePath = () => {
    if (pathname.startsWith('/ja')) {
      return '/en' + pathname.slice(3);
    } else if (pathname.startsWith('/en')) {
      return '/ja' + pathname.slice(3);
    }
    // Fallback for root or unknown paths
    return currentLocale === 'ja' ? '/en' : '/ja';
  };

  // Get home link based on current locale
  const homeHref = currentLocale === 'en' ? '/en' : '/ja';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after click
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg-primary/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={homeHref} className="hover:opacity-80 transition-opacity">
            <div className="leading-tight">
              <div className="text-base font-semibold text-text-primary tracking-wide">
                ZHANG FAN
              </div>
              <div className="text-xs text-text-secondary/70">
                張帆（チョウ・ハン）
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex gap-6 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="text-sm text-text-tertiary hover:text-accent transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Language Switch */}
            <Link
              href={getAlternateLocalePath()}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap"
            >
              {currentLocale === 'ja' ? 'EN' : 'JA'}
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="block text-sm text-text-tertiary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {/* Language Switch for Mobile */}
              <li className="pt-2 border-t border-border/50">
                <Link
                  href={getAlternateLocalePath()}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {currentLocale === 'ja' ? 'EN' : 'JA'}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
