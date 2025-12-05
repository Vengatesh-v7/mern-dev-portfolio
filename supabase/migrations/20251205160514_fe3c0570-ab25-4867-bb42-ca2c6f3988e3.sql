-- Create quiz_sessions table for analytics
CREATE TABLE public.quiz_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('about_me', 'tech')),
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  session_duration_seconds INTEGER,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts/updates (no auth required for quiz)
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quiz sessions (public quiz)
CREATE POLICY "Anyone can create quiz sessions" 
ON public.quiz_sessions 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update their own session (by id)
CREATE POLICY "Anyone can update quiz sessions" 
ON public.quiz_sessions 
FOR UPDATE 
USING (true);

-- Allow reading for analytics (public)
CREATE POLICY "Anyone can view quiz sessions" 
ON public.quiz_sessions 
FOR SELECT 
USING (true);

-- Create index for analytics queries
CREATE INDEX idx_quiz_sessions_category ON public.quiz_sessions(category);
CREATE INDEX idx_quiz_sessions_started_at ON public.quiz_sessions(started_at);