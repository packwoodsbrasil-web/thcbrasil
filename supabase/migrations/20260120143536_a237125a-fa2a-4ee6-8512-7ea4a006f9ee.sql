-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admins can read admin_users
CREATE POLICY "Admins can view admin list"
ON public.admin_users
FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Add appmax_order_id column to orders if it doesn't exist (alias for external_id)
-- The external_id column already serves this purpose, but we can add an alias view
-- Actually, external_id already exists and serves the same purpose as appmax_order_id

-- Create a policy to allow admins to read all orders
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));