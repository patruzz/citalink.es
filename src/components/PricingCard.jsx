
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingCard = ({
  name,
  price,
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
      className={`relative hover:shadow-lg transition-all duration-200 ${
        highlighted ? 'scale-105 ring-2 ring-primary shadow-xl' : ''
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Recomendado
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/mes</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={highlighted ? 'default' : 'outline'}
          onClick={onCTA}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Comprar ahora'}
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
      </CardContent>
    </Card>
  );
};

export default PricingCard;
