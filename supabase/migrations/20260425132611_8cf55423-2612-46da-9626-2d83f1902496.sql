DROP POLICY IF EXISTS "Only admins can insert admin users" ON public.admin_users;
CREATE POLICY "Block client inserts on admin_users" ON public.admin_users FOR INSERT TO public WITH CHECK (false);