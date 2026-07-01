import React from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ClipboardList,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const channels = [
  { label: 'Llamada perdida', detail: '21:43 fuera de horario', icon: Phone, tone: 'border-rose-400/30 bg-rose-500/10 text-rose-100' },
  { label: 'WhatsApp precio', detail: 'Implante dental', icon: MessageSquare, tone: 'border-amber-300/30 bg-amber-300/10 text-amber-100' },
  { label: 'Formulario web', detail: 'Primera valoración', icon: ClipboardList, tone: 'border-white/15 bg-white/[0.06] text-white' },
  { label: 'Email consulta', detail: 'Disponibilidad mañana', icon: Mail, tone: 'border-indigo-300/25 bg-indigo-400/10 text-indigo-100' },
];

const actions = [
  'Responde en menos de 60 segundos',
  'Cualifica servicio, urgencia y zona',
  'Propone huecos con revisión humana',
];

const appointments = [
  { time: '10:30', name: 'Valoración estética', status: 'Confirmada' },
  { time: '13:00', name: 'Primera visita dental', status: 'Recordatorio enviado' },
  { time: '18:15', name: 'Reprogramada sin perder lead', status: 'Recuperada' },
];

const AppointmentRecoveryScene = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#090b12]/90 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-5 lg:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(244,202,113,0.13),transparent_28%,rgba(151,57,82,0.18)_62%,rgba(255,255,255,0.04))]" />
      <div className="absolute left-6 right-6 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative grid gap-4 lg:grid-cols-[0.88fr_1.08fr_0.88fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-md border border-white/10 bg-black/25 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Canales entrando</span>
            <span className="rounded-md bg-rose-500/15 px-2 py-1 text-xs font-semibold text-rose-100">4 fugas</span>
          </div>

          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.label}
                className={`rounded-md border p-3 shadow-[0_12px_34px_rgba(0,0,0,0.2)] ${channel.tone}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/25">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight">{channel.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{channel.detail}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="ml-4 mt-3 h-5 border-l border-dashed border-white/20" />
                )}
              </div>
            );
          })}
        </div>

        <div className="relative rounded-lg border border-primary/20 bg-[radial-gradient(circle_at_50%_0%,rgba(244,202,113,0.18),rgba(12,14,22,0.92)_44%,rgba(12,14,22,0.86))] p-4">
          <div className="absolute -left-4 top-1/2 hidden h-px w-4 bg-gradient-to-r from-transparent to-primary/60 lg:block" />
          <div className="absolute -right-4 top-1/2 hidden h-px w-4 bg-gradient-to-r from-primary/60 to-transparent lg:block" />

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Motor CitaLink</p>
              <h3 className="mt-1 text-xl font-bold">Prioriza antes de que el lead se enfríe</h3>
            </div>
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-black/28 p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">Cola IA con revisión humana</span>
              <span className="rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">47s</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary via-[#f59f6a] to-accent" />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {actions.map((action) => (
              <div key={action} className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{action}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-white/10 bg-black/24 p-3">
              <Clock3 className="mb-2 h-4 w-4 text-primary" />
              <p className="text-2xl font-bold">18</p>
              <p className="text-xs text-muted-foreground">leads recuperados</p>
            </div>
            <div className="rounded-md border border-white/10 bg-black/24 p-3">
              <ShieldCheck className="mb-2 h-4 w-4 text-primary" />
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-muted-foreground">con consentimiento</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-md border border-white/10 bg-black/25 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Resultado</span>
            <span className="rounded-md bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">citas vivas</span>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Agenda confirmada</p>
                <p className="text-xs text-muted-foreground">Hoy · clínica piloto</p>
              </div>
            </div>

            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={`${appointment.time}-${appointment.name}`} className="rounded-md border border-white/10 bg-black/24 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-primary">{appointment.time}</span>
                    <span className="rounded-md bg-white/[0.07] px-2 py-1 text-xs text-muted-foreground">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{appointment.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">Valor estimado</p>
            <p className="mt-1 text-3xl font-bold text-primary">+3.240 EUR</p>
            <p className="mt-1 text-xs text-muted-foreground">citas que antes se enfriaban</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRecoveryScene;
