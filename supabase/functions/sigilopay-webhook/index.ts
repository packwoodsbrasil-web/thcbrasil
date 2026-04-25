import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json();
    console.log('SigiloPay webhook received:', JSON.stringify(body, null, 2));

    const { event, transaction } = body || {};

    if (!event || !transaction) {
      console.error('Invalid webhook payload');
      return new Response(JSON.stringify({ success: false, error: 'Invalid payload' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }

    // identifier is what we sent as externalId
    const externalId = transaction.identifier || transaction.id;
    if (!externalId) {
      console.error('No identifier in transaction payload');
      return new Response(JSON.stringify({ success: false, error: 'Missing identifier' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }

    // Map SigiloPay events to our order status
    let orderStatus: string | null = null;
    switch (event) {
      case 'TRANSACTION_PAID':
        orderStatus = 'paid';
        break;
      case 'TRANSACTION_CANCELED':
      case 'TRANSACTION_REFUNDED':
      case 'TRANSACTION_CHARGED_BACK':
        orderStatus = 'failed';
        break;
      case 'TRANSACTION_CREATED':
        orderStatus = 'pending';
        break;
      default:
        console.log(`Ignoring event: ${event}`);
        return new Response(JSON.stringify({ success: true, ignored: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const updateData: Record<string, unknown> = { status: orderStatus };
    if (orderStatus === 'paid') {
      updateData.paid_at = new Date().toISOString();
      updateData.transaction_id = transaction.id || transaction.transactionId || externalId;
    }

    console.log(`Updating order ${externalId} -> ${orderStatus}`);

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('external_id', externalId);

    if (error) {
      console.error('Error updating order:', error);
      return new Response(JSON.stringify({ success: false, error: 'Failed to update order' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
    }

    return new Response(JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in sigilopay-webhook:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
  }
});