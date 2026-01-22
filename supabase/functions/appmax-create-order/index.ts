import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const APPMAX_BASE_URL = "https://admin.appmax.com.br/api/v3";

// Input validation functions
function validateCustomerId(customerId: any): { valid: boolean; error?: string } {
  const id = typeof customerId === 'string' ? parseInt(customerId, 10) : customerId;
  if (!id || isNaN(id) || id <= 0) {
    return { valid: false, error: 'ID do cliente inválido' };
  }
  return { valid: true };
}

function validateTotal(total: any): { valid: boolean; error?: string } {
  const num = typeof total === 'string' ? parseFloat(total) : total;
  if (!num || isNaN(num) || num <= 0) {
    return { valid: false, error: 'Total deve ser maior que zero' };
  }
  return { valid: true };
}

function validateProducts(products: any): { valid: boolean; error?: string } {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return { valid: false, error: 'Produtos são obrigatórios' };
  }
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!product.name || typeof product.name !== 'string' || product.name.trim().length === 0) {
      return { valid: false, error: `Produto ${i + 1}: nome é obrigatório` };
    }
    if (!product.quantity || product.quantity <= 0) {
      return { valid: false, error: `Produto ${i + 1}: quantidade deve ser maior que zero` };
    }
    if (!product.price || product.price <= 0) {
      return { valid: false, error: `Produto ${i + 1}: preço deve ser maior que zero` };
    }
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
    console.log('Processing order creation request');

    const { customerId, products, total, shipping = 0 } = body;

    // Validate inputs
    const customerValidation = validateCustomerId(customerId);
    if (!customerValidation.valid) {
      console.error('Customer validation failed:', customerValidation.error);
      return new Response(
        JSON.stringify({ success: false, error: customerValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const totalValidation = validateTotal(total);
    if (!totalValidation.valid) {
      console.error('Total validation failed:', totalValidation.error);
      return new Response(
        JSON.stringify({ success: false, error: totalValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const productsValidation = validateProducts(products);
    if (!productsValidation.valid) {
      console.error('Products validation failed:', productsValidation.error);
      return new Response(
        JSON.stringify({ success: false, error: productsValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create order in Appmax with validated/sanitized data
    const orderPayload = {
      'access-token': accessToken,
      customer_id: customerId,
      total: typeof total === 'string' ? parseFloat(total) : total,
      shipping: typeof shipping === 'string' ? parseFloat(shipping) : shipping,
      products: products.map((product: any) => ({
        sku: String(product.id || product.sku || `SKU-${Date.now()}`).substring(0, 50),
        name: String(product.name).trim().substring(0, 200),
        qty: Math.max(1, Math.floor(product.quantity)),
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      })),
    };

    console.log('Sending order to Appmax - products count:', products.length);

    const orderResponse = await fetch(`${APPMAX_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    const orderData = await orderResponse.json();
    console.log('Appmax order response - success:', !!orderData.data?.id);

    if (!orderResponse.ok || !orderData.data?.id) {
      console.error('Failed to create order:', orderData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: orderData.message || 'Erro ao criar pedido na Appmax' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderData.data.id,
        orderData: orderData.data,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in appmax-create-order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
