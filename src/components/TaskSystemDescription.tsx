import { Project, Locale } from '@/content/projects';

interface TaskSystemDescriptionProps {
  sections: Project['sections'];
  locale?: Locale;
}

const labels = {
  ja: {
    overview: '概要',
    responsibilities: '担当工程',
    highlights: '工夫した点・判断した点',
    techStack: '技術スタック',
    technicalPoints: '技術的なポイント',
  },
  en: {
    overview: 'Overview',
    responsibilities: 'Responsibilities',
    highlights: 'Design & Implementation Approach',
    techStack: 'Tech Stack',
    technicalPoints: 'Technical Points',
  },
};

export default function TaskSystemDescription({ sections, locale = 'ja' }: TaskSystemDescriptionProps) {
  if (!sections) return null;

  const t = labels[locale];

  // 技術的なポイントの最後の項目（まとめ文）を分離
  const technicalPoints = sections.技術的なポイント || [];
  const mainPoints = technicalPoints.slice(0, -1);
  const summaryPoint = technicalPoints[technicalPoints.length - 1];

  return (
    <section className="bg-white/65 border border-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">

        {/* 左カラム：文章中心 */}
        <div className="md:col-span-7 space-y-12">

          {/* 概要 */}
          {sections.概要 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-5">
                {t.overview}
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

          {/* 担当工程 */}
          {sections.担当工程 && (
            <div className="pt-10 border-t border-border/50">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">
                {t.responsibilities}
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
          {sections['工夫した点・判断した点'] && sections['工夫した点・判断した点'].length > 0 && (
            <div className="pt-10 border-t border-border/50">
              <h2 className="text-xl font-semibold text-slate-900 mb-8">
                {t.highlights}
              </h2>
              <div className="border-l-2 border-border/50 pl-5 space-y-4">
                {sections['工夫した点・判断した点'].map((item, index) =>
                  item.content.split('\n\n').map((para, idx) => (
                    <p key={`${index}-${idx}`} className="text-[15px] md:text-base text-slate-700 leading-7 my-0">
                      {para}
                    </p>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 右カラム：技術情報 */}
        <div className="md:col-span-5 space-y-6">

          {/* 技術スタック */}
          {sections.技術スタック && (
            <div className="bg-white/70 border border-border/60 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-border/50">
                {t.techStack}
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
          {technicalPoints.length > 0 && (
            <div className="bg-white/60 border border-border/60 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-border/50">
                {t.technicalPoints}
              </h2>

              {/* メインポイントのリスト */}
              <ul className="space-y-3">
                {mainPoints.map((point, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400/50 shrink-0" />
                    <p className="text-sm text-slate-700 leading-6">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              {/* まとめ文（note box） */}
              {summaryPoint && (
                <div className="mt-5 rounded-xl border border-border/50 bg-bg-secondary/60 p-4">
                  <p className="text-sm text-slate-700 leading-6">
                    {summaryPoint}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
