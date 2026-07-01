import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AgentCard from '@/components/AgentCard.jsx';
import { agentVisuals } from '@/lib/agentVisuals.js';

const agents = [
  {
    id: 'email-sdr',
    name: 'Email SDR Agent',
    channel: 'Email',
    objective: 'Redacta emails de prospección y seguimiento con revisión humana opcional.',
    conversionRate: '23.4%',
    status: 'Listo',
    visual: agentVisuals.email,
    flow: ['Clasifica intención', 'Redacta respuesta', 'Crea acción pendiente'],
    setup: 'Conecta SMTP, tono de marca, objeciones frecuentes y reglas de aprobación.',
  },
  {
    id: 'phone-sdr',
    name: 'Phone SDR Agent',
    channel: 'Teléfono',
    objective: 'Prepara guiones, registra conversaciones y programa próximos pasos.',
    conversionRate: '31.2%',
    status: 'Twilio',
    visual: agentVisuals.phone,
    flow: ['Valida base legal', 'Llama en horario', 'Registra resultado'],
    setup: 'Usa Twilio, lista de no contactar, objetivo de llamada y handoff humano.',
  },
  {
    id: 'qualifier',
    name: 'Qualifier Agent',
    channel: 'Multicanal',
    objective: 'Puntúa leads según sector, urgencia, presupuesto e intención de compra.',
    conversionRate: '47.8%',
    status: 'Scoring',
    visual: agentVisuals.qualifier,
    flow: ['Lee señales', 'Asigna prioridad', 'Propone siguiente acción'],
    setup: 'Define ICP, campos obligatorios, umbrales y estados comerciales.',
  },
  {
    id: 'scheduler',
    name: 'Scheduler Agent',
    channel: 'Email + WhatsApp',
    objective: 'Propone horarios disponibles, confirma citas y envía recordatorios.',
    conversionRate: '68.5%',
    status: 'Agenda',
    visual: agentVisuals.scheduler,
    flow: ['Consulta disponibilidad', 'Propone franjas', 'Confirma cita'],
    setup: 'Conecta calendarios, duración de citas, ventanas horarias y recordatorios.',
  },
  {
    id: 'compliance',
    name: 'Compliance Agent',
    channel: 'Sistema',
    objective: 'Gestiona exclusiones, bajas, consentimientos y registro de no contactar.',
    conversionRate: '100%',
    status: 'Control',
    visual: agentVisuals.compliance,
    flow: ['Detecta baja', 'Bloquea campañas', 'Audita trazabilidad'],
    setup: 'Sincroniza doNotContact, consentimientos, base legal y acciones bloqueadas.',
  },
];

const AgentsPage = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  const previewAgent = (agent) => {
    setSelectedAgent(agent);
    window.requestAnimationFrame(() => {
      document.getElementById('agent-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const configureAgent = (agent) => {
    navigate(`/demo?agent=${agent.id}`);
  };

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Agentes de IA configurables
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Asistentes especializados que automatizan tareas comerciales repetitivas con supervisión humana.
                Cada agente se configura según tu tono, horarios y objetivos.
              </p>
              <div className="inline-block rounded-lg border border-white/10 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                Diseñado para flujos B2B con supervisión, trazabilidad y respeto a bajas y preferencias de contacto.
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
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
                    visual={agent.visual}
                    status={agent.status}
                    onPreview={() => previewAgent(agent)}
                    onConfigure={() => configureAgent(agent)}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              id="agent-detail"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 rounded-lg border border-white/10 bg-card/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] lg:grid-cols-[0.9fr_1.1fr]"
            >
              <img
                src={selectedAgent.visual}
                alt={`${selectedAgent.name} en operación`}
                className="aspect-[16/9] w-full rounded-lg border border-white/10 object-cover"
              />
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="secondary" className="border-white/10">
                    {selectedAgent.channel}
                  </Badge>
                  <span className="text-sm text-primary">{selectedAgent.status}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{selectedAgent.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{selectedAgent.setup}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {selectedAgent.flow.map((step, index) => (
                    <div key={step} className="rounded-lg border border-white/10 bg-muted/40 p-4">
                      <span className="text-xs font-semibold text-primary">0{index + 1}</span>
                      <p className="mt-2 text-sm font-medium">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={() => configureAgent(selectedAgent)}>
                    Activar piloto
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/precios')}>
                    Ver precios
                  </Button>
                </div>
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
