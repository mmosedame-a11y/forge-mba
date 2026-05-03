"use client";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-[#7C3AED] mt-16 relative overflow-hidden">
      <div className="absolute -top-12 right-12 w-24 h-24 rounded-full bg-[#FFD800] border-4 border-black hidden lg:block"></div>
      <div className="absolute -bottom-8 left-1/3 w-16 h-16 bg-[#FF2D87] border-4 border-black rotate-45 hidden lg:block"></div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 relative">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl italic text-[#FFD800] mb-3 font-bold">Forge</div>
            <p className="text-sm text-white/90 leading-relaxed max-w-md font-medium">
              The AI hack library for MBA students. Pulled from the people actually using them — turned into steps you can run before your 9am.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#FFD800] mb-3 font-bold">Browse</div>
            <ul className="space-y-2 text-sm text-white">
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">Recruiting hacks</a></li>
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">Case prep</a></li>
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">By school</a></li>
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">Leaderboard</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#FFD800] mb-3 font-bold">About</div>
            <ul className="space-y-2 text-sm text-white">
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">How it works</a></li>
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">Submit a hack</a></li>
              <li><a className="hover:text-[#FFD800] transition-colors cursor-pointer">Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-white/30 pt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80 font-medium">
          <span>© 2026 Forge — Every hack credits its source.</span>
          <span className="italic font-serif text-[#FFD800] font-bold">Built for the recruiting season.</span>
        </div>
      </div>
    </footer>
  );
}
