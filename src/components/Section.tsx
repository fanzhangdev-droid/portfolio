import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="w-full max-w-5xl mx-auto px-6">
        {title && (
          <h2 className="text-4xl font-bold mb-12 text-text-primary text-center">
            {title}
          </h2>
        )}
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
