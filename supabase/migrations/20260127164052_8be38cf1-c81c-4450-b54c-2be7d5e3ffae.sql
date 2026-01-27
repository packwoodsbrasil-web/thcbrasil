-- 1. Fix infinite recursion in admin_users policies
-- First, create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = _user_id
  )
$$;

-- Drop existing problematic policies on admin_users
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Only admins can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can only update their own record" ON public.admin_users;
DROP POLICY IF EXISTS "Admins cannot delete admin users" ON public.admin_users;

-- Create fixed policies using the security definer function
CREATE POLICY "Admins can view admin list" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can only update their own record" 
ON public.admin_users 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins cannot delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (false);

-- 2. Fix orders table policies to prevent data leakage
-- Drop existing problematic policies on orders
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Deny all updates" ON public.orders;
DROP POLICY IF EXISTS "Deny all deletes" ON public.orders;

-- Create fixed policies for orders - customers can ONLY view orders with their user_id (never null)
CREATE POLICY "Customers can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL AND user_id IS NOT NULL AND auth.uid() = user_id)
);

-- Admins can view all orders via the security definer function
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- Require user_id to be set on insert and match auth.uid()
CREATE POLICY "Authenticated users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND user_id = auth.uid()
  AND customer_name IS NOT NULL 
  AND customer_name <> ''
  AND customer_email IS NOT NULL 
  AND customer_email <> ''
  AND amount > 0 
  AND items IS NOT NULL 
  AND external_id IS NOT NULL 
  AND external_id <> ''
);

-- Deny updates and deletes
CREATE POLICY "Deny all updates" 
ON public.orders 
FOR UPDATE 
USING (false);

CREATE POLICY "Deny all deletes" 
ON public.orders 
FOR DELETE 
USING (false);