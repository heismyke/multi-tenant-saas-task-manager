import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../api/auth";
import { AuthLayout } from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organizationName: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      const auth = await registerUser(form);
      setSession(auth);
      navigate("/dashboard");
    } catch {
      setError("Could not create account. The email may already be registered.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <AuthLayout title="Create an isolated workspace" subtitle="Registering creates an organization and links your first user to it.">
      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="organizationName" className="text-sm font-medium text-slate-700">
            Organization name
          </label>
          <input
            id="organizationName"
            value={form.organizationName}
            onChange={(event) => updateField("organizationName", event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600 sm:col-span-2">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:col-span-2"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          {isSubmitting ? "Creating account" : "Register"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand hover:text-teal-800">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

