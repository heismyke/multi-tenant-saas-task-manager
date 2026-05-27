import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBuilding, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { getTasks } from "../api/tasks";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, organization, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setTasks(await getTasks());
      } catch {
        setError("Could not load tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-ink">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">SaaS Task Manager</p>
            <h1 className="mt-1 text-2xl font-semibold">Dashboard</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-brand">
                <FontAwesomeIcon icon={faBuilding} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Organization</p>
                <p className="font-semibold">{organization?.name}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Signed in as</p>
            <p className="mt-2 font-semibold">{user?.name}</p>
            <p className="text-sm text-slate-600">{user?.email}</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-ink">
                <FontAwesomeIcon icon={faListCheck} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tasks</p>
                <p className="font-semibold">{tasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <TaskForm onCreated={(task) => setTasks((current) => [task, ...current])} />
          <div>
            {error ? <p className="mb-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
            <TaskList tasks={tasks} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </main>
  );
};

