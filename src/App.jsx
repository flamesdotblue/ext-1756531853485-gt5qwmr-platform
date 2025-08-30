import Header from "./components/Header";
import SocialAuthButtons from "./components/SocialAuthButtons";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Header />

        <main className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
              <SocialAuthButtons />
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-widest text-white/60">Or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <SignUpForm />
            </div>
          </div>

          <aside className="order-1 lg:order-2 flex items-center">
            <div className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 p-8">
              <h3 className="text-2xl font-semibold">Join our community</h3>
              <p className="mt-3 text-white/70">
                Create an account to access exclusive features, save your preferences, and explore personalized content. Our sign up process is fast, secure, and takes less than a minute.
              </p>
              <ul className="mt-6 space-y-3 text-white/80">
                <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />No credit card required</li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-400" />Cancel anytime</li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-violet-400" />Privacy-first</li>
              </ul>
            </div>
          </aside>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
