
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const DemoFormSection = () => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    sector: '',
    monthlyLeads: '',
    mainChannel: '',
    message: '',
    consent: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error('Debes aceptar la política de privacidad para continuar');
      return;
    }

    setLoading(true);
    setSubmitStatus(null);
    try {
      await pb.collection('demoRequests').create({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone || null,
        sector: formData.sector || null,
        monthlyLeads: formData.monthlyLeads ? parseFloat(formData.monthlyLeads) : null,
        mainChannel: formData.mainChannel || null,
        message: formData.message || null,
        consent: formData.consent,
        status: 'pending',
      }, { $autoCancel: false });

      setSubmitStatus('success');
      toast.success('Auditoría solicitada. Te contactaremos para revisar tu flujo de citas.');
      
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        sector: '',
        monthlyLeads: '',
        mainChannel: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
      console.error('Demo request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar auditoría de 15 minutos</CardTitle>
        <CardDescription>
          Cuéntanos lo mínimo para preparar una primera hipótesis de fuga. No incluyas datos de pacientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitStatus === 'success' && (
            <div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
              Solicitud registrada. Te contactaremos para revisar el flujo de solicitud a cita confirmada.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-100">
              No hemos podido registrar la solicitud. Revisa los campos o contacta directamente en pat@citalink.es.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input
                id="company"
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email profesional *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Select value={formData.sector} onValueChange={(value) => handleChange('sector', value)}>
                <SelectTrigger id="sector" className="text-foreground">
                  <SelectValue placeholder="Selecciona un sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dental">Clínica dental</SelectItem>
                  <SelectItem value="estetica">Clínica estética</SelectItem>
                  <SelectItem value="clinicas">Otra clínica privada</SelectItem>
                  <SelectItem value="inmobiliarias">Inmobiliarias</SelectItem>
                  <SelectItem value="despachos">Despachos profesionales</SelectItem>
                  <SelectItem value="tecnicos">Servicios técnicos</SelectItem>
                  <SelectItem value="consultorias">Consultorías B2B</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyLeads">Solicitudes de cita mensuales</Label>
              <Input
                id="monthlyLeads"
                type="number"
                value={formData.monthlyLeads}
                onChange={(e) => handleChange('monthlyLeads', e.target.value)}
                className="text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainChannel">Canal donde más se atascan las citas</Label>
            <Select value={formData.mainChannel} onValueChange={(value) => handleChange('mainChannel', value)}>
              <SelectTrigger id="mainChannel" className="text-foreground">
                <SelectValue placeholder="Selecciona un canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Teléfono</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="web">Formulario web</SelectItem>
                <SelectItem value="missed_calls">Llamadas perdidas</SelectItem>
                <SelectItem value="mixed">Varios canales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">¿Dónde sospechas que se pierden citas?</Label>
            <Textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Ejemplo: llamadas fuera de horario, formularios que tardan en responderse, WhatsApps sin seguimiento, no-shows..."
              className="text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleChange('consent', checked)}
            />
            <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
              Acepto la política de privacidad y el tratamiento de mis datos profesionales para preparar la auditoría *
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Enviando...' : 'Solicitar auditoría de 15 minutos'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DemoFormSection;
