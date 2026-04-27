import { Card } from '../components/Card';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

export function CampusPage() {
  const campusInfo = {
    endereco: 'Av. Dr. David Sette, 65 - Santo Antônio, Salinas - MG, 39560-000',
    horario: 'Segunda a Sexta: 7h às 22h',
    horarioSabado: 'Sábado: 7h às 12h',
    mapsUrl: 'https://maps.google.com/?q=IFNMG+Campus+Salinas',
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
                  <span className="text-gray-900">7h às 22h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sábado</span>
                  <span className="text-gray-900">7h às 12h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Domingo</span>
                  <span className="text-gray-900">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3">Mapa do Campus</h3>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
              <p>Visualização do mapa</p>
              <p className="text-sm mt-1">Clique no botão acima para ver no Google Maps</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3">Como Chegar</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>De ônibus:</strong> Linhas que passam próximo ao campus: Linha Centro, Linha Bairro Santo Antônio
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
