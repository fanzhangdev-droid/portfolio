import Container from '@/components/Container';
import Section from '@/components/Section';
import Nav from '@/components/Nav';
import ProjectCard from '@/components/ProjectCard';
import SkillsRadar from '@/components/SkillsRadar';
import Reveal from '@/components/Reveal';
import { projects } from '@/content/projects';

const skills = [
  { name: 'Frontend', level: 80, category: 'Development' },
  { name: 'Backend', level: 85, category: 'Development' },
  { name: 'Database', level: 82, category: 'Infrastructure' },
  { name: 'Batch(基幹系)', level: 78, category: 'Processing' },
  { name: 'Infrastructure', level: 65, category: 'DevOps' },
  { name: 'System Design', level: 88, category: 'Engineering' },
];

export default function HomePage() {
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
                 システムエンジニア
               </p>
               <p className="text-sm sm:text-base text-slate-700">
                 バックエンド中心フルスタック
               </p>
             </div>

             {/* Description */}
             <div className="mt-8 space-y-3 text-sm sm:text-base leading-7 text-slate-700 hero-animate hero-delay-3">
               <p className="
                 whitespace-nowrap
                 text-[13px] sm:text-sm lg:text-base
                 leading-relaxed
                 text-text-secondary
               ">
                 通信業界の業務システムを担当する現役システムエンジニア。
               </p>

               <p>フリーランスエンジニアとして独立準備中。</p>
             </div>

             {/* Portrait Placeholder */}
             <div className="mt-12 flex justify-center hero-animate hero-delay-3">
               <div
                 className="
                   w-[220px] sm:w-[260px] md:w-[300px]
                   aspect-[3/4]
                   rounded-2xl
                   bg-white/60
                   ring-1 ring-slate-300/40
                   backdrop-blur-sm
                   flex items-center justify-center
                 "
               >
                 <span className="text-sm text-slate-500 tracking-wide">
                   Portrait in preparation
                 </span>
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
          <div className="flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="text-4xl font-bold mb-12 text-text-primary text-center">
              What I Do
            </h2>

            {/* Content */}
            <ul className="max-w-md space-y-4 text-base sm:text-lg text-slate-700">
              <li>業務システムのバックエンド設計・実装</li>
              <li>既存システムの機能追加・改善</li>
              <li>API・データベース設計</li>
            </ul>
          </div>
        </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects" className="section--alt">
        <p className="-mt-8 mb-10 text-center text-sm sm:text-[15px] leading-relaxed text-slate-600">
          単なる機能実装ではなく、全体構造を意識したシステム設計を重視しています。
        </p>

        {(() => {
          // Featured project should be the Task system (slug is task-system)
          const featured = projects.find((p) => p.slug === "task-system");
          const rest = projects.filter((p) => p.slug !== "task-system");

          return (
            <div className="space-y-6 lg:space-y-7">
              {/* Row 1: Featured */}
              {featured && (
                <div className="grid grid-cols-1 gap-6 lg:gap-7">
                  <ProjectCard
                    key={featured.slug}
                    project={featured}
                    variant="featured"
                    className="w-full"
                    locale="ja"
                  />
                </div>
              )}

              {/* Row 2: Remaining */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                {rest.map((project) => (
                  <ProjectCard key={project.slug} project={project} locale="ja" />
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
           <p className="text-xs text-text-secondary mb-2 text-center tracking-wide">
             実務経験に基づく対応領域と対応レベル（習熟度）
           </p>
           <p className="text-[11px] text-text-secondary/70 mb-6 text-center">
             ※ 数値は工数比率ではなく、各領域での対応可能レベル（自走度）を示します。
           </p>

           {/* Radar */}
           <SkillsRadar skills={skills} />

           {/* Skill Details */}
           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">

             {/* 1. System Design */}
             <div className="border border-border/40 rounded-lg px-5 py-4">
               <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                 System Design
               </h3>
               <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                              [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                 <li>
                   基本設計 / 詳細設計
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   テスト設計・実施
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   Git / GitHub
                   <span className="tag-personal">個人開発</span>
                 </li>
                 <li>
                   CI/CD
                   <span className="tag-personal">個人開発</span>
                 </li>
               </ul>
             </div>

             {/* 2. Frontend */}
             <div className="border border-border/40 rounded-lg px-5 py-4">
               <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                 Frontend
               </h3>
               <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                              [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                 <li>
                   HTML / CSS / JavaScript
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   React / TypeScript / Next.js
                   <span className="tag-personal">個人開発</span>
                 </li>
                 <li>
                   Tailwind CSS
                   <span className="tag-personal">個人開発</span>
                 </li>
               </ul>
             </div>

             {/* 3. Backend */}
             <div className="border border-border/40 rounded-lg px-5 py-4">
               <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                 Backend
               </h3>
               <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                              [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                 <li>
                   Java（富士通系フレームワーク）
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   Spring Boot
                   <span className="tag-personal">個人開発</span>
                 </li>
                 <li>
                   Python
                   <span className="tag-personal">個人開発</span>
                 </li>
                 <li>
                   REST API 設計・実装
                   <span className="tag-personal">個人開発</span>
                 </li>
               </ul>
             </div>

             {/* 4. Database */}
             <div className="border border-border/40 rounded-lg px-5 py-4">
               <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                 Database
               </h3>
               <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                              [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                 <li>
                   SQL
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   データモデリング
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   Oracle Database
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   PostgreSQL
                   <span className="tag-personal">個人開発</span>
                 </li>
               </ul>
             </div>

             {/* 5. Batch / Processing */}
             <div className="border border-border/40 rounded-lg px-5 py-4">
               <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                 Batch（基幹系）
               </h3>
               <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                              [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                 <li>
                   Java Batch
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   シェルスクリプト
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   ジョブネット
                   <span className="tag-work">実務</span>
                 </li>
               </ul>
             </div>

             {/* 6. Infrastructure */}
             <div className="border border-border/40 rounded-lg px-5 py-4">
               <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border tracking-wide">
                 Infrastructure
               </h3>
               <ul className="mt-4 space-y-1.5 text-xs text-text-secondary leading-relaxed
                              [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                 <li>
                   Linux
                   <span className="tag-work">実務</span>
                 </li>
                 <li>
                   Docker
                   <span className="tag-personal">個人開発</span>
                 </li>
                 <li>
                   AWS（ECS / RDS / ALB）
                   <span className="tag-personal">個人開発</span>
                 </li>
               </ul>
             </div>

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
               自分に合う軸を探し、たどり着いた現在
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
                           音楽から始まった、「作る」ことへの意識
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           中・高校｜「音楽」と「作る」
                         </p>
                       </Reveal>

                       {/* Body */}
                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           中学時代から、中国の音楽大学附属中学校で西洋クラシック作曲を学んでいました。
                           音楽を「感覚」だけで捉えるのではなく、なぜそう聴こえるのか、どう構造として成り立っているのかを考え、形にしていく時間でした。
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           曲を一つ完成させるためには、細部を積み重ね、全体の流れを見失わず、最後まで向き合い続ける必要があります。
                           この「考えを整理し、構造として組み立て、最後まで仕上げる」という姿勢は、今の学びと仕事の基盤にもなっています。
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
                           好奇心を行動に変え、日本へ
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           高校卒業後｜来日
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           子供の頃からずっと日本のアニメが大好きで、日本文化への関心をきっかけに、高校卒業後、日本に留学することを選びました。
                           知らない環境で新しい挑戦をしたい、自分自身の視野や可能性を広げていきたいという強い気持ちを持ち、
                           初めて家を離れ、新しい世界で生活を始めたことは、私にとって大きな挑戦でした。
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           学業と日常生活を両立しながら、自分が進みたい大学・学部を目指して準備を進める中で、時間の使い方や優先順位を自分で考え、行動する力が求められました。
                           誰かに決めてもらうのではなく、自分で考え、選択し、その結果を引き受ける。
                           そうした経験を重ねる中で、自律性や効率を意識した行動習慣が身についていきました。
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
                           人の理解と成長に向き合った時間
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           大学｜多文化理解
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           大学では教育発達を専攻し、人はどのように理解し、どのように成長していくのかを学びました。
                           日本文化への関心という共通点をきっかけに、さまざまな国や文化背景を持つ人たちと出会い、自然と交流の輪が広がっていきました。
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           この経験は、現在の業務においても、相手の立場を想像しながら要件を整理したり、
                           チームで共通の認識をつくったりする際の、私自身の大切な支えになっています。
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
                           未来への好奇心が導いた、エンジニアという選択
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           大学卒業後｜IT・独学
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           変化の速い時代の中で、考えたことをその場限りで終わらせるのではなく、
                          仕組みとして残し、使い続けられる形にできる点に強く惹かれ、大学卒業してからプログラミングを独学で学び始めました。
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           音楽で培った「構造を考える力」や「全体を見ながら組み立てる感覚」も、
                           コードを書く中でも自然と活きていると感じています。
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
                           成果と責任を軸に、今も続く取り組み
                         </h3>
                         <p className="text-xs text-text-secondary/60 mb-4">
                           現在｜商用現場 × 個人開発
                         </p>
                       </Reveal>

                       <Reveal delayMs={320} durationMs={1400} y={18}>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           現在は基幹システムの開発現場で、設計から実装、リリース後の検証までを一貫して担当しています。
                         </p>
                         <p className="text-sm lg:text-base text-text-secondary leading-[1.85] lg:leading-[1.9] indent-4">
                           要件を整理し、制約の中で設計を考え、形にしたものが実際の業務で使われ続いていて、
                          そのプロセスに関われることで、ものづくりとしてのやりがいと達成感を非常に感じています。
                           業務外の個人開発にも、現場で得た経験を踏まえながら、自分なりの軸で「作る」ことに向き合い続けています。
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
                     ここまで目を通していただき、ありがとうございます。
                     このページを通して、私の考えや姿勢の一端でも伝わっていれば嬉しく思います。
                     これからも、出会いや経験を大切にしながら、エンジニアとしてより良いプロダクトや仕組みを形にすることで、より多くの人に少しでも支えられる存在を目指していきたいと考えています。
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
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-4xl font-bold mb-12 text-text-primary text-center">
              Availability
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              フリーランス案件は2026年4月以降対応可能
            </p>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-text-secondary leading-relaxed mb-8">
              お問い合わせやご相談は、以下の方法でお気軽にご連絡ください。
            </p>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium text-text-primary">Email: </span>
                <a href="mailto:fan.zhang.dev@gmail.com" className="text-text-secondary hover:text-accent underline">
                  fan.zhang.dev@gmail.com
                </a>
              </div>
              <div className="text-sm">
                <span className="font-medium text-text-primary">GitHub: </span>
                <a href="https://github.com/fanzhangdev-droid" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent underline">
                  github.com/fanzhangdev-droid
                </a>
              </div>
              <div className="text-sm">
                <span className="font-medium text-text-primary">LinkedIn: </span>
                <a href="https://linkedin.com/in/zhangfandev" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent underline">
                  linkedin.com/in/zhangfandev
                </a>
              </div>
            </div>
            <p className="text-xs text-text-tertiary mt-8">

            </p>
          </div>
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
