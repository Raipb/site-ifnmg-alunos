import { useState } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { Wallet, ExternalLink, DollarSign, Users, Search } from 'lucide-react';

export function BolsasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const bolsas = [
    {
      nome: 'Auxílio Alimentação',
      descricao: 'Auxílio financeiro para refeições no campus',
      valor: 'R$ 300,00/mês',
      requisitos: 'Comprovação de baixa renda familiar',
      tipo: 'Assistência',
    },
    {
      nome: 'Auxílio Transporte',
      descricao: 'Suporte para despesas com deslocamento',
      valor: 'R$ 150,00/mês',
      requisitos: 'Residir a mais de 2km do campus',
      tipo: 'Assistência',
    },
    {
      nome: 'Bolsa de Monitoria',
      descricao: 'Acompanhamento de disciplinas e auxílio a estudantes',
      valor: 'R$ 400,00/mês',
      requisitos: 'Média acima de 7.0 na disciplina',
      tipo: 'Acadêmica',
    },
    {
      nome: 'Bolsa PIBIC',
      descricao: 'Programa de Iniciação Científica',
      valor: 'R$ 700,00/mês',
      requisitos: 'Aprovação em edital de pesquisa',
      tipo: 'Pesquisa',
    },
    {
      nome: 'Bolsa de Extensão',
      descricao: 'Participação em projetos de extensão',
      valor: 'R$ 400,00/mês',
      requisitos: 'Seleção em projeto de extensão',
      tipo: 'Extensão',
    },
    {
      nome: 'Auxílio Permanência',
      descricao: 'Apoio financeiro para manutenção no curso',
      valor: 'R$ 500,00/mês',
      requisitos: 'Vulnerabilidade socioeconômica comprovada',
      tipo: 'Assistência',
    },
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Assistência':
        return Users;
      case 'Acadêmica':
      case 'Pesquisa':
      case 'Extensão':
        return Wallet;
      default:
        return Wallet;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Assistência':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Acadêmica':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Pesquisa':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Extensão':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const tipos = ['Todos', 'Assistência', 'Acadêmica', 'Pesquisa', 'Extensão'];

  const filteredBolsas = bolsas.filter((bolsa) => {
    const matchesFilter = selectedFilter === 'Todos' || bolsa.tipo === selectedFilter;
    const matchesSearch = bolsa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bolsa.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4">
        <Card className="mb-4 bg-gradient-to-br from-[#2E7D32]/5 to-[#2E7D32]/10 border-[#2E7D32]/20">
          <div className="flex items-start gap-3">
            <Wallet className="text-[#2E7D32] flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="mb-2">Programas de Bolsas e Auxílios</h3>
              <p className="text-sm text-gray-700">
                O IFNMG oferece diversos programas de apoio financeiro aos estudantes. Verifique os requisitos e prazos na Assistência Estudantil.
              </p>
            </div>
          </div>
        </Card>

        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar bolsa ou auxílio..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tipos.map((tipo) => (
              <FilterButton
                key={tipo}
                label={tipo}
                active={selectedFilter === tipo}
                onClick={() => setSelectedFilter(tipo)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredBolsas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma bolsa encontrada</p>
            </div>
          ) : (
            filteredBolsas.map((bolsa, index) => {
            const Icon = getTipoIcon(bolsa.tipo);
            return (
              <Card key={index}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 flex-1">
                      <Icon className="text-[#2E7D32] flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="mb-1">{bolsa.nome}</h3>
                        <p className="text-sm text-gray-600">{bolsa.descricao}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getTipoColor(bolsa.tipo)}`}>
                      {bolsa.tipo}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-[#2E7D32]" />
                      <span className="text-gray-900">{bolsa.valor}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Requisitos:</strong> {bolsa.requisitos}
                    </div>
                  </div>

                  <button
                    onClick={() => {}}
                    className="w-full mt-2 py-2 text-sm text-[#2E7D32] hover:bg-[#2E7D32]/5 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    Saiba mais
                    <ExternalLink size={14} />
                  </button>
                </div>
              </Card>
            );
            })
          )}
        </div>
      </div>
    </div>
  );
}
