import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { FilterButton } from '../components/FilterButton';
import { Mail, Phone, Clock, Search } from 'lucide-react';

interface Contato {
  id: number;
  nome: string;
  funcao: string;
  horario: string;
  email: string;
  telefone: string;
  categoria: string;
}

export function ContatosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const [contatos, setContatos] = useState<Contato[]>([]);

  const categorias = ['Todos', 'Acadêmico', 'Assistência', 'Serviços', 'Suporte'];

  const filteredContatos = contatos.filter((contato) => {
    const matchesFilter = selectedFilter === 'Todos' || contato.categoria === selectedFilter;
    const matchesSearch = contato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contato.funcao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    buscarContatos();
  }, []);

  const buscarContatos = async () => {
    try {
      const response = await fetch("${API_URL}/contatos");
      const data = await response.json();

      setContatos(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
          {filteredContatos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum contato encontrado</p>
            </div>
          ) : (
            filteredContatos.map((contato) => (
              <Card key={contato.id}>
                <div className="space-y-3">
                  <div>
                    <h3 className="mb-1">{contato.nome}</h3>
                    <p className="text-sm text-gray-600">{contato.funcao}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={16} className="text-[#2E7D32]" />
                      <span>{contato.horario}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail size={16} className="text-[#2E7D32]" />
                      <a
                        href={`mailto:${contato.email}`}
                        className="hover:text-[#2E7D32] transition-colors"
                      >
                        {contato.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone size={16} className="text-[#2E7D32]" />
                      <a
                        href={`tel:${contato.telefone}`}
                        className="hover:text-[#2E7D32] transition-colors"
                      >
                        {contato.telefone}
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
