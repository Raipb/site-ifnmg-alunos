import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#1B5E20] text-white mt-8 pb-16 md:pb-0">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white mb-3">Contato</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>(38) 3841-7200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>campus@ifnmg.edu.br</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Av. Dr. David Sette, 65<br />Santo Antônio, Salinas - MG</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-3">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="https://www.ifnmg.edu.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Portal IFNMG
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Moodle (AVA)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SUAP - Sistema Acadêmico
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Biblioteca Digital
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-3">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 text-center text-sm text-white/70">
          <p>© 2026 IFNMG - Instituto Federal do Norte de Minas Gerais</p>
          <p className="mt-1">Guia do Ingressante - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
