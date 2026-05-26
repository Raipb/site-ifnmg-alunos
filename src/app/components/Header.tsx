import { ArrowLeft, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onSearch?: () => void;
  onAdmin?: () => void;
}

export function Header({
  title,
  onBack,
  onSearch,
  onAdmin,
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
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

          <div className="flex items-center gap-2 leading-none">
            <img
              src="/logo-ifnmg.png"
              alt="Logo IFNMG"
              className="h-9 w-auto object-contain"
            />

            <h1 className="text-white font-bold text-xl md:text-2xl tracking-wide">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSearch && (
            <button
              onClick={onSearch}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-xl transition-colors text-sm font-medium"
              aria-label="Buscar"
            >
              <Search size={18} />
              <span className="hidden md:inline">Buscar</span>
            </button>
          )}

          {onAdmin && (
            <button
              onClick={onAdmin}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-medium"
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
}