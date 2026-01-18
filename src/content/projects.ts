export type Locale = 'ja' | 'en';

export interface ProjectSections {
  概要?: string;
  担当工程?: string;
  技術スタック?: {
    フロントエンド?: string[];
    バックエンド?: string[];
    データベース?: string[];
    フレームワーク?: string[];
    "バッチ / データ処理"?: string[];
    ジョブ管理?: string[];
    "状態管理 / データ管理"?: string[];
    インフラ?: string[];
    "テスト・品質管理"?: string[];
    // Personal OS 用
    データ管理?: string[];
    データ処理?: string[];
    状態管理?: string[];
    実行環境?: string[];
  };
  技術的なポイント?: string[];
  "設計・実装における工夫"?: string;
  "Representative Case"?: string;
  "工夫した点・判断した点"?: {
    title: string;
    content: string;
  }[];
  代表的なケース?: string[];
  非公開について?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  status: string;
  tags: string[];
  summary: string;

  // Projects カード封面（21:9 / 4:3 都可裁切）
  cover?: string;

  // featured カード左右两张（可选）
  covers?: [string, string];

  // 詳細ページ Gallery（画像集）
  gallery?: {
    src: string;
    alt?: string;
    caption?: string;
  }[];

  // 詳細ページデータ構造
  sections?: ProjectSections;

  // English translations
  en?: {
    title?: string;
    subtitle?: string;
    status?: string;
    summary?: string;
    sections?: ProjectSections;
    gallery?: {
      src: string;
      alt?: string;
      caption?: string;
    }[];
  };
}

// Helper function to get localized project data
export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale === 'ja' || !project.en) {
    return project;
  }

  return {
    ...project,
    title: project.en.title ?? project.title,
    subtitle: project.en.subtitle ?? project.subtitle,
    status: project.en.status ?? project.status,
    summary: project.en.summary ?? project.summary,
    sections: project.en.sections ?? project.sections,
    gallery: project.en.gallery ?? project.gallery,
  };
}

