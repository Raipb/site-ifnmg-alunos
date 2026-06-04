import { useEffect, useState } from "react";

interface Horario {
    id: number;
    titulo: string;
    descricao: string;
    tipo: string;
    link: string;
    updatedAt: string;
}

export function HorariosSection() {
    const [horarios, setHorarios] = useState<Horario[]>([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("Horário de Aulas");
    const [link, setLink] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/horarios")
            .then((res) => res.json())
            .then((data) => setHorarios(data));
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:3000/horarios/${id}`, {
            method: "DELETE",
        });

        setHorarios((prev) => prev.filter((h) => h.id !== id));
    };

    const handleSave = async () => {
        if (!titulo || !descricao || !link) return;

        const payload = { titulo, descricao, tipo, link };

        if (editingId) {
            const response = await fetch(
                `http://localhost:3000/horarios/${editingId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const atualizado = await response.json();

            setHorarios((prev) =>
                prev.map((h) => (h.id === editingId ? atualizado : h))
            );
        } else {
            const response = await fetch("http://localhost:3000/horarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const novo = await response.json();

            setHorarios((prev) => [...prev, novo]);
        }

        setTitulo("");
        setDescricao("");
        setTipo("Horário de Aulas");
        setLink("");
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (horario: Horario) => {
        setTitulo(horario.titulo);
        setDescricao(horario.descricao);
        setTipo(horario.tipo);
        setLink(horario.link);
        setEditingId(horario.id);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-gray-500 text-sm">
                        Cadastre e atualize os links de horários e calendário acadêmico.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (!showForm) {
                            setTitulo("");
                            setDescricao("");
                            setTipo("Horário de Aulas");
                            setLink("");
                            setEditingId(null);
                        }
                    }}
                    className="bg-green-700 text-white px-5 py-3 rounded-xl hover:bg-green-800 transition"
                >
                    {showForm ? "Fechar" : "Novo Documento"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl border shadow mb-6 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {editingId ? "Editar Documento" : "Novo Documento"}
                    </h3>

                    <input
                        type="text"
                        placeholder="Título (ex: Horário 1º Semestre 2026)"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option>Horário de Aulas</option>
                        <option>Calendário Acadêmico</option>
                    </select>

                    <input
                        type="url"
                        placeholder="Link do documento (PDF, Google Drive, etc)"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <button
                        onClick={handleSave}
                        className="bg-green-700 text-white px-5 py-3 rounded-xl hover:bg-green-800 transition"
                    >
                        Salvar Documento
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {horarios.length === 0 && (
                    <div className="bg-white border rounded-xl p-8 shadow text-center text-gray-400">
                        Nenhum documento cadastrado ainda.
                    </div>
                )}

                {horarios.map((horario) => (
                    <div
                        key={horario.id}
                        className="bg-white border rounded-xl p-5 shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{horario.titulo}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                                        ${horario.tipo === "Calendário Acadêmico"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-green-100 text-green-700"
                                        }`}>
                                        {horario.tipo}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm">{horario.descricao}</p>

                                <a
                                    href={horario.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-700 text-sm underline mt-1 inline-block hover:text-green-900 transition"
                                >
                                    Acessar documento
                                </a>
                            </div>

                            <div className="flex gap-2 ml-4 flex-shrink-0">
                                <button
                                    onClick={() => handleEdit(horario)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(horario.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}