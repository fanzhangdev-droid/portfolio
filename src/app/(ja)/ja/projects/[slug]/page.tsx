import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/Container';
import ProjectGallery from '@/components/ProjectGallery';
import TaskSystemDescription from '@/components/TaskSystemDescription';
import TagChip from '@/components/ui/TagChip';
import { projects } from '@/content/projects';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const sections = project.sections;

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-[#F7F3EA] -z-10" />

      {/* Scrolling Content */}
      <div className="relative py-12 md:py-16">
        <div className="w-full max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/ja#projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-text-primary/80 transition-all duration-200 ease-out hover:text-text-primary -ml-2 pl-2 pr-2 py-1 rounded-md hover:bg-[#4F6D8C]/12
 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent mb-6"
        >
          <span className="h-4 w-[2px] rounded-full bg-border/70 transition-colors group-hover:bg-border" />
          <span className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="leading-none">Projects</span>
        </Link>


        {/* Project Header */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              {project.title}
            </h1>
            <span className="text-xs text-text-secondary bg-bg-secondary border border-border px-3 py-1 rounded-full whitespace-nowrap ml-4">
              {project.status}
            </span>
          </div>

          <p className="text-base text-text-secondary mb-6 leading-relaxed">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Demo Button (Task 管理システム only) */}
          {slug === 'task-system' && (
            <>
              <section>
                <div className="bg-bg-secondary border border-border rounded-lg p-8 text-center">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    Interactive Demo
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    実際に操作可能なデモ環境を準備中です
                  </p>
                  <button
                    disabled
                    className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
                  >
                    デモを開く（準備中）
                  </button>
                </div>
              </section>

              {/* 操作について */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-amber-900 mb-2">
                  操作について
                </h3>
                <p className="text-xs text-amber-900">
                  本デモは横方向のタイムライン操作を含むため、PCでの閲覧・操作を推奨します。スマートフォンでは下記の画面プレビューをご覧ください。
                </p>
              </div>


              {/* Screenshots */}
              {project.gallery && (
                <ProjectGallery
                  images={project.gallery}
                  title="Screenshots"
                  description="スマホでは操作が難しいため、主要画面を画像で確認できます。"
                />
              )}
            </>
          )}

          {/* Personal OS: 注意書き + Gallery */}
          {slug === 'personal-os' && (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs text-amber-900">
                  本プロジェクトは個人利用を前提としているため、操作デモおよびコード公開は行っていません。
                </p>
              </div>

              {project.gallery && (
                <ProjectGallery
                  images={project.gallery}
                  title="Gallery"
                  description="主要な画面構成と機能の概要です。"
                />
              )}
            </>
          )}

          {/* Task System / Business System / Personal OS: 専用レイアウト（二列） */}
          {slug === 'task-system' ? (
            <TaskSystemDescription sections={sections} />
          ) : slug === 'business-system' ? (
            <section className="bg-white/65 border border-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">

                {/* 左カラム：文章中心 */}
                <div className="md:col-span-7 space-y-12">

                  {/* 概要 */}
                  {sections?.概要 && (
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        概要
                      </h2>
                      <div className="space-y-4">
                        {sections.概要.split('\n\n').map((para, idx) => (
                          <p key={idx} className="text-[15px] md:text-base text-slate-700 leading-7">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 担当範囲・役割 */}
                  {sections?.担当工程 && (
                    <div className="pt-10 border-t border-border/50">
                      <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        担当範囲・役割
                      </h2>
                      <div className="space-y-4">
                        {sections.担当工程.split('\n\n').map((para, idx) => (
                          <p key={idx} className="text-[15px] md:text-base text-slate-700 leading-7">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 工夫した点・判断した点 */}
                  {sections?.['工夫した点・判断した点'] && sections['工夫した点・判断した点'].length > 0 && (
                    <div className="pt-10 border-t border-border/50">
                      <h2 className="text-xl font-semibold text-slate-900 mb-8">
                        工夫した点・判断した点
                      </h2>
                      <div className="space-y-8">
                        {sections['工夫した点・判断した点'].map((item, index) => (
                          <div key={index}>
                            <h3 className="text-base font-semibold text-slate-900 mb-4">
                              {item.title}
                            </h3>
                            <div className="border-l-2 border-border/50 pl-5 space-y-4">
                              {item.content.split('\n\n').map((para, idx) => (
                                <p key={idx} className="text-[15px] md:text-base text-slate-700 leading-7 my-0">
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 非公開について */}
                  {sections?.非公開について && (
                    <div className="pt-10 border-t border-border/50">
                      <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        非公開について
                      </h2>
                      <div className="bg-bg-secondary/60 border border-border/50 rounded-xl p-5">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {sections.非公開について}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 右カラム：技術情報 */}
                <div className="md:col-span-5 space-y-6">

                  {/* 技術スタック */}
                  {sections?.技術スタック && (
                    <div className="bg-white/70 border border-border/60 rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-border/50">
                        技術スタック
                      </h2>
                      <div className="space-y-5">
                        {Object.entries(sections.技術スタック).map(([category, items]) => (
                          <div key={category}>
                            <h3 className="text-sm font-semibold text-slate-900 mb-2.5">
                              {category}
                            </h3>
                            <ul className="space-y-1.5">
                              {items?.map((item, index) => (
                                <li key={index} className="text-sm text-slate-700 leading-relaxed pl-3">
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 技術的なポイント */}
                  {sections?.技術的なポイント && sections.技術的なポイント.length > 0 && (
                    <div className="bg-white/60 border border-border/60 rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-border/50">
                        技術的な難しさ・判断ポイント
                      </h2>
                      <ul className="space-y-3">
                        {sections.技術的なポイント.map((point, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400/50 shrink-0" />
                            <p className="text-sm text-slate-700 leading-6">
                              {point}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </section>
          ) : slug === 'personal-os' ? (
            <section className="bg-white/65 border border-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">

                {/* 左カラム：文章中心 */}
                <div className="md:col-span-7 space-y-12">

                  {/* 概要 */}
                  {sections?.概要 && (
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        概要
                      </h2>
                      <div className="space-y-4">
                        {sections.概要.split('\n\n').map((para, idx) => (
                          <p key={idx} className="text-[15px] md:text-base text-slate-700 leading-7">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 担当範囲・役割 */}
                  {sections?.担当工程 && (
                    <div className="pt-10 border-t border-border/50">
                      <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        担当範囲・役割
                      </h2>
                      <div className="space-y-4">
                        {sections.担当工程.split('\n\n').map((para, idx) => (
                          <p key={idx} className="text-[15px] md:text-base text-slate-700 leading-7">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 設計・実装における工夫 */}
                  {(sections as any)?.['設計・実装における工夫'] && (
                    <div className="pt-10 border-t border-border/50">
                      <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        設計・運用における工夫
                      </h2>
                      <div className="border-l-2 border-border/50 pl-5 space-y-4">
                        {(sections as any)['設計・実装における工夫'].split('\n\n').map((para: string, idx: number) => (
                          <p key={idx} className="text-[15px] md:text-base text-slate-700 leading-7">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 右カラム：技術情報 */}
                <div className="md:col-span-5 space-y-6">

                  {/* 技術スタック */}
                  {sections?.技術スタック && (
                    <div className="bg-white/70 border border-border/60 rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-border/50">
                        技術スタック
                      </h2>
                      <div className="space-y-5">
                        {Object.entries(sections.技術スタック).map(([category, items]) => (
                          <div key={category}>
                            <h3 className="text-sm font-semibold text-slate-900 mb-2.5">
                              {category}
                            </h3>
                            <ul className="space-y-1.5">
                              {items?.map((item, index) => (
                                <li key={index} className="text-sm text-slate-700 leading-relaxed pl-3">
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 技術的なポイント */}
                  {sections?.技術的なポイント && sections.技術的なポイント.length > 0 && (
                    <div className="bg-white/60 border border-border/60 rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-border/50">
                        技術的なポイント・設計判断
                      </h2>
                      <ul className="space-y-3">
                        {sections.技術的なポイント.map((point, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400/50 shrink-0" />
                            <p className="text-sm text-slate-700 leading-6">
                              {point}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </section>
          ) : (
            <>
              {/* 概要 */}
              {sections?.概要 && (
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                    概要
                  </h2>
                  <div className="prose-reading">
                    {sections.概要.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </section>
              )}

              {/* 担当工程 */}
              {sections?.担当工程 && (
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                    担当工程
                  </h2>
                  <div className="prose-reading">
                    {sections.担当工程.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </section>
              )}

              {/* 技術スタック */}
              {sections?.技術スタック && (
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                    技術スタック
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                    {Object.entries(sections.技術スタック).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="text-base font-semibold text-text-primary mb-3">
                          {category}
                        </h3>
                        <ul className="space-y-2">
                          {items?.map((item, index) => (
                            <li key={index} className="text-sm text-text-secondary leading-relaxed">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 技術的なポイント */}
              {sections?.技術的なポイント && sections.技術的なポイント.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                    技術的なポイント
                  </h2>
                  <div className="prose-reading">
                    {sections.技術的なポイント.map((point, index) => (
                      <p key={index}>{point}</p>
                    ))}
                  </div>
                </section>
              )}

              {/* 工夫した点・判断した点 */}
              {sections?.['工夫した点・判断した点'] &&
                sections['工夫した点・判断した点'].length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                      工夫した点・判断した点
                    </h2>
                    <div className="space-y-8">
                      {sections['工夫した点・判断した点'].map((item, index) => (
                        <div key={index} className="max-w-3xl">
                          <h3 className="text-base font-semibold text-text-primary mb-4">
                            {item.title}
                          </h3>
                          <div className="prose-reading pl-4 border-l-2 border-border">
                            {item.content.split('\n\n').map((para, idx) => (
                              <p key={idx}>{para}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
            </>
          )}

          {/* Code 区域（Task 管理システム only）*/}
          {slug === 'task-system' && (
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                Code
              </h2>
              <div className="bg-bg-secondary border border-border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-text-primary mb-2">
                  部分コード公開予定
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  設計判断や実装の背景を説明できる形で、主要なコードの一部を公開予定です。
                  <br />
                  現在準備中です。
                </p>
              </div>
            </section>
          )}

          {/* 代表的なケース */}
          {sections?.代表的なケース && sections.代表的なケース.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                代表的なケース
              </h2>
              <div className="prose-reading">
                {sections.代表的なケース.map((caseItem, index) => (
                  <p key={index}>{caseItem}</p>
                ))}
              </div>
            </section>
          )}

          {/* 非公開について（business-system は専用レイアウト内で表示済み） */}
          {sections?.非公開について && slug !== 'business-system' && (
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4 pb-2 border-b border-border">
                非公開について
              </h2>
              <div className="bg-bg-secondary border border-border rounded-lg p-6 max-w-3xl">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {sections.非公開について}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Back Link at Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/ja#projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-text-primary/80 transition-all duration-200 ease-out hover:text-text-primary -ml-2 pl-2 pr-2 py-1 rounded-md hover:bg-[#4F6D8C]/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6D8C]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="leading-none">Projects</span>
          </Link>

        </div>
        </div>
      </div>
    </div>
  );
}
