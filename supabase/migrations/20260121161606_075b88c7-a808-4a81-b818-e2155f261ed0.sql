-- 1. Add restrictive INSERT policy for admin_users table
-- Only existing admins can add new admin users
CREATE POLICY "Only admins can insert admin users"
ON public.admin_users
FOR INSERT
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- 2. Drop the existing permissive INSERT policy on orders
DROP POLICY IF EXISTS "Create orders with required fields" ON public.orders;

-- 3. Create a new INSERT policy that requires either authentication OR allows service role
-- For guest checkout, the edge functions use service role to bypass RLS
-- This policy blocks direct anonymous inserts while still allowing authenticated users
CREATE POLICY "Authenticated users can create orders"
ON public.orders
FOR INSERT
WITH CHECK (
  (auth.uid() IS NOT NULL) AND
  (customer_name IS NOT NULL) AND 
  (customer_name <> ''::text) AND 
  (customer_email IS NOT NULL) AND 
  (customer_email <> ''::text) AND 
  (amount > (0)::numeric) AND 
  (items IS NOT NULL) AND 
  (external_id IS NOT NULL) AND 
  (external_id <> ''::text)
);