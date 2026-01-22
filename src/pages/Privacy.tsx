import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-3xl font-bold mb-2">Política de Privacidade – Packwoods Brasil</h1>
          <p className="text-muted-foreground mb-8">Última atualização: 09/01/2026</p>
          
          <p className="mb-6">
            A Packwoods Brasil está comprometida em garantir que sua privacidade seja protegida. 
            Esta política explica como usamos as informações que coletamos sobre você.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Coleta de Informações</h2>
          <p className="text-muted-foreground mb-4">Podemos coletar as seguintes informações:</p>
          <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
            <li>Nome e cargo;</li>
            <li>Informações de contato, incluindo endereço de e-mail;</li>
            <li>Informações demográficas, como código postal, preferências e interesses;</li>
            <li>Outras informações relevantes para pesquisas de clientes e/ou ofertas.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. O que fazemos com as informações</h2>
          <p className="text-muted-foreground mb-4">
            Usamos essas informações para entender suas necessidades e fornecer um serviço melhor, 
            especificamente pelas seguintes razões:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
            <li>Processamento de pedidos e manutenção de registros internos;</li>
            <li>Melhoria de nossos produtos e serviços;</li>
            <li>Envio periódico de e-mails promocionais sobre novos produtos ou ofertas especiais (você pode cancelar a assinatura a qualquer momento);</li>
            <li>Personalização do site de acordo com seus interesses.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Segurança (LGPD)</h2>
          <p className="text-muted-foreground mb-6">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD), garantimos que suas informações 
            estão seguras. Para evitar acesso ou divulgação não autorizados, implementamos procedimentos 
            físicos, eletrônicos e administrativos adequados para salvaguardar as informações que coletamos online.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Uso de Cookies</h2>
          <p className="text-muted-foreground mb-6">
            Um cookie é um pequeno arquivo que pede permissão para ser colocado no disco rígido do seu 
            computador. Usamos cookies de log de tráfego para identificar quais páginas estão sendo usadas. 
            Isso nos ajuda a analisar dados sobre o tráfego da página web e melhorar nosso site para as 
            necessidades do cliente.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Contato</h2>
          <p className="text-muted-foreground mb-6">
            Para questões relacionadas à privacidade, entre em contato conosco pelo e-mail:{" "}
            <a href="mailto:packwoodsbrasil@gmail.com" className="text-primary hover:underline">
              packwoodsbrasil@gmail.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
