import { Github } from "lucide-react";

function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
        onClick={() => alert("Social sign-in is not enabled in this demo.")}
      >
        <Github className="h-4 w-4" />
        Continue with GitHub
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
        onClick={() => alert("Social sign-in is not enabled in this demo.")}
      >
        ✉️ Continue with Email Link
      </button>
    </div>
  );
}

export default SocialAuthButtons;
