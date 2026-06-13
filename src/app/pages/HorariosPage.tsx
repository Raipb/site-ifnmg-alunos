import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Clock, Calendar, ExternalLink, FileText } from 'lucide-react';

interface Horario {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  link: string;
}

export function HorariosPage() {
  const [activeTab, setActiveTab] = useState<'horarios' | 'calendario'>('horarios');
  const [documentos, setDocumentos] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("${API_URL}/horarios")
      .then((res) => res.json())
      .then((data) => setDocumentos(data))
      .catch(() => setDocumentos([]))
      .finally(() => setLoading(false));
  }, []);

  const horariosDocs = documentos.filter((d) => d.tipo === "Horário de Aulas");
  const calendarioDocs = documentos.filter((d) => d.tipo === "Calendário Acadêmico");

  // Horários fixos de aula
  const horarios = [
    { periodo: '1º Horário', inicio: '07:00', fim: '07:50' },
    { periodo: '2º Horário', inicio: '07:50', fim: '08:40' },
    { periodo: '3º Horário', inicio: '08:40', fim: '09:30' },
    { periodo: 'Intervalo', inicio: '09:30', fim: '09:50' },
    { periodo: '4º Horário', inicio: '09:50', fim: '10:40' },
    { periodo: '5º Horário', inicio: '10:40', fim: '11:30' },
    { periodo: '6º Horário', inicio: '11:30', fim: '12:20' },
  ];

  // Links de horários por turma (Google Sheets)
  const horariosLinks = [
    {
      titulo: 'Horário — 1º Ano (Técnicos Integrados)',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4KzQ1DxmwWVB6mcc0gXZt3dgAMDvqoQshCZ2dDXUi-ewhHd2xFsA_4wdTkPSIsvvUNyCctoR-ECz3/pubhtml?gid=0&single=true',
    },
    {
      titulo: 'Horário — 2º Ano (Técnicos Integrados)',
      link: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vR4KzQ1DxmwWVB6mcc0gXZt3dgAMDvqoQshCZ2dDXUi-ewhHd2xFsA_4wdTkPSIsvvUNyCctoR-ECz3/pubhtml?gid=439128174&single=true',
    },
    {
      titulo: 'Horário — 3º Ano (Técnicos Integrados)',
      link: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vR4KzQ1DxmwWVB6mcc0gXZt3dgAMDvqoQshCZ2dDXUi-ewhHd2xFsA_4wdTkPSIsvvUNyCctoR-ECz3/pubhtml?gid=279987720&single=true',
    },
    {
      titulo: 'Horário — Cursos Superiores',
      link: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vR4KzQ1DxmwWVB6mcc0gXZt3dgAMDvqoQshCZ2dDXUi-ewhHd2xFsA_4wdTkPSIsvvUNyCctoR-ECz3/pubhtml?gid=1767104281&single=true',
    },
    {
      titulo: 'Horário — Cursos Subsequentes',
      link: 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vR4KzQ1DxmwWVB6mcc0gXZt3dgAMDvqoQshCZ2dDXUi-ewhHd2xFsA_4wdTkPSIsvvUNyCctoR-ECz3/pubhtml?gid=658191898&single=true',
    },
  ];

  // Calendários reais por modalidade
  const calendarios = [
    {
      titulo: 'Cursos Técnicos Integrados',
      cor: 'bg-green-100 text-green-700',
      eventos: [
        { data: '04/02', evento: 'Início do 1º Semestre' },
        { data: '16-18/02', evento: 'Carnaval — ponto facultativo' },
        { data: '03/04', evento: 'Paixão de Cristo' },
        { data: '21/04', evento: 'Tiradentes' },
        { data: '01/05', evento: 'Dia do Trabalhador' },
        { data: '04-05/06', evento: 'Corpus Christi — ponto facultativo' },
        { data: '24/06', evento: 'Feriado Municipal — São João' },
        { data: '03/07', evento: 'Término do 1º Semestre' },
        { data: '06-07/07', evento: 'Recuperação Parcial 1º Sem.' },
        { data: '13-27/07', evento: 'Férias Escolares' },
        { data: '28/07', evento: 'Início do 2º Semestre' },
        { data: '07/09', evento: 'Independência do Brasil' },
        { data: '12/10', evento: 'Nossa Senhora Aparecida' },
        { data: '13-16/10', evento: 'Férias Escolares' },
        { data: '02/11', evento: 'Finados' },
        { data: '15/11', evento: 'Proclamação da República' },
        { data: '20/11', evento: 'Consciência Negra' },
        { data: '18/12', evento: 'Término do Ano Letivo / Formatura' },
        { data: '25/12', evento: 'Natal' },
      ],
    },
    {
      titulo: 'Cursos Superiores (Graduação)',
      cor: 'bg-blue-100 text-blue-700',
      eventos: [
        { data: '04/02', evento: 'Início do 1º Semestre' },
        { data: '16-18/02', evento: 'Carnaval — ponto facultativo' },
        { data: '03/04', evento: 'Paixão de Cristo' },
        { data: '21/04', evento: 'Tiradentes' },
        { data: '01/05', evento: 'Dia do Trabalhador' },
        { data: '04-05/06', evento: 'Corpus Christi — ponto facultativo' },
        { data: '24/06', evento: 'Feriado Municipal — São João' },
        { data: '03/07', evento: 'Término do 1º Semestre' },
        { data: '06-08/07', evento: 'Exames Finais 1º Semestre' },
        { data: '11-29/07', evento: 'Férias Acadêmicas' },
        { data: '28/07', evento: 'Início do 2º Semestre' },
        { data: '07/09', evento: 'Independência do Brasil' },
        { data: '12/10', evento: 'Nossa Senhora Aparecida' },
        { data: '13-16/10', evento: 'Férias Escolares' },
        { data: '02/11', evento: 'Finados' },
        { data: '15/11', evento: 'Proclamação da República' },
        { data: '20/11', evento: 'Consciência Negra' },
        { data: '18/12', evento: 'Término do 2º Semestre' },
        { data: '21-22/12', evento: 'Exames Finais 2º Semestre' },
        { data: '25/12', evento: 'Natal' },
      ],
    },
    {
      titulo: 'Cursos Técnicos Subsequentes',
      cor: 'bg-purple-100 text-purple-700',
      eventos: [
        { data: '04/02', evento: 'Início do 1º Semestre' },
        { data: '16-18/02', evento: 'Carnaval — ponto facultativo' },
        { data: '03/04', evento: 'Paixão de Cristo' },
        { data: '21/04', evento: 'Tiradentes' },
        { data: '01/05', evento: 'Dia do Trabalhador' },
        { data: '04-05/06', evento: 'Corpus Christi — ponto facultativo' },
        { data: '24/06', evento: 'Feriado Municipal — São João' },
        { data: '03/07', evento: 'Término do 1º Semestre' },
        { data: '06-07/07', evento: 'Recuperação Parcial 1º Sem.' },
        { data: '11-29/07', evento: 'Férias Escolares' },
        { data: '28/07', evento: 'Início do 2º Semestre' },
        { data: '07/09', evento: 'Independência do Brasil' },
        { data: '12/10', evento: 'Nossa Senhora Aparecida' },
        { data: '13-16/10', evento: 'Férias Escolares' },
        { data: '02/11', evento: 'Finados' },
        { data: '15/11', evento: 'Proclamação da República' },
        { data: '20/11', evento: 'Consciência Negra' },
        { data: '18/12', evento: 'Término do Ano Letivo / Formatura' },
        { data: '25/12', evento: 'Natal' },
      ],
    },
    {
      titulo: 'Agropecuária — Regime de Alternância',
      cor: 'bg-orange-100 text-orange-700',
      eventos: [
        { data: '04/02', evento: 'Início do Ano Letivo' },
        { data: '16-18/02', evento: 'Carnaval — ponto facultativo' },
        { data: '03/04', evento: 'Paixão de Cristo' },
        { data: '21/04', evento: 'Tiradentes' },
        { data: '01/05', evento: 'Dia do Trabalhador' },
        { data: '04-05/06', evento: 'Corpus Christi — ponto facultativo' },
        { data: '24/06', evento: 'Feriado Municipal — São João' },
        { data: '03/07', evento: 'Término do 1º Semestre' },
        { data: '13-27/07', evento: 'Férias Escolares' },
        { data: '28/07', evento: 'Início do 2º Semestre' },
        { data: '07/09', evento: 'Independência do Brasil' },
        { data: '12/10', evento: 'Nossa Senhora Aparecida' },
        { data: '13-16/10', evento: 'Férias Escolares' },
        { data: '02/11', evento: 'Finados' },
        { data: '15/11', evento: 'Proclamação da República' },
        { data: '20/11', evento: 'Consciência Negra' },
        { data: '18/12', evento: 'Término do Ano Letivo / Formatura' },
        { data: '25/12', evento: 'Natal' },
      ],
    },
  ];

  const [calendarioAberto, setCalendarioAberto] = useState<number | null>(0);

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('horarios')}
            className={`flex-1 py-3 rounded-lg transition-colors ${activeTab === 'horarios'
                ? 'bg-[#2E7D32] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <Clock size={20} className="inline mr-2" />
            Horários
          </button>
          <button
            onClick={() => setActiveTab('calendario')}
            className={`flex-1 py-3 rounded-lg transition-colors ${activeTab === 'calendario'
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
            {/* Documentos dinâmicos do backend */}
            {loading ? (
              <div className="text-center text-gray-400 py-4 text-sm">Carregando documentos...</div>
            ) : horariosDocs.length > 0 && (
              <div className="space-y-2">
                {horariosDocs.map((doc) => (
                  <Card key={doc.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText size={20} className="text-[#2E7D32]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{doc.titulo}</p>
                          <p className="text-sm text-gray-500">{doc.descricao}</p>
                        </div>
                      </div>
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#25692a] transition-colors text-sm flex-shrink-0 ml-4"
                      >
                        <ExternalLink size={16} />
                        Acessar
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Links fixos de horários por turma */}
            <Card>
              <h3 className="font-semibold text-gray-800 mb-3">Horários por Turma</h3>
              <div className="space-y-2">
                {horariosLinks.map((h, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{h.titulo}</span>
                    <a
                      href={h.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#2E7D32] text-sm font-medium hover:underline flex-shrink-0 ml-3"
                    >
                      <ExternalLink size={14} />
                      Ver
                    </a>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tabela de horários de aula */}
            <Card>
              <h3 className="font-semibold text-gray-800 mb-3">Horários de Aula</h3>
              <div className="space-y-2">
                {horarios.map((horario, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg ${horario.periodo === 'Intervalo'
                        ? 'bg-orange-50 border border-orange-200'
                        : 'bg-gray-50'
                      }`}
                  >
                    <span className={horario.periodo === 'Intervalo' ? 'text-orange-700' : ''}>
                      {horario.periodo}
                    </span>
                    <span className="text-gray-600">{horario.inicio} - {horario.fim}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Documentos dinâmicos do backend */}
            {loading ? (
              <div className="text-center text-gray-400 py-4 text-sm">Carregando documentos...</div>
            ) : calendarioDocs.length > 0 && (
              <div className="space-y-2">
                {calendarioDocs.map((doc) => (
                  <Card key={doc.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText size={20} className="text-[#2E7D32]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{doc.titulo}</p>
                          <p className="text-sm text-gray-500">{doc.descricao}</p>
                        </div>
                      </div>
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#25692a] transition-colors text-sm flex-shrink-0 ml-4"
                      >
                        <ExternalLink size={16} />
                        Acessar
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Calendários reais por modalidade — accordion */}
            <p className="text-sm text-gray-500 px-1">Calendário Acadêmico 2026 — selecione sua modalidade:</p>
            {calendarios.map((cal, index) => (
              <Card key={index}>
                <button
                  onClick={() => setCalendarioAberto(calendarioAberto === index ? null : index)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cal.cor}`}>
                      2026
                    </span>
                    <span className="font-semibold text-gray-800 text-left">{cal.titulo}</span>
                  </div>
                  <span className="text-gray-400 text-lg ml-2">
                    {calendarioAberto === index ? '▲' : '▼'}
                  </span>
                </button>

                {calendarioAberto === index && (
                  <div className="mt-3 space-y-2 border-t border-gray-50 pt-3">
                    {cal.eventos.map((item, i) => (
                      <div key={i} className="flex justify-between items-start gap-4 pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                        <span className="text-sm text-gray-500 whitespace-nowrap w-20 flex-shrink-0">{item.data}</span>
                        <span className="text-sm text-gray-700 flex-1">{item.evento}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}