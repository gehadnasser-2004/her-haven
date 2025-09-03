export default function LandingNav({children}) {
  return (
    <nav className="w-full flex items-center justify-between p-2 bg-white shadow">
      <div className="flex items-center space-x-2 ml-3">
        <img src="/Logo.png" alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-lg font-bold">Her Haven</span>
      </div>
      {children}
    </nav>
  );
}
