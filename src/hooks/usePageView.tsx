import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePageView = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Defer tracking to not block initial render
    const timeoutId = setTimeout(async () => {
      try {
        await supabase.from("page_views").insert({
          page_path: window.location.pathname,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
};
