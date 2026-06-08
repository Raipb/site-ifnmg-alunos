interface Contato {
  id: number;
  nome: string;
  funcao: string;
  horario: string;
  email: string;
  telefone: string;
  categoria: string;
}

interface ContatosSectionProps {
  contatos: Contato[];

  nome: string;
  funcao: string;
  horario: string;
  email: string;
  telefone: string;
  categoria: string;

  showForm: boolean;
  editingId: number | null;

  setNome: (value: string) => void;
  setFuncao: (value: string) => void;
  setHorario: (value: string) => void;
  setEmail: (value: string) => void;
  setTelefone: (value: string) => void;
  setCategoria: (value: string) => void;

  setShowForm: (value: boolean) => void;
  setEditingId: (value: number | null) => void;

  handleCreate: () => void;
  handleEdit: (contato: Contato) => void;
  handleDelete: (id: number) => void;
}

export function ContatosSection({
  contatos,
  nome,
  funcao,
  horario,
  email,
  telefone,
  categoria,
  showForm,
  editingId,

  setNome,
  setFuncao,
  setHorario,
  setEmail,
  setTelefone,
  setCategoria,

  setShowForm,
  setEditingId,

  handleCreate,
  handleEdit,
  handleDelete,
}: ContatosSectionProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Gerenciamento de Contatos</h2>

          <p className="text-gray-500 text-sm">
            Cadastre, edite ou remova contatos institucionais.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);

            if (!showForm) {
              setEditingId(null);
            }
          }}
          className="bg-green-700 text-white px-5 py-3 rounded-xl"
        >
          {showForm ? "Fechar" : "Novo Contato"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow border mb-6 space-y-3">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Função"
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Horário"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <button
            onClick={handleCreate}
            className="bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            Salvar Contato
          </button>
        </div>
      )}

      <div className="space-y-4">
        {contatos.map((contato) => (
          <div
            key={contato.id}
            className="bg-white rounded-xl shadow border p-5 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{contato.nome}</h3>

              <p>{contato.funcao}</p>

              <p className="text-sm text-gray-500">{contato.email}</p>

              <p className="text-sm text-gray-500">{contato.telefone}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(contato)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(contato.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
