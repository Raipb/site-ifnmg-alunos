import { useEffect, useState } from "react";

interface Edital {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    status: string;
    link: string;
}

export function EditaisSection() {
    const [editais, setEditais] = useState<Edital[]>([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [status, setStatus] = useState("Aberto");
    const [link, setLink] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/editais")
            .then((res) => res.json())
            .then((data) => setEditais(data));
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:3000/editais/${id}`, {
            method: "DELETE",
        });

        setEditais((prev) => prev.filter((edital) => edital.id !== id));
    };

    const handleSave = async () => {
        if (!titulo || !descricao || !data || !link) return;

        const payload = {
            titulo,
            descricao,
            data,
            status,
            link,
        };

        if (editingId) {
            const response = await fetch(
                `http://localhost:3000/editais/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const editalAtualizado = await response.json();

            setEditais((prev) =>
                prev.map((edital) =>
                    edital.id === editingId ? editalAtualizado : edital
                )
            );
        } else {
            const response = await fetch(
                "http://localhost:3000/editais",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const novoEdital = await response.json();

            setEditais((prev) => [...prev, novoEdital]);
        }

        setTitulo("");
        setDescricao("");
        setData("");
        setStatus("Aberto");
        setLink("");
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (edital: Edital) => {
        setTitulo(edital.titulo);
        setDescricao(edital.descricao);
        setData(edital.data);
        setStatus(edital.status);
        setLink(edital.link);

        setEditingId(edital.id);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        Gerenciamento de Editais
                    </h2>

                    <p className="text-gray-500 text-sm">
                        Cadastre e mantenha os editais do sistema.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                    {showForm ? "Fechar" : "Novo Edital"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl border shadow mb-6 space-y-3">
                    <input
                        type="text"
                        placeholder="Título"
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

                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option>Aberto</option>
                        <option>Em breve</option>
                        <option>Encerrado</option>
                    </select>

                    <input
                        type="url"
                        placeholder="Link do edital"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <button
                        onClick={handleSave}
                        className="bg-green-700 text-white px-5 py-3 rounded-xl"
                    >
                        Salvar Edital
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {editais.map((edital) => (
                    <div
                        key={edital.id}
                        className="bg-white border rounded-xl p-5 shadow"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{edital.titulo}</h3>

                                <p className="text-gray-600 text-sm">
                                    {edital.descricao}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {edital.data} • {edital.status}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(edital)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(edital.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
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