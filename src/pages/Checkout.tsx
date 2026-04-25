import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Copy, Check, Smartphone, Loader2, Bitcoin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPix, setIsLoadingPix] = useState(false);
  const [isLoadingCrypto, setIsLoadingCrypto] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'crypto'>('pix');
  const [cryptoNetwork, setCryptoNetwork] = useState<string>('BTC');
  const [pixData, setPixData] = useState<{
    qrCodeImage: string;
    qrCodeText: string;
    transactionId: string;
  } | null>(null);
  const [cryptoData, setCryptoData] = useState<{
    qrCodeImage: string | null;
    qrCodeText: string;
    transactionId: string;
    network: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
    number: '',
    district: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 3) return v;
    if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
    if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
  };

  const formatCEP = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 5) return v;
    return `${v.slice(0, 5)}-${v.slice(5, 8)}`;
  };

  const copyPixCode = async () => {
    if (!pixData?.qrCodeText) return;
    try {
      await navigator.clipboard.writeText(pixData.qrCodeText);
      setPixCopied(true);
      toast({
        title: "Código PIX copiado!",
        description: "Cole no seu aplicativo de banco.",
      });
      setTimeout(() => setPixCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.cpf || !formData.address || !formData.number || !formData.district || !formData.city || !formData.state || !formData.zip) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate CEP has 8 digits
    const cleanZip = formData.zip.replace(/\D/g, '');
    if (cleanZip.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "O CEP deve ter 8 dígitos.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate CPF has 11 digits
    const cleanCpf = formData.cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "O CPF deve ter 11 dígitos.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const generateExternalId = () => {
    return `ord_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  };

  const buildCustomerPayload = () => ({
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email.trim(),
    phone: formData.phone,
    document: formData.cpf,
  });

  const buildProductsPayload = () => items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  const saveOrder = async (orderId: string, method: 'pix' | 'crypto') => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    const orderData = {
      external_id: orderId,
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      customer_phone: formData.phone,
      amount: totalPrice,
      payment_method: method,
      status: 'pending',
      user_id: user?.id, // Link order to authenticated user
      shipping_address: {
        address: formData.address,
        number: formData.number,
        district: formData.district,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };

    const { error } = await supabase.from('orders').insert(orderData);
    if (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleOpenPixModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoadingPix(true);
    
    try {
      const externalId = generateExternalId();
      await saveOrder(externalId, 'pix');

      const { data, error } = await supabase.functions.invoke('sigilopay-payment-pix', {
        body: {
          externalId,
          amount: totalPrice,
          customer: buildCustomerPayload(),
          products: buildProductsPayload(),
        }
      });

      if (error) throw error;
      
      if (!data.success) {
        throw new Error(data.error || 'Erro ao gerar PIX');
      }

      setPixData({
        qrCodeImage: data.qrCodeImage,
        qrCodeText: data.qrCodeText,
        transactionId: data.transactionId || externalId,
      });
      setShowPixModal(true);
    } catch (error) {
      console.error('Error creating PIX:', error);
      toast({
        title: "Erro ao gerar PIX",
        description: error instanceof Error ? error.message : "Tente novamente ou entre em contato conosco.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingPix(false);
    }
  };

  const handleCryptoPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoadingCrypto(true);

    try {
      const externalId = generateExternalId();
      await saveOrder(externalId, 'crypto');

      const { data, error } = await supabase.functions.invoke('sigilopay-payment-crypto', {
        body: {
          externalId,
          amount: totalPrice,
          customer: buildCustomerPayload(),
          products: buildProductsPayload(),
          network: cryptoNetwork,
        }
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Erro ao gerar pagamento crypto');
      }

      setCryptoData({
        qrCodeImage: data.qrCodeImage,
        qrCodeText: data.qrCodeText,
        transactionId: data.transactionId || externalId,
        network: data.network || cryptoNetwork,
      });
      setShowCryptoModal(true);
    } catch (error) {
      console.error('Error processing crypto payment:', error);
      toast({
        title: "Erro no pagamento",
        description: error instanceof Error ? error.message : "Tente novamente ou use PIX.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCrypto(false);
    }
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setShowPixModal(false);

    // Send confirmation email for PIX payment
    await supabase.functions.invoke('send-order-confirmation', {
      body: {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        orderId: pixData?.transactionId || `ORD-${Date.now()}`,
        items: items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: totalPrice,
      }
    });

    clearCart();
    navigate('/confirmacao', { 
      state: { 
        orderId: pixData?.transactionId || `ORD-${Date.now()}`,
        total: totalPrice,
        items: items,
        paymentMethod: 'PIX'
      } 
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
            <Link to="/produtos">
              <Button>Ver Produtos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-4xl">
          <Link to="/carrinho" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ChevronLeft className="h-4 w-4" />
            Voltar ao carrinho
          </Link>

          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Informações de Entrega</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="João"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Silva"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="11999999999"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={(e) => setFormData(prev => ({ ...prev, cpf: formatCPF(e.target.value) }))}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="address">Rua</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Rua das Flores"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="district">Bairro</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Centro"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="São Paulo"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="SP"
                        maxLength={2}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">CEP</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={(e) => setFormData(prev => ({ ...prev, zip: formatCEP(e.target.value) }))}
                        placeholder="00000-000"
                        maxLength={9}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
                
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'pix' | 'crypto')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pix" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      PIX
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="flex items-center gap-2">
                      <Bitcoin className="h-4 w-4" />
                      Crypto
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pix" className="mt-4">
                    <div className="bg-primary/10 rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Valor a pagar</p>
                        <p className="text-3xl font-bold text-primary">
                          R$ {totalPrice.toFixed(2).replace('.', ',')}
                        </p>
                      </div>

                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        <p>Ao clicar em "Pagar com PIX", você verá o QR Code e o código para copiar e colar.</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="crypto" className="mt-4 space-y-4">
                    <div className="bg-primary/10 rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Valor a pagar</p>
                        <p className="text-3xl font-bold text-primary">
                          R$ {totalPrice.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cryptoNetwork">Rede / Moeda</Label>
                      <Select value={cryptoNetwork} onValueChange={setCryptoNetwork}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione a rede" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="USDT_TRC20">USDT (Tron - TRC20)</SelectItem>
                          <SelectItem value="USDT_ERC20">USDT (Ethereum - ERC20)</SelectItem>
                          <SelectItem value="USDT_BEP20">USDT (BSC - BEP20)</SelectItem>
                          <SelectItem value="BNB">BNB</SelectItem>
                          <SelectItem value="SOL">Solana (SOL)</SelectItem>
                          <SelectItem value="MATIC">Polygon (MATIC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Ao confirmar, você verá o QR Code e o endereço da carteira para enviar o pagamento.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span className="text-primary font-medium">Grátis</span>
                  </div>
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                {paymentMethod === 'pix' ? (
                  <Button
                    type="button"
                    size="lg"
                    className="w-full mt-6 font-semibold shadow-glow"
                    disabled={isProcessing || isLoadingPix}
                    onClick={handleOpenPixModal}
                  >
                    {isProcessing ? (
                      <>Processando...</>
                    ) : isLoadingPix ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando PIX...
                      </>
                    ) : (
                      <>
                        <Smartphone className="mr-2 h-4 w-4" />
                        Pagar com PIX
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    className="w-full mt-6 font-semibold shadow-glow"
                    disabled={isProcessing || isLoadingCrypto}
                    onClick={handleCryptoPayment}
                  >
                    {isProcessing ? (
                      <>Processando...</>
                    ) : isLoadingCrypto ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando QR Code...
                      </>
                    ) : (
                      <>
                        <Bitcoin className="mr-2 h-4 w-4" />
                        Pagar com Crypto
                      </>
                    )}
                  </Button>
                )}

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Após o pagamento, você receberá a confirmação por e-mail
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PIX QR Code Modal */}
      <Dialog open={showPixModal} onOpenChange={setShowPixModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Pague com PIX
              </span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Escaneie o QR Code ou copie o código para pagar
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Valor */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Valor a pagar</p>
              <p className="text-3xl font-bold text-primary">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </p>
            </div>

            {/* QR Code - Use base64 image from Appmax */}
            {pixData?.qrCodeImage && (
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-xl">
                  <img 
                    src={`data:image/png;base64,${pixData.qrCodeImage}`}
                    alt="QR Code PIX"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px]"
                  />
                </div>
              </div>
            )}

            {/* Código Copia e Cola */}
            {pixData?.qrCodeText && (
              <div>
                <p className="text-sm text-muted-foreground mb-2 text-center">Ou copie o código PIX:</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs font-mono break-all max-h-20 overflow-y-auto">
                    {pixData.qrCodeText}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyPixCode}
                    className="shrink-0"
                  >
                    {pixCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Transaction ID */}
            {pixData?.transactionId && (
              <div className="text-center text-sm">
                <p className="text-muted-foreground">ID da Transação</p>
                <p className="font-semibold font-mono text-xs">{pixData.transactionId}</p>
              </div>
            )}

            {/* Instruções */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <ol className="list-decimal list-inside space-y-1">
                <li>Escaneie o QR Code ou copie o código</li>
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar com PIX</li>
                <li>Confirme o pagamento</li>
              </ol>
            </div>

            {/* Botão Confirmar */}
            <Button
              onClick={handleConfirmPayment}
              size="lg"
              className="w-full font-semibold"
            >
              <Check className="mr-2 h-4 w-4" />
              Já fiz o pagamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;
