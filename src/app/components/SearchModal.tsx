import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

export function SearchModal({ onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mt-20 animate-slideDown">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2>Buscar</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite sua busca..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-[#2E7D32] text-white py-3 rounded-lg hover:bg-[#25692a] transition-colors"
          >
            Buscar
          </button>
        </form>
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Sugestões: horários, bolsas, secretaria, biblioteca</p>
        </div>
      </div>
    </div>
  );
}
