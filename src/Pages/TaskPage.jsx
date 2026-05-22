import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const task = storedTasks.find((t) => String(t.id) === String(id));

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  if (!task) {
    return (
      <div className="min-h-screen bg-slate-500 flex items-center justify-center text-white">
        Tarefa não encontrada
      </div>
    );
  }

  function handleSave() {
    const updatedTasks = storedTasks.map((t) =>
      String(t.id) === String(id)
        ? {
            ...t,
            title,
            description,
          }
        : t,
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsEditing(false);
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-[500px]">
        {/* HEADER */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-white rounded-md p-2 hover:bg-slate-700 transition-colors"
          >
            <ChevronLeftIcon />
          </button>

          <Title>Detalhes da Tarefa</Title>
        </div>

        {/* CARD */}
        <div className="relative">
          {/* BOTÃO EDITAR (responsivo) */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute right-2 top-2 sm:-right-12 sm:top-0 bg-slate-600 text-white rounded-md p-2 hover:bg-slate-700 transition-colors"
            >
              <PencilIcon size={22} />
            </button>
          )}

          {/* CARD CONTENT */}
          <div className="bg-slate-200 rounded-md p-4 sm:p-6 shadow">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-md border border-slate-300 text-slate-700 text-center"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded-md border border-slate-300 text-slate-700 resize-none h-32 text-center"
                />

                <button
                  onClick={handleSave}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-md"
                >
                  Salvar edição
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="font-bold text-xl text-slate-700 break-words">
                  {title}
                </h2>

                <p className="text-slate-500 mt-2 break-words">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
