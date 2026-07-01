import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  Clock,
  CreditCard,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AppointmentRecoveryScene from '@/components/AppointmentRecoveryScene.jsx';
import ConversionDiagnostic from '@/components/ConversionDiagnostic.jsx';

const problems = [
  {
    icon: Clock,
    title: 'El lead se enfría antes de recibir respuesta',
    description: 'Si una consulta espera horas, compara opciones y la cita se pierde aunque el interés fuera real.',
  },
  {
    icon: Phone,
    title: 'Las llamadas perdidas no vuelven solas',
    description: 'Recepción, ventas y agenda no pueden perseguir cada llamada, WhatsApp o formulario fuera de horario.',
  },
  {
    icon: Mail,
    title: 'El seguimiento vive en bandejas dispersas',
    description: 'Correos, notas y conversaciones quedan sin dueño, sin próximo paso y sin trazabilidad comercial.',
  },
  {
    icon: BarChart3,
    title: 'No sabes cuánto dinero se escapa',
    description: 'Sin medir tiempo de respuesta, no-shows y solicitudes sin seguimiento, la fuga parece invisible.',
  },
];

const leakCards = [
  {
    icon: Phone,
    title: 'Teléfono',
    description: 'Recupera llamadas no atendidas y crea tarea de seguimiento con prioridad.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Convierte preguntas de precio o disponibilidad en intención cualificada.',
  },
  {
    icon: Mail,
    title: 'Email y formularios',
    description: 'Responde rápido, clasifica el caso y evita que una solicitud web quede esperando.',
  },
  {
    icon: CalendarCheck,
    title: 'Agenda',
    description: 'Propone huecos, confirma, recuerda y reprograma antes de perder la visita.',
  },
];

const pilotSteps = [
  {
    step: '01',
    title: 'Auditamos la fuga',
    description: 'Mapeamos teléfono, WhatsApp, formularios y email para estimar dónde se pierden citas.',
  },
  {
    step: '02',
    title: 'Activamos un flujo',
    description: 'Elegimos un canal, una agenda, reglas de cualificación y revisión humana.',
  },
  {
    step: '03',
    title: 'Medimos citas recuperadas',
    description: 'Dashboard con respuesta media, leads recuperados, próximas acciones y citas confirmadas.',
  },
];

const differentiators = [
  {
    title: 'No es otro calendario',
    description: 'Responde, cualifica, propone huecos, confirma y recuerda con reglas comerciales.',
  },
  {
    title: 'No reemplaza tu equipo',
    description: 'Deja al humano las decisiones sensibles y automatiza el tramo que más se enfría.',
  },
  {
    title: 'No vende IA abstracta',
    description: 'Vende una métrica concreta: menos solicitudes perdidas y más citas confirmadas.',
  },
];

const metrics = [
  { value: '<60 s', label: 'objetivo de primera respuesta' },
  { value: '24/7', label: 'captura fuera de horario' },
  { value: '1 cola', label: 'leads con próximo paso' },
  { value: '100%', label: 'acciones con trazabilidad' },
];

