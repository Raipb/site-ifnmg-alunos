import { BookOpen, FileText, Folder, Megaphone, Menu, Users, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Aviso {
  id: number;
  title: string;
  description: string;
  type: string;
}

export function AdminPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [section, setSection] = useState("avisos");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/avisos")
      .then((res) => res.json())
      .then((data) => setAvisos(data));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/avisos/${id}`, {
        method: "DELETE",
      });

      setAvisos((prev) => prev.filter((aviso) => aviso.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    if (!title || !description) return;

    try {
      if (editingId !== null) {
        const response = await fetch(
          `http://localhost:3000/avisos/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              type: "info",
            }),
          },
        );

        const avisoAtualizado = await response.json();

        setAvisos((prev) =>
          prev.map((aviso) =>
            aviso.id === editingId ? avisoAtualizado : aviso,
          ),
        );

        setEditingId(null);
      } else {
        const response = await fetch("http://localhost:3000/avisos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            type: "info",
          }),
        });

        const novoAviso = await response.json();

        setAvisos((prev) => [...prev, novoAviso]);
      }

      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (aviso: Aviso) => {
    setTitle(aviso.title);
    setDescription(aviso.description);

    setEditingId(aviso.id);

    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <aside className="hidden md:block bg-white rounded-xl shadow border p-4 h-fit sticky top-24">
          <h2 className="font-bold text-lg text-green-700 mb-6">
            Admin IFNMG
          </h2>

          <nav className="space-y-2">
            <button
              onClick={() => setSection("avisos")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === "avisos"
                ? "bg-green-50 text-green-700"
                : "hover:bg-gray-100"
                }`}
            >
              <Megaphone size={18} />
              Avisos
            </button>

            <button
              onClick={() => setSection("cursos")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === "cursos"
                ? "bg-green-50 text-green-700"
                : "hover:bg-gray-100"
                }`}
            >
              <BookOpen size={18} />
              Cursos
            </button>

            <button
              onClick={() => setSection("contatos")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === "contatos"
                ? "bg-green-50 text-green-700"
                : "hover:bg-gray-100"
                }`}
            >
              <Users size={18} />
              Contatos
            </button>

            <button
              onClick={() => setSection("bolsas")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === "bolsas"
                ? "bg-green-50 text-green-700"
                : "hover:bg-gray-100"
                }`}
            >
              <Wallet size={18} />
              Bolsas
            </button>

            <button
              onClick={() => setSection("editais")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === "editais"
                ? "bg-green-50 text-green-700"
                : "hover:bg-gray-100"
                }`}
            >
              <FileText size={18} />
              Editais
            </button>

            <button
              onClick={() => setSection("pdfs")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === "pdfs"
                ? "bg-green-50 text-green-700"
                : "hover:bg-gray-100"
                }`}
            >
              <Folder size={18} />
              PDFs
            </button>
          </nav>
        </aside>

        {/* Menu Mobile */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-green-700 text-white p-3 rounded-lg shadow"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {menuOpen && (
            <div className="mt-3 bg-white rounded-xl shadow border p-3">
              <div className="flex flex-col gap-2">

                <button
                  onClick={() => {
                    setSection("avisos");
                    setMenuOpen(false);
                  }}
                  className="text-left p-2 rounded-lg hover:bg-gray-100"
                >
                  Avisos
                </button>

                <button
                  onClick={() => {
                    setSection("cursos");
                    setMenuOpen(false);
                  }}
                  className="text-left p-2 rounded-lg hover:bg-gray-100"
                >
                  Cursos
                </button>

                <button
                  onClick={() => {
                    setSection("contatos");
                    setMenuOpen(false);
                  }}
                  className="text-left p-2 rounded-lg hover:bg-gray-100"
                >
                  Contatos
                </button>

                <button
                  onClick={() => {
                    setSection("bolsas");
                    setMenuOpen(false);
                  }}
                  className="text-left p-2 rounded-lg hover:bg-gray-100"
                >
                  Bolsas
                </button>

                <button
                  onClick={() => {
                    setSection("editais");
                    setMenuOpen(false);
                  }}
                  className="text-left p-2 rounded-lg hover:bg-gray-100"
                >
                  Editais
                </button>

                <button
                  onClick={() => {
                    setSection("pdfs");
                    setMenuOpen(false);
                  }}
                  className="text-left p-2 rounded-lg hover:bg-gray-100"
                >
                  PDFs
                </button>

              </div>
            </div>
          )}
        </div>

        <main>
          <h1 className="text-3xl font-bold text-gray-800">
            {section === "avisos" && "Gerenciamento de Avisos"}
            {section === "cursos" && "Gerenciamento de Cursos"}
            {section === "contatos" && "Gerenciamento de Contatos"}
            {section === "bolsas" && "Gerenciamento de Bolsas"}
            {section === "editais" && "Gerenciamento de Editais"}
            {section === "pdfs" && "Gerenciamento de PDFs"}
          </h1>
          {section === "avisos" && (
            <>
              {/* titulo */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    Painel Administrativo
                  </h1>

                  <p className="text-gray-500">
                    Gerencie os conteúdos do portal do ingressante.
                  </p>
                </div>
              </div>

              {/* estatísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow border">
                  <h3 className="text-gray-500 text-sm">Avisos</h3>
                  <p className="text-3xl font-bold text-green-700">
                    {avisos.length}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                  <h3 className="text-gray-500 text-sm">Cursos</h3>
                  <p className="text-3xl font-bold text-green-700">0</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                  <h3 className="text-gray-500 text-sm">Contatos</h3>
                  <p className="text-3xl font-bold text-green-700">0</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                  <h3 className="text-gray-500 text-sm">Editais</h3>
                  <p className="text-3xl font-bold text-green-700">0</p>
                </div>
              </div>


              {/* botao */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Gerenciamento de Avisos
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Cadastre, edite ou remova avisos exibidos na página inicial.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowForm(!showForm);

                    if (!showForm) {
                      setTitle("");
                      setDescription("");
                      setEditingId(null);
                    }
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow transition"
                >
                  {showForm ? "Fechar" : "Novo Aviso"}
                </button>
              </div>

              {/* formulario */}
              {showForm && (
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {editingId ? "Editar Aviso" : "Novo Aviso"}
                  </h2>
                  <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg p-2"
                  />

                  <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-lg p-2"
                  />

                  <button
                    onClick={handleCreate}
                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow transition"
                  >
                    Salvar Aviso
                  </button>
                </div>
              )}

              {/* lista */}
              <div className="space-y-4">
                {avisos.map((aviso) => (
                  <div
                    key={aviso.id}
                    className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition"
                  >
                    <div>
                      <h2 className="font-semibold">{aviso.title}</h2>

                      <p className="text-gray-600 text-sm">{aviso.description}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(aviso)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(aviso.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === "cursos" && (
            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-2xl font-bold">Cursos</h2>
              <p className="text-gray-500 mt-2">
                Área em desenvolvimento.
              </p>
            </div>
          )}

          {section === "contatos" && (
            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-2xl font-bold">Contatos</h2>
              <p className="text-gray-500 mt-2">
                Área em desenvolvimento.
              </p>
            </div>
          )}

          {section === "bolsas" && (
            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-2xl font-bold">Bolsas</h2>
              <p className="text-gray-500 mt-2">
                Área em desenvolvimento.
              </p>
            </div>
          )}

          {section === "editais" && (
            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-2xl font-bold">Editais</h2>
              <p className="text-gray-500 mt-2">
                Área em desenvolvimento.
              </p>
            </div>
          )}

          {section === "pdfs" && (
            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-2xl font-bold">PDFs</h2>
              <p className="text-gray-500 mt-2">
                Área em desenvolvimento.
              </p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
