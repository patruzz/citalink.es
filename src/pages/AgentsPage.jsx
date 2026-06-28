
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AgentCard from '@/components/AgentCard.jsx';

const AgentsPage = () => {
  const agents = [
    {
      name: 'Email SDR Agent',
      channel: 'Email',
      objective: 'Redacta y envía emails de prospección y seguimiento con revisión humana opcional',
      conversionRate: '23.4%',
    },
    {
      name: 'Phone SDR Agent',
      channel: 'Teléfono',
      objective: 'Prepara guiones de llamada, registra conversaciones y programa próximos pasos',
      conversionRate: '31.2%',
    },
    {
      name: 'Qualifier Agent',
      channel: 'Multicanal',
      objective: 'Puntúa leads según sector, urgencia, presupuesto e intención de compra',
      conversionRate: '47.8%',
    },
    {
      name: 'Scheduler Agent',
      channel: 'Email + WhatsApp',
      objective: 'Propone slots disponibles, confirma citas y envía recordatorios automáticos',
      conversionRate: '68.5%',
    },
    {
      name: 'Compliance Agent',
      channel: 'Sistema',
      objective: 'Gestiona exclusiones, bajas, consentimientos y registro de no contactar',
      conversionRate: '100%',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Agentes IA - CitaLink</title>
        <meta
          name="description"
          content="Agentes de IA configurables y supervisados para prospección, cualificación, agendamiento y cumplimiento normativo en flujos comerciales B2B."
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
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Agentes de IA configurables
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Asistentes especializados que automatizan tareas comerciales repetitivas con supervisión humana. 
                Cada agente se configura según tu tono, horarios y objetivos.
              </p>
              <div className="inline-block bg-muted/50 border rounded-lg px-4 py-3 text-sm text-muted-foreground">
                Diseñado para flujos B2B con supervisión, trazabilidad y respeto a bajas y preferencias de contacto.
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {agents.map((agent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AgentCard
                    name={agent.name}
                    channel={agent.channel}
                    objective={agent.objective}
                    conversionRate={agent.conversionRate}
                    onConfigure={() => {}}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Configuración y supervisión</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Cada agente se personaliza con tu tono de comunicación, horarios de trabajo y objetivos específicos. 
                  Puedes activar o desactivar agentes según la campaña o el canal.
                </p>
                <p className="leading-relaxed">
                  Todas las interacciones quedan registradas para auditoría. Los agentes respetan automáticamente 
                  las bajas, exclusiones y preferencias de contacto de cada lead.
                </p>
                <p className="leading-relaxed">
                  La supervisión humana es opcional: puedes revisar mensajes antes de envío o dejar que los agentes 
                  operen de forma autónoma dentro de las reglas configuradas.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AgentsPage;
