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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>

        <button
          onClick={() => {
            setShowForm(!showForm);

            if (!showForm) {
              setTitle("");
              setDescription("");
              setEditingId(null);
            }
          }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? "Fechar" : "Novo Aviso"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-lg border mb-6 space-y-4">
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
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Salvar Aviso
          </button>
        </div>
      )}

      <div className="space-y-4">
        {avisos.map((aviso) => (
          <div
            key={aviso.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold">{aviso.title}</h2>

              <p className="text-gray-600 text-sm">{aviso.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(aviso)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(aviso.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
