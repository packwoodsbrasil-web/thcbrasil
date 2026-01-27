-- Add RESTRICTIVE policy to explicitly deny anonymous access to orders
-- This serves as a defense-in-depth layer on top of existing permissive policies
CREATE POLICY "Deny anonymous access to orders" 
ON public.orders 
AS RESTRICTIVE
FOR SELECT 
USING (auth.uid() IS NOT NULL);