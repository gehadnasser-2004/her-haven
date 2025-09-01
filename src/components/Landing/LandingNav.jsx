export default function LandingNav() {
  return (
    <nav className="w-full flex items-center justify-between p-3 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Logo" className="w-12 h-12 object-contain" />
        <span className="text-lg font-bold">Her Haven</span>
      </div>

      <div className="space-x-4">
        <button className="text-gray-100">Login</button>
        <button className="text-white">Get Started</button>
      </div>
    </nav>
  );
}
