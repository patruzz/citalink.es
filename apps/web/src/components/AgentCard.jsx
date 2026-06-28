
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';

const AgentCard = ({ name, channel, objective, conversionRate, onConfigure }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant="secondary" className="mt-2">
              {channel}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onConfigure}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{objective}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Conversión</span>
          <span className="text-sm font-semibold text-primary">{conversionRate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
