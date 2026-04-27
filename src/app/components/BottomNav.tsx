import { Home, MapPin, Users, Clock, BookOpen, FileText } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'campus', label: 'Campus', icon: MapPin },
    { id: 'contatos', label: 'Contatos', icon: Users },
    { id: 'cursos', label: 'Cursos', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-[#2E7D32]'
                  : 'text-gray-500 hover:text-[#2E7D32]'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
