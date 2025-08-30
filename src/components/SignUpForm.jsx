import { useMemo, useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";

function strengthScore(pw) {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 5);
}

function SignUpForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pwScore = useMemo(() => strengthScore(values.password), [values.password]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Your full name is required";
    if (!values.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email";
    if (!values.password) next.password = "Password is required";
    else if (values.password.length < 8) next.password = "At least 8 characters";
    if (!values.confirmPassword) next.confirmPassword = "Please confirm your password";
    else if (values.confirmPassword !== values.password) next.confirmPassword = "Passwords do not match";
    if (!values.accept) next.accept = "You must agree to the terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSuccess(false);
    try {
      await new Promise((res) => setTimeout(res, 900));
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const strengthLabels = ["Very weak", "Weak", "Fair", "Good", "Strong"]; // for scores 1..5

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          <ShieldCheck className="h-4 w-4" />
          Account created successfully! Check your inbox to verify your email.
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-white/80">
          Full name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            value={values.name}
            onChange={onChange}
            autoComplete="name"
            className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-sky-400/40 focus:bg-white/10"
          />
        </div>
        {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-white/80">
          Email address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={values.email}
            onChange={onChange}
            autoComplete="email"
            className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-sky-400/40 focus:bg-white/10"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-white/80">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={values.password}
            onChange={onChange}
            autoComplete="new-password"
            className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-10 py-3 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-sky-400/40 focus:bg-white/10"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-rose-300">{errors.password}</p>}

        <div className="mt-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-full rounded ${i <= pwScore ? "bg-emerald-400" : "bg-white/10"}`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-white/60">
            Strength: {pwScore === 0 ? "—" : strengthLabels[pwScore - 1]}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm text-white/80">
          Confirm password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Repeat your password"
            value={values.confirmPassword}
            onChange={onChange}
            autoComplete="new-password"
            className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-sky-400/40 focus:bg-white/10"
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-rose-300">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="accept"
          name="accept"
          type="checkbox"
          checked={values.accept}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 text-sky-500 focus:ring-0"
        />
        <label htmlFor="accept" className="text-sm text-white/80">
          I agree to the
          <a href="#" className="mx-1 text-sky-300 hover:underline">Terms</a>
          and
          <a href="#" className="ml-1 text-sky-300 hover:underline">Privacy Policy</a>.
        </label>
      </div>
      {errors.accept && <p className="-mt-2 text-xs text-rose-300">{errors.accept}</p>}

      <button
        type="submit"
        disabled={loading}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400/0 via-white/10 to-sky-400/0 opacity-0 transition group-hover:opacity-100" />
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-white/70">
        Already have an account?
        <a href="#" className="ml-1 text-sky-300 hover:underline">Sign in</a>
      </p>
    </form>
  );
}

export default SignUpForm;
