import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { BookOpen, Clock, Award, Search } from 'lucide-react';

interface Curso {
  id: number;
  titulo: string;
  modalidade: string;
  descricao: string;
  duracao: string;
  horario: string;
  nivel: string;
}

export function CursosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch("${API_URL}/cursos")
      .then((res) => res.json())
      .then((data) => setCursos(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  }, []);

  const niveis = ['Todos', 'Técnico', 'Superior'];

  const filteredCursos = cursos.filter((curso) => {
    const matchesFilter = selectedFilter === 'Todos' || curso.nivel === selectedFilter;
    const matchesSearch =
      curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            filteredCursos.map((curso) => (
              <Card key={curso.id}>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <BookOpen className="text-[#2E7D32] flex-shrink-0 mt-1" size={20} />
                      <h3>{curso.titulo}</h3>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-block px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] rounded-full text-sm">
                        {curso.modalidade}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${curso.nivel === 'Superior'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-green-50 text-green-700'
                        }`}>
                        {curso.nivel}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">{curso.descricao}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-gray-400" />
                      <span>{curso.duracao}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={16} className="text-gray-400" />
                      <span>{curso.horario}</span>
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