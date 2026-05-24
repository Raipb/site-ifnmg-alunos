import { Card } from "../components/Card";
import {
  MapPin,
  Users,
  Clock,
  BookOpen,
  FileText,
  Wallet,
  Search,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Aviso {
  id?: string | number;
  title: string;
  description: string;
  type?: "warning" | "info" | string;
}

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSearchOpen: () => void;
}

export function HomePage({ onNavigate, onSearchOpen }: HomePageProps) {
  const quickAccess = [
    {
      id: "campus",
      label: "Campus",
      icon: MapPin,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "contatos",
      label: "Quem procurar",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "horarios",
      label: "Horários",
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: "cursos",
      label: "Cursos",
      icon: BookOpen,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "editais",
      label: "Editais",
      icon: FileText,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "bolsas",
      label: "Bolsas",
      icon: Wallet,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  const checklist = [
    "Conhecer o campus e suas instalações",
    "Buscar a secretaria acadêmica",
    "Verificar horários de aula",
    "Conhecer os programas de bolsas",
  ];

  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/avisos")
      .then((res) => res.json())
      .then((data: Aviso[]) => setAvisos(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pb-20 md:pb-8">
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white mb-2">Olá, estudante!</h2>
          <p className="text-white/90 mb-6">
            Bem-vindo ao Guia do Ingressante IFNMG
          </p>

          <button
            onClick={onSearchOpen}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-3 hover:bg-white/20 transition-colors"
          >
            <Search size={20} />
            <span className="text-white/80">Buscar informações...</span>
          </button>
          <button
            onClick={() => onNavigate("admin")}
            className="mt-4 bg-black/20 border border-white/20 rounded-lg px-4 py-2 hover:bg-black/30 transition-colors"
          >
            Área Administrativa
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <section>
          <h3 className="mb-4">Acesso Rápido</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} onClick={() => onNavigate(item.id)}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`${item.color} p-3 rounded-lg`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="mb-4">Avisos Importantes</h3>
          <div className="space-y-3">
            {avisos.map((aviso, index) => (
              <Card key={index}>
                <div className="flex gap-3">
                  <div
                    className={`w-1 rounded-full ${aviso.type === "warning" ? "bg-orange-500" : "bg-blue-500"}`}
                  ></div>
                  <div className="flex-1">
                    <h4 className="mb-1">{aviso.title}</h4>
                    <p className="text-sm text-gray-600">{aviso.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4">Guia Rápido para Novos Alunos</h3>
          <Card>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-[#2E7D32] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
