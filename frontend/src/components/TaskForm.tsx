import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createTask } from "../api/tasks";
import type { Task } from "../types";

export const TaskForm = ({ onCreated }: { onCreated: (task: Task) => void }) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Enter a task title.");
      return;
    }

    try {
      setIsSubmitting(true);
      const task = await createTask(title);
      onCreated(task);
      setTitle("");
    } catch {
      setError("Could not create task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <label htmlFor="title" className="text-sm font-medium text-slate-700">
        New task
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="min-h-11 flex-1 rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
          placeholder="Review tenant onboarding"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FontAwesomeIcon icon={faPlus} />
          {isSubmitting ? "Creating" : "Create"}
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </form>
  );
};

