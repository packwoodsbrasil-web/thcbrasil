import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const APPMAX_BASE_URL = "https://admin.appmax.com.br/api/v3";

// Input validation functions
function validateCPF(cpf: string): { valid: boolean; error?: string } {
  const cleanCPF = cpf?.replace(/\D/g, '');
  if (!cleanCPF || cleanCPF.length !== 11) {
    return { valid: false, error: 'CPF deve ter 11 dígitos' };
  }
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return { valid: false, error: 'CPF inválido' };
  }
  return { valid: true };
}

function validateOrderId(orderId: any): { valid: boolean; error?: string } {
  const id = typeof orderId === 'string' ? parseInt(orderId, 10) : orderId;
  if (!id || isNaN(id) || id <= 0) {
    return { valid: false, error: 'ID do pedido inválido' };
  }
  return { valid: true };
}

function validateCustomerId(customerId: any): { valid: boolean; error?: string } {
  const id = typeof customerId === 'string' ? parseInt(customerId, 10) : customerId;
  if (!id || isNaN(id) || id <= 0) {
    return { valid: false, error: 'ID do cliente inválido' };
  }
  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('APPMAX_ACCESS_TOKEN');
    if (!accessToken) {
      console.error('APPMAX_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'API não configurada' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const body = await req.json();
    console.log('Processing PIX payment request');

    const { orderId, customerId, cpf } = body;

    // Validate all inputs
    const orderValidation = validateOrderId(orderId);
    if (!orderValidation.valid) {
      console.error('Order validation failed:', orderValidation.error);
      return new Response(
        JSON.stringify({ success: false, error: orderValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const customerValidation = validateCustomerId(customerId);
    if (!customerValidation.valid) {
      console.error('Customer validation failed:', customerValidation.error);
      return new Response(
        JSON.stringify({ success: false, error: customerValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const cpfValidation = validateCPF(cpf);
    if (!cpfValidation.valid) {
      console.error('CPF validation failed:', cpfValidation.error);
      return new Response(
        JSON.stringify({ success: false, error: cpfValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create PIX payment in Appmax with validated data
    const paymentPayload = {
      'access-token': accessToken,
      cart: {
        order_id: orderId,
      },
      customer: {
        customer_id: customerId,
      },
      payment: {
        pix: {
          document_number: cpf.replace(/\D/g, ''),
        },
      },
    };

    console.log('Sending PIX payment to Appmax');

    const paymentResponse = await fetch(`${APPMAX_BASE_URL}/payment/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentPayload),
    });

    const paymentData = await paymentResponse.json();
    console.log('PIX payment response - success:', paymentData.success);

    if (!paymentResponse.ok || !paymentData.success) {
      console.error('Failed to create PIX payment:', paymentData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: paymentData.message || 'Erro ao gerar PIX na Appmax' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const pixInfo = paymentData.data;
    
    return new Response(
      JSON.stringify({
        success: true,
        qrCodeImage: pixInfo.pix_qrcode, // Base64 image from Appmax
        qrCodeText: pixInfo.pix_emv, // EMV code for copy/paste
        transactionId: pixInfo.pay_reference,
        expirationDate: pixInfo.pix_expiration_date,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in appmax-payment-pix:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
