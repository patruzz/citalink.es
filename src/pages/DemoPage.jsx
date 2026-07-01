
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck, CheckCircle, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DemoFormSection from '@/components/DemoFormSection.jsx';

const DemoPage = () => {
  const demoIncludes = [
    'Mapa rápido de llamadas, WhatsApp, formularios y agenda',
    '5 fugas probables entre solicitud y cita confirmada',
    'Hipótesis de citas recuperables con métricas agregadas',
    'Primer flujo piloto con revisión humana',
    'Siguiente paso claro si hay oportunidad real',
  ];

  const trustItems = [
    'No pedimos datos de pacientes en esta primera auditoría.',
    'No necesitamos acceso a CRM, agenda ni WhatsApp Business para diagnosticar.',
    'La primera conversación se centra en proceso, tiempos y volumen aproximado.',
  ];

  return (
    <>
      <Helmet>
        <title>Auditoría de fuga de citas - CitaLink</title>
        <meta
          name="description"
          content="Solicita una auditoría de 15 minutos con CitaLink. Revisamos llamadas, WhatsApp, formularios y seguimiento para detectar citas perdidas sin pedir datos de pacientes."
        />
      </Helmet>

      <Header />

      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Solicita una auditoría de fuga de citas
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En 15 minutos revisamos dónde se pierden primeras visitas entre llamadas, WhatsApp,
                formularios y seguimiento manual. Si no vemos oportunidad clara, te llevas igualmente
                el diagnóstico.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <DemoFormSection />
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="sticky top-24">
                    <CardContent className="pt-6">
                      <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary mb-5">
                        <CalendarCheck className="w-4 h-4" />
                        15 minutos
                      </div>
                      <h3 className="font-semibold text-lg mb-4">Qué incluye la auditoría</h3>
                      <ul className="space-y-3">
                        {demoIncludes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-6 border-t">
                        <p className="text-xs text-muted-foreground">
                          Tiempo estimado: 15 minutos
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Te contactaremos en menos de 24 horas laborables
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold">Guardrails</h4>
                        </div>
                        <ul className="space-y-2">
                          {trustItems.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DemoPage;
