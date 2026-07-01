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
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Stethoscope,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DashboardMockup from '@/components/DashboardMockup.jsx';
import ConversionDiagnostic from '@/components/ConversionDiagnostic.jsx';

const HomePage = () => {
  const problems = [
    {
      icon: Clock,
      title: 'La respuesta llega tarde',
      description: 'Cuando una consulta espera horas, el cliente ya está hablando con otro proveedor.',
    },
    {
      icon: Phone,
      title: 'Las llamadas perdidas no vuelven',
      description: 'El teléfono sigue siendo crítico en servicios con cita previa, pero nadie puede atenderlo todo.',
    },
    {
      icon: Mail,
      title: 'El seguimiento depende de memoria',
      description: 'Correos, WhatsApp y formularios quedan repartidos entre personas, bandejas y notas sueltas.',
    },
    {
      icon: BarChart3,
      title: 'No se mide la fuga comercial',
      description: 'Sin trazabilidad es difícil saber cuántas citas se pierden y qué canal está fallando.',
    },
  ];

  const differentiators = [
    {
      title: 'No es otro calendario',
      description: 'CitaLink no solo enseña huecos: responde, cualifica, propone cita, confirma y recuerda.',
    },
    {
      title: 'No reemplaza tu CRM',
      description: 'Lo alimenta con conversaciones, estado del lead, próxima acción y consentimiento registrado.',
    },
    {
      title: 'No es un bot aislado',
      description: 'Trabaja con supervisión humana, reglas de contacto y auditoría para equipos comerciales reales.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Captura la consulta',
      description: 'Unifica formularios, email, teléfono y WhatsApp en una cola comercial priorizada.',
    },
    {
      step: '02',
      title: 'Responde mientras hay intención',
      description: 'El agente contesta rápido con contexto, tono de marca y objetivo claro.',
    },
    {
      step: '03',
      title: 'Cualifica sin fricción',
      description: 'Detecta urgencia, servicio, presupuesto, ubicación y probabilidad de cita.',
    },
    {
      step: '04',
      title: 'Propone huecos reales',
      description: 'Conecta agenda y reglas de disponibilidad para evitar solapamientos y promesas imposibles.',
    },
    {
      step: '05',
      title: 'Confirma y reduce ausencias',
      description: 'Envía confirmaciones, recordatorios y reprogramaciones antes de que la cita se caiga.',
    },
    {
      step: '06',
      title: 'Deja rastro comercial',
      description: 'Cada conversación queda registrada con estado, próxima acción y preferencias de contacto.',
    },
  ];

  const metrics = [
    { value: '<60 s', label: 'Objetivo de primera respuesta' },
    { value: '24/7', label: 'Captura fuera de horario' },
    { value: '1 cola', label: 'Entrada única de leads' },
    { value: '100%', label: 'Trazabilidad de acciones' },
  ];

  const clinicLeaks = [
    {
      icon: Phone,
      title: 'Llamadas no atendidas',
      description: 'Primera valoración perdida porque recepción estaba ocupada o fuera de horario.',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApps sin siguiente paso',
      description: 'Preguntas de precio, disponibilidad o tratamiento que no llegan a cita confirmada.',
    },
    {
      icon: Mail,
      title: 'Formularios respondidos tarde',
      description: 'Solicitudes web con intención real que comparan varias clínicas al mismo tiempo.',
    },
    {
      icon: CalendarCheck,
      title: 'Primeras visitas sin confirmar',
      description: 'Personas interesadas que reciben información, pero no una propuesta clara de hueco.',
    },
  ];

  const auditSteps = [
    {
      title: 'Mapeamos entradas',
      description: 'Teléfono, WhatsApp, formularios, email y cualquier punto donde empieza una cita.',
    },
    {
      title: 'Detectamos fugas',
      description: 'Tiempo de respuesta, solicitudes sin dueño, reprogramaciones y no-shows.',
    },
    {
      title: 'Proponemos un piloto',
      description: 'Un canal, una agenda, revisión humana y una métrica clara para 30 días.',
    },
  ];

  const trustSignals = [
    'No pedimos datos de pacientes en la auditoría inicial.',
    'Empezamos con revisión humana antes de automatizar respuestas.',
    'El piloto se mide por citas confirmadas, seguimiento y tiempos de respuesta.',
  ];

  return (
    <>
      <Helmet>
        <title>CitaLink - Recupera citas perdidas con agentes de IA</title>
        <meta
          name="description"
          content="CitaLink ayuda a negocios que venden con cita previa a responder, cualificar, agendar y hacer seguimiento de leads por email, teléfono y WhatsApp."
        />
      </Helmet>

      <Header />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1648134859182-98df6e93ef58')] bg-cover bg-center opacity-5"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary mb-5">
                  <CheckCircle className="w-4 h-4" />
                  Auditoría de fuga de citas en 15 minutos
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Recupera las citas que hoy se pierden entre llamadas, WhatsApp y formularios
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-prose leading-relaxed">
                  En una auditoría breve detectamos si tu clínica pierde primeras visitas por respuesta tardía,
                  falta de seguimiento o agenda dispersa. Después proponemos un piloto de 30 días con revisión humana.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/demo">
                    <Button size="lg" className="w-full sm:w-auto">
                      Pedir auditoría de 15 minutos
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/producto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver cómo funciona
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-xl shadow-2xl p-4 md:p-6 border"
              >
                <DashboardMockup />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground">Empieza por medir la fuga</span>
              <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                El problema no es captar más. Es no perder lo que ya llega.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                CitaLink se diferencia atacando la fuga entre intención y cita confirmada, especialmente
                en clínicas con primeras valoraciones, WhatsApp, formularios y recepción saturada.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <problem.icon className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary mb-5">
                <Stethoscope className="w-4 h-4" />
                Diseñado para clínicas dentales y estéticas
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Si tienes primeras visitas, auditamos estas cuatro fugas
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La auditoría no pide datos clínicos. Miramos proceso, canales y métricas aproximadas para detectar
                dónde se rompe el tramo de solicitud a cita confirmada.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clinicLeaks.map((leak, index) => (
                <motion.div
                  key={leak.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <leak.icon className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">{leak.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{leak.description}</p>
                    </CardContent>
                  </Card>
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
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Una categoría más clara para comprar
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Los compradores no necesitan “IA” en abstracto. Necesitan dejar de perder citas, saber
                qué canal falla y tener un equipo que solo interviene cuando aporta valor.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <Shield className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary mb-5">
                  <ClipboardCheck className="w-4 h-4" />
                  Piloto fundador sin riesgo
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Primero diagnóstico. Después, un piloto pequeño y medible.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  El objetivo no es conectar todo tu stack de golpe. Empezamos por un solo flujo:
                  un canal, una agenda, una regla de seguimiento y una métrica de recuperación.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {auditSteps.map((step, index) => (
                    <div key={step.title} className="rounded-lg border bg-background p-4">
                      <div className="text-sm font-semibold text-primary mb-2">0{index + 1}</div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
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
                <Card>
                  <CardContent className="pt-6">
                    <Shield className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Guardrails desde la primera conversación</h3>
                    <div className="space-y-3">
                      {trustSignals.map((signal) => (
                        <div key={signal} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground leading-relaxed">{signal}</p>
                        </div>
                      ))}
                    </div>
                    <Link to="/demo" className="block mt-6">
                      <Button className="w-full">
                        Solicitar auditoría
                        <ArrowRight className="ml-2 w-4 h-4" />
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                De consulta a cita confirmada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Un flujo operativo para que marketing, recepción y ventas trabajen sobre la misma verdad.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Métricas que pasan a estar bajo control
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                La promesa comercial debe medirse con datos del embudo, no con una demo bonita.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm opacity-90">{metric.label}</div>
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
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Empieza con una auditoría de citas, no con una demo genérica
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Revisamos canales, tiempos de respuesta, agenda y seguimiento para estimar dónde se pierden
                oportunidades y qué automatizar primero.
              </p>
              <Link to="/demo">
                <Button size="lg">
                  Solicitar auditoría
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
