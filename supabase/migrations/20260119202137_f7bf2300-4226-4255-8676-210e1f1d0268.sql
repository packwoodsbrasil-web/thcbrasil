-- Close public read access to orders (PII)
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View order by exact external_id match" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;
DROP POLICY IF EXISTS "View order by exact external_id match" ON public.orders;
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;

-- If present from previous attempt
DROP POLICY IF EXISTS "View single order by external_id filter" ON public.orders;

-- Deny all direct SELECT access from the client
CREATE POLICY "Deny public order reads"
ON public.orders
FOR SELECT
USING (false);

-- Keep the existing INSERT policy (Create orders with required fields)
-- Keep UPDATE/DELETE deny policies (if already present).