import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Euro, PhoneMissed, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const numberFormatter = new Intl.NumberFormat('es-ES', {
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const clampNumber = (value, min, max) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return min;
  return Math.min(Math.max(numericValue, min), max);
};

const ConversionDiagnostic = () => {
  const [monthlyLeads, setMonthlyLeads] = useState(120);
  const [missedRate, setMissedRate] = useState(22);
  const [appointmentValue, setAppointmentValue] = useState(180);
  const [recoveryRate, setRecoveryRate] = useState(35);

  const estimate = useMemo(() => {
    const leads = clampNumber(monthlyLeads, 0, 100000);
    const missed = clampNumber(missedRate, 0, 100);
    const value = clampNumber(appointmentValue, 0, 1000000);
    const recovered = clampNumber(recoveryRate, 0, 100);
    const missedLeads = leads * (missed / 100);
    const recoveredAppointments = missedLeads * (recovered / 100);
    const recoveredRevenue = recoveredAppointments * value;

    return {
      missedLeads,
      recoveredAppointments,
      recoveredRevenue,
    };
  }, [appointmentValue, missedRate, monthlyLeads, recoveryRate]);

  const inputClassName = 'text-gray-900 placeholder:text-gray-400';

  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary mb-5">
              <TrendingUp className="w-4 h-4" />
              Diagnóstico rápido
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calcula cuántas citas se quedan sin dueño cada mes
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              La mayoría de negocios no pierde leads por falta de interés, sino por respuesta lenta,
              agenda dispersa y seguimientos que nadie retoma. CitaLink convierte esa fuga en una
              cola de acciones medible.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-background p-4">
                <PhoneMissed className="w-5 h-5 text-primary mb-3" />
                <p className="font-medium">Detecta fugas</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Llamadas, formularios y WhatsApp sin respuesta.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <CalendarCheck className="w-5 h-5 text-primary mb-3" />
                <p className="font-medium">Agenda sin fricción</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cualificación, huecos reales y recordatorios.
                </p>
              </div>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Oportunidad mensual estimada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyLeads">Consultas mensuales</Label>
                  <Input
                    id="monthlyLeads"
                    type="number"
                    min="0"
                    value={monthlyLeads}
                    onChange={(event) => setMonthlyLeads(event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missedRate">% sin respuesta rápida</Label>
                  <Input
                    id="missedRate"
                    type="number"
                    min="0"
                    max="100"
                    value={missedRate}
                    onChange={(event) => setMissedRate(event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentValue">Valor medio por cita</Label>
                  <Input
                    id="appointmentValue"
                    type="number"
                    min="0"
                    value={appointmentValue}
                    onChange={(event) => setAppointmentValue(event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recoveryRate">% recuperable con IA</Label>
                  <Input
                    id="recoveryRate"
                    type="number"
                    min="0"
                    max="100"
                    value={recoveryRate}
                    onChange={(event) => setRecoveryRate(event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted/60 p-4">
                  <p className="text-sm text-muted-foreground">Leads en fuga</p>
                  <p className="text-2xl font-bold mt-1">
                    {numberFormatter.format(estimate.missedLeads)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/60 p-4">
                  <p className="text-sm text-muted-foreground">Citas recuperables</p>
                  <p className="text-2xl font-bold mt-1">
                    {numberFormatter.format(estimate.recoveredAppointments)}
                  </p>
                </div>
                <div className="rounded-lg bg-primary text-primary-foreground p-4">
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Euro className="w-4 h-4" />
                    Valor potencial
                  </div>
                  <p className="text-2xl font-bold mt-1">
                    {currencyFormatter.format(estimate.recoveredRevenue)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/demo" className="flex-1">
                  <Button className="w-full">
                    Pedir auditoría de citas
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/producto" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Ver el flujo
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                Estimación orientativa para priorizar la conversación comercial. No representa una garantía de resultados.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConversionDiagnostic;
