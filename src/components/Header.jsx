import { Rocket } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-white/70">Start your journey in less than a minute.</p>
        </div>
      </div>
      <a
        href="#"
        className="hidden rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10 lg:inline-block"
      >
        Need help?
      </a>
    </header>
  );
}

export default Header;
