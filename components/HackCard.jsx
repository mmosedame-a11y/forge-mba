"use client";
import { useState } from "react";
import { ArrowUp, ArrowDown, MessageCircle, Bookmark, ExternalLink, School } from "lucide-react";
import { cat } from "../lib/data";

export default function HackCard({ hack, onClick, featured }) {
  const [voted, setVoted] = useState(null);
  const [saved, setSaved] = useState(hack.saved);
  const c = cat(hack.category);

  const handleVote = (e, dir) => { e.stopPropagation(); setVoted(voted === dir ? null : dir); };
  const voteDelta = voted === "up" ? 1 : voted === "down" ? -1 : 0;

  if (featured) {
    return (
      <article onClick={onClick}
        className="group cursor-pointer mb-12 grid lg:grid-cols-12 gap-0 border-4 border-black bg-white shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#FF2D87] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]">
        <div className="lg:col-span-3 p-6 lg:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-between" style={{ background: c.bg }}>
          <div>
            <div className="inline-block bg-black text-white px-2 py-1 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">★ Top of the week</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: c.text }}>{c.label}</div>
          </div>
          <div className="mt-6">
            <div className="font-serif text-6xl italic font-bold" style={{ color: c.color }}>
              {String(hack.id).padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 p-6 lg:p-8">
          <h2 className="font-serif text-3xl lg:text-4xl leading-[1.05] text-black mb-4 font-bold group-hover:text-[#FF2D87] transition-colors">
            {hack.title}
          </h2>
          <p className="text-black/70 text-base leading-relaxed mb-5 italic font-serif">"{hack.excerpt}"</p>
          <div className="flex flex-wrap items-center gap-2">
            {hack.tools.map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black text-[#FFD800] font-bold">{t}</span>
            ))}
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 border-2 border-black text-black font-bold">⏱ {hack.timeToSetup}</span>
          </div>
        </div>
        <div className="lg:col-span-3 p-6 lg:p-8 border-t-4 lg:border-t-0 lg:border-l-4 border-black flex lg:flex-col items-start justify-between gap-4 bg-[#FFF6BD]">
          <div className="border-2 border-black bg-white px-3 py-3 flex flex-col items-center" style={{ minWidth: 60 }}>
            <button onClick={(e) => handleVote(e, "up")} className={`p-1 transition-colors ${voted === "up" ? "text-[#FF2D87]" : "text-black/40 hover:text-black"}`}>
              <ArrowUp className="w-4 h-4" strokeWidth={3} />
            </button>
            <span className="font-serif text-2xl font-bold text-black">{hack.votes + voteDelta}</span>
            <button onClick={(e) => handleVote(e, "down")} className={`p-1 transition-colors ${voted === "down" ? "text-[#7C3AED]" : "text-black/40 hover:text-black"}`}>
              <ArrowDown className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-1.5 text-black font-bold">
              <School className="w-3.5 h-3.5" strokeWidth={2.5} />
              {hack.school} · {hack.year}
            </div>
            <a href={hack.sourceUrl} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-black/70 hover:text-[#FF2D87] transition-colors font-bold text-xs">
              via {hack.source}
              <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
            </a>
            <div className="flex items-center gap-3 text-xs">
              <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                className={`flex items-center gap-1 font-bold ${saved ? "text-[#FF2D87]" : "text-black/60 hover:text-black"}`}>
                <Bookmark className="w-3.5 h-3.5" strokeWidth={2.5} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save"}
              </button>
              <span className="flex items-center gap-1 text-black/60 font-bold">
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                {hack.comments}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article onClick={onClick}
      className="group cursor-pointer bg-white hover:shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] flex flex-col"
      style={{ border: "3px solid #000" }}>
      <div className="px-5 py-2.5 flex items-center justify-between"
        style={{ background: c.bg, borderBottom: "3px solid #000" }}>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: c.text }}>● {c.label}</span>
        <span className="text-[10px] uppercase tracking-wider font-bold text-black/60">{hack.timeAgo}</span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-xl leading-tight text-black mb-3 font-bold group-hover:text-[#FF2D87] transition-colors">
          {hack.title}
        </h3>
        <p className="text-sm text-black/70 leading-relaxed mb-4 line-clamp-3 flex-1">{hack.excerpt}</p>
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {hack.tools.map((t) => (
            <span key={t} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-black text-white font-bold">{t}</span>
          ))}
          <span className="text-[9px] uppercase tracking-wider px-2 py-1 border-2 border-black text-black font-bold">⏱ {hack.timeToSetup}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t-2 border-black/10">
          <div className="flex items-center gap-1.5 text-xs text-black/80 font-bold">
            <span className="px-1.5 py-0.5 bg-[#FFF6BD] border border-black text-[10px]">{hack.school}</span>
            <span className="text-black/50 text-[10px]">{hack.year}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={(e) => handleVote(e, "up")}
              className={`flex items-center gap-1 text-sm font-bold transition-colors ${voted === "up" ? "text-[#FF2D87]" : "text-black/70 hover:text-black"}`}>
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={3} />
              <span>{hack.votes + voteDelta}</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
              className={`transition-colors ${saved ? "text-[#FF2D87]" : "text-black/40 hover:text-black"}`}>
              <Bookmark className="w-3.5 h-3.5" strokeWidth={2.5} fill={saved ? "currentColor" : "none"} />
            </button>
            <span className="flex items-center gap-1 text-xs text-black/60 font-bold">
              <MessageCircle className="w-3 h-3" strokeWidth={2.5} />
              {hack.comments}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
