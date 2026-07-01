
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Términos de servicio - CitaLink</title>
        <meta name="description" content="Términos de servicio de CitaLink. Documento en revisión legal." />
      </Helmet>

      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6">
              Términos de servicio
            </h1>

            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-muted-foreground mb-4">
                    Última actualización: {new Date().toLocaleDateString('es-ES')}
                  </p>

                  <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-lg mb-6">
                    <p className="text-sm font-medium">
                      Este documento se encuentra en revisión legal. La versión definitiva estará disponible próximamente.
                    </p>
                  </div>

                  <h2 className="text-xl font-semibold mb-3">Información provisional</h2>
                  <p className="text-muted-foreground mb-4">
                    Al utilizar CitaLink, aceptas estos términos de servicio y te comprometes a usar la plataforma 
                    de forma responsable y conforme a la legislación vigente.
                  </p>

                  <h2 className="text-xl font-semibold mb-3">Uso del servicio</h2>
                  <p className="text-muted-foreground mb-4">
                    CitaLink es una plataforma SaaS B2B para la gestión de leads y citas comerciales. El usuario 
                    es responsable del uso que haga de los agentes de IA y del cumplimiento de la normativa de 
                    protección de datos.
                  </p>

                  <h2 className="text-xl font-semibold mb-3">Responsabilidades</h2>
                  <p className="text-muted-foreground mb-4">
                    El usuario debe respetar las preferencias de contacto de los leads, gestionar correctamente 
                    las bajas y exclusiones, y supervisar las comunicaciones automatizadas.
                  </p>

                  <h2 className="text-xl font-semibold mb-3">Contacto</h2>
                  <p className="text-muted-foreground">
                    Para consultas legales: <a href="mailto:hola@citalink.es" className="text-primary hover:underline">hola@citalink.es</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsPage;