export const projects: Project[] = [
  {
    slug: "business-system",
    title: "通信システム（業務）",
    status: "非公開",
    tags: ["Java", "バッチ処理", "基本設計", "一貫対応"],
    summary:
      "大手通信業界向け基幹システムにおいて、料金機能の設計・実装・テスト・リリース後検証までを一貫して担当（守秘義務により非公開）。",
    cover: "/images/projects/business-system/cover.png",
    sections: {
      概要: `大手通信業界向け基幹システムにおいて、
    料金計算および請求データ生成を担う業務システムの機能領域を担当。
    基本設計から実装、各種テスト、リリース後検証までを一貫して対応。

    ※ 本プロジェクトは守秘義務のため、画面・ソースコード・具体的な業務仕様は非公開。`,

      担当工程: `料金機能領域において、以下の工程を一貫して担当。
    ・基本設計
    ・実装（バックエンド中心）
    ・各種テストおよびリリース後検証

    設計・実装工程を中心に、品質担保の観点からテスト計画の検討、結果整理、および顧客向け成果説明（CR）まで対応。`,

      技術スタック: {
        フロントエンド: ["HTML", "CSS", "JavaScript"],
        バックエンド: ["Java"],
        データベース: ["Oracle Database", "SQL"],
        "バッチ / データ処理": ["Java", "Shell Script"],
        フレームワーク: ["既存基幹業務システム（富士通系フレームワーク）"],
      },

      技術的なポイント: [
        "複数の業務条件を扱う料金機能において、ロジックの正確性および再現性が強く求められる点",
        "日中処理と夜間バッチ処理が連携する構成における、処理タイミングおよびデータ整合性への配慮",
        "大規模データおよび同時処理を前提とした、性能・安定性を考慮した設計判断",
        "既存の基幹業務システムを前提とした機能追加・改修において、周辺機能への影響を最小限に抑える必要があった点",
      ],

      "工夫した点・判断した点": [
        {
          title: "設計・実装",
          content: `料金機能の性質上、実装の複雑さよりも、
    最終的な処理結果の正確性および検証しやすさを重視した設計を採用。

    ロジック構造の整理および責務分離を意識し、
    将来的な改修や検証を行いやすい構成とした。

    また、障害発生時の影響を最小限に抑えるため、
    再実行や復旧を想定した処理設計および検証を実施。`,
        },
        {
          title: "代表的なケース",
          content: `外部システムと連携する料金機能において、
    利用者操作を起点としたディレイドバッチ処理を設計・実装。

    画面処理と夜間バッチ処理が連携する構成のため、
    データ受け渡しおよび処理タイミングを考慮した設計を行い、
    異常発生時には利用者が状況を把握できるよう、
    処理結果の可視化および再実行を想定した構成とした。

    大量データを前提とした性能・安定性の検証を行い、
    ピーク時の挙動や障害発生時の復旧性を含めて確認。`,
        },
      ],

      非公開について:
        "本プロジェクトは守秘義務のため、ソースコード、画面、具体的な業務仕様は公開していません。本ページでは、担当範囲および設計・判断内容を抽象化して記載しています。",
    },
    en: {
      title: "Telecom System (Enterprise)",
      status: "Confidential",
      summary:
        "Handled end-to-end billing feature design, implementation, testing, and post-release verification for a major telecom carrier's core system (confidential due to NDA).",
      sections: {
        概要: `Responsible for the billing and invoice data generation domain in a core enterprise system for a major telecom carrier.
    Handled the full cycle from basic design through implementation, various testing phases, and post-release verification.

    * Due to confidentiality obligations, screens, source code, and specific business specifications are not disclosed.`,

        担当工程: `Responsible for the following phases across the billing feature domain:
    - Basic design
    - Implementation (backend-focused)
    - Various testing and post-release verification

    Centered on design and implementation phases, also handled test planning from a quality assurance perspective, result organization, and customer-facing deliverable presentations (CR).`,

        技術スタック: {
          フロントエンド: ["HTML", "CSS", "JavaScript"],
          バックエンド: ["Java"],
          データベース: ["Oracle Database", "SQL"],
          "バッチ / データ処理": ["Java", "Shell Script"],
          フレームワーク: ["Legacy enterprise system (Fujitsu framework)"],
        },

        技術的なポイント: [
          "Billing features handling multiple business conditions required high accuracy and reproducibility of logic",
          "Careful consideration of processing timing and data consistency in configurations where daytime and nightly batch processing interact",
          "Design decisions considering performance and stability for large-scale data and concurrent processing",
          "Minimizing impact on peripheral features when adding or modifying functions in an existing core enterprise system",
        ],

        "工夫した点・判断した点": [
          {
            title: "Design & Implementation",
            content: `Given the nature of billing features, adopted a design that prioritizes accuracy of final processing results and ease of verification over implementation complexity.

    Focused on organizing logic structure and separation of responsibilities to create a configuration that facilitates future modifications and verification.

    Also conducted process design and verification assuming re-execution and recovery to minimize impact during failures.`,
          },
          {
            title: "Representative Case",
            content: `Designed and implemented delayed batch processing triggered by user operations in billing features that integrate with external systems.

    Due to the configuration where screen processing and nightly batch processing interact, designed with consideration for data handoff and processing timing, and configured to visualize processing results and allow re-execution so users can understand the situation during anomalies.

    Conducted performance and stability verification assuming large data volumes, including peak-time behavior and recoverability during failures.`,
          },
        ],

        非公開について:
          "Due to confidentiality obligations, source code, screens, and specific business specifications are not publicly available. This page describes responsibilities and design decisions in abstracted form.",
      },
    },
  },
  {
    slug: "task-system",
    title: "タスク管理システム（個人開発）",
    status: "デモ公開中",
    tags: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "AWS"],
    summary:
      "時間軸で全体を可視化するタスク管理システムを、設計から実装・デプロイまで個人で開発",
    cover: "/images/projects/modern-task-app/cover1.png",
    covers: [
      "/images/projects/modern-task-app/cover1.png",
      "/images/projects/modern-task-app/cover3.png",
    ],
    gallery: [
      {
        src: "/images/projects/modern-task-app/image8.png",
        alt: "Timeline UI",
        caption: "UI 操作を通じてバックエンドの状態を更新し、結果を反映",
      },
      {
        src: "/images/projects/modern-task-app/image2.png",
        alt: "状態遷移（未完了 ⇄ 完了）",
        caption: "バックエンドで管理された状態遷移を UI に一貫して反映",
      },
      {
        src: "/images/projects/modern-task-app/image3.png",
        alt: "論理削除・復元",
        caption: "論理削除・復元を前提とした業務データ管理",
      },
      {
        src: "/images/projects/modern-task-app/image4.png",
        alt: "並行更新を前提とした楽観ロックによる競合制御",
        caption: "Swagger 上で 409 Conflict を再現し、更新競合時の上書きを防止",
      },
      {
        src: "/images/projects/modern-task-app/image5.png",
        alt: "監査ログ",
        caption: "操作履歴を追跡可能な監査ログ設計",
      },
      {
        src: "/images/projects/modern-task-app/image6.png",
        alt: "API / データ設計",
        caption: "業務モデルを中心としたバックエンド設計と責務分離",
      },
    ],
    sections: {
      概要: `タスクを時間軸で可視化し、全体像を直感的に把握できるタスク管理システムを、設計から実装・デプロイまで個人で開発。

単なる ToDo アプリや UI デモではなく、業務システムに近い構成を前提とした「工程として成立する個人代表作」として制作。

バックエンド・フロントエンドを含め、設計・実装・運用を一体として捉えた構成とし、現在は実際に操作可能なデモとして公開。`,
      担当工程: `要件整理、システム設計、バックエンドおよびフロントエンドの実装、テスト、デプロイまでをすべて個人で担当。

デモ環境としての公開後も、挙動確認および改善を継続。`,
      技術スタック: {
        フロントエンド: ["React", "TypeScript"],
        バックエンド: ["Java", "Spring Boot"],
        データベース: ["PostgreSQL"],
        "状態管理 / データ管理": ["楽観ロック", "バージョン管理"],
        インフラ: ["Docker", "AWS（ECS Fargate / RDS / ALB）※構築中"],
      },
      技術的なポイント: [
        "並行操作を前提としたデータ整合性の確保",
        "楽観ロックによる競合検知",
        "明確なエラーハンドリング設計",
        "監査ログ、論理削除および復元を含む業務モデルを想定したバックエンド設計",
        "タスク管理と時間軸（Timeline）表示を組み合わせた UI 構成",
        "行単位でのレイアウト同期",
        "縦横スクロールの分離・同期",
        "sticky 要素の制御",
        "前後端それぞれの責務を明確に分離しつつ、並行操作時にも状態の一貫性が崩れない構成を意識。",
      ],
      "工夫した点・判断した点": [
        {
          title: "設計・実装における工夫",
          content: `最初から完成形を目指すのではなく、工程として成立する最小構成を段階的に積み上げる方針を採用。

バックエンドでは、画面や見た目よりも先に業務モデルの安定性を優先し、並行操作、監査、復元といった運用面を前提とした設計を重視。

フロントエンドでは、「一目で時間全体を把握できること」を最重要判断基準とし、シンプルな操作と最小限の UI で現在・過去・今後の関係性を直感的に把握できる構成を設計。

Timeline 表示においては、現在位置を見失わないことを最優先とし、スクロールや表示範囲の操作を含めて設計判断を行った。`,
        },
      ],
    },
    en: {
      title: "Task Management System (Personal Project)",
      status: "Demo Available",
      summary:
        "Designed and developed a task management system with timeline-based visualization from scratch, handling design, implementation, and deployment independently",
      gallery: [
        {
          src: "/images/projects/modern-task-app/image8.png",
          alt: "Timeline UI",
          caption: "Updates backend state through UI operations and reflects results",
        },
        {
          src: "/images/projects/modern-task-app/image2.png",
          alt: "State Transition (Incomplete ⇄ Complete)",
          caption: "Consistently reflects state transitions managed by the backend in the UI",
        },
        {
          src: "/images/projects/modern-task-app/image3.png",
          alt: "Soft Delete & Restore",
          caption: "Business data management with soft delete and restore capabilities",
        },
        {
          src: "/images/projects/modern-task-app/image4.png",
          alt: "Optimistic Locking for Concurrent Updates",
          caption: "Reproduces 409 Conflict in Swagger to prevent overwrites during update conflicts",
        },
        {
          src: "/images/projects/modern-task-app/image5.png",
          alt: "Audit Log",
          caption: "Audit log design for tracking operation history",
        },
        {
          src: "/images/projects/modern-task-app/image6.png",
          alt: "API / Data Design",
          caption: "Backend design centered on business models with separation of responsibilities",
        },
      ],
      sections: {
        概要: `Personally designed, implemented, and deployed a task management system that visualizes tasks on a timeline for intuitive understanding of the big picture.

Not just a simple ToDo app or UI demo, but created as a "personal flagship project that functions as a complete development lifecycle" with an enterprise-system-like configuration.

Designed as an integrated approach covering backend, frontend, design, implementation, and operations, currently published as an interactive demo.`,
        担当工程: `Handled all phases personally: requirements gathering, system design, backend and frontend implementation, testing, and deployment.

Continuing to verify behavior and make improvements after publishing as a demo environment.`,
        技術スタック: {
          フロントエンド: ["React", "TypeScript"],
          バックエンド: ["Java", "Spring Boot"],
          データベース: ["PostgreSQL"],
          "状態管理 / データ管理": ["Optimistic Locking", "Version Control"],
          インフラ: ["Docker", "AWS (ECS Fargate / RDS / ALB) *under construction"],
        },
        技術的なポイント: [
          "Ensuring data consistency assuming concurrent operations",
          "Conflict detection through optimistic locking",
          "Clear error handling design",
          "Backend design assuming business models including audit logs, soft delete, and restore",
          "UI configuration combining task management with timeline display",
          "Row-level layout synchronization",
          "Separation and synchronization of vertical and horizontal scrolling",
          "Sticky element control",
          "Designed for state consistency during concurrent operations while clearly separating frontend and backend responsibilities.",
        ],
        "工夫した点・判断した点": [
          {
            title: "Design & Implementation Approach",
            content: `Rather than aiming for a complete product from the start, adopted an approach of incrementally building up the minimum viable configuration that functions as a complete development lifecycle.

On the backend, prioritized business model stability over screens and appearance, emphasizing design that assumes operational aspects like concurrent operations, auditing, and restoration.

On the frontend, used "being able to grasp the entire timeline at a glance" as the most important decision criterion, designing a configuration that allows intuitive understanding of the relationship between past, present, and future with simple operations and minimal UI.

For timeline display, made not losing sight of the current position the top priority, including design decisions for scrolling and display range operations.`,
          },
        ],
      },
    },
  },
  {
    slug: "personal-os",
    title: "Personal OS",
    status: "運用中",
    tags: ["Python", "Streamlit", "データ設計", "意思決定支援"],
    summary:
      "意思決定と経験再利用を目的に、実生活で運用しながら継続的に改善している個人向けシステム",
    cover: "/images/projects/personal-os/cover2.png",
    gallery: [
      {
        src: "/images/projects/personal-os/image1.png",
        alt: "ダッシュボード",
        caption: "全体状況を一目で把握できるダッシュボード画面",
      },
      {
        src: "/images/projects/personal-os/image1.png",
        alt: "家庭財務管理",
        caption: "収支状況と予算管理の可視化",
      },
      {
        src: "/images/projects/personal-os/image1.png",
        alt: "経験管理",
        caption: "判断履歴と経験の蓄積・検索",
      },
      {
        src: "/images/projects/personal-os/image1.png",
        alt: "レポート生成",
        caption: "月次・年次レポートの自動生成",
      },
      {
        src: "/images/projects/personal-os/image1.png",
        alt: "データ入力",
        caption: "最小限の入力で記録できるインターフェース",
      },
      {
        src: "/images/projects/personal-os/image1.png",
        alt: "分析画面",
        caption: "傾向分析と意思決定支援",
      },
    ],
    sections: {
      概要: `実生活で使用しながら継続的に改善している、
意思決定支援と経験再利用を目的とした個人向けシステム。

単なる記録や管理を目的としたツールではなく、
日常生活や仕事の中で繰り返し発生する判断を、
工程化・再利用可能な形で蓄積することを目的として設計。

現在は、家庭財務管理および経験管理を中心に運用しており、
実際の利用を通じて、設計や判断基準の見直しを継続。`,
      担当工程: `要件整理、データ設計、
ロジック実装、可視化設計、運用ルール整理までを
すべて個人で担当。

実運用を前提とし、
入力負荷や判断コストが過度に増えない構成を重視しながら、
継続的な改善を実施。`,
      技術スタック: {
        フロントエンド: ["Streamlit"],
        バックエンド: ["Python"],
        データ管理: ["JSON（ファイルベース）"],
        データ処理: ["Python スクリプト"],
        状態管理: ["スナップショット分離", "月次ファイル管理"],
        実行環境: ["ローカル"],
      },
      技術的なポイント: [
        "長期間の運用を前提とした、破綻しにくいデータ構造と判断基準の一貫性を重視",
        "データを月単位・項目単位で分離し、現在の状態を修正しても過去の記録が影響を受けない構成を採用",
        "UI 表示およびレポート生成において、同一のデータモデルとロジックを使用し、判断結果の不整合が発生しないよう設計",
        "可視化については装飾性よりも、状態や数値を素早く把握できることを優先し、認知負荷を抑えたレイアウトを採用",
      ],
      "設計・実装における工夫": `本プロジェクトでは、
「すべてを管理しようとしない」ことを最初の設計判断とした。

精緻な入力や完全な網羅性を求めるほど、
運用が破綻しやすくなるため、
必要最小限の入力で判断可能な構成を優先。

記録そのものではなく、
「次にどう判断すべきか」を支援することを主眼とし、
経験や失敗を再利用できる形で蓄積。

本システムは完成形を持たず、
実際の利用を通じて判断基準そのものを更新していく、
長期的に進化する個人システムとして位置付けている。`,
    },
    en: {
      title: "Personal OS",
      status: "In Operation",
      summary:
        "A personal system for decision support and experience reuse, continuously improved through real-life operation",
      gallery: [
        {
          src: "/images/projects/personal-os/image1.png",
          alt: "Dashboard",
          caption: "Dashboard screen for quick overview of overall status",
        },
        {
          src: "/images/projects/personal-os/image1.png",
          alt: "Household Finance Management",
          caption: "Visualization of income/expenses and budget management",
        },
        {
          src: "/images/projects/personal-os/image1.png",
          alt: "Experience Management",
          caption: "Accumulation and search of decision history and experiences",
        },
        {
          src: "/images/projects/personal-os/image1.png",
          alt: "Report Generation",
          caption: "Auto-generation of monthly and annual reports",
        },
        {
          src: "/images/projects/personal-os/image1.png",
          alt: "Data Entry",
          caption: "Interface for recording with minimal input",
        },
        {
          src: "/images/projects/personal-os/image1.png",
          alt: "Analysis Screen",
          caption: "Trend analysis and decision support",
        },
      ],
      sections: {
        概要: `A personal system for decision support and experience reuse,
continuously improved through actual daily use.

Not designed as a simple recording or management tool,
but built to accumulate recurring decisions from daily life and work
in a processable and reusable format.

Currently operating primarily for household financial management and experience management,
with ongoing review of design and decision criteria through actual use.`,
        担当工程: `Handled all phases personally: requirements gathering, data design,
logic implementation, visualization design, and operational rule organization.

Designed for actual operation, emphasizing a configuration that
doesn't excessively increase input burden or decision costs,
while continuously making improvements.`,
        技術スタック: {
          フロントエンド: ["Streamlit"],
          バックエンド: ["Python"],
          データ管理: ["JSON (file-based)"],
          データ処理: ["Python scripts"],
          状態管理: ["Snapshot isolation", "Monthly file management"],
          実行環境: ["Local"],
        },
        技術的なポイント: [
          "Emphasis on robust data structure and consistent decision criteria for long-term operation",
          "Data separated by month and item so that modifying current state doesn't affect past records",
          "UI display and report generation use the same data model and logic to prevent inconsistent decision results",
          "Visualization prioritizes quick understanding of status and numbers over decoration, adopting layouts that reduce cognitive load",
        ],
        "設計・実装における工夫": `For this project,
"not trying to manage everything" was the first design decision.

The more precise input and complete coverage you require,
the more likely operations are to break down,
so prioritized a configuration that enables decisions with minimal input.

Focused not on recording itself,
but on supporting "how to make the next decision,"
accumulating experiences and failures in a reusable format.

This system has no completed form,
positioned as a long-term evolving personal system
that updates the decision criteria themselves through actual use.`,
      },
    },
  },
];
