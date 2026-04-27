import { useState } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { BookOpen, Clock, Award, Search } from 'lucide-react';

export function CursosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const cursos = [
    {
      nome: 'Técnico em Informática',
      modalidade: 'Integrado ao Ensino Médio',
      duracao: '3 anos',
      turno: 'Integral',
      descricao: 'Forma profissionais para desenvolver e manter sistemas e aplicações, configurar e dar suporte a redes de computadores.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Agropecuária',
      modalidade: 'Integrado ao Ensino Médio',
      duracao: '3 anos',
      turno: 'Integral',
      descricao: 'Capacita para planejar, executar e acompanhar projetos agropecuários com técnicas modernas e sustentáveis.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Meio Ambiente',
      modalidade: 'Subsequente',
      duracao: '2 anos',
      turno: 'Noturno',
      descricao: 'Forma profissionais para atuar na preservação ambiental, realizar análises e propor soluções sustentáveis.',
      nivel: 'Técnico',
    },
    {
      nome: 'Bacharelado em Sistemas de Informação',
      modalidade: 'Superior',
      duracao: '4 anos',
      turno: 'Noturno',
      descricao: 'Prepara profissionais para desenvolver, gerenciar e implementar sistemas de informação em organizações.',
      nivel: 'Superior',
    },
    {
      nome: 'Licenciatura em Ciências Biológicas',
      modalidade: 'Superior',
      duracao: '4 anos',
      turno: 'Noturno',
      descricao: 'Forma professores de biologia com sólida base científica e pedagógica para atuar na educação básica.',
      nivel: 'Superior',
    },
    {
      nome: 'Técnico em Edificações',
      modalidade: 'Subsequente',
      duracao: '2 anos',
      turno: 'Noturno',
      descricao: 'Capacita para desenvolver projetos de construção civil, acompanhar obras e elaborar orçamentos.',
      nivel: 'Técnico',
    },
  ];

  const niveis = ['Todos', 'Técnico', 'Superior'];

  const filteredCursos = cursos.filter((curso) => {
    const matchesFilter = selectedFilter === 'Todos' || curso.nivel === selectedFilter;
    const matchesSearch = curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          curso.descricao.toLowerCase().includes(searchTerm.toLowerCase());
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
              placeholder="Buscar curso..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {niveis.map((nivel) => (
              <FilterButton
                key={nivel}
                label={nivel}
                active={selectedFilter === nivel}
                onClick={() => setSelectedFilter(nivel)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredCursos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum curso encontrado</p>
            </div>
          ) : (
            filteredCursos.map((curso, index) => (
          <Card key={index}>
            <div className="space-y-3">
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <BookOpen className="text-[#2E7D32] flex-shrink-0 mt-1" size={20} />
                  <h3>{curso.nome}</h3>
                </div>
                <span className="inline-block px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] rounded-full text-sm">
                  {curso.modalidade}
                </span>
              </div>

              <p className="text-sm text-gray-700">{curso.descricao}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-gray-400" />
                  <span>{curso.duracao}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={16} className="text-gray-400" />
                  <span>{curso.turno}</span>
                </div>
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
