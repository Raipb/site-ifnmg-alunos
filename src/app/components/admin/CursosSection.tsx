import { useState } from "react";

interface Curso {
  id: number;
  titulo: string;
  modalidade: string;
  descricao: string;
  duracao: string;
  horario: string;
  nivel: string;
}

interface CursosSectionProps {
  cursos: Curso[];

  tituloCurso: string;
  modalidadeCurso: string;
  descricaoCurso: string;
  duracaoCurso: string;
  horarioCurso: string;
  nivel: string;

  showForm: boolean;
  editingId: number | null;

  setTituloCurso: (value: string) => void;
  setModalidadeCurso: (value: string) => void;
  setDescricaoCurso: (value: string) => void;
  setDuracaoCurso: (value: string) => void;
  setHorarioCurso: (value: string) => void;
  setNivel: (value: string) => void;

  setShowForm: (value: boolean) => void;
  setEditingId: (value: number | null) => void;

  handleCreate: () => void;
  handleEdit: (curso: Curso) => void;
  handleDelete: (id: number) => void;
}

export function CursosSection({
  cursos,

  tituloCurso,
  modalidadeCurso,
  descricaoCurso,
  duracaoCurso,
  horarioCurso,
  nivel,

  showForm,
  editingId,

  setTituloCurso,
  setModalidadeCurso,
  setDescricaoCurso,
  setDuracaoCurso,
  setHorarioCurso,
  setNivel,

  setShowForm,
  setEditingId,

  handleCreate,
  handleEdit,
  handleDelete,
}: CursosSectionProps) {
  return (
    <>
      {/* título */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500">
            Gerencie os cursos exibidos no portal do ingressante.
          </p>
        </div>
      </div>

      {/* estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow border">
          <h3 className="text-gray-500 text-sm">Cursos</h3>
          <p className="text-3xl font-bold text-green-700">
            {cursos.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow border">
          <h3 className="text-gray-500 text-sm">Técnicos</h3>
          <p className="text-3xl font-bold text-green-700">
            {cursos.filter(c => c.nivel === "Técnico").length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow border">
          <h3 className="text-gray-500 text-sm">Superiores</h3>
          <p className="text-3xl font-bold text-green-700">
            {cursos.filter(c => c.nivel === "Superior").length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow border">
          <h3 className="text-gray-500 text-sm">Total</h3>
          <p className="text-3xl font-bold text-green-700">
            {cursos.length}
          </p>
        </div>
      </div>

      {/* botão */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Gerenciamento de Cursos
          </h2>

          <p className="text-gray-500 text-sm">
            Cadastre, edite ou remova cursos exibidos no portal.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);

            if (!showForm) {
              setTituloCurso("");
              setModalidadeCurso("");
              setDescricaoCurso("");
              setDuracaoCurso("");
              setHorarioCurso("");
              setNivel("Técnico");

              setEditingId(null);
            }
          }}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow transition"
        >
          {showForm ? "Fechar" : "Novo Curso"}
        </button>
      </div>

      {/* formulário */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingId ? "Editar Curso" : "Novo Curso"}
          </h2>

          <input
            type="text"
            placeholder="Título"
            value={tituloCurso}
            onChange={(e) => setTituloCurso(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Modalidade"
            value={modalidadeCurso}
            onChange={(e) => setModalidadeCurso(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <textarea
            placeholder="Descrição"
            value={descricaoCurso}
            onChange={(e) => setDescricaoCurso(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Duração"
            value={duracaoCurso}
            onChange={(e) => setDuracaoCurso(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Horário"
            value={horarioCurso}
            onChange={(e) => setHorarioCurso(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="Técnico">Técnico</option>
            <option value="Superior">Superior</option>
          </select>

          <button
            onClick={handleCreate}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow transition"
          >
            Salvar Curso
          </button>
        </div>
      )}

      {/* lista */}
      <div className="space-y-4">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <h2 className="font-semibold">
                {curso.titulo}
              </h2>

              <p className="text-gray-600 text-sm">
                {curso.modalidade}
              </p>

              <p className="text-gray-600 text-sm">
                {curso.descricao}
              </p>

              <p className="text-gray-600 text-sm">
                {curso.duracao}
              </p>

              <p className="text-gray-600 text-sm">
                {curso.horario}
              </p>

              <p className="text-gray-600 text-sm">
                {curso.nivel}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(curso)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(curso.id)}
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