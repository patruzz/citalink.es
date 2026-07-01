import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlayCircle } from 'lucide-react';

const AgentCard = ({
  name,
  channel,
  objective,
  conversionRate,
  visual,
  status,
  onConfigure,
  onPreview,
}) => {
  return (
    <Card className="h-full overflow-hidden border-white/10 bg-card/90 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40">
      <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-muted">
        <img
          src={visual}
          alt={`${name} en acción`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant="secondary" className="mt-2 border-white/10">
              {channel}
            </Badge>
          </div>
          <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{objective}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Conversión</span>
          <span className="text-sm font-semibold text-primary">{conversionRate}</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={onPreview}>
            <PlayCircle className="w-4 h-4" />
            Flujo
          </Button>
          <Button type="button" size="sm" onClick={onConfigure}>
            Activar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
