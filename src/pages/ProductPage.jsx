
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Inbox, Calendar, Repeat, MessageSquare, FileText, BarChart3, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const ProductPage = () => {
  const modules = [
    {
      icon: Inbox,
      title: 'Bandeja de leads',
      description: 'Centraliza todos los contactos desde email, teléfono, WhatsApp y formularios web en una única vista.',
    },
    {
      icon: Calendar,
      title: 'Calendario conectado',
      description: 'Sincroniza tu agenda para que los agentes propongan slots reales y eviten solapamientos.',
    },
    {
      icon: Repeat,
      title: 'Seguimientos automáticos',
      description: 'Programa recordatorios y reenvíos inteligentes sin intervención manual.',
    },
    {
      icon: MessageSquare,
      title: 'Conversaciones multicanal',
      description: 'Gestiona email, llamadas y mensajes desde una interfaz unificada con historial completo.',
    },
    {
      icon: FileText,
      title: 'Plantillas por sector',
      description: 'Mensajes preconfigurados para clínicas, inmobiliarias, despachos y otros verticales B2B.',
    },
    {
      icon: BarChart3,
      title: 'Analítica comercial',
      description: 'Dashboards con métricas de conversión, tiempos de respuesta y rendimiento por agente.',
    },
    {
      icon: Shield,
      title: 'Registro de consentimiento',
      description: 'Control de bajas, opt-outs y preferencias de contacto con auditoría completa.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Producto - CitaLink</title>
        <meta
          name="description"
          content="Plataforma SaaS de gestión de leads y citas con módulos de bandeja unificada, calendario conectado, seguimientos automáticos y analítica comercial."
        />
      </Helmet>

      <Header />

      <main>
        <section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Plataforma completa de gestión comercial
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CitaLink es un SaaS B2B que centraliza la captura, cualificación y agendamiento de leads. 
                Diseñado para equipos comerciales que necesitan trazabilidad, automatización y control.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl shadow-xl p-8 border mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-muted/50 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                      Navegación
                    </div>
                    <div className="space-y-1">
                      <div className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                        Leads
                      </div>
                      <div className="px-3 py-2 text-sm text-muted-foreground">Citas</div>
                      <div className="px-3 py-2 text-sm text-muted-foreground">Agentes</div>
                      <div className="px-3 py-2 text-sm text-muted-foreground">Campañas</div>
                      <div className="px-3 py-2 text-sm text-muted-foreground">Analítica</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Leads activos</h3>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-muted rounded-md text-xs">Filtrar</div>
                        <div className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs">
                          + Nuevo lead
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground">
                        <div>Nombre</div>
                        <div>Estado</div>
                        <div>Score</div>
                        <div>Acción</div>
                      </div>
                      <div className="divide-y">
                        {['Maya Chen', 'Raj Patel', 'Lucia Torres'].map((name, i) => (
                          <div key={i} className="px-4 py-3 grid grid-cols-4 gap-4 items-center text-sm">
                            <div className="font-medium">{name}</div>
                            <div>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                Qualified
                              </span>
                            </div>
                            <div className="font-semibold">{87 - i * 5}</div>
                            <div className="text-primary text-xs">Ver detalles →</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                      <div className="text-sm font-medium mb-1">Conversación activa</div>
                      <div className="text-xs text-muted-foreground">
                        El agente Email SDR está cualificando a Maya Chen...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <module.icon className="w-8 h-8 text-primary mb-3" />
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductPage;
