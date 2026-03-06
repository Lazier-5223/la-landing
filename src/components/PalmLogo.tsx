"use client";

import { useEffect, useState } from "react";

type PalmLogoProps = {
  className?: string;
  style?: React.CSSProperties;
};

function isNearGray(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min < 18;
}

function isPalmPixel(r: number, g: number, b: number) {
  // 保护橙棕色线条：R 显著高于 G/B
  return r > 120 && r - g > 25 && r - b > 35;
}

export default function PalmLogo({ className, style }: PalmLogoProps) {
  const [src, setSrc] = useState<string>("/images/棕榈树.png");

  useEffect(() => {
    const img = new window.Image();
    img.decoding = "async";
    img.src = "/images/棕榈树.png";

    img.onload = () => {
      const w = img.naturalWidth || 0;
      const h = img.naturalHeight || 0;
      if (!w || !h) return;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        const a = data[i + 3] ?? 255;

        if (a === 0) continue;

        // 去除棋盘灰底：近似灰色且不是棕榈线条的像素设为透明
        if (isNearGray(r, g, b) && !isPalmPixel(r, g, b)) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      try {
        setSrc(canvas.toDataURL("image/png"));
      } catch {
        // ignore: keep original src
      }
    };
  }, []);

  return (
    // 使用 img 避免 Next/Image 对 data URL 的额外处理
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="棕榈树" className={className} style={style} />
  );
}

