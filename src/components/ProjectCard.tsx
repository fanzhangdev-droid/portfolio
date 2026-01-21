import Link from "next/link";
import Image from "next/image";
import { Project, Locale } from "@/content/projects";
import TagChip from "@/components/ui/TagChip";

type CardVariant = "default" | "featured";

interface ProjectCardProps {
  project: Project;
  className?: string;
  variant?: CardVariant;
  locale?: Locale;
}

export default function ProjectCard({
  project,
  className = "",
  variant = "default",
  locale = "ja",
}: ProjectCardProps) {
  const tags = (project.tags ?? []).slice(0, 8);
  const isFeatured = variant === "featured";

  const fallbackCover = "/images/placeholder/project-cover.png";
  const coverSrc = project.cover ?? fallbackCover;
  // 新增：featured 左右图的 source
  const leftCover =
    project.covers?.[0] ?? project.cover ?? fallbackCover;
  const rightCover =
  project.covers?.[1] ?? project.cover ?? fallbackCover;
  const statusClass =
    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium " +
    "text-[#4F6D8C] border border-[#4F6D8C]/60 " +
    "bg-[rgba(79,109,140,0.12)]";

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className={`
        group relative block overflow-hidden
        rounded-2xl
        bg-white
        border border-slate-300/90
        ring-1 ring-black/5
        transition-all duration-300
        shadow-[0_1px_0_rgba(15,23,42,0.04),0_16px_40px_rgba(15,23,42,0.08)]
        hover:-translate-y-1 hover:scale-[1.01]
        hover:border-[#4F6D8C]/50
        hover:shadow-[0_24px_64px_rgba(79,109,140,0.22)]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[#4F6D8C]/40
        focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EA]
        ${className}
      `}
    >
      {/* ===== MOBILE ===== */}
      <div className="lg:hidden">
        <div className="bg-[rgba(247,243,234,0.85)] backdrop-blur border-b border-slate-200/70 shadow-[0_1px_0_rgba(15,23,42,0.04)] px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-slate-900 truncate">
              {project.title}
            </h3>
            <span className={statusClass}>{project.status}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full bg-slate-100/70">
            <Image
              src={leftCover}
              alt={`${project.title} cover`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 92vw, 640px"
            />
          </div>
        </div>
      </div>

      {/* ===== DESKTOP: Featured ===== */}
      {isFeatured && (
        <div className="hidden lg:block">
          <div className="bg-[rgba(247,243,234,0.85)] backdrop-blur border-b border-slate-200/70 shadow-[0_1px_0_rgba(15,23,42,0.04)] px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[16px] font-semibold tracking-tight text-slate-900 truncate">
                {project.title}
              </h3>
              <span className={statusClass}>{project.status}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.slice(0, 8).map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-slate-200/40">
            <div className="relative bg-slate-100/70">
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={leftCover}
                  alt={`${project.title} cover`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 800px"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent opacity-60" />
            </div>

            <div className="relative bg-slate-100/70">
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={rightCover}
                  alt={`${project.title} cover`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 800px"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      )}

      {/* ===== DESKTOP: Default ===== */}
      {!isFeatured && (
        <div className="hidden lg:block">
          <div className="bg-[rgba(247,243,234,0.85)] backdrop-blur border-b border-slate-200/70 shadow-[0_1px_0_rgba(15,23,42,0.04)] px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[15px] font-semibold tracking-tight text-slate-900 truncate">
                {project.title}
              </h3>
              <span className={statusClass}>{project.status}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.slice(0, 6).map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[21/9] w-full bg-slate-100/70">
              <Image
                src={coverSrc}
                alt={`${project.title} cover`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 900px, 100vw"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      )}
    </Link>
  );
}
