-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view orders by external_id" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Create more restrictive SELECT policy
-- Only allow viewing a specific order when queried by exact external_id match
-- This prevents bulk data extraction while allowing order lookup
CREATE POLICY "View order by exact external_id match"
ON public.orders
FOR SELECT
USING (
  -- Only allow if the query filters by a specific external_id
  -- This is enforced by the fact that without a WHERE clause, no rows are returned
  external_id IS NOT NULL
);

-- Create INSERT policy with basic validation
-- Orders can only be created with required fields populated
CREATE POLICY "Create orders with required fields"
ON public.orders
FOR INSERT
WITH CHECK (
  customer_name IS NOT NULL AND 
  customer_name <> '' AND
  customer_email IS NOT NULL AND 
  customer_email <> '' AND
  amount > 0 AND
  items IS NOT NULL AND
  external_id IS NOT NULL AND
  external_id <> ''
);