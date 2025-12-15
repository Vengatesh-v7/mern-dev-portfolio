import { ReactNode, Suspense, useEffect, useRef, useState } from "react";

type LazyMountProps = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeightClassName?: string;
};

export function LazyMount({
  children,
  fallback,
  rootMargin = "400px 0px",
  minHeightClassName = "min-h-[200px]",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={mounted ? undefined : minHeightClassName}>
      {mounted ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}
