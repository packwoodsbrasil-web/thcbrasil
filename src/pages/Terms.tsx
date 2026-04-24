import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-3xl font-bold mb-2">Termos de Uso – THC BRASIL</h1>
          <p className="text-muted-foreground mb-8">Última atualização: 09/01/2026</p>
          
          <p className="mb-6">
            Bem-vindo ao site THC BRASIL. Ao acessar e utilizar este site, você concorda em 
            cumprir e estar vinculado aos seguintes termos e condições de uso.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Restrição de Idade</h2>
          <p className="text-muted-foreground mb-6">
            Este site é destinado exclusivamente a adultos. Ao utilizá-lo, você declara ter pelo menos 
            18 anos (ou a idade legal para consumo de tabaco/produtos correlatos em sua jurisdição). 
            O acesso por menores de idade é terminantemente proibido.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso do Site</h2>
          <p className="text-muted-foreground mb-6">
            O conteúdo das páginas deste site é para sua informação e uso geral. Ele está sujeito a 
            alterações sem aviso prévio. O uso indevido de qualquer informação ou material neste site 
            é de sua inteira responsabilidade.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Propriedade Intelectual</h2>
          <p className="text-muted-foreground mb-6">
            Este site contém material que é de nossa propriedade ou licenciado para nós. Este material 
            inclui, mas não se limita ao design, layout, aparência e gráficos. A reprodução é proibida, 
            exceto de acordo com o aviso de direitos autorais. Todas as marcas registradas reproduzidas 
            neste site, que não são de propriedade do operador, são reconhecidas.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Precisão das Informações</h2>
          <p className="text-muted-foreground mb-6">
            Embora nos esforcemos para manter as informações atualizadas, não oferecemos garantias quanto 
            à precisão, integridade ou adequação das informações e materiais encontrados ou oferecidos 
            neste site para qualquer finalidade específica.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Links para Terceiros</h2>
          <p className="text-muted-foreground mb-6">
            Ocasionalmente, este site também pode incluir links para outros sites. Esses links são 
            fornecidos para sua conveniência. Eles não significam que endossamos o(s) site(s). Não temos 
            responsabilidade pelo conteúdo dos sites vinculados.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitação de Responsabilidade</h2>
          <p className="text-muted-foreground mb-6">
            A THC BRASIL não será responsável por quaisquer danos resultantes do uso ou da 
            incapacidade de usar os materiais deste site ou do desempenho dos produtos comprados 
            através do site.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
