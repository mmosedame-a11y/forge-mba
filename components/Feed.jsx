"use client";
import { useState, useMemo } from "react";
import { TrendingUp, Clock, Sparkles, GraduationCap, School } from "lucide-react";
import { CATEGORIES, SCHOOLS, HACKS } from "../lib/data";
import HackCard from "./HackCard";

function Hero() {
  return (
    <section className="border-b-4 border-black bg-[#FFD800] relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#FF2D87] border-4 border-black opacity-90 hidden lg:block" style={{ animation: "float 6s ease-in-out infinite" }}></div>
      <div className="absolute bottom-10 right-48 w-20 h-20 bg-[#7C3AED] border-4 border-black rotate-12 hidden lg:block" style={{ animation: "float 5s ease-in-out infinite 0.5s" }}></div>
      <div className="absolute top-32 right-60 w-12 h-12 bg-black hidden lg:block" style={{ animation: "float 7s ease-in-out infinite 1s" }}></div>
      <div className="absolute -bottom-6 left-20 w-16 h-16 rounded-full bg-[#00C2A8] border-4 border-black hidden lg:block"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20 relative">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-black text-[#FFD800] px-3 py-1.5 mb-6 text-[11px] uppercase tracking-[0.25em] font-bold">
              <GraduationCap className="w-3.5 h-3.5" strokeWidth={3} />
              For MBA students. Built by MBA students.
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl leading-[0.92] text-black tracking-tight mb-6 font-bold">
              Recruit harder.<br />
              Case smarter.<br />
              <span className="italic relative inline-block">
                Sleep more.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 600 20" preserveAspectRatio="none">
                  <path d="M2,12 Q150,2 300,10 T598,8" stroke="#FF2D87" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-black/80 max-w-2xl leading-relaxed font-medium">
              The AI hacks MBA students are actually using to crush case prep, recruit faster, and get through the term — pulled from Reddit, X, and group chats. Each one comes with reproducible steps. No theory. Just things people did.
            </p>
          </div>
          <div className="lg:col-span-4 space-y-3">
            {[
              { label: "Hacks indexed", value: "418", color: "#FF2D87" },
              { label: "Schools represented", value: "23", color: "#7C3AED" },
              { label: "Offers reported", value: "2.1k", color: "#00C2A8" },
            ].map((stat) => (
              <div key={stat.label}
                className="bg-white p-4 flex items-baseline justify-between shadow-[4px_4px_0_0_#000]"
                style={{ border: "3px solid #000" }}>
                <span className="text-black/70 uppercase tracking-wider text-[10px] font-bold">{stat.label}</span>
                <span className="font-serif text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterBar({ activeCategory, setActiveCategory, sortBy, setSortBy, school, setSchool }) {
  const sortOptions = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "top", label: "All-time", icon: Sparkles },
  ];

  return (
    <div className="border-b-4 border-black bg-white sticky top-[73px] z-30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
            <button onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-2 border-black ${activeCategory === "all" ? "bg-black text-[#FFD800]" : "bg-white text-black hover:bg-[#FFF6BD]"}`}>
              All
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-2 border-black flex items-center gap-1.5"
                style={{
                  background: activeCategory === c.id ? c.color : "white",
                  color: activeCategory === c.id ? "white" : "black",
                }}
                onMouseEnter={(e) => { if (activeCategory !== c.id) e.currentTarget.style.background = c.bg; }}
                onMouseLeave={(e) => { if (activeCategory !== c.id) e.currentTarget.style.background = "white"; }}>
                {c.label}
                <span className="text-[10px] opacity-70">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <School className="w-3.5 h-3.5 text-black/60" strokeWidth={2.5} />
            <select value={school} onChange={(e) => setSchool(e.target.value)}
              className="text-xs px-3 py-1.5 border-2 border-black bg-white text-black font-bold uppercase tracking-wider cursor-pointer hover:bg-[#FFF6BD] transition-colors">
              {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            {sortOptions.map((s) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => setSortBy(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${sortBy === s.id ? "text-[#FF2D87]" : "text-black/50 hover:text-black"}`}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Feed({ onHackClick }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("trending");
  const [school, setSchool] = useState("All schools");

  const filteredHacks = useMemo(() => {
    let h = activeCategory === "all" ? HACKS : HACKS.filter(x => x.category === activeCategory);
    if (school !== "All schools") h = h.filter(x => x.school === school);
    if (sortBy === "top") h = [...h].sort((a, b) => b.votes - a.votes);
    return h;
  }, [activeCategory, sortBy, school]);

  const featured = filteredHacks[0];
  const rest = filteredHacks.slice(1);

  return (
    <>
      <Hero />
      <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} sortBy={sortBy} setSortBy={setSortBy} school={school} setSchool={setSchool} />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        {filteredHacks.length === 0 ? (
          <div className="border-4 border-black p-16 text-center bg-[#FFF6BD] shadow-[6px_6px_0_0_#000]">
            <p className="text-black font-bold">No hacks for those filters yet. Be the first to submit one for {school}.</p>
          </div>
        ) : (
          <>
            {featured && <HackCard hack={featured} onClick={() => onHackClick(featured)} featured />}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((hack) => (
                <HackCard key={hack.id} hack={hack} onClick={() => onHackClick(hack)} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
