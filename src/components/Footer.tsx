export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gray-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black" style={{ background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              FITLOG
            </span>
            <span className="text-gray-500 text-sm">— Workout Library</span>
          </div>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} FitLog — Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}
