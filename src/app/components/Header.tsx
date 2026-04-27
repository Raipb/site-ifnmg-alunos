import { ArrowLeft, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onSearch?: () => void;
}

export function Header({ title, onBack, onSearch }: HeaderProps) {
  return (
    <header className="bg-[#2E7D32] text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-white">{title}</h1>
        </div>
        {onSearch && (
          <button
            onClick={onSearch}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
