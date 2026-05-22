import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    navigate(`/task/${task.id}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className="bg-slate-400 w-full flex items-center justify-center gap-2 text-white p-2 rounded-md transition-all"
          >
            <span
              className={`transition-all ${
                task.isCompleted ? "opacity-100" : "opacity-0"
              }`}
            >
              ✅
            </span>

            <span
              className={`break-words text-center ${task.isCompleted ? "line-through" : ""}`}
            >
              {task.title}
            </span>
          </button>

          <Button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>

          <Button onClick={() => onDeleteTaskClick(task.id)}>
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
