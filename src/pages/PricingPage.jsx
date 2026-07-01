
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PricingCard from '@/components/PricingCard.jsx';
import { createStripeCheckoutSession } from '@/lib/citalinkApi.js';

const PricingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '29€',
      description: 'Para equipos que empiezan con automatización',
      features: [
        '1 usuario',
        '1 calendario conectado',
        '300 leads/mes',
        'Email AI Agent',
        'Plantillas básicas',
        'Soporte por email',
      ],
      highlighted: false,
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '79€',
      description: 'Para equipos comerciales en crecimiento',
      features: [
        '5 usuarios',
        '3 calendarios conectados',
        '1.500 leads/mes',
        'Email + Phone AI Agents',
        'Analítica avanzada',
        'Integraciones CRM',
        'Soporte prioritario',
      ],
      highlighted: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '179€',
      description: 'Para organizaciones con alto volumen',
      features: [
        'Usuarios ilimitados',
        'Calendarios ilimitados',
        'Leads ilimitados',
        'Todos los agentes IA',
        'Agentes personalizados',
        'Integraciones custom',
        'Soporte dedicado 24/7',
        'Onboarding personalizado',
      ],
      highlighted: false,
    },
  ];

  const handleCheckout = async (plan) => {
    try {
      setLoading(plan.id);
      const { url } = await createStripeCheckoutSession(plan.id);
      window.location.assign(url);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Ocurrió un error al iniciar el pago.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Precios - CitaLink</title>
        <meta
          name="description"
          content="Planes de precios para CitaLink: Starter (29€/mes), Growth (79€/mes), Pro (179€/mes). Incluye setup desde 99€."
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
                Precios transparentes
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Compra directa con Stripe. Si prefieres hablar primero, puedes pedir una demo antes de pagar.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PricingCard
                    name={plan.name}
                    price={plan.price}
                    description={plan.description}
                    features={plan.features}
                    highlighted={plan.highlighted}
                    loading={loading === plan.id}
                    onCTA={() => handleCheckout(plan)}
                    secondaryLabel="Hablar antes de comprar"
                    onSecondaryCTA={() => navigate('/demo')}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-muted/50 border rounded-2xl p-8 text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Setup y configuración inicial recomendada
              </p>
              <p className="text-2xl font-bold mb-4">Desde 99€</p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Incluye configuración de agentes, integración con tu CRM, importación de leads históricos 
                y formación del equipo. Pago único.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PricingPage;
