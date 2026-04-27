import { useState } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { BookOpen, Clock, Award, Search } from 'lucide-react';

export function CursosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const cursos = [
    {
      nome: 'Técnico em Administração Integrado ao Ensino Médio',
      modalidade: 'Presencial',
      duracao: '3 anos',
      turno: 'Integral – matutino e vespertino',
      descricao: 'O curso Técnico em Administração integrado ao Ensino Médio forma alunos críticos e participativos, preparados para aplicar conhecimentos de gestão e contribuir com a sociedade e o mercado de trabalho.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Zootecnia Integrado ao Ensino Médio',
      modalidade: 'Presencial',
      duracao: '3 anos',
      turno: 'Integral – matutino e vespertino',
      descricao: 'Profissional capacitado para atuar na produção agrícola e animal, com foco em manejo, sustentabilidade e gestão rural.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Agropecuária',
      modalidade: 'Presencial Integrado ao Ensino Médio em Regime de Alternância',
      duracao: '3 anos',
      turno: 'Integral',
      descricao: 'O curso Técnico em Agropecuária forma profissionais capazes de atuar na produção vegetal e animal, manejo do solo e gestão rural, integrando teoria e prática com foco no desenvolvimento sustentável.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Informática Integrado ao Ensino Médio',
      modalidade: 'Presencial',
      duracao: '3 anos',
      turno: 'Integrado',
      descricao: 'O curso Técnico em Informática forma profissionais capazes de aplicar conhecimentos teóricos e práticos em tecnologia, contribuindo para o mercado de trabalho e a sociedade.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Zootecnia Integrado ao Ensino Médio',
      modalidade: 'Presencial',
      duracao: '3 anos',
      turno: 'Integral – matutino e vespertino',
      descricao: 'O curso Técnico em Zootecnia forma profissionais capacitados para atuar na produção animal, com foco em técnicas modernas e desenvolvimento sustentável.',
      nivel: 'Técnico',
    },
    {
      nome: 'Técnico em Enfermagem Subsequente',
      modalidade: 'Presencial',
      duracao: '2 anos',
      turno: 'Noturno',
      descricao: 'Forma profissionais para atuar no cuidado à saúde com ética e qualidade.',
      nivel: 'Superior',
    },
    {
      nome: 'Bacharelado em Engenharia Agronômica',
      modalidade: 'Presencial',
      duracao: '10 semestres',
      turno: 'Integral',
      descricao: 'O curso de Engenharia Agronômica forma profissionais capazes de atuar no manejo do solo, produção agrícola e gestão rural, com foco no desenvolvimento sustentável.',
      nivel: 'Superior',
    },
    {
      nome: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      modalidade: 'Presencial',
      duracao: '3 anos',
      turno: 'Noturno',
      descricao: 'O curso de Análise e Desenvolvimento de Sistemas forma profissionais capacitados para desenvolver e implantar soluções computacionais, atuando em diversas áreas da tecnologia.',
      nivel: 'Superior',
    },
    {
      nome: 'Superior de Tecnologia em Processos Gerenciais',
      modalidade: 'Presencial',
      duracao: '2 anos e meio ',
      turno: 'Noturno',
      descricao: 'O curso de Processos Gerenciais forma profissionais preparados para atuar na gestão de empresas, com foco prático em administração e tomada de decisões no mercado.',
      nivel: 'Superior',
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
