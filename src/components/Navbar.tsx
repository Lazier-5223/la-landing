"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PalmLogo from "@/components/PalmLogo";

type NavbarProps = { standalone?: boolean };

export default function Navbar({ standalone = false }: NavbarProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [logoH, setLogoH] = useState<number>(44);

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    const update = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) setLogoH(h);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-olive text-cream border-b border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between py-4 lg:py-5 font-serif">
        {standalone ? (
          <div className="flex items-center gap-3">
            <span className="bg-transparent flex items-center justify-center shrink-0">
              <PalmLogo
                className="block w-auto object-contain scale-[1.08]"
                style={{ height: `${logoH}px`, maxHeight: `${logoH}px` }}
              />
            </span>
            <div
              ref={textRef}
              className="flex flex-col justify-between leading-none m-0 p-0"
            >
              <div className="text-[22px] lg:text-[26px] font-bold leading-none m-0 p-0">
                阿垚在洛杉矶
              </div>
              <div className="text-sm lg:text-base text-cream/70 leading-none m-0 p-0">
                加州深度游学策划
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <span className="bg-transparent flex items-center justify-center shrink-0">
              <PalmLogo
                className="block w-auto object-contain scale-[1.08]"
                style={{ height: `${logoH}px`, maxHeight: `${logoH}px` }}
              />
            </span>
            <div
              ref={textRef}
              className="flex flex-col justify-between leading-none m-0 p-0"
            >
              <div className="text-[22px] lg:text-[26px] font-bold leading-none m-0 p-0">
                阿垚在洛杉矶
              </div>
              <div className="text-sm lg:text-base text-cream/70 leading-none m-0 p-0">
                加州深度游学策划
              </div>
            </div>
          </Link>
        )}
        {!standalone && (
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm lg:text-base font-medium text-cream/90 hover:text-cream transition-colors"
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
