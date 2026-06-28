
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <span>CitaLink</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Agentes de IA que convierten contactos en citas confirmadas para equipos comerciales B2B.
            </p>
          </div>

          <div>
            <span className="font-semibold text-sm mb-4 block">Legal</span>
            <div className="flex flex-col gap-2">
              <Link to="/privacidad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link to="/terminos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Términos
              </Link>
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm mb-4 block">Contacto</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:hola@citalink.es" className="hover:text-foreground transition-colors">
                hola@citalink.es
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CitaLink. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
