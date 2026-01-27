-- Fix public exposure of orders table
-- Drop existing SELECT policies and recreate with anonymous access denial
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Create combined policy that requires authentication AND ownership/admin
CREATE POLICY "Authenticated users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND auth.uid() = user_id
);

CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND public.is_admin(auth.uid())
);

-- Fix public exposure of admin_users table
-- Drop existing SELECT policy and recreate with anonymous access denial
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admin_users;

-- Create policy that requires authentication AND admin status
CREATE POLICY "Only authenticated admins can view admin list" 
ON public.admin_users 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND public.is_admin(auth.uid())
);