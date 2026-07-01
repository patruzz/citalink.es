
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DemoFormSection from '@/components/DemoFormSection.jsx';

const DemoPage = () => {
  const demoIncludes = [
    'Mapa de canales donde entran tus consultas',
    'Estimación de citas perdidas por respuesta tardía',
    'Revisión de agenda, recordatorios y reprogramaciones',
    'Primer flujo automatizable con menor riesgo',
    'Plan de activación en fases para tu equipo',
  ];

  return (
    <>
      <Helmet>
        <title>Auditoría de citas - CitaLink</title>
        <meta
          name="description"
          content="Solicita una auditoría de citas con CitaLink. Revisamos canales, tiempos de respuesta, agenda y seguimiento para detectar oportunidades perdidas."
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Solicita una auditoría de citas
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Completa el formulario y revisaremos contigo dónde se pierden consultas, qué parte del
                seguimiento conviene automatizar primero y cómo CitaLink puede convertir más intención
                en citas confirmadas.
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
                          Tiempo estimado: 30-45 minutos
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Te contactaremos en menos de 24 horas laborables
                        </p>
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
