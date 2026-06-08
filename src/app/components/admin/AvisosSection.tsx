interface Aviso {
    id: number;
    title: string;
    description: string;
    type: string;
}

interface AvisosSectionProps {
    avisos: Aviso[];
    title: string;
    description: string;
    showForm: boolean;
    editingId: number | null;

    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setShowForm: (value: boolean) => void;
    setEditingId: (value: number | null) => void;

    handleCreate: () => void;
    handleEdit: (aviso: Aviso) => void;
    handleDelete: (id: number) => void;
}

export function AvisosSection({
    avisos,
    title,
    description,
    showForm,
    editingId,
    setTitle,
    setDescription,
    setShowForm,
    setEditingId,
    handleCreate,
    handleEdit,
    handleDelete,
}: AvisosSectionProps) {
    return (
        <>
            {/* título */}
            <div className="flex items-center justify-between mb-6">
                <div>
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

            {/* botão */}
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

            {/* formulário */}
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

                            <p className="text-gray-600 text-sm">
                                {aviso.description}
                            </p>
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
    );
}