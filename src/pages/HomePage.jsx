
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronDown, Mail, Phone, MessageSquare, Clock, CheckCircle, BarChart3, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DashboardMockup from '@/components/DashboardMockup.jsx';

const HomePage = () => {
  const problems = [
    { icon: Clock, title: 'Leads fríos sin respuesta', description: 'Contactos que se pierden por falta de seguimiento inmediato' },
    { icon: Phone, title: 'Llamadas perdidas', description: 'Oportunidades que se escapan fuera del horario comercial' },
    { icon: Mail, title: 'Seguimiento manual', description: 'Tiempo perdido en tareas repetitivas de cualificación' },
    { icon: BarChart3, title: 'Agendas desorganizadas', description: 'Citas sin confirmar y reprogramaciones constantes' },
  ];

  const process = [
    { step: '01', title: 'Captura de leads', description: 'Recibe contactos desde email, teléfono, WhatsApp o formularios web' },
    { step: '02', title: 'Respuesta automática', description: 'El agente de IA responde en menos de 1 minuto con mensaje personalizado' },
    { step: '03', title: 'Cualificación inteligente', description: 'Evalúa sector, urgencia, presupuesto e intención de compra' },
    { step: '04', title: 'Propuesta de cita', description: 'Ofrece slots disponibles según tu calendario conectado' },
    { step: '05', title: 'Confirmación y recordatorios', description: 'Envía confirmaciones y recordatorios automáticos' },
    { step: '06', title: 'Registro y trazabilidad', description: 'Toda la conversación queda registrada para tu equipo comercial' },
  ];

  const metrics = [
    { value: '<1 min', label: 'Tiempo de respuesta medio' },
    { value: '+47%', label: 'Más citas confirmadas' },
    { value: '-68%', label: 'Menos tareas manuales' },
    { value: '100%', label: 'Trazabilidad comercial' },
  ];

  return (
    <>
      <Helmet>
        <title>CitaLink - Agentes de IA que convierten contactos en citas confirmadas</title>
        <meta
          name="description"
          content="Plataforma SaaS B2B de gestión de leads y citas con agentes de IA. Automatiza respuestas, cualifica leads y agenda citas por email, teléfono y WhatsApp."
        />
      </Helmet>

      <Header />

      <main>
        <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-background via-background to-muted/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1648134859182-98df6e93ef58')] bg-cover bg-center opacity-5"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                  CitaLink
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-snug">
                  Agentes de IA que convierten contactos en citas confirmadas
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-prose leading-relaxed">
                  Automatiza la respuesta, cualificación y agendamiento de leads por email, teléfono y WhatsApp. 
                  Tu equipo comercial se enfoca en cerrar, no en perseguir contactos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/demo">
                    <Button size="lg" className="w-full sm:w-auto">
                      Pedir demo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/producto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver producto
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-2xl shadow-2xl p-6 border"
              >
                <DashboardMockup />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground">Descubre cómo funciona</span>
              <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Los problemas que resolvemos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Equipos comerciales B2B pierden oportunidades cada día por procesos manuales
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
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

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Cómo funciona CitaLink
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flujo automatizado de lead a cita confirmada
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Resultados esperados
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Métricas reales de equipos comerciales que usan CitaLink
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Empieza a convertir más leads en citas
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Solicita una demo personalizada y te mostramos cómo CitaLink se adapta a tu flujo comercial
              </p>
              <Link to="/demo">
                <Button size="lg">
                  Solicitar demo gratuita
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
