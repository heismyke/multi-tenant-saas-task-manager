import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import type { Task } from "../types";

export const TaskList = ({ tasks, isLoading }: { tasks: Task[]; isLoading: boolean }) => {
  if (isLoading) {
    return <div className="rounded-lg border border-line bg-white p-5 text-sm text-slate-600">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
        <FontAwesomeIcon icon={faListCheck} className="text-3xl text-brand" />
        <h2 className="mt-4 text-lg font-semibold text-ink">No tasks yet</h2>
        <p className="mt-1 text-sm text-slate-600">Create the first task for your organization.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <div className="border-b border-line px-5 py-4">
        <h2 className="text-base font-semibold text-ink">Organization tasks</h2>
      </div>
      <ul className="divide-y divide-line">
        {tasks.map((task) => (
          <li key={task.id} className="px-5 py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium text-ink">{task.title}</p>
              <p className="text-xs text-slate-500">{new Date(task.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="mt-1 text-sm text-slate-600">Created by {task.creator.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

