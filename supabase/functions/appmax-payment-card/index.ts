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

function validateCardNumber(number: string): { valid: boolean; error?: string } {
  const cleanNumber = number?.replace(/\D/g, '');
  if (!cleanNumber || cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { valid: false, error: 'Número do cartão inválido' };
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { valid: false, error: 'Número do cartão inválido' };
  }
  
  return { valid: true };
}

function validateCVV(cvv: string): { valid: boolean; error?: string } {
  const cleanCVV = cvv?.replace(/\D/g, '');
  if (!cleanCVV || cleanCVV.length < 3 || cleanCVV.length > 4) {
    return { valid: false, error: 'CVV deve ter 3 ou 4 dígitos' };
  }
  return { valid: true };
}

function validateExpirationMonth(month: string): { valid: boolean; error?: string } {
  const monthNum = parseInt(month, 10);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return { valid: false, error: 'Mês de validade inválido' };
  }
  return { valid: true };
}

function validateExpirationYear(year: string, month: string): { valid: boolean; error?: string } {
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  
  if (isNaN(yearNum) || yearNum < 0 || yearNum > 99) {
    return { valid: false, error: 'Ano de validade inválido' };
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return { valid: false, error: 'Cartão expirado' };
  }
  
  return { valid: true };
}

function validateInstallments(installments: any): { valid: boolean; error?: string } {
  const num = typeof installments === 'string' ? parseInt(installments, 10) : installments;
  if (!num || isNaN(num) || num < 1 || num > 6) {
    return { valid: false, error: 'Número de parcelas deve ser entre 1 e 6' };
  }
  return { valid: true };
}

function validateHolderName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Nome do titular é obrigatório' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 100) {
    return { valid: false, error: 'Nome do titular deve ter entre 3 e 100 caracteres' };
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
    console.log('Processing card payment request');

    const { orderId, customerId, cpf, card, installments = 1 } = body;

    // Validate basic fields
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

    // Validate card object exists
    if (!card || typeof card !== 'object') {
      return new Response(
        JSON.stringify({ success: false, error: 'Dados do cartão são obrigatórios' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate card fields
    const validations = [
      validateCardNumber(card.number),
      validateCVV(card.cvv),
      validateExpirationMonth(card.expirationMonth),
      validateExpirationYear(card.expirationYear, card.expirationMonth),
      validateHolderName(card.holderName),
      validateInstallments(installments),
    ];

    for (const validation of validations) {
      if (!validation.valid) {
        console.error('Card validation failed:', validation.error);
        return new Response(
          JSON.stringify({ success: false, error: validation.error }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }
    }

    // Create card payment in Appmax with validated data
    const paymentPayload = {
      'access-token': accessToken,
      cart: {
        order_id: orderId,
      },
      customer: {
        customer_id: customerId,
      },
      payment: {
        CreditCard: {
          document_number: cpf.replace(/\D/g, ''),
          number: card.number.replace(/\s/g, ''),
          cvv: card.cvv.replace(/\D/g, ''),
          month: parseInt(card.expirationMonth, 10),
          year: parseInt(card.expirationYear, 10),
          name: card.holderName.trim().substring(0, 100),
          installments: typeof installments === 'string' ? parseInt(installments, 10) : installments,
        },
      },
    };

    console.log('Sending validated card payment to Appmax (card details hidden)');

    const paymentResponse = await fetch(`${APPMAX_BASE_URL}/payment/credit-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentPayload),
    });

    const paymentData = await paymentResponse.json();
    console.log('Appmax card payment response:', JSON.stringify({
      success: paymentData.success,
      message: paymentData.message,
      hasData: !!paymentData.data,
    }, null, 2));

    if (!paymentResponse.ok || !paymentData.success) {
      console.error('Failed to process card payment:', paymentData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: paymentData.message || 'Pagamento não aprovado' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const cardInfo = paymentData.data;
    
    return new Response(
      JSON.stringify({
        success: true,
        transactionId: cardInfo.pay_reference,
        status: 'approved',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in appmax-payment-card:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
