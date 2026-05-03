"use client";
import { useState } from "react";
import { Trophy, Flame, School, Crown, Medal, Star, Plus } from "lucide-react";
import { TOP_CONTRIBUTORS, RISING_STARS, SCHOOL_LEADERBOARD, cat } from "../lib/data";

function ContributorsBoard() {
  const top3 = TOP_CONTRIBUTORS.slice(0, 3);
  const rest = TOP_CONTRIBUTORS.slice(3);

  return (
    <>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-5 font-bold">─── The podium</div>
        <div className="grid md:grid-cols-3 gap-5">
          {[top3[1], top3[0], top3[2]].map((u) => {
            const realRank = u.rank;
            const medals = { 1: { bg: "#FFD800", icon: Crown, label: "1st" }, 2: { bg: "#E5E5E5", icon: Medal, label: "2nd" }, 3: { bg: "#D4934D", icon: Medal, label: "3rd" } };
            const m = medals[realRank];
            const Icon = m.icon;
            const elevation = realRank === 1 ? "md:-translate-y-4" : realRank === 2 ? "md:-translate-y-1" : "";
            return (
              <div key={u.handle} className={`bg-white p-6 transition-all hover:shadow-[8px_8px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] ${elevation} cursor-pointer`}
                style={{ border: "4px solid #000", boxShadow: realRank === 1 ? "8px 8px 0 0 #FF2D87" : "6px 6px 0 0 #000" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center font-serif text-xl font-bold border-2 border-black"
                      style={{ background: m.bg }}>
                      <Icon className="w-5 h-5 text-black" strokeWidth={2.5} fill="currentColor" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black font-bold">{m.label} place</span>
                  </div>
                  {u.verified && (
                    <span className="text-[9px] uppercase tracking-wider px-2 py-1 bg-[#3B82F6] text-white font-bold border-2 border-black">.edu ✓</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full border-3 border-black flex items-center justify-center font-serif text-xl font-bold text-white"
                    style={{ background: u.color, borderWidth: "3px" }}>
                    {u.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-xl font-bold text-black truncate">{u.name}</div>
                    <div className="text-xs text-black/60 font-bold flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-[#FFF6BD] border border-black">{u.school}</span>
                      <span>{u.year}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border-2 border-black p-2 text-center bg-[#FFE0EE]">
                    <div className="font-serif text-2xl font-bold text-black">{u.hacks}</div>
                    <div className="text-[9px] uppercase tracking-wider text-black/70 font-bold">Hacks</div>
                  </div>
                  <div className="border-2 border-black p-2 text-center bg-[#E9DDFF]">
                    <div className="font-serif text-2xl font-bold text-black">{(u.totalVotes/1000).toFixed(1)}k</div>
                    <div className="text-[9px] uppercase tracking-wider text-black/70 font-bold">Votes</div>
                  </div>
                  <div className="border-2 border-black p-2 text-center bg-[#CFF7F0]">
                    <div className="font-serif text-2xl font-bold text-black flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-[#FFD800] text-black" strokeWidth={2.5} />
                      {u.avgRating}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-black/70 font-bold">Rating</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-5 font-bold">─── The rest of the top 10</div>
        <div className="bg-white overflow-x-auto" style={{ border: "3px solid #000" }}>
          <table className="w-full">
            <thead>
              <tr className="bg-black text-[#FFD800]">
                <th className="text-left p-3 text-[10px] uppercase tracking-[0.2em] font-bold">Rank</th>
                <th className="text-left p-3 text-[10px] uppercase tracking-[0.2em] font-bold">Member</th>
                <th className="text-left p-3 text-[10px] uppercase tracking-[0.2em] font-bold hidden md:table-cell">Specialty</th>
                <th className="text-right p-3 text-[10px] uppercase tracking-[0.2em] font-bold">Hacks</th>
                <th className="text-right p-3 text-[10px] uppercase tracking-[0.2em] font-bold">Votes</th>
                <th className="text-right p-3 text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:table-cell">Rating</th>
                <th className="text-right p-3 text-[10px] uppercase tracking-[0.2em] font-bold hidden md:table-cell">Streak</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((u, i) => {
                const c = cat(u.topCategory);
                return (
                  <tr key={u.handle} className={`hover:bg-[#FFF6BD] transition-colors cursor-pointer ${i !== rest.length - 1 ? "border-b-2 border-black/10" : ""}`}>
                    <td className="p-3">
                      <span className="font-serif text-2xl font-bold italic text-black/30">{u.rank}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                          style={{ background: u.color }}>
                          {u.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-black text-sm flex items-center gap-1.5">
                            {u.name}
                            {u.verified && <span className="text-[8px] uppercase px-1 py-0.5 bg-[#3B82F6] text-white font-bold">✓</span>}
                          </div>
                          <div className="text-[10px] text-black/60 font-bold">{u.school} · {u.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 font-bold border-2 border-black"
                        style={{ background: c.bg, color: c.text }}>
                        {c.label}
                      </span>
                    </td>
                    <td className="p-3 text-right font-serif text-lg font-bold text-black">{u.hacks}</td>
                    <td className="p-3 text-right">
                      <span className="font-serif text-lg font-bold text-[#FF2D87]">{(u.totalVotes/1000).toFixed(1)}k</span>
                    </td>
                    <td className="p-3 text-right hidden sm:table-cell">
                      <div className="flex items-center justify-end gap-1 text-sm font-bold text-black">
                        <Star className="w-3 h-3 fill-[#FFD800] text-black" strokeWidth={2.5} />
                        {u.avgRating}
                      </div>
                    </td>
                    <td className="p-3 text-right hidden md:table-cell">
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6A1F]">
                        <Flame className="w-3 h-3" strokeWidth={2.5} fill="currentColor" />
                        {u.streak}w
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function RisingBoard() {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-3 font-bold">─── New voices, climbing fast</div>
      <p className="text-black/70 mb-6 max-w-2xl">Members who joined in the last 30 days and are already getting noticed. Vote them up if they deserve it.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {RISING_STARS.map((u) => (
          <div key={u.handle} className="bg-white p-5 transition-all hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
            style={{ border: "3px solid #000" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-serif text-3xl italic font-bold" style={{ color: u.color, WebkitTextStroke: "1.5px black" }}>
                #{u.rank}
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#FF6A1F] text-white text-[10px] uppercase tracking-wider font-bold border-2 border-black">
                <Flame className="w-3 h-3" strokeWidth={2.5} fill="currentColor" />
                Rising
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-bold text-white text-lg"
                style={{ background: u.color }}>
                {u.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-black">{u.name}</div>
                <div className="text-[11px] text-black/60 font-bold">{u.school} · {u.year}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="border-2 border-black p-2 text-center bg-[#FFF6BD]">
                <div className="font-serif text-xl font-bold text-black">{u.hacks}</div>
                <div className="text-[9px] uppercase tracking-wider text-black/70 font-bold">Hacks</div>
              </div>
              <div className="border-2 border-black p-2 text-center bg-[#FFE0EE]">
                <div className="font-serif text-xl font-bold text-[#FF2D87]">+{u.weeklyVotes}</div>
                <div className="text-[9px] uppercase tracking-wider text-black/70 font-bold">Weekly</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolsBoard() {
  const max = SCHOOL_LEADERBOARD[0].votes;
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-3 font-bold">─── School vs. school</div>
      <p className="text-black/70 mb-6 max-w-2xl">Whose cohort contributes the most? Share Forge with classmates to climb the rankings — and earn your school more bragging rights.</p>
      <div className="space-y-3">
        {SCHOOL_LEADERBOARD.map((s) => {
          const pct = (s.votes / max) * 100;
          const isTop = s.rank <= 3;
          const colors = ["#FFD800", "#FF2D87", "#7C3AED", "#00C2A8", "#FF6A1F", "#3B82F6", "#EC4899", "#A855F7"];
          return (
            <div key={s.school} className="bg-white p-4 lg:p-5 transition-all hover:shadow-[4px_4px_0_0_#000]"
              style={{ border: "3px solid #000" }}>
              <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="font-serif text-3xl italic font-bold flex-shrink-0" style={{ color: colors[s.rank - 1], WebkitTextStroke: "1.5px black" }}>
                    {String(s.rank).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-xl font-bold text-black flex items-center gap-2">
                      {s.school}
                      {isTop && <Trophy className="w-4 h-4 text-[#FFD800] flex-shrink-0" strokeWidth={2.5} fill="currentColor" />}
                    </div>
                    <div className="text-[11px] text-black/60 font-bold uppercase tracking-wider">
                      {s.contributors} contributors · {s.hacks} hacks
                    </div>
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#FF2D87] whitespace-nowrap">
                  {(s.votes / 1000).toFixed(1)}k <span className="text-xs uppercase tracking-wider text-black/60 font-bold">votes</span>
                </div>
              </div>
              <div className="h-3 bg-[#FAFAF7] border-2 border-black overflow-hidden">
                <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: colors[s.rank - 1] }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function YourStanding({ onSubmit }) {
  return (
    <div className="mt-12 pt-8 border-t-4 border-black">
      <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-3 font-bold">─── Your standing</div>
      <div className="bg-[#FFD800] p-6 lg:p-8 grid md:grid-cols-3 gap-6 items-center"
        style={{ border: "4px solid #000", boxShadow: "8px 8px 0 0 #000" }}>
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl text-black mb-2 font-bold">You're <span className="italic">unranked</span> — for now.</h3>
          <p className="text-black/80 leading-relaxed font-medium">
            Submit your first hack to enter the leaderboard. Members who post 3 hacks in their first week land on the Rising Stars board within hours.
          </p>
        </div>
        <button onClick={onSubmit} className="bg-black text-[#FFD800] px-5 py-3 text-sm font-bold uppercase tracking-wider hover:bg-[#FF2D87] hover:text-white transition-all border-2 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#7C3AED]">
          <Plus className="w-4 h-4" strokeWidth={3} />
          Submit your first hack
        </button>
      </div>
    </div>
  );
}

export default function LeaderboardView({ onSubmit }) {
  const [period, setPeriod] = useState("all-time");
  const [tab, setTab] = useState("contributors");

  const periods = [
    { id: "this-week", label: "This week" },
    { id: "this-month", label: "This month" },
    { id: "all-time", label: "All-time" },
  ];

  const tabs = [
    { id: "contributors", label: "Top Contributors", icon: Trophy },
    { id: "rising", label: "Rising Stars", icon: Flame },
    { id: "schools", label: "Top Schools", icon: School },
  ];

  return (
    <main>
      <section className="border-b-4 border-black bg-[#7C3AED] relative overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#FFD800] border-4 border-black rotate-12 hidden lg:block" style={{ animation: "float 5s ease-in-out infinite" }}></div>
        <div className="absolute bottom-12 right-20 w-28 h-28 rounded-full bg-[#FF2D87] border-4 border-black hidden lg:block" style={{ animation: "float 6s ease-in-out infinite 0.8s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-[#00C2A8] border-4 border-black hidden lg:block" style={{ animation: "float 7s ease-in-out infinite 0.3s" }}></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16 relative">
          <div className="inline-flex items-center gap-2 bg-black text-[#FFD800] px-3 py-1.5 mb-5 text-[11px] uppercase tracking-[0.25em] font-bold">
            <Trophy className="w-3.5 h-3.5" strokeWidth={3} />
            The leaderboard
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95] text-white tracking-tight mb-4 font-bold">
            Who's <span className="italic text-[#FFD800]">actually</span><br />
            putting in the reps?
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed font-medium">
            Real recognition for the people building this library. Climb the ranks by sharing hacks that actually work — not the ones that just sound good.
          </p>
        </div>
      </section>

      <div className="border-b-4 border-black bg-white sticky top-[73px] z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-2 border-black transition-all ${tab === t.id ? "bg-black text-[#FFD800]" : "bg-white text-black hover:bg-[#FFF6BD]"}`}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {t.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            {periods.map((p) => (
              <button key={p.id} onClick={() => setPeriod(p.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${period === p.id ? "text-[#FF2D87]" : "text-black/50 hover:text-black"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        {tab === "contributors" && <ContributorsBoard />}
        {tab === "rising" && <RisingBoard />}
        {tab === "schools" && <SchoolsBoard />}
        <YourStanding onSubmit={onSubmit} />
      </div>
    </main>
  );
}
