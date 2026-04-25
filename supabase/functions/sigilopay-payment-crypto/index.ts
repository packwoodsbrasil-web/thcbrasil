import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SIGILO_BASE_URL = "https://app.sigilopay.com.br/api/v1";

function validateCPF(cpf: string) {
  const c = cpf?.replace(/\D/g, '');
  if (!c || c.length !== 11) return { valid: false, error: 'CPF deve ter 11 dígitos' };
  if (/^(\d)\1+$/.test(c)) return { valid: false, error: 'CPF inválido' };
  return { valid: true };
}

function validateEmail(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'E-mail inválido' };
  }
  return { valid: true };
}

const ALLOWED_NETWORKS = ['BTC', 'ETH', 'USDT_ERC20', 'USDT_TRC20', 'USDT_BEP20', 'BNB', 'SOL', 'MATIC'];

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const publicKey = Deno.env.get('SIGILOPAY_PUBLIC_KEY');
    const secretKey = Deno.env.get('SIGILOPAY_SECRET_KEY');
    if (!publicKey || !secretKey) {
      return new Response(JSON.stringify({ success: false, error: 'Gateway não configurado' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
    }

    const body = await req.json();
    const { externalId, amount, customer, products, network = 'BTC' } = body;

    if (!externalId) {
      return new Response(JSON.stringify({ success: false, error: 'externalId obrigatório' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return new Response(JSON.stringify({ success: false, error: 'Valor inválido' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }
    if (!ALLOWED_NETWORKS.includes(network)) {
      return new Response(JSON.stringify({ success: false, error: 'Rede crypto inválida' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }
    if (!customer?.name || customer.name.trim().length < 2) {
      return new Response(JSON.stringify({ success: false, error: 'Nome obrigatório' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }
    const emailV = validateEmail(customer?.email);
    if (!emailV.valid) {
      return new Response(JSON.stringify({ success: false, error: emailV.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }
    const cpfV = validateCPF(customer?.document);
    if (!cpfV.valid) {
      return new Response(JSON.stringify({ success: false, error: cpfV.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const callbackUrl = `${supabaseUrl}/functions/v1/sigilopay-webhook`;

    const payload = {
      identifier: externalId,
      amount: Number(amount.toFixed(2)),
      crypto: { currency: 'BRL', network },
      client: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone || '',
        document: customer.document.replace(/\D/g, ''),
      },
      metadata: { provider: 'Lovable Checkout', externalId },
      callbackUrl,
    };

    console.log('Sending Crypto request to SigiloPay:', JSON.stringify({ identifier: externalId, network, amount }));

    const resp = await fetch(`${SIGILO_BASE_URL}/gateway/crypto/receive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-key': publicKey,
        'x-secret-key': secretKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log('SigiloPay Crypto response:', JSON.stringify({ status: resp.status, transactionId: data?.transactionId, statusEnum: data?.status }));

    if (!resp.ok || (data.status && data.status !== 'OK' && data.status !== 'PENDING')) {
      return new Response(JSON.stringify({
        success: false,
        error: data.message || data.errorDescription || 'Erro ao gerar pagamento crypto',
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }

    let qrImage: string | null = null;
    if (data.qr?.image) {
      qrImage = data.qr.image.replace(/^data:image\/png;base64,/, '');
    }

    return new Response(JSON.stringify({
      success: true,
      transactionId: data.transactionId,
      qrCodeText: data.qr?.code,
      qrCodeImage: qrImage,
      network,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in sigilopay-payment-crypto:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
  }
});