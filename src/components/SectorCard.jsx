
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const SectorCard = ({ name, useCase, expectedResult, icon: Icon }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 h-full">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon className="w-6 h-6 text-primary" />}
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Caso de uso
            </span>
            <p className="text-sm mt-1">{useCase}</p>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t">
            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Resultado esperado
              </span>
              <p className="text-sm mt-1 text-primary font-medium">{expectedResult}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorCard;
