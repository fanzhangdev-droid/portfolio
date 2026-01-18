interface TagChipProps {
  children: React.ReactNode;
  className?: string;
}

export default function TagChip({ children, className = '' }: TagChipProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium
        text-[#4F6D8C] border border-[#4F6D8C]/60
        bg-[rgba(79,109,140,0.14)] backdrop-blur-[1px]
        ${className}
      `}
    >
      {children}
    </span>
  );
}
