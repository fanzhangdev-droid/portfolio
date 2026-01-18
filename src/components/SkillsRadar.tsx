'use client';

import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillsRadarProps {
  skills: Skill[];
}

export default function SkillsRadar({ skills }: SkillsRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Avoid 0-size rendering
      if (rect.width === 0 || rect.height === 0) return;

      // Reset transform so scale doesn't accumulate across renders
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Layout tuning for small screens
      const isSmall = width < 420; // iPhone SE etc.

      const paddingTop = isSmall ? 18 : 24;
      const paddingBottom = isSmall ? 18 : 24;
      const paddingSide = isSmall ? 18 : 28;

      const centerX = width / 2;
      const centerY = (paddingTop + (height - paddingTop - paddingBottom) / 2);

      // Radius: keep labels inside view
      const minDim = Math.min(width - paddingSide * 2, height - paddingTop - paddingBottom);
      const radius = Math.max(80, minDim / 2 - (isSmall ? 26 : 34));

      drawRadar(ctx, skills, centerX, centerY, radius, {
        labelFontSize: isSmall ? 10 : 12,
        labelDistance: isSmall ? 18 : 24,
        pointRadius: isSmall ? 3 : 4,
        gridColor: '#E5E7EB',
        textColor: '#4B5563',
        primaryColor: '#4F6D8C',
      });
    };

    // Render once + on resize (so it stays responsive)
    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [skills]);

  const drawRadar = (
    ctx: CanvasRenderingContext2D,
    skills: Skill[],
    centerX: number,
    centerY: number,
    radius: number,
    opts: {
      labelFontSize: number;
      labelDistance: number;
      pointRadius: number;
      gridColor: string;
      textColor: string;
      primaryColor: string;
    }
  ) => {
    const numSkills = skills.length;
    if (numSkills < 3) return;

    const angleStep = (Math.PI * 2) / numSkills;

    // Background circles
    ctx.strokeStyle = opts.gridColor;
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach(ratio => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Axes
    skills.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = opts.gridColor;
      ctx.stroke();
    });

    // Data polygon
    ctx.beginPath();
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const distance = radius * (skill.level / 100);
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(79, 109, 140, 0.15)';
    ctx.fill();
    ctx.strokeStyle = opts.primaryColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Points
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const distance = radius * (skill.level / 100);
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, opts.pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = opts.primaryColor;
      ctx.fill();
    });

    // Labels
    ctx.fillStyle = opts.textColor;
    ctx.font = `${opts.labelFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const labelDistance = radius + opts.labelDistance;
      const x = centerX + labelDistance * Math.cos(angle);
      const y = centerY + labelDistance * Math.sin(angle);

      ctx.fillText(skill.name, x, y);
    });
  };

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-[360px] lg:h-[520px]"
      />
    </div>
  );
}
