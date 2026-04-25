DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;
CREATE POLICY "Block client inserts on orders" ON public.orders FOR INSERT TO public WITH CHECK (false);
DROP POLICY IF EXISTS "Admins can only update their own record" ON public.admin_users;
CREATE POLICY "Block client updates on admin_users" ON public.admin_users FOR UPDATE TO public USING (false) WITH CHECK (false);