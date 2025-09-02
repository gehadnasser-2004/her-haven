export default function LandingNav() {
  return (
    <nav className="w-full flex items-center justify-between p-2 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-lg font-bold">Her Haven</span>
      </div>

      <div className="space-x-4">
        <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px]">
          Login
        </button>
        <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px]">
          Get Started
        </button>
      </div>
    </nav>
  );
}
