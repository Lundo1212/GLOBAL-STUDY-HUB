export default function PageLayout({ title, children }) {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* MOVING BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/bg1.jpeg')] bg-cover bg-center animate-slowPan"></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* CONTENT */}
      <div className="relative z-10 p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-blue-500 mb-6 uppercase">
          {title}
        </h1>

        {children}

      </div>
    </div>
  );
}