import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  social: [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Heleno <span className="text-secondary">Alves</span>
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Seu parceiro de confiança para encontrar o imóvel dos sonhos em
              Balneário Camboriú. Experiência, qualidade e atendimento
              personalizado.
            </p>
          </div>


          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                <span>Balneário Camboriú, SC</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0 text-secondary" />
                <a
                  href="tel:+5547999999999"
                  className="hover:text-secondary transition-colors"
                >
                  (47) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0 text-secondary" />
                <a
                  href="mailto:contato@bcimoveis.com.br"
                  className="hover:text-secondary transition-colors"
                >
                  contato@bcimoveis.com.br
                </a>
              </li>
            </ul>

            {/* Redes Sociais */}
            <div className="flex gap-3 mt-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Heleno Alves. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
