
-- Create a table for storing user liked properties
CREATE TABLE public.user_liked_properties (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,  -- Clerk user ID
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, property_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_liked_properties ENABLE ROW LEVEL SECURITY;

-- Since we're using Clerk authentication, we'll handle access control in the application layer
-- Create a permissive policy that allows authenticated operations
CREATE POLICY "Allow all operations on user_liked_properties"
ON public.user_liked_properties
FOR ALL
USING (true)
WITH CHECK (true);
