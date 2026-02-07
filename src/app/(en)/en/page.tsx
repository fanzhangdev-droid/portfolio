import Container from '@/components/Container';
import Section from '@/components/Section';
import Nav from '@/components/Nav';
import ProjectCard from '@/components/ProjectCard';
import SkillsRadar from '@/components/SkillsRadar';
import Reveal from '@/components/Reveal';
import ScrollReveal from '@/components/ScrollReveal';
import { projects, getLocalizedProject } from '@/content/projects';
import Image from "next/image";

const skills = [
  { name: 'Frontend', level: 80, category: 'Development' },
  { name: 'Backend', level: 85, category: 'Development' },
  { name: 'Database', level: 82, category: 'Infrastructure' },
  { name: 'Batch (Core Systems)', level: 78, category: 'Processing' },
  { name: 'Infrastructure', level: 65, category: 'DevOps' },
  { name: 'System Design', level: 88, category: 'Engineering' },
];

export default function HomePage() {
  const localizedProjects = projects.map(p => getLocalizedProject(p, 'en'));

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-[#F7F3EA] -z-10" />

      {/* Scrolling Content */}
      <div className="relative">
        <Nav />

        {/* Hero Section - Editorial Design */}
       <section
         id="hero"
         className="relative min-h-[92vh] scroll-mt-24 flex items-center bg-[#F7F3EA] pt-24 pb-20"
       >
         <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
           <div className="mx-auto max-w-2xl text-center hero-animate">
             {/* Name */}
             <div className="hero-title-wrap mx-auto inline-block" data-shimmer="soft">
               <h1
                 className="
                   hero-3d hero-title-breathe
                   text-4xl sm:text-5xl md:text-6xl
                   font-semibold tracking-[-0.01em]
                   text-slate-900 leading-[1.05]
                 "
               >
                 ZHANG FAN
               </h1>
             </div>

             {/* Separator */}
             <div className="hero-underline mx-auto mt-5 w-44" />

             {/* Roles */}
             <div className="mt-8 space-y-1 hero-animate hero-delay-2">
               <p className="text-sm sm:text-base text-slate-700">
                 Systems Engineer
               </p>
               <p className="text-sm sm:text-base text-slate-700">
                 Backend-focused Full Stack Developer
               </p>
             </div>

             {/* Description */}
             <div className="mt-8 space-y-3 text-sm sm:text-base leading-7 text-slate-700 hero-animate hero-delay-3">
               <p className="
                 sm:whitespace-nowrap
                 text-[13px] sm:text-sm lg:text-base
                 leading-relaxed
                 text-text-secondary
               ">
                 A systems engineer working on enterprise systems in the telecom industry.
               </p>

               <p>Preparing to launch as a freelance engineer.</p>
             </div>

               {/* Portrait Placeholder */}
                          <div className="mt-12 flex justify-center hero-animate hero-delay-3">
                            <div
                              className="
                                relative
                                w-[200px] sm:w-[240px] md:w-[280px]
                                aspect-square
                                rounded-full
                                bg-white/60
                                ring-1 ring-slate-300/40
                                backdrop-blur-sm
                                overflow-hidden
                              "
                            >
                              <Image
                                src="/images/portrait2.jpg"
                                alt="Portrait of Zhang Fan"
                                fill
                                className="object-cover"
                                priority
                              />
                            </div>
                          </div>
           </div>
         </div>
          {/* Bottom floating triangle */}
          <span className="hero-scroll-indicator" aria-hidden="true" />
       </section>


      <div>
        {/* What I Do Section */}
        <Section
          id="what-i-do"
          className="bg-[#F7F3EA]"
        >
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              {/* Title */}
              <h2 className="text-4xl font-bold mb-12 text-text-primary text-center">
                What I Do
              </h2>

              {/* Content */}
              <ul className="max-w-md space-y-4 text-base sm:text-lg text-slate-700">
                <li>Backend design & implementation for enterprise systems</li>
                <li>Feature additions & improvements to existing systems</li>
                <li>API & database design</li>
              </ul>
            </div>
          </ScrollReveal>
        </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects" className="section--alt">
        <ScrollReveal>
          <p className="-mt-8 mb-10 text-center text-sm sm:text-[15px] leading-relaxed text-slate-600">
            I prioritize holistic system design, not just individual feature implementation.
          </p>
        </ScrollReveal>

        {(() => {
          // Featured project should be the Task system (slug is task-system)
          const featured = localizedProjects.find((p) => p.slug === "task-system");
          const rest = localizedProjects.filter((p) => p.slug !== "task-system");

          return (
            <div className="space-y-6 lg:space-y-7">
              {/* Row 1: Featured */}
              {featured && (
                <div className="grid grid-cols-1 gap-6 lg:gap-7">
                  <ScrollReveal delayMs={60}>
                    <ProjectCard
                      key={featured.slug}
                      project={featured}
                      variant="featured"
                      className="w-full"
                      locale="en"
                    />
                  </ScrollReveal>
                </div>
              )}

              {/* Row 2: Remaining */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                {rest.map((project, index) => (
                  <ScrollReveal key={project.slug} delayMs={120 + index * 70}>
                    <ProjectCard project={project} locale="en" />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })()}

      </Section>


       {/* Skills Section - Radar Chart */}
       <Section id="skills" title="Skills">
         <div>
           {/* Caption */}
           <ScrollReveal>
             <p className="text-xs text-text-secondary mb-2 text-center tracking-wide">
               Coverage areas and proficiency levels based on practical experience
             </p>
             <p className="text-[11px] text-text-secondary/70 mb-6 text-center">
               * Values represent capability levels (autonomy) in each domain, not time allocation.
             </p>
           </ScrollReveal>

           {/* Radar */}
           <ScrollReveal delayMs={60}>
             <SkillsRadar skills={skills} />
           </ScrollReveal>

           {/* Skill Details */}
           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">

             {/* 1. System Design */}
             <ScrollReveal delayMs={0}>
               <div className="border border-border/40 rounded-lg px-5 py-4">
                 <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                   System Design
                 </h3>
                 <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                                [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                   <li>
                     Basic / Detailed Design
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Test Design & Execution
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Git / GitHub
                     <span className="tag-personal">Personal</span>
                   </li>
                   <li>
                     CI/CD
                     <span className="tag-personal">Personal</span>
                   </li>
                 </ul>
               </div>
             </ScrollReveal>

             {/* 2. Frontend */}
             <ScrollReveal delayMs={70}>
               <div className="border border-border/40 rounded-lg px-5 py-4">
                 <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                   Frontend
                 </h3>
                 <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                                [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                   <li>
                     HTML / CSS / JavaScript
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     React / TypeScript / Next.js
                     <span className="tag-personal">Personal</span>
                   </li>
                   <li>
                     Tailwind CSS
                     <span className="tag-personal">Personal</span>
                   </li>
                 </ul>
               </div>
             </ScrollReveal>

             {/* 3. Backend */}
             <ScrollReveal delayMs={140}>
               <div className="border border-border/40 rounded-lg px-5 py-4">
                 <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                   Backend
                 </h3>
                 <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                                [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                   <li>
                     Java (Fujitsu Framework)
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Spring Boot
                     <span className="tag-personal">Personal</span>
                   </li>
                   <li>
                     Python
                     <span className="tag-personal">Personal</span>
                   </li>
                   <li>
                     REST API Design & Implementation
                     <span className="tag-personal">Personal</span>
                   </li>
                 </ul>
               </div>
             </ScrollReveal>

             {/* 4. Database */}
             <ScrollReveal delayMs={0}>
               <div className="border border-border/40 rounded-lg px-5 py-4">
                 <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                   Database
                 </h3>
                 <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                                [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                   <li>
                     SQL
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Data Modeling
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Oracle Database
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     PostgreSQL
                     <span className="tag-personal">Personal</span>
                   </li>
                 </ul>
               </div>
             </ScrollReveal>

             {/* 5. Batch / Processing */}
             <ScrollReveal delayMs={70}>
               <div className="border border-border/40 rounded-lg px-5 py-4">
                 <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                   Batch (Core Systems)
                 </h3>
                 <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                                [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                   <li>
                     Java Batch
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Shell Script
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Job Scheduling
                     <span className="tag-work">Work</span>
                   </li>
                 </ul>
               </div>
             </ScrollReveal>

             {/* 6. Infrastructure */}
             <ScrollReveal delayMs={140}>
               <div className="border border-border/40 rounded-lg px-5 py-4">
                 <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                   Infrastructure
                 </h3>
                 <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                                [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                   <li>
                     Linux
                     <span className="tag-work">Work</span>
                   </li>
                   <li>
                     Docker
                     <span className="tag-personal">Personal</span>
                   </li>
                   <li>
                     AWS (ECS / RDS / ALB)
                     <span className="tag-personal">Personal</span>
                   </li>
                 </ul>
               </div>
             </ScrollReveal>

           </div>
         </div>
       </Section>




       {/* About Me Section - Editorial Layout */}
       <Section id="about" className="section--alt">
         <div className="flex flex-col items-center">
           {/* Section Heading */}
           <div className="text-center mb-12">
             <h2 className="text-4xl font-bold text-text-primary mb-3">
               About me
             </h2>
             <p className="text-base text-text-secondary/90">
               Finding my own path and arriving at the present
             </p>
           </div>

           <div className="mt-4 w-full flex justify-center">
             <div className="w-full max-w-[680px] lg:max-w-[880px] xl:max-w-[960px]">
               <div className="relative">
                 {/* Vertical Line */}
                 <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-black/10 pointer-events-none" />

                 <div className="space-y-16">

                   {/* Phase 1 */}
                   <div className="grid grid-cols-[28px_1fr] gap-x-10">
                     {/* Dot */}
                     <div className="relative">
                       <div className="absolute left-1/2 top-[6px] w-2 h-2 rounded-full bg-text-primary opacity-40 -translate-x-1/2 pointer-events-none" />
                     </div>

                     <div>
                       {/* Title */}
                       <Reveal delayMs={0} durationMs={900} y={12}>
                         <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-2 leading-relaxed">
                           The awareness of "creating" that started with music
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           Middle & High School | Music & Creation
                         </p>
                       </Reveal>

                       {/* Body */}
                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           From middle school, I studied Western classical composition at a music conservatory affiliated with a Chinese university.
                           Rather than approaching music purely through intuition, I spent time thinking about why things sound the way they do and how they work structurally.
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           Completing a piece requires accumulating details while maintaining sight of the whole, and persevering until the end.
                           This approach of "organizing thoughts, building structures, and seeing things through" has become the foundation of my current work and learning.
                         </p>
                       </Reveal>
                     </div>
                   </div>

                   {/* Phase 2 */}
                   <div className="grid grid-cols-[28px_1fr] gap-x-10">
                     <div className="relative">
                       <div className="absolute left-1/2 top-[6px] w-2 h-2 rounded-full bg-text-primary opacity-40 -translate-x-1/2 pointer-events-none" />
                     </div>

                     <div>
                       <Reveal delayMs={0} durationMs={900} y={12}>
                         <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-2 leading-relaxed">
                           Turning curiosity into action and coming to Japan
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           After High School | Coming to Japan
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           Having loved Japanese anime since childhood, my interest in Japanese culture led me to choose studying abroad in Japan after high school.
                           With a strong desire to take on new challenges in an unfamiliar environment and expand my horizons and possibilities,
                           leaving home for the first time and starting life in a new world was a significant challenge for me.
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           While balancing academics and daily life and preparing for my target university and department, I needed to think about time management and priorities on my own.
                           Rather than having someone decide for me, I learned to think, choose, and take responsibility for the outcomes.
                           Through these experiences, I developed habits of autonomy and efficiency-conscious behavior.
                         </p>
                       </Reveal>
                     </div>
                   </div>

                   {/* Phase 3 */}
                   <div className="grid grid-cols-[28px_1fr] gap-x-10">
                     <div className="relative">
                       <div className="absolute left-1/2 top-[6px] w-2 h-2 rounded-full bg-text-primary opacity-40 -translate-x-1/2 pointer-events-none" />
                     </div>

                     <div>
                       <Reveal delayMs={0} durationMs={900} y={12}>
                         <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-2 leading-relaxed">
                           Time spent understanding people and growth
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           University | Multicultural Understanding
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           At university, I majored in educational development, learning about how people understand and grow.
                           Through our shared interest in Japanese culture, I naturally connected with people from various countries and cultural backgrounds.
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           This experience continues to support me in my current work, whether organizing requirements while considering others' perspectives
                           or building shared understanding within a team.
                         </p>
                       </Reveal>
                     </div>
                   </div>

                   {/* Phase 4 */}
                   <div className="grid grid-cols-[28px_1fr] gap-x-10">
                     <div className="relative">
                       <div className="absolute left-1/2 top-[6px] w-2 h-2 rounded-full bg-text-primary opacity-40 -translate-x-1/2 pointer-events-none" />
                     </div>

                     <div>
                       <Reveal delayMs={0} durationMs={900} y={12}>
                         <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-2 leading-relaxed">
                           Curiosity about the future led to choosing engineering
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           After University | IT & Self-learning
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           In an era of rapid change, I was strongly attracted to the ability to preserve ideas not as fleeting thoughts,
                           but as systems that can be maintained and used continuously. After graduating from university, I began self-studying programming.
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           The "ability to think structurally" and "sense of building while seeing the whole picture" that I developed through music
                           naturally comes into play when writing code.
                         </p>
                       </Reveal>
                     </div>
                   </div>

                   {/* Phase 5 */}
                   <div className="grid grid-cols-[28px_1fr] gap-x-10">
                     <div className="relative">
                       <div className="absolute left-1/2 top-[6px] w-2 h-2 rounded-full bg-text-primary opacity-40 -translate-x-1/2 pointer-events-none" />
                     </div>

                     <div>
                       <Reveal delayMs={0} durationMs={900} y={12}>
                         <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-2 leading-relaxed">
                           Ongoing efforts centered on results and responsibility
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           Present | Commercial Projects × Personal Development
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           Currently, I work on core system development, handling everything from design to implementation and post-release verification.
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           Organizing requirements, designing within constraints, and seeing what I create actually being used in real business operations
                           gives me a strong sense of accomplishment and fulfillment as a creator.
                           Outside of work, I continue to face the challenge of "creating" through personal development, guided by my own principles and experiences gained from the field.
                         </p>
                       </Reveal>
                     </div>
                   </div>

                 </div>
               </div>

               {/* Closing Message */}
               <div className="mt-24">
                 <Reveal delayMs={0} durationMs={1400} y={18}>
                   <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                     Thank you for reading this far.
                     I hope this page has conveyed at least a part of my thoughts and approach.
                     Moving forward, I will continue to value encounters and experiences, aiming to become someone who can support others by creating better products and systems as an engineer.
                   </p>
                 </Reveal>
               </div>

             </div>
           </div>
         </div>
       </Section>



        {/* Availability Section */}
        <Section
          id="availability"
          className="min-h-screen flex items-center justify-center"
        >
          <ScrollReveal>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-4xl font-bold mb-12 text-text-primary text-center">
                Availability
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Available for freelance projects from April 2026
              </p>
            </div>
          </ScrollReveal>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact">
          <ScrollReveal>
            <div className="mx-auto max-w-xl text-center">
              <p className="text-text-secondary leading-relaxed mb-8">
                Feel free to reach out for inquiries or consultations through the following channels.
              </p>
              <div className="space-y-3">
                <ScrollReveal delayMs={80}>
                  <div className="text-sm">
                    <span className="font-medium text-text-primary">Email: </span>
                    <a href="mailto:your.email@example.com" className="text-text-secondary hover:text-accent underline">
                      fan.zhang.dev@gmail.com
                    </a>
                  </div>
                </ScrollReveal>
                <ScrollReveal delayMs={160}>
                  <div className="text-sm">
                    <span className="font-medium text-text-primary">GitHub: </span>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent underline">
                      github.com/yourusername
                    </a>
                  </div>
                </ScrollReveal>
                <ScrollReveal delayMs={240}>
                  <div className="text-sm">
                    <span className="font-medium text-text-primary">LinkedIn: </span>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent underline">
                      linkedin.com/in/yourusername
                    </a>
                  </div>
                </ScrollReveal>
              </div>
              <p className="text-xs text-text-tertiary mt-8">

              </p>
            </div>
          </ScrollReveal>
        </Section>
      </div>

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="w-full max-w-5xl mx-auto px-6">
            <p className="text-center text-xs text-text-tertiary">
              © 2026 Zhang Fan. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
