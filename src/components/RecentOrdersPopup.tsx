import { useEffect, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { products } from '@/data/products';

const FIRST_NAMES = [
  'Lucas', 'Mateus', 'João', 'Pedro', 'Gabriel', 'Rafael', 'Bruno', 'Felipe',
  'Thiago', 'Diego', 'Gustavo', 'Vinícius', 'André', 'Caio', 'Davi', 'Enzo',
  'Mariana', 'Ana', 'Beatriz', 'Camila', 'Juliana', 'Larissa', 'Fernanda',
  'Letícia', 'Isabela', 'Carolina', 'Gabriela', 'Amanda', 'Bianca', 'Sofia',
];

const LAST_INITIALS = ['S.', 'O.', 'L.', 'M.', 'A.', 'P.', 'C.', 'R.', 'F.', 'B.', 'G.', 'D.'];

const CITIES = [
  'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR',
  'Porto Alegre, RS', 'Salvador, BA', 'Recife, PE', 'Fortaleza, CE',
  'Brasília, DF', 'Goiânia, GO', 'Manaus, AM', 'Belém, PA', 'Florianópolis, SC',
  'Vitória, ES', 'Campinas, SP', 'Santos, SP', 'Niterói, RJ', 'Natal, RN',
  'João Pessoa, PB', 'Maceió, AL', 'Cuiabá, MT', 'Campo Grande, MS',
];

const TIME_PHRASES = [
  'há 2 minutos', 'há 4 minutos', 'há 7 minutos', 'há 11 minutos',
  'há 15 minutos', 'há 23 minutos', 'há 38 minutos', 'há 1 hora',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildNotification() {
  const product = pick(products);
  const name = `${pick(FIRST_NAMES)} ${pick(LAST_INITIALS)}`;
  const city = pick(CITIES);
  const time = pick(TIME_PHRASES);
  const image = product.images?.[0] ?? '/placeholder.svg';
  return { name, city, time, productName: product.name, image, id: Date.now() + Math.random() };
}

export function RecentOrdersPopup() {
  const [notification, setNotification] = useState<ReturnType<typeof buildNotification> | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showOne = () => {
      setNotification(buildNotification());
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        // schedule next after a gap
        nextTimer = setTimeout(showOne, 12000 + Math.random() * 10000);
      }, 6000);
    };

    // first appearance after a short delay
    const initial = setTimeout(showOne, 8000);

    return () => {
      clearTimeout(initial);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [dismissed]);

  if (!notification || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-4 z-50 max-w-[320px] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/95 backdrop-blur p-3 shadow-xl">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted">
          <img
            src={notification.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShoppingBag className="h-3 w-3" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight truncate">
            {notification.name} · {notification.city}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            comprou {notification.productName}
          </p>
          <p className="text-[11px] text-muted-foreground/80 mt-1">
            ✅ Pedido confirmado · {notification.time}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Fechar notificação"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}