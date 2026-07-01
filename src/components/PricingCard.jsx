import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

const PricingCard = ({
  name,
  price,
  priceNote = '/mes',
  setupPrice,
  description,
  features,
  highlighted,
  loading,
  onCTA,
  secondaryLabel,
  onSecondaryCTA,
}) => {
  return (
    <Card
      className={`relative h-full overflow-hidden border-white/10 bg-card/90 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 ${
        highlighted ? 'ring-2 ring-primary/70 shadow-[0_24px_90px_rgba(244,202,113,0.18)]' : ''
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Recomendado
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{priceNote}</span>
        </div>
        {setupPrice && (
          <div className="mt-3 rounded-lg border border-white/10 bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
            Setup inicial: <span className="font-semibold text-foreground">{setupPrice}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={highlighted ? 'default' : 'secondary'}
          onClick={onCTA}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Comprar ahora'}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </Button>
        {secondaryLabel && onSecondaryCTA && (
          <Button
            type="button"
            className="w-full mt-2"
            variant="ghost"
            onClick={onSecondaryCTA}
            disabled={loading}
          >
            {secondaryLabel}
          </Button>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Checkout seguro con Stripe
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
