
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Stethoscope, Smile, Home, Briefcase, Wrench, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SectorCard from '@/components/SectorCard.jsx';

const SectorsPage = () => {
  const sectors = [
    {
      name: 'Clínicas privadas',
      icon: Stethoscope,
      useCase: 'Gestión de primeras consultas y citas de seguimiento con recordatorios automáticos',
      expectedResult: 'Reducción del 42% en ausencias y mejor ocupación de agenda médica',
    },
    {
      name: 'Dental y estética',
      icon: Smile,
      useCase: 'Cualificación de leads desde web y redes sociales, agendamiento de valoraciones',
      expectedResult: 'Conversión del 38% de consultas web en citas confirmadas',
    },
    {
      name: 'Inmobiliarias',
      icon: Home,
      useCase: 'Respuesta inmediata a solicitudes de visita, coordinación de agendas de agentes',
      expectedResult: 'Tiempo de respuesta <2 minutos, +31% más visitas agendadas',
    },
    {
      name: 'Despachos profesionales',
      icon: Briefcase,
      useCase: 'Filtrado de consultas iniciales, agendamiento de reuniones con abogados o asesores',
      expectedResult: 'Ahorro de 12 horas semanales en gestión administrativa',
    },
    {
      name: 'Servicios técnicos',
      icon: Wrench,
      useCase: 'Clasificación de urgencias, asignación de técnicos y confirmación de intervenciones',
      expectedResult: 'Mejor planificación de rutas y reducción de desplazamientos vacíos',
    },
    {
      name: 'Consultorías B2B',
      icon: Users,
      useCase: 'Cualificación de leads corporativos, agendamiento de demos y propuestas comerciales',
      expectedResult: 'Pipeline más limpio y +27% de conversión en reuniones comerciales',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sectores - CitaLink</title>
        <meta
          name="description"
          content="Soluciones de gestión de leads y citas para clínicas, dental, inmobiliarias, despachos profesionales, servicios técnicos y consultorías B2B."
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
                Sectores que confían en CitaLink
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Plantillas y flujos preconfigurados para verticales B2B con alta demanda de agendamiento
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SectorCard
                    name={sector.name}
                    useCase={sector.useCase}
                    expectedResult={sector.expectedResult}
                    icon={sector.icon}
                  />
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

export default SectorsPage;
