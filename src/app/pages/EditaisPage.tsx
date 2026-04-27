import { useState } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { FileText, ExternalLink, Calendar, Search } from 'lucide-react';

export function EditaisPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const editais = [
    {
      titulo: 'Edital de Matrícula 2026/1',
      data: '15/01/2026',
      descricao: 'Processo de matrícula para novos alunos do primeiro semestre de 2026',
      link: '#',
      status: 'Aberto',
    },
    {
      titulo: 'Edital de Transferência Interna',
      data: '20/01/2026',
      descricao: 'Processo seletivo para transferência entre cursos do campus',
      link: '#',
      status: 'Aberto',
    },
    {
      titulo: 'Edital de Monitoria',
      data: '10/02/2026',
      descricao: 'Seleção de monitores para disciplinas do semestre 2026/1',
      link: '#',
      status: 'Em breve',
    },
    {
      titulo: 'Edital PIBIC - Iniciação Científica',
      data: '01/03/2026',
      descricao: 'Programa Institucional de Bolsas de Iniciação Científica',
      link: '#',
      status: 'Em breve',
    },
    {
      titulo: 'Edital de Estágio Obrigatório',
      data: '25/01/2026',
      descricao: 'Processo de validação de estágios obrigatórios',
      link: '#',
      status: 'Aberto',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Em breve':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Encerrado':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const statusOptions = ['Todos', 'Aberto', 'Em breve', 'Encerrado'];

  const filteredEditais = editais.filter((edital) => {
    const matchesFilter = selectedFilter === 'Todos' || edital.status === selectedFilter;
    const matchesSearch = edital.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          edital.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar edital..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {statusOptions.map((status) => (
              <FilterButton
                key={status}
                label={status}
                active={selectedFilter === status}
                onClick={() => setSelectedFilter(status)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredEditais.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum edital encontrado</p>
            </div>
          ) : (
            filteredEditais.map((edital, index) => (
          <Card key={index}>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1">
                  <FileText className="text-[#2E7D32] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="mb-1">{edital.titulo}</h3>
                    <p className="text-sm text-gray-600">{edital.descricao}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(edital.status)}`}>
                  {edital.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{edital.data}</span>
                </div>
                <button
                  onClick={() => window.open(edital.link, '_blank')}
                  className="flex items-center gap-1 text-[#2E7D32] hover:text-[#25692a] transition-colors text-sm"
                >
                  Ver edital
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
