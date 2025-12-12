-- Create page_views table to track website visits
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_path TEXT NOT NULL DEFAULT '/',
  user_agent TEXT,
  referrer TEXT
);

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert page views
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view page views (for public analytics)
CREATE POLICY "Anyone can view page views"
ON public.page_views
FOR SELECT
USING (true);

-- Enable realtime for page_views
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;