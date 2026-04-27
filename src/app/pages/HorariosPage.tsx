import { useState } from 'react';
import { Card } from '../components/Card';
import { Clock, Calendar, Download, FileText } from 'lucide-react';

export function HorariosPage() {
  const [activeTab, setActiveTab] = useState<'horarios' | 'calendario'>('horarios');

  const handleDownloadPDF = (tipo: 'horarios' | 'calendario') => {
    alert(`Download do PDF de ${tipo === 'horarios' ? 'Horários' : 'Calendário Acadêmico'} será disponibilizado pelo campus.`);
  };

  const handleViewPDF = (tipo: 'horarios' | 'calendario') => {
    alert(`Visualização do PDF de ${tipo === 'horarios' ? 'Horários' : 'Calendário Acadêmico'} será disponibilizada pelo campus.`);
  };

  const horarios = [
    { periodo: '1º Horário', inicio: '07:00', fim: '07:50' },
    { periodo: '2º Horário', inicio: '07:50', fim: '08:40' },
    { periodo: '3º Horário', inicio: '08:40', fim: '09:30' },
    { periodo: 'Intervalo', inicio: '09:30', fim: '09:50' },
    { periodo: '4º Horário', inicio: '09:50', fim: '10:40' },
    { periodo: '5º Horário', inicio: '10:40', fim: '11:30' },
    { periodo: '6º Horário', inicio: '11:30', fim: '12:20' },
  ];

  const calendario = [
    { evento: 'Início do ano letivo', data: '05/02/2026' },
    { evento: 'Carnaval (recesso)', data: '16/02/2026 - 18/02/2026' },
    { evento: 'Semana de Avaliações - 1º Bimestre', data: '08/04/2026 - 12/04/2026' },
    { evento: 'Páscoa (feriado)', data: '17/04/2026' },
    { evento: 'Dia do Trabalho (feriado)', data: '01/05/2026' },
    { evento: 'Semana de Avaliações - 2º Bimestre', data: '17/06/2026 - 21/06/2026' },
    { evento: 'Férias (meio do ano)', data: '01/07/2026 - 31/07/2026' },
    { evento: 'Retorno das aulas', data: '03/08/2026' },
    { evento: 'Independência (feriado)', data: '07/09/2026' },
    { evento: 'Semana de Avaliações - 3º Bimestre', data: '30/09/2026 - 04/10/2026' },
    { evento: 'Nossa Senhora Aparecida (feriado)', data: '12/10/2026' },
    { evento: 'Finados (feriado)', data: '02/11/2026' },
    { evento: 'Proclamação da República (feriado)', data: '15/11/2026' },
    { evento: 'Semana de Avaliações - 4º Bimestre', data: '02/12/2026 - 06/12/2026' },
    { evento: 'Encerramento do ano letivo', data: '18/12/2026' },
  ];

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('horarios')}
            className={`flex-1 py-3 rounded-lg transition-colors ${
              activeTab === 'horarios'
                ? 'bg-[#2E7D32] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock size={20} className="inline mr-2" />
            Horários
          </button>
          <button
            onClick={() => setActiveTab('calendario')}
            className={`flex-1 py-3 rounded-lg transition-colors ${
              activeTab === 'calendario'
                ? 'bg-[#2E7D32] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar size={20} className="inline mr-2" />
            Calendário
          </button>
        </div>

        {activeTab === 'horarios' ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => handleViewPDF('horarios')}
                className="flex-1 bg-white border border-[#2E7D32] text-[#2E7D32] py-3 rounded-lg hover:bg-[#2E7D32]/5 transition-colors flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                Ver PDF
              </button>
              <button
                onClick={() => handleDownloadPDF('horarios')}
                className="flex-1 bg-[#2E7D32] text-white py-3 rounded-lg hover:bg-[#25692a] transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Baixar PDF
              </button>
            </div>

            <Card>
              <h3 className="mb-4">Horários de Aula</h3>
            <div className="space-y-2">
              {horarios.map((horario, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    horario.periodo === 'Intervalo'
                      ? 'bg-orange-50 border border-orange-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <span className={horario.periodo === 'Intervalo' ? 'text-orange-700' : ''}>
                    {horario.periodo}
                  </span>
                  <span className="text-gray-600">
                    {horario.inicio} - {horario.fim}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => handleViewPDF('calendario')}
                className="flex-1 bg-white border border-[#2E7D32] text-[#2E7D32] py-3 rounded-lg hover:bg-[#2E7D32]/5 transition-colors flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                Ver PDF
              </button>
              <button
                onClick={() => handleDownloadPDF('calendario')}
                className="flex-1 bg-[#2E7D32] text-white py-3 rounded-lg hover:bg-[#25692a] transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Baixar PDF
              </button>
            </div>

            <Card>
              <h3 className="mb-4">Calendário Acadêmico 2026</h3>
              <div className="space-y-3">
                {calendario.map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <span className="text-sm flex-1">{item.evento}</span>
                    <span className="text-sm text-gray-600 whitespace-nowrap">{item.data}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
