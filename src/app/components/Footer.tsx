import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-900 text-white mt-10 pb-16 md:pb-0">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CONTATO */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>

            <div className="space-y-3 text-sm text-white/80">

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>Direção Geral <br />(38) 3218-8392 | (33) 9 9928-7566</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>Secretaria <br />(38) 3218-7386</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>comunicacao.almenara@ifnmg.edu.br</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>
                  Rodovia BR 367, km 07    <br />
                  S/N Zona Rural, Almenara <br /> 
                  CEP. 39900-000       <br /> 
                </span>
              </div>

            </div>
          </div>

          {/* LINKS ÚTEIS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>

            <ul className="space-y-3 text-sm text-white/80">

              <li>
                <a
                  href="https://www.ifnmg.edu.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Portal IFNMG
                </a>
              </li>

              <li>
                <a
                  href="https://virtual1.ifnmg.edu.br/login/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Moodle (Virtual1)
                </a>
              </li>

              <li>
                <a
                  href="https://www.ifnmg.edu.br/calendario-alm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Calendário Acadêmico
                </a>
              </li>

            </ul>
          </div>

          {/* REDES SOCIAIS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/IFNMGoficial"
                target="_blank"
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition transform hover:scale-105"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/almenara_ifnmg/?hl=pt-br"
                target="_blank"
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition transform hover:scale-105"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/@almenara_ifnmg"
                target="_blank"
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition transform hover:scale-105"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>

            </div>
          </div>

        </div>

        {/* RODAPÉ FINAL */}
        <div className="border-t border-white/20 pt-4 text-center text-sm text-white/70">
          <p>© 2026 IFNMG - Campus Almenara</p>
          <p className="mt-1">Guia do Ingressante - Todos os direitos reservados</p>
        </div>

      </div>
    </footer>
  );
}