-- Add user_id column to orders table for secure user identification
ALTER TABLE public.orders 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX idx_orders_user_id ON public.orders(user_id);

-- Drop the old insecure policy
DROP POLICY IF EXISTS "Customers can view their own orders by email" ON public.orders;

-- Create new secure policy using user_id
CREATE POLICY "Customers can view their own orders"
ON public.orders
FOR SELECT
USING (
  (auth.uid() = user_id) 
  OR (auth.uid() IN (SELECT admin_users.user_id FROM admin_users))
);

-- Update insert policy to require user_id
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

CREATE POLICY "Authenticated users can create orders"
ON public.orders
FOR INSERT
WITH CHECK (
  (auth.uid() IS NOT NULL) 
  AND (user_id = auth.uid())
  AND (customer_name IS NOT NULL) 
  AND (customer_name <> ''::text) 
  AND (customer_email IS NOT NULL) 
  AND (customer_email <> ''::text) 
  AND (amount > (0)::numeric) 
  AND (items IS NOT NULL) 
  AND (external_id IS NOT NULL) 
  AND (external_id <> ''::text)
);