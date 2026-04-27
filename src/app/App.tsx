import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CampusPage } from './pages/CampusPage';
import { ContatosPage } from './pages/ContatosPage';
import { HorariosPage } from './pages/HorariosPage';
import { CursosPage } from './pages/CursosPage';
import { EditaisPage } from './pages/EditaisPage';
import { BolsasPage } from './pages/BolsasPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSearch, setShowSearch] = useState(false);

  const pageConfig = {
    home: { title: 'Guia do Ingressante', showBack: false },
    campus: { title: 'Campus', showBack: true },
    contatos: { title: 'Quem Procurar', showBack: true },
    horarios: { title: 'Horários', showBack: true },
    cursos: { title: 'Cursos', showBack: true },
    editais: { title: 'Editais', showBack: true },
    bolsas: { title: 'Bolsas e Auxílios', showBack: true },
  };

  const config = pageConfig[currentPage as keyof typeof pageConfig];

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    console.log('Buscando:', query);
    setShowSearch(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSearchOpen={() => setShowSearch(true)} />;
      case 'campus':
        return <CampusPage />;
      case 'contatos':
        return <ContatosPage />;
      case 'horarios':
        return <HorariosPage />;
      case 'cursos':
        return <CursosPage />;
      case 'editais':
        return <EditaisPage />;
      case 'bolsas':
        return <BolsasPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onSearchOpen={() => setShowSearch(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={config.title}
        onBack={config.showBack ? () => handleNavigate('home') : undefined}
        onSearch={currentPage === 'home' ? () => setShowSearch(true) : undefined}
      />

      <main className="min-h-[calc(100vh-64px)]">
        {renderPage()}
        <Footer />
      </main>

      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {showSearch && (
        <SearchModal onClose={() => setShowSearch(false)} onSearch={handleSearch} />
      )}
    </div>
  );
}