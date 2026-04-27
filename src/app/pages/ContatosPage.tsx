import { useState } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { Mail, Phone, Clock, Search } from 'lucide-react';

export function ContatosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const setores = [
    {
      nome: 'Secretaria Acadêmica',
      funcao: 'Matrículas, históricos e documentos',
      horario: 'Segunda a Sexta: 8h às 17h',
      email: 'secretaria@ifnmg.edu.br',
      telefone: '(38) 3841-7200',
      categoria: 'Acadêmico',
    },
    {
      nome: 'Coordenação de Curso',
      funcao: 'Orientação acadêmica e pedagógica',
      horario: 'Segunda a Sexta: 8h às 18h',
      email: 'coordenacao@ifnmg.edu.br',
      telefone: '(38) 3841-7201',
      categoria: 'Acadêmico',
    },
    {
      nome: 'Assistência Estudantil',
      funcao: 'Bolsas, auxílios e apoio ao estudante',
      horario: 'Segunda a Sexta: 8h às 16h',
      email: 'assistencia@ifnmg.edu.br',
      telefone: '(38) 3841-7202',
      categoria: 'Assistência',
    },
    {
      nome: 'Biblioteca',
      funcao: 'Empréstimos, pesquisa e estudo',
      horario: 'Segunda a Sexta: 7h às 21h',
      email: 'biblioteca@ifnmg.edu.br',
      telefone: '(38) 3841-7203',
      categoria: 'Serviços',
    },
    {
      nome: 'TI - Tecnologia da Informação',
      funcao: 'Suporte técnico e acesso aos sistemas',
      horario: 'Segunda a Sexta: 8h às 18h',
      email: 'ti@ifnmg.edu.br',
      telefone: '(38) 3841-7204',
      categoria: 'Suporte',
    },
    {
      nome: 'Registro Escolar',
      funcao: 'Documentação e registros acadêmicos',
      horario: 'Segunda a Sexta: 8h às 17h',
      email: 'registro@ifnmg.edu.br',
      telefone: '(38) 3841-7205',
      categoria: 'Acadêmico',
    },
  ];

  const categorias = ['Todos', 'Acadêmico', 'Assistência', 'Serviços', 'Suporte'];

  const filteredSetores = setores.filter((setor) => {
    const matchesFilter = selectedFilter === 'Todos' || setor.categoria === selectedFilter;
    const matchesSearch = setor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          setor.funcao.toLowerCase().includes(searchTerm.toLowerCase());
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
              placeholder="Buscar setor..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categorias.map((categoria) => (
              <FilterButton
                key={categoria}
                label={categoria}
                active={selectedFilter === categoria}
                onClick={() => setSelectedFilter(categoria)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredSetores.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum setor encontrado</p>
            </div>
          ) : (
            filteredSetores.map((setor, index) => (
          <Card key={index}>
            <div className="space-y-3">
              <div>
                <h3 className="mb-1">{setor.nome}</h3>
                <p className="text-sm text-gray-600">{setor.funcao}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={16} className="text-[#2E7D32]" />
                  <span>{setor.horario}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={16} className="text-[#2E7D32]" />
                  <a href={`mailto:${setor.email}`} className="hover:text-[#2E7D32] transition-colors">
                    {setor.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={16} className="text-[#2E7D32]" />
                  <a href={`tel:${setor.telefone}`} className="hover:text-[#2E7D32] transition-colors">
                    {setor.telefone}
                  </a>
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
