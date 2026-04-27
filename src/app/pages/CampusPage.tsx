import { Card } from '../components/Card';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

export function CampusPage() {
  const campusInfo = {
    endereco: 'Rodovia BR 367, Km 07, s/n - Zona Rural, Almenara - MG, 39900-000',
    horario: 'Segunda a Sexta: 7h às 22h30',
    mapsUrl: 'https://maps.app.goo.gl/iCygVeheDzCg24YN7',
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <Card>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="text-[#2E7D32] flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="mb-2">Endereço</h3>
              <p className="text-gray-700">{campusInfo.endereco}</p>
            </div>
          </div>

          <button
            onClick={() => window.open(campusInfo.mapsUrl, '_blank')}
            className="w-full mt-4 bg-[#2E7D32] text-white py-3 rounded-lg hover:bg-[#25692a] transition-colors flex items-center justify-center gap-2"
          >
            <MapPin size={20} />
            Abrir no Google Maps
            <ExternalLink size={16} />
          </button>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <Clock className="text-[#2E7D32] flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="mb-3">Horário de Funcionamento</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Segunda a Sexta</span>
                  <span className="text-gray-900">7h às 22h30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sábabo e Domingo</span>
                  <span className="text-gray-900">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3">Mapa do Campus</h3>

          <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.7017262556496!2d-40.743318099999996!3d-16.229171499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x74bd828dfcfa4e7%3A0xc3c01777194ad93!2sIFNMG%20-%20Campus%20Almenara!5e1!3m2!1spt-BR!2sbr!4v1777312465156!5m2!1spt-BR!2sbr"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3">Como Chegar</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>De ônibus:</strong> Linhas que passam próximo ao campus
            </p>
            <p>
              <strong>De carro:</strong> Estacionamento disponível para alunos e visitantes
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
