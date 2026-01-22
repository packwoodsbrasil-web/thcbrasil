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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing');
      return new Response(
        JSON.stringify({ success: false, error: 'Configuração do servidor incompleta' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    console.log('Updating order status');

    const { externalId, status, transactionId } = body;

    // Validate inputs
    if (!externalId || typeof externalId !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'ID do pedido é obrigatório' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const validStatuses = ['pending', 'paid', 'failed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Status inválido' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, any> = { status };
    
    if (status === 'paid') {
      updateData.paid_at = new Date().toISOString();
      if (transactionId) {
        updateData.transaction_id = String(transactionId).substring(0, 100);
      }
    }

    // Update order using service role (bypasses RLS)
    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('external_id', externalId);

    if (error) {
      console.error('Error updating order:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Erro ao atualizar pedido' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Order status updated successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in update-order-status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
