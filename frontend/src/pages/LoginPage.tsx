import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../api/auth";
import { AuthLayout } from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      const auth = await loginUser(form);
      setSession(auth);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Sign in to your workspace" subtitle="Tasks are scoped by the organization attached to your JWT.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="mt-2 min-h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="mt-2 min-h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-teal-100"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          {isSubmitting ? "Signing in" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        Need an organization?{" "}
        <Link to="/register" className="font-semibold text-brand hover:text-teal-800">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

