import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePageView = () => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await supabase.from('page_views').insert({
          page_path: window.location.pathname,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, []);
};
