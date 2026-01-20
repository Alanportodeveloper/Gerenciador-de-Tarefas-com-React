import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onTaskEdit }) {
  const navigate = useNavigate();
  const [editingTaskId, setEditingTaskId] = useState(null);

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <div
            className={`bg-slate-400 w-full flex items-start gap-2 text-white p-2 rounded-md ${
              task.isCompleted && "line-through"
            }`}
          >
            <button onClick={() => onTaskClick(task.id)}>✅</button>

            {editingTaskId === task.id ? (
              <input
                className="flex-1 px-2 py-1 rounded text-slate-800 min-w-0"
                value={task.title}
                onChange={(e) => onTaskEdit(task.id, e.target.value)}
                onBlur={() => setEditingTaskId(null)}
                autoFocus
              />
            ) : (
              <span
                className="flex-1 break-words min-w-0 cursor-pointer"
                onDoubleClick={() => setEditingTaskId(task.id)}
              >
                {task.title}
              </span>
            )}
          </div>

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
