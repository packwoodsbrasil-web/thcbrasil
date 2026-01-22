-- 1. Add restrictive UPDATE policy for admin_users (only own record)
CREATE POLICY "Admins can only update their own record"
ON public.admin_users
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Add restrictive DELETE policy for admin_users (prevent self-deletion and require admin)
CREATE POLICY "Admins cannot delete admin users"
ON public.admin_users
FOR DELETE
USING (false);

-- 3. Add policy allowing customers to view their own orders by email
-- First drop the restrictive "Deny public order reads" policy for authenticated users
DROP POLICY IF EXISTS "Deny public order reads" ON public.orders;

-- 4. Create policy for customers to view their own orders (by matching email)
CREATE POLICY "Customers can view their own orders by email"
ON public.orders
FOR SELECT
USING (
  (auth.uid() IS NOT NULL AND customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  OR
  (auth.uid() IN (SELECT user_id FROM public.admin_users))
);