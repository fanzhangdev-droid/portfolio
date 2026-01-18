'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Screenshot {
  title: string;
  desc: string;
  src: string;
}

interface ProjectScreenshotsProps {
  screenshots: Screenshot[];
}

export default function ProjectScreenshots({ screenshots }: ProjectScreenshotsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);

  const openLightbox = (screenshot: Screenshot) => {
    setSelectedImage(screenshot);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  // ESC key & body scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen]);

  const hasMany = screenshots.length >= 6;

  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
          Screenshots
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          スマホでは操作が難しいため、主要画面を画像で確認できます。
        </p>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory -mx-6 px-6">
          <div className="flex gap-4 pb-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="snap-start shrink-0 w-[280px] sm:w-[320px]"
              >
                <button
                  onClick={() => openLightbox(screenshot)}
                  className="
                    group block w-full text-left
                    rounded-xl overflow-hidden
                    bg-white
                    border border-slate-300/70
                    ring-1 ring-black/5
                    shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_28px_rgba(15,23,42,0.10)]
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:border-[#4F6D8C]/50
                    hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_rgba(79,109,140,0.18)]
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-[#4F6D8C]/40
                  "
                >
                  <div className="relative aspect-[4/3] bg-bg-secondary overflow-hidden">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-text-primary mb-1">
                      {screenshot.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {screenshot.desc}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => openLightbox(screenshot)}
              className={`
                group block text-left
                rounded-xl overflow-hidden
                bg-white
                border border-slate-300/70
                ring-1 ring-black/5
                shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_28px_rgba(15,23,42,0.10)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-[#4F6D8C]/50
                hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_rgba(79,109,140,0.18)]
                focus:outline-none
                focus-visible:ring-2 focus-visible:ring-[#4F6D8C]/40
                ${hasMany && index === 0 ? 'lg:col-span-2' : ''}
              `}
            >
              <div className={`relative bg-bg-secondary overflow-hidden ${hasMany && index === 0 ? 'aspect-[8/3]' : 'aspect-[4/3]'}`}>
                <Image
                  src={screenshot.src}
                  alt={screenshot.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-1">
                  {screenshot.title}
                </h3>
                <p className="text-xs text-text-secondary">
                  {screenshot.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden bg-[#F7F3EA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#4F6D8C]/15 hover:bg-[#4F6D8C]/25 text-[#4F6D8C] font-semibold transition-colors"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative bg-bg-secondary">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1600}
                height={1000}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-5 border-t border-border">
              <h3 className="text-base font-semibold text-text-primary mb-1">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {selectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
