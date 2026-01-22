import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    console.log('Appmax webhook received:', JSON.stringify(body, null, 2));

    // Appmax sends payment status updates
    const { 
      order_id,
      status,
      pay_reference,
      payment_type,
    } = body;

    if (!order_id) {
      console.error('No order_id in webhook payload');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing order_id' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Map Appmax status to our status
    let orderStatus = 'pending';
    if (status === 'approved' || status === 'paid') {
      orderStatus = 'paid';
    } else if (status === 'cancelled' || status === 'rejected' || status === 'refunded') {
      orderStatus = 'failed';
    }

    console.log(`Updating order ${order_id} to status: ${orderStatus}`);

    // Update order in database
    const updateData: any = {
      status: orderStatus,
    };

    if (orderStatus === 'paid') {
      updateData.paid_at = new Date().toISOString();
      updateData.transaction_id = pay_reference;
    }

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('external_id', order_id);

    if (error) {
      console.error('Error updating order:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update order' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log(`Order ${order_id} updated successfully`);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in appmax-webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
