import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-950 px-4 text-center">
      <div className="text-7xl">🏋️</div>
      <h1 className="text-5xl font-black text-white sm:text-6xl">404</h1>
      <p className="text-xl font-bold text-gray-300">Page Not Found</p>
      <p className="max-w-sm text-sm text-gray-500">
        Looks like this page skipped leg day and disappeared. Head back to the library.
      </p>
      <button
        onClick={() => navigate("/")}
        className="rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
        style={{ background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" }}
      >
        Back to Library
      </button>
    </div>
  );
}
