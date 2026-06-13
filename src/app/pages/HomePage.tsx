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
      description: "Mapa e localização",
      icon: MapPin,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "contatos",
      label: "Quem procurar",
      description: "Contatos importantes",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "horarios",
      label: "Horários",
      description: "Aulas e funcionamento",
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: "cursos",
      label: "Cursos",
      description: "Informações acadêmicas",
      icon: BookOpen,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "editais",
      label: "Editais",
      description: "Processos e avisos",
      icon: FileText,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "bolsas",
      label: "Bolsas",
      description: "Auxílios estudantis",
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
    fetch("${API_URL}/avisos")
      .then((res) => res.json())
      .then((data: Aviso[]) => setAvisos(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pb-20 md:pb-8">

      <div className="relative h-[320px] md:h-[420px] overflow-hidden">
        <img
          src="/ifnmg-campus.jpg"
          alt="IFNMG Campus"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full text-white">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Bem-vindo ao IFNMG
              </h1>

              <p className="text-white/90 text-base md:text-xl mb-6">
                Um portal criado para ajudar novos alunos a conhecerem o campus,
                encontrarem informações importantes e se adaptarem ao IFNMG.
              </p>

              <button
                onClick={onSearchOpen}
                className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-white/20 transition-all shadow-xl"
              >
                <Search size={20} />
                <span>Buscar informações...</span>
              </button>


            </div>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-8 bg-[#2E7D32] rounded-full"></div>

            <h3 className="text-2xl font-bold text-gray-800">
              Acesso Rápido
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} onClick={() => onNavigate(item.id)}>
                  <div className="flex flex-col items-center text-center gap-4 p-2">
                    <div className={`${item.color} p-4 rounded-2xl shadow-sm`}>
                      <Icon size={28} />
                    </div>

                    <div>
                      <span className="text-base font-semibold block">
                        {item.label}
                      </span>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-8 bg-orange-500 rounded-full"></div>

            <h3 className="text-2xl font-bold text-gray-800">
              Avisos Importantes
            </h3>
          </div>
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
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>

            <h3 className="text-2xl font-bold text-gray-800">
              Guia Rápido para Novos Alunos
            </h3>
          </div>
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
