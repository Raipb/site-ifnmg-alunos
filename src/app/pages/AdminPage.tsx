import { BookOpen, CalendarDays, FileText, Megaphone, Menu, Users, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { EditaisSection } from "../components/admin/EditaisSection";
import { AvisosSection } from "../components/admin/AvisosSection";
import { HorariosSection } from "../components/admin/HorarioSection";
import { ContatosSection } from "../components/admin/ContatosSection";
import { CursosSection } from "../components/admin/CursosSection";
import { BolsasSection } from "../components/admin/BolsasSection";

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

interface Bolsa {
  id: number;
  nome: string;
  descricao: string;
  valor: string;
  requisitos: string;
  tipo: string;
  link: string;
}

export function AdminPage() {
  const [section, setSection] = useState("avisos");
  const [menuOpen, setMenuOpen] = useState(false);

  // — Avisos —
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showFormAviso, setShowFormAviso] = useState(false);
  const [editingAvisoId, setEditingAvisoId] = useState<number | null>(null);

  // — Cursos —
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [tituloCurso, setTituloCurso] = useState("");
  const [modalidadeCurso, setModalidadeCurso] = useState("");
  const [descricaoCurso, setDescricaoCurso] = useState("");
  const [duracaoCurso, setDuracaoCurso] = useState("");
  const [horarioCurso, setHorarioCurso] = useState("");
  const [nivel, setNivel] = useState("Técnico");
  const [showFormCurso, setShowFormCurso] = useState(false);
  const [editingCursoId, setEditingCursoId] = useState<number | null>(null);

  // — Contatos —
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [nomeContato, setNomeContato] = useState("");
  const [funcao, setFuncao] = useState("");
  const [horarioContato, setHorarioContato] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [categoria, setCategoria] = useState("");
  const [showFormContato, setShowFormContato] = useState(false);
  const [editingContatoId, setEditingContatoId] = useState<number | null>(null);

  // — Bolsas —
  const [bolsas, setBolsas] = useState<Bolsa[]>([]);
  const [nomeBolsa, setNomeBolsa] = useState("");
  const [descricaoBolsa, setDescricaoBolsa] = useState("");
  const [valor, setValor] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [tipoBolsa, setTipoBolsa] = useState("Assistência");
  const [linkBolsa, setLinkBolsa] = useState("");
  const [showFormBolsa, setShowFormBolsa] = useState(false);
  const [editingBolsaId, setEditingBolsaId] = useState<number | null>(null);

  // — Fetches —
  const fetchAvisos = async () => {
    const data = await fetch("http://localhost:3000/avisos").then(r => r.json());
    setAvisos(data);
  };

  const fetchCursos = async () => {
    const data = await fetch("http://localhost:3000/cursos").then(r => r.json());
    console.log("cursos recebidos:", data);
    setCursos(Array.isArray(data) ? data : []);
  };

  const fetchContatos = async () => {
    const data = await fetch("http://localhost:3000/contatos").then(r => r.json());
    setContatos(data);
  };

  const fetchBolsas = async () => {
    const data = await fetch("http://localhost:3000/bolsas").then(r => r.json());
    console.log("bolsas recebidas:", data);
    setBolsas(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchAvisos();
    fetchCursos();
    fetchContatos();
    fetchBolsas();
  }, []);

  // — Avisos handlers —
  const handleCreateAviso = async () => {
    const token = getToken();
    if (!token || !title || !description) return;
    try {
      if (editingAvisoId !== null) {
        await fetch(`http://localhost:3000/avisos/${editingAvisoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ title, description, type: "info" }),
        });
        setEditingAvisoId(null);
      } else {
        await fetch("http://localhost:3000/avisos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ title, description, type: "info" }),
        });
      }
      setTitle(""); setDescription(""); setShowFormAviso(false);
      await fetchAvisos();
    } catch (error) { console.log(error); }
  };

  const handleEditAviso = (aviso: Aviso) => {
    setTitle(aviso.title); setDescription(aviso.description);
    setEditingAvisoId(aviso.id); setShowFormAviso(true);
  };

  const handleDeleteAviso = async (id: number) => {
    await fetch(`http://localhost:3000/avisos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await fetchAvisos();
  };

  // — Cursos handlers —
  const handleCreateCurso = async () => {
    try {
      if (editingCursoId !== null) {
        await fetch(`http://localhost:3000/cursos/${editingCursoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify({ titulo: tituloCurso, modalidade: modalidadeCurso, descricao: descricaoCurso, duracao: duracaoCurso, horario: horarioCurso, nivel }),
        });
        setEditingCursoId(null);
      } else {
        await fetch("http://localhost:3000/cursos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify({ titulo: tituloCurso, modalidade: modalidadeCurso, descricao: descricaoCurso, duracao: duracaoCurso, horario: horarioCurso, nivel }),
        });
      }
      setTituloCurso(""); setModalidadeCurso(""); setDescricaoCurso("");
      setDuracaoCurso(""); setHorarioCurso(""); setNivel("Técnico");
      setShowFormCurso(false);
      await fetchCursos();
    } catch (error) { console.log(error); }
  };

  const handleEditCurso = (curso: Curso) => {
    setTituloCurso(curso.titulo); setModalidadeCurso(curso.modalidade);
    setDescricaoCurso(curso.descricao); setDuracaoCurso(curso.duracao);
    setHorarioCurso(curso.horario); setNivel(curso.nivel);
    setEditingCursoId(curso.id); setShowFormCurso(true);
  };

  const handleDeleteCurso = async (id: number) => {
    await fetch(`http://localhost:3000/cursos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await fetchCursos();
  };

  // — Contatos handlers —
  const handleCreateContato = async () => {
    try {
      const body = { nome: nomeContato, funcao, horario: horarioContato, email, telefone, categoria };
      if (editingContatoId) {
        await fetch(`http://localhost:3000/contatos/${editingContatoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("http://localhost:3000/contatos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      setNomeContato(""); setFuncao(""); setHorarioContato("");
      setEmail(""); setTelefone(""); setCategoria("");
      setEditingContatoId(null); setShowFormContato(false);
      await fetchContatos();
    } catch (error) { console.log(error); }
  };

  const handleEditContato = (contato: Contato) => {
    setNomeContato(contato.nome); setFuncao(contato.funcao);
    setHorarioContato(contato.horario); setEmail(contato.email);
    setTelefone(contato.telefone); setCategoria(contato.categoria);
    setEditingContatoId(contato.id); setShowFormContato(true);
  };

  const handleDeleteContato = async (id: number) => {
    await fetch(`http://localhost:3000/contatos/${id}`, { method: "DELETE" });
    await fetchContatos();
  };

  // — Bolsas handlers —
  const handleCreateBolsa = async () => {
    const token = getToken();
    if (!token || !nomeBolsa || !descricaoBolsa || !valor || !requisitos) return;
    try {
      const body = { nome: nomeBolsa, descricao: descricaoBolsa, valor, requisitos, tipo: tipoBolsa, link: linkBolsa };
      if (editingBolsaId !== null) {
        await fetch(`http://localhost:3000/bolsas/${editingBolsaId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        setEditingBolsaId(null);
      } else {
        await fetch("http://localhost:3000/bolsas", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
      }
      setNomeBolsa(""); setDescricaoBolsa(""); setValor("");
      setRequisitos(""); setTipoBolsa("Assistência"); setLinkBolsa("");
      setShowFormBolsa(false);
      await fetchBolsas();
    } catch (error) { console.log(error); }
  };

  const handleEditBolsa = (bolsa: Bolsa) => {
    setNomeBolsa(bolsa.nome); setDescricaoBolsa(bolsa.descricao);
    setValor(bolsa.valor); setRequisitos(bolsa.requisitos);
    setTipoBolsa(bolsa.tipo); setLinkBolsa(bolsa.link);
    setEditingBolsaId(bolsa.id); setShowFormBolsa(true);
  };

  const handleDeleteBolsa = async (id: number) => {
    await fetch(`http://localhost:3000/bolsas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await fetchBolsas();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <aside className="hidden md:block bg-white rounded-xl shadow border p-4 h-fit sticky top-24">
          <h2 className="font-bold text-lg text-green-700 mb-6">Admin IFNMG</h2>
          <nav className="space-y-2">
            {[
              { key: "avisos", icon: <Megaphone size={18} />, label: "Avisos" },
              { key: "cursos", icon: <BookOpen size={18} />, label: "Cursos" },
              { key: "contatos", icon: <Users size={18} />, label: "Contatos" },
              { key: "bolsas", icon: <Wallet size={18} />, label: "Bolsas" },
              { key: "editais", icon: <FileText size={18} />, label: "Editais" },
              { key: "horarios", icon: <CalendarDays size={18} />, label: "Horários" },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setSection(key)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${section === key ? "bg-green-50 text-green-700" : "hover:bg-gray-100"}`}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Menu Mobile */}
        <div className="md:hidden mb-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-green-700 text-white p-3 rounded-lg shadow">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {menuOpen && (
            <div className="mt-3 bg-white rounded-xl shadow border p-3">
              <div className="flex flex-col gap-2">
                {["Avisos", "Cursos", "Contatos", "Bolsas", "Editais", "Horários"].map((label) => (
                  <button
                    key={label}
                    onClick={() => { setSection(label.toLowerCase()); setMenuOpen(false); }}
                    className="text-left p-2 rounded-lg hover:bg-gray-100"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <main>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {section === "avisos" && "Gerenciamento de Avisos"}
            {section === "cursos" && "Gerenciamento de Cursos"}
            {section === "contatos" && "Gerenciamento de Contatos"}
            {section === "bolsas" && "Gerenciamento de Bolsas"}
            {section === "editais" && "Gerenciamento de Editais"}
            {section === "horarios" && "Gerenciamento de Horários e Calendário"}
          </h1>

          {section === "avisos" && (
            <AvisosSection
              avisos={avisos} title={title} description={description}
              showForm={showFormAviso} editingId={editingAvisoId}
              setTitle={setTitle} setDescription={setDescription}
              setShowForm={setShowFormAviso} setEditingId={setEditingAvisoId}
              handleCreate={handleCreateAviso} handleEdit={handleEditAviso} handleDelete={handleDeleteAviso}
            />
          )}

          {section === "cursos" && (
            <CursosSection
              cursos={cursos} tituloCurso={tituloCurso} modalidadeCurso={modalidadeCurso}
              descricaoCurso={descricaoCurso} duracaoCurso={duracaoCurso}
              horarioCurso={horarioCurso} nivel={nivel}
              showForm={showFormCurso} editingId={editingCursoId}
              setTituloCurso={setTituloCurso} setModalidadeCurso={setModalidadeCurso}
              setDescricaoCurso={setDescricaoCurso} setDuracaoCurso={setDuracaoCurso}
              setHorarioCurso={setHorarioCurso} setNivel={setNivel}
              setShowForm={setShowFormCurso} setEditingId={setEditingCursoId}
              handleCreate={handleCreateCurso} handleEdit={handleEditCurso} handleDelete={handleDeleteCurso}
            />
          )}

          {section === "contatos" && (
            <ContatosSection
              contatos={contatos} nome={nomeContato} funcao={funcao}
              horario={horarioContato} email={email} telefone={telefone} categoria={categoria}
              showForm={showFormContato} editingId={editingContatoId}
              setNome={setNomeContato} setFuncao={setFuncao} setHorario={setHorarioContato}
              setEmail={setEmail} setTelefone={setTelefone} setCategoria={setCategoria}
              setShowForm={setShowFormContato} setEditingId={setEditingContatoId}
              handleCreate={handleCreateContato} handleEdit={handleEditContato} handleDelete={handleDeleteContato}
            />
          )}

          {section === "bolsas" && (
            <BolsasSection
              bolsas={bolsas} nome={nomeBolsa} descricao={descricaoBolsa}
              valor={valor} requisitos={requisitos} tipo={tipoBolsa} link={linkBolsa}
              showForm={showFormBolsa} editingId={editingBolsaId}
              setNome={setNomeBolsa} setDescricao={setDescricaoBolsa}
              setValor={setValor} setRequisitos={setRequisitos}
              setTipo={setTipoBolsa} setLink={setLinkBolsa}
              setShowForm={setShowFormBolsa} setEditingId={setEditingBolsaId}
              handleCreate={handleCreateBolsa} handleEdit={handleEditBolsa} handleDelete={handleDeleteBolsa}
            />
          )}

          {section === "editais" && <EditaisSection />}
          {section === "horarios" && <HorariosSection />}
        </main>
      </div>
    </div>
  );
}