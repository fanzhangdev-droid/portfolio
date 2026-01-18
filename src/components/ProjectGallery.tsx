'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
}

export default function ProjectGallery({
  images,
  title = "Gallery",
  description
}: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
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

  if (!images.length) return null;

  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-text-secondary mb-6">
            {description}
          </p>
        )}

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory -mx-6 px-6">
          <div className="flex gap-4 pb-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="snap-start shrink-0 w-[280px] sm:w-[320px]"
              >
                <button
                  onClick={() => openLightbox(image)}
                  className="
                    group block w-full text-left
                    rounded-xl overflow-hidden
                    bg-white
                    border border-slate-300/70
                    ring-1 ring-black/5
                    shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_28px_rgba(15,23,42,0.10)]
                    transition-all duration-200
                    hover:-translate-y-[2px]
                    hover:border-[#4F6D8C]/40
                    hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_rgba(79,109,140,0.18)]
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-[#4F6D8C]/40
                  "
                >
                  <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden rounded-t-xl">
                    <Image
                      src={image.src}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 280px, 320px"
                      quality={90}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/5" />
                  </div>
                  <div className="min-h-[72px] px-4 py-3">
                    {image.alt && (
                      <h3 className="text-sm font-semibold text-text-primary mb-1">
                        {image.alt}
                      </h3>
                    )}
                    {image.caption && (
                      <p className="text-xs text-text-secondary">
                        {image.caption}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(image)}
              className="
                group block text-left
                rounded-xl overflow-hidden
                bg-white
                border border-slate-300/70
                ring-1 ring-black/5
                shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_28px_rgba(15,23,42,0.10)]
                transition-all duration-200
                hover:-translate-y-[2px]
                hover:border-[#4F6D8C]/40
                hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_rgba(79,109,140,0.18)]
                focus:outline-none
                focus-visible:ring-2 focus-visible:ring-[#4F6D8C]/40
              "
            >
              <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden rounded-t-xl">
                <Image
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 320px"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/5" />
              </div>
              <div className="min-h-[72px] px-4 py-3">
                {image.alt && (
                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                    {image.alt}
                  </h3>
                )}
                {image.caption && (
                  <p className="text-xs text-text-secondary">
                    {image.caption}
                  </p>
                )}
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
                alt={selectedImage.alt || 'Gallery image'}
                width={1600}
                height={1000}
                quality={95}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            {/* Caption */}
            {(selectedImage.alt || selectedImage.caption) && (
              <div className="p-5 border-t border-border">
                {selectedImage.alt && (
                  <h3 className="text-base font-semibold text-text-primary mb-1">
                    {selectedImage.alt}
                  </h3>
                )}
                {selectedImage.caption && (
                  <p className="text-sm text-text-secondary">
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
