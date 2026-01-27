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

function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'E-mail é obrigatório' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim()) || email.length > 255) {
    return { valid: false, error: 'E-mail inválido' };
  }
  return { valid: true };
}

function validatePhone(phone: string): { valid: boolean; error?: string } {
  const cleanPhone = phone?.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 11) {
    return { valid: false, error: 'Telefone deve ter 10 ou 11 dígitos' };
  }
  return { valid: true };
}

function validateCEP(cep: string): { valid: boolean; error?: string } {
  const cleanCEP = cep?.replace(/\D/g, '');
  if (!cleanCEP || cleanCEP.length !== 8) {
    return { valid: false, error: 'CEP deve ter 8 dígitos' };
  }
  return { valid: true };
}

function validateName(name: string, fieldName: string = 'Nome'): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: `${fieldName} é obrigatório` };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 100) {
    return { valid: false, error: `${fieldName} deve ter entre 2 e 100 caracteres` };
  }
  return { valid: true };
}

function sanitizeName(name: string): string {
  return name.trim().substring(0, 100);
}

function sanitizeAddress(address: string): string {
  return address.trim().substring(0, 200);
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
    // Log without sensitive data
    console.log('Processing customer creation request');

    const {
      firstName,
      lastName,
      email,
      phone,
      cpf,
      address,
      number,
      district,
      city,
      state,
      zip,
      ip = '127.0.0.1'
    } = body;

    // Validate all inputs
    const validations = [
      validateName(firstName, 'Nome'),
      validateName(lastName, 'Sobrenome'),
      validateEmail(email),
      validatePhone(phone),
      validateCPF(cpf),
      validateName(address, 'Endereço'),
      validateName(city, 'Cidade'),
      validateCEP(zip),
    ];

    for (const validation of validations) {
      if (!validation.valid) {
        console.error('Validation failed:', validation.error);
        return new Response(
          JSON.stringify({ success: false, error: validation.error }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }
    }

    // Validate state (2 letter code)
    if (!state || typeof state !== 'string' || state.length !== 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Estado deve ter 2 caracteres (sigla)' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create customer in Appmax with sanitized data
    const customerPayload = {
      'access-token': accessToken,
      firstname: sanitizeName(firstName),
      lastname: sanitizeName(lastName),
      email: email.trim().toLowerCase(),
      telephone: phone.replace(/\D/g, ''),
      postcode: zip.replace(/\D/g, ''),
      address_street: sanitizeAddress(address),
      address_street_number: number?.trim() || '0',
      address_street_district: district?.trim() || 'Centro',
      address_city: sanitizeName(city),
      address_state: state.toUpperCase(),
      ip: ip,
    };

    console.log('Sending customer to Appmax');

    const customerResponse = await fetch(`${APPMAX_BASE_URL}/customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerPayload),
    });

    const customerData = await customerResponse.json();
    console.log('Appmax customer response - success:', !!customerData.data?.id);

    if (!customerResponse.ok || !customerData.data?.id) {
      console.error('Failed to create customer:', customerData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: customerData.message || 'Erro ao criar cliente na Appmax' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        customerId: customerData.data.id,
        customerHash: customerData.data.hash,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in appmax-create-customer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
