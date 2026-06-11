interface Bolsa {
    id: number;
    nome: string;
    descricao: string;
    valor: string;
    requisitos: string;
    tipo: string;
    link: string;
}

interface BolsasSectionProps {
    bolsas: Bolsa[];

    nome: string;
    descricao: string;
    valor: string;
    requisitos: string;
    tipo: string;
    link: string;

    showForm: boolean;
    editingId: number | null;

    setNome: (value: string) => void;
    setDescricao: (value: string) => void;
    setValor: (value: string) => void;
    setRequisitos: (value: string) => void;
    setTipo: (value: string) => void;
    setLink: (value: string) => void;

    setShowForm: (value: boolean) => void;
    setEditingId: (value: number | null) => void;

    handleCreate: () => void;
    handleEdit: (bolsa: Bolsa) => void;
    handleDelete: (id: number) => void;
}

export function BolsasSection({
    bolsas,

    nome,
    descricao,
    valor,
    requisitos,
    tipo,
    link,

    showForm,
    editingId,

    setNome,
    setDescricao,
    setValor,
    setRequisitos,
    setTipo,
    setLink,

    setShowForm,
    setEditingId,

    handleCreate,
    handleEdit,
    handleDelete,
}: BolsasSectionProps) {
    const tipos = ["Assistência", "Acadêmica", "Pesquisa", "Extensão"];

    return (
        <>
            {/* descrição */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-gray-500">
                        Gerencie as bolsas e auxílios exibidos no portal do ingressante.
                    </p>
                </div>
            </div>

            {/* estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow border">
                    <h3 className="text-gray-500 text-sm">Total</h3>
                    <p className="text-3xl font-bold text-green-700">{bolsas.length}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                    <h3 className="text-gray-500 text-sm">Assistência</h3>
                    <p className="text-3xl font-bold text-green-700">
                        {bolsas.filter((b) => b.tipo === "Assistência").length}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                    <h3 className="text-gray-500 text-sm">Acadêmica</h3>
                    <p className="text-3xl font-bold text-green-700">
                        {bolsas.filter((b) => b.tipo === "Acadêmica").length}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow border">
                    <h3 className="text-gray-500 text-sm">Pesquisa</h3>
                    <p className="text-3xl font-bold text-green-700">
                        {bolsas.filter((b) => b.tipo === "Pesquisa").length}
                    </p>
                </div>
            </div>

            {/* botão */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Gerenciamento de Bolsas
                    </h2>

                    <p className="text-gray-500 text-sm">
                        Cadastre, edite ou remova bolsas e auxílios do portal.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setShowForm(!showForm);

                        if (!showForm) {
                            setNome("");
                            setDescricao("");
                            setValor("");
                            setRequisitos("");
                            setTipo("Assistência");
                            setLink("");
                            setEditingId(null);
                        }
                    }}
                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow transition"
                >
                    {showForm ? "Fechar" : "Nova Bolsa"}
                </button>
            </div>

            {/* formulário */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {editingId ? "Editar Bolsa" : "Nova Bolsa"}
                    </h2>

                    <input
                        type="text"
                        placeholder="Nome da bolsa (ex: Auxílio Alimentação)"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="text"
                        placeholder="Valor (ex: R$ 300,00/mês)"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="text"
                        placeholder="Requisitos"
                        value={requisitos}
                        onChange={(e) => setRequisitos(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        {tipos.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>

                    <input
                        type="url"
                        placeholder="Link para mais informações (opcional)"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    <button
                        onClick={handleCreate}
                        className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow transition"
                    >
                        Salvar Bolsa
                    </button>
                </div>
            )}

            {/* lista */}
            <div className="space-y-4">
                {bolsas.length === 0 && (
                    <div className="bg-white border rounded-xl p-8 shadow text-center text-gray-400">
                        Nenhuma bolsa cadastrada ainda.
                    </div>
                )}

                {bolsas.map((bolsa) => (
                    <div
                        key={bolsa.id}
                        className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="font-semibold">{bolsa.nome}</h2>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                                    {bolsa.tipo}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm">{bolsa.descricao}</p>
                            <p className="text-gray-600 text-sm">
                                <strong>Valor:</strong> {bolsa.valor}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Requisitos:</strong> {bolsa.requisitos}
                            </p>

                            {bolsa.link && (
                                <a
                                    href={bolsa.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-700 text-sm underline hover:text-green-900 transition"
                                >
                                    Ver mais informações
                                </a>
                            )}
                        </div>

                        <div className="flex gap-2 ml-4 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(bolsa)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleDelete(bolsa.id)}
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