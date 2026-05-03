"use client";
import { Search, Plus, User } from "lucide-react";

export default function Header({ view, setView, onSubmit }) {
  return (
    <header className="border-b-4 border-black bg-[#FFF6BD] sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button onClick={() => setView("feed")} className="flex items-baseline gap-2 group">
            <span className="font-serif text-3xl tracking-tight text-black italic font-bold">Forge</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/60 group-hover:text-[#FF2D87] transition-colors font-bold">/for MBAs</span>
          </button>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {[
              { id: "feed", label: "Discover" },
              { id: "categories", label: "Categories" },
              { id: "leaderboard", label: "Leaderboard" },
              { id: "saved", label: "Saved" },
            ].map((v) => (
              <button key={v.id} onClick={() => setView(v.id)}
                className={`font-bold tracking-wide uppercase text-xs transition-all relative ${view === v.id ? "text-black" : "text-black/50 hover:text-black"}`}>
                {v.label}
                {v.id === "leaderboard" && <span className="ml-1 text-[#FF2D87]">★</span>}
                {view === v.id && <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FF2D87]"></span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-black/60 hover:text-black transition-colors">
            <Search className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button onClick={onSubmit}
            className="flex items-center gap-2 bg-black text-[#FFD800] px-4 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-[#FF2D87] hover:text-white transition-all border-2 border-black hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#7C3AED]">
            <Plus className="w-4 h-4" strokeWidth={3} />
            <span>Submit</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#7C3AED] border-2 border-black flex items-center justify-center hover:bg-[#FF2D87] transition-colors shadow-[3px_3px_0_0_#000]">
            <User className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
