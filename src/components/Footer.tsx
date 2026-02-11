import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold text-gradient-gold">
                ESSENCE
              </span>
              <span className="font-display text-2xl font-light text-foreground">
                Arabe
              </span>
            </Link>
            <p className="text-muted-foreground font-body text-sm max-w-sm">
              Perfumes árabes de alta fixação inspirados nas melhores fragrâncias 
              de nicho do mundo. Luxo acessível para quem entende de perfumaria.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {["Início", "Perfumes", "Sobre", "Contato"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Informações
            </h4>
            <ul className="space-y-2">
              {["Política de Envio", "Trocas e Devoluções", "Privacidade", "Termos de Uso"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-body">
            © 2024 Essence Arabe. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm font-body">
              Pagamento seguro
            </span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-[8px] font-bold">
                PIX
              </div>
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-[8px] font-bold">
                VISA
              </div>
              <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-[8px] font-bold">
                MC
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
