import { BookOpen, CalendarDays, FileText, Folder, Megaphone, Menu, Users, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { EditaisSection } from "../components/admin/EditaisSection";
import { AvisosSection } from "../components/admin/AvisosSection";
import { HorariosSection } from "../components/admin/HorarioSection";
import { ContatosSection } from "../components/admin/ContatosSection";

const getToken = () => localStorage.getItem("token");

interface Aviso {
  id: number;
  title: string;
  description: string;
  type: string;
}

interface Curso {
  id: number;
  titulo: string;
  modalidade: string;
  descricao: string;
  duracao: string;
  horario: string;
  nivel: string;
}

interface Contato {
  id: number;
  nome: string;
  funcao: string;
  horario: string;
  email: string;
  telefone: string;
  categoria: string;
}

export function AdminPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [section, setSection] = useState("avisos");
  const [menuOpen, setMenuOpen] = useState(false);

  const [cursos, setCursos] = useState<Curso[]>([]);

  const [tituloCurso, setTituloCurso] = useState("");

  const [modalidadeCurso, setModalidadeCurso] = useState("");
  const [descricaoCurso, setDescricaoCurso] = useState("");
  const [duracaoCurso, setDuracaoCurso] = useState("");
  const [horarioCurso, setHorarioCurso] = useState("");
  const [nivel, setNivel] = useState("Técnico");

  const [editingCursoId, setEditingCursoId] = useState<number | null>(null);
  const [contatos, setContatos] = useState<Contato[]>([]);

  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [horario, setHorario] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [categoria, setCategoria] = useState("");

  const [editingContatoId, setEditingContatoId] = useState<number | null>(null);

  const fetchAvisos =  async () => {
    const response = await fetch("http://localhost:3000/avisos");
    const data = await response.json();
    setAvisos(data);
  };

  const fetchCursos = async () => {
    const response = await fetch("http://localhost:3000/cursos");

    const data = await response.json();

    setCursos(data);
  const fetchContatos = async () => {
    const response = await fetch("http://localhost:3000/contatos");

    const data = await response.json();

    setContatos(data);
  };

  useEffect(() => {
    fetchAvisos();
    fetchCursos();
    fetchContatos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/avisos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      setAvisos((prev) => prev.filter((aviso) => aviso.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    if (!token) {
      console.log("Usuário não logado - sem token!");
      return;
    }

    if (!title || !description) return;

    try {
      if (editingId !== null) {
        const response = await fetch(
          `http://localhost:3000/avisos/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              title,
              description,
              type: "info",
            }),
          },
        );

        const avisoAtualizado = await response.json();


        setEditingId(null);
      } else {
        const response = await fetch("http://localhost:3000/avisos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            title,
            description,
            type: "info",
          }),
        });

        const novoAviso = await response.json();

      }

      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }

    await fetchAvisos();
  };

  const handleCreateCurso = async () => {
   try {
      if (editingCursoId !== null) {
        await fetch(`http://localhost:3000/cursos/${editingCursoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            titulo: tituloCurso,
            modalidade: modalidadeCurso,
            descricao: descricaoCurso,
            duracao: duracaoCurso,
            horario: horarioCurso,
            nivel: nivel,
          }),
        });

        setEditingCursoId(null);
      } else {
        await fetch("http://localhost:3000/cursos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            titulo: tituloCurso,
            modalidade: modalidadeCurso,
            descricao: descricaoCurso,
            duracao: duracaoCurso,
            horario: horarioCurso,
            nivel: nivel,
          }),
        });
      }

      await fetchCursos();

      setTituloCurso("");
      setModalidadeCurso("");
      setDescricaoCurso("");
      setDuracaoCurso("");
      setHorarioCurso("");
      setNivel("Técnico");

    }catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCurso = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/cursos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      await fetchCursos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCurso = (curso: Curso) => {
    setTituloCurso(curso.titulo);
    setModalidadeCurso(curso.modalidade);
    setDescricaoCurso(curso.descricao);
    setDuracaoCurso(curso.duracao);
    setHorarioCurso(curso.horario);
    setNivel(curso.nivel);

    setEditingCursoId(curso.id);
  }

  const handleEdit = (aviso: Aviso) => {
    setTitle(aviso.title);
    setDescription(aviso.description);

    setEditingId(aviso.id);

    setShowForm(true);
  };

  const handleDeleteContato = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/contatos/${id}`, {
        method: "DELETE",
      });

      await fetchContatos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditContato = (contato: Contato) => {
    setNome(contato.nome);
    setFuncao(contato.funcao);
    setHorario(contato.horario);
    setEmail(contato.email);
    setTelefone(contato.telefone);
    setCategoria(contato.categoria);

    setEditingContatoId(contato.id);
    setShowForm(true);
  };

  const handleCreateContato = async () => {
    try {
      const body = {
        nome,
        funcao,
        horario,
        email,
        telefone,
        categoria,
      };

      if (editingContatoId) {
        await fetch(`http://localhost:3000/contatos/${editingContatoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("http://localhost:3000/contatos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      }

      setNome("");
      setFuncao("");
      setHorario("");
      setEmail("");
      setTelefone("");
      setCategoria("");

      setEditingContatoId(null);
      setShowForm(false);

      await fetchContatos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <aside className="hidden md:block bg-white rounded-xl shadow border p-4 h-fit sticky top-24">
          <h2 className="font-bold text-lg text-green-700 mb-6">Admin IFNMG</h2>

          <nav className="space-y-2">
            <button
              onClick={() => setSection("avisos")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                section === "avisos"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Megaphone size={18} />
              Avisos
            </button>

            <button
              onClick={() => setSection("cursos")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                section === "cursos"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <BookOpen size={18} />
              Cursos
            </button>

            <button
              onClick={() => setSection("contatos")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                section === "contatos"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Users size={18} />
              Contatos
            </button>

            <button
              onClick={() => setSection("bolsas")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                section === "bolsas"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Wallet size={18} />
              Bolsas
            </button>

            <button
              onClick={() => setSection("editais")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                section === "editais"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <FileText size={18} />
              Editais
            </button>

            <button
              onClick={() => setSection("horarios")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                section === "horarios"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <CalendarDays size={18} />
              Horários
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
            {section === "horarios" && "Gerenciamento de Horários e Calendário"}
          </h1>
          {section === "avisos" && (
            <AvisosSection
              avisos={avisos}
              title={title}
              description={description}
              showForm={showForm}
              editingId={editingId}
              setTitle={setTitle}
              setDescription={setDescription}
              setShowForm={setShowForm}
              setEditingId={setEditingId}
              handleCreate={handleCreate}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}

          {section === "cursos" && (
            <div className="bg-white p-8 rounded-xl shadow border">

              <h2 className="text-2xl font-bold mb-4">
                Cursos
              </h2>

              <input
                type="text"
                placeholder="Título"
                value={tituloCurso}
                onChange={(e) => setTituloCurso(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                type="text"
                placeholder="Modalidade"
                value={modalidadeCurso}
                onChange={(e) => setModalidadeCurso(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

              <textarea
                placeholder="Descrição"
                value={descricaoCurso}
                onChange={(e) => setDescricaoCurso(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                type="text"
                placeholder="Duração"
                value={duracaoCurso}
                onChange={(e) => setDuracaoCurso(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                type="text"
                placeholder="Horário"
                value={horarioCurso}
                onChange={(e) => setHorarioCurso(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />

              <div>
                <label className="block mb-1 font-medium">
                  Nível
                </label>

                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="Técnico">Técnico</option>
                  <option value="Superior">Superior</option>
                </select>
              </div>

              <button
                onClick={handleCreateCurso}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Cadastrar Curso
              </button>

              <div className="mt-6">
                {cursos.map((curso) => (
                  <div
                    key={curso.id}
                    className="border rounded p-3 mb-3"
                  >
                    <h3 className="font-bold">
                      {curso.titulo}
                    </h3>

                    <p>{curso.modalidade}</p>
                    <p>{curso.descricao}</p>
                    <p>{curso.duracao}</p>
                    <p>{curso.horario}</p>
                    <p>{curso.nivel}</p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEditCurso(curso)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDeleteCurso(curso.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))};
              </div>

              <h2 className="text-2xl font-bold">Cursos</h2>
              <p className="text-gray-500 mt-2">Área em desenvolvimento.</p>
            </div>
          )}

          {section === "contatos" && (
            <ContatosSection
              contatos={contatos}
              nome={nome}
              funcao={funcao}
              horario={horario}
              email={email}
              telefone={telefone}
              categoria={categoria}
              showForm={showForm}
              editingId={editingContatoId}
              setNome={setNome}
              setFuncao={setFuncao}
              setHorario={setHorario}
              setEmail={setEmail}
              setTelefone={setTelefone}
              setCategoria={setCategoria}
              setShowForm={setShowForm}
              setEditingId={setEditingContatoId}
              handleCreate={handleCreateContato}
              handleEdit={handleEditContato}
              handleDelete={handleDeleteContato}
            />
          )}

          {section === "bolsas" && (
            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-2xl font-bold">Bolsas</h2>
              <p className="text-gray-500 mt-2">Área em desenvolvimento.</p>
            </div>
          )}

          {section === "editais" && <EditaisSection />}

          {section === "horarios" && <HorariosSection />}
        </main>
      </div>
    </div>
  );
}}