const trustSignals = [
  'Auditoría inicial sin pedir datos clínicos ni acceso completo a CRM.',
  'Marketing, ventas y llamadas quedan con aprobación humana por defecto.',
  'Opt-out y preferencias de contacto se registran desde el primer flujo.',
];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>CitaLink - Recupera citas perdidas con agentes de IA</title>
        <meta
          name="description"
          content="CitaLink ayuda a negocios con cita previa a responder, cualificar, confirmar y recuperar oportunidades por teléfono, WhatsApp, email y formularios."
        />
      </Helmet>

      <Header />

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#05060a_0%,#10111b_38%,#1a0d15_72%,#171006_100%)] py-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,202,113,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.92fr_1.08fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Citas recuperadas, no IA decorativa
                </div>
                <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl lg:text-5xl">
                  Recupera las citas que se escapan entre llamadas, WhatsApp y formularios
                </h1>
                <p className="mb-6 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
                  CitaLink detecta dónde se enfría cada solicitud, responde rápido, cualifica intención,
                  propone huecos y deja al equipo una acción clara. Compra el piloto o pide una auditoría
                  para medir la fuga antes de activar agentes.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link to="/precios">
                    <Button size="lg" className="w-full sm:w-auto">
                      Comprar ahora
                      <CreditCard className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/demo">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Pedir auditoría de citas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {['Starter 19 EUR/mes', 'Setup 49 EUR', 'Growth recomendado'].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
              >
                <AppointmentRecoveryScene />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground">Mide la fuga antes de seguir invirtiendo en captación</span>
              <ChevronDown className="h-6 w-6 animate-bounce text-primary" />
            </motion.div>
          </div>
        </section>

        <ConversionDiagnostic />

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                No necesitas más ruido. Necesitas que cada solicitud tenga siguiente paso.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                En clínicas, inmobiliarias y servicios profesionales, el valor se pierde en el tramo
                entre intención y cita confirmada. CitaLink convierte ese tramo en un sistema operativo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full border-white/10 bg-card/85">
                    <CardContent className="pt-6">
                      <problem.icon className="mb-4 h-10 w-10 text-primary" />
                      <h3 className="mb-2 text-xl font-semibold">{problem.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{problem.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Stethoscope className="h-4 w-4" />
                  Primer foco: clínicas privadas, dental y estética
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Cuatro entradas donde una cita puede nacer o desaparecer
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  CitaLink no intenta cambiarlo todo a la vez. En el MVP activamos un flujo concreto,
                  medimos recuperación y dejamos preparada la expansión a otros canales.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {leakCards.map((leak, index) => (
                  <motion.div
                    key={leak.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Card className="h-full border-white/10 bg-background/55">
                      <CardContent className="pt-6">
                        <leak.icon className="mb-4 h-8 w-8 text-primary" />
                        <h3 className="mb-2 font-semibold">{leak.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{leak.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <ClipboardCheck className="h-4 w-4" />
                Auditoría + piloto de 30 días
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                El MVP que un cliente entiende y puede comprar esta semana
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Un canal, una agenda, un flujo de seguimiento y métricas visibles. Lo suficiente
                para demostrar valor sin abrumar al equipo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {pilotSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full border-white/10 bg-card/85">
                    <CardContent className="pt-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-lg font-bold text-primary">
                        {step.step}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,rgba(244,202,113,0.11),rgba(151,57,82,0.10)_52%,rgba(255,255,255,0.025))] py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Una categoría más clara para vender: recuperación de citas
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  El cliente no compra un chatbot. Compra la tranquilidad de que una solicitud con intención
                  no queda enterrada en una bandeja, una llamada perdida o una conversación sin cierre.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {differentiators.map((item) => (
                    <div key={item.title} className="rounded-lg border border-white/10 bg-background/55 p-4">
                      <Shield className="mb-3 h-5 w-5 text-primary" />
                      <h3 className="mb-2 font-semibold">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-primary/20 bg-background/70">
                  <CardContent className="pt-6">
                    <CheckCircle className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="mb-4 text-xl font-semibold">Guardrails desde el primer día</h3>
                    <div className="space-y-3">
                      {trustSignals.map((signal) => (
                        <div key={signal} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-sm leading-relaxed text-muted-foreground">{signal}</p>
                        </div>
                      ))}
                    </div>
                    <Link to="/precios" className="mt-6 block">
                      <Button className="w-full">
                        Ver planes y comprar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Métricas que pasan a estar bajo control
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Si el sistema funciona, se nota en velocidad, agenda y seguimiento. No en promesas vagas.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-lg border border-white/10 bg-card/85 p-6 text-center"
                >
                  <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Empieza midiendo la fuga de citas. Compra cuando veas el coste de no hacerlo.
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Puedes activar CitaLink con Stripe o pedir una auditoría si prefieres validar primero
                el canal donde más oportunidades se están perdiendo.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/precios">
                  <Button size="lg" className="w-full sm:w-auto">
                    Comprar ahora
                    <CreditCard className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Solicitar auditoría
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
