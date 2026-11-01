import { ChevronLeft, ChevronRight, User } from 'lucide-react'; // Or use react-icons

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#121212] text-white sticky top-0 z-10">
      {/* Left: Back / Forward History Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white transition"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => window.history.forward()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white transition"
          aria-label="Go forward"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Right: Action / Profile / Install Buttons */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#282828] hover:bg-[#3e3e3e] cursor-pointer transition">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;