"use client";
import { useState } from "react";
import { ArrowUp, ArrowDown, Bookmark, ChevronRight, Send, ExternalLink, Clock, Hash, User, Copy, Check, School } from "lucide-react";
import { cat } from "../lib/data";

export default function HackDetail({ hack, onBack }) {
  const [copiedStep, setCopiedStep] = useState(null);
  const [voted, setVoted] = useState(null);
  const [saved, setSaved] = useState(hack.saved);
  const c = cat(hack.category);

  const copyStep = (idx, body) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(body);
    }
    setCopiedStep(idx);
    setTimeout(() => setCopiedStep(null), 1500);
  };

  const voteDelta = voted === "up" ? 1 : voted === "down" ? -1 : 0;

  return (
    <div className="min-h-screen">
      <div className="border-b-4 border-black" style={{ background: c.bg }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-black hover:text-[#FF2D87] transition-colors font-bold uppercase tracking-wider">
            <ChevronRight className="w-4 h-4 rotate-180" strokeWidth={3} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs border-2 border-black font-bold uppercase tracking-wider transition-all ${saved ? "bg-black text-[#FFD800]" : "bg-white text-black hover:bg-[#FFD800]"}`}>
              <Bookmark className="w-3.5 h-3.5" strokeWidth={2.5} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs border-2 border-black bg-white text-black hover:bg-[#FF2D87] hover:text-white font-bold uppercase tracking-wider transition-all">
              <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
              Share
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] font-bold border-2 border-black"
            style={{ background: c.color, color: "white" }}>
            ● {c.label}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold border-2 border-black bg-[#FFF6BD] text-black">
            <School className="w-3 h-3" strokeWidth={2.5} />
            {hack.school} · {hack.year}
          </div>
        </div>
        <h1 className="font-serif text-4xl lg:text-6xl leading-[1.02] text-black tracking-tight mb-8 max-w-4xl font-bold">
          {hack.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 border-b-4 border-black mb-10 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7C3AED] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_0_#000]">
              <User className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold text-black">{hack.authorName}</div>
              <a href={hack.sourceUrl} className="text-xs text-black/60 hover:text-[#FF2D87] transition-colors flex items-center gap-1 font-medium">
                Originally on {hack.source} <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-5 text-black/70 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>{hack.timeToSetup}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" strokeWidth={2.5} />
              {hack.tools.join(", ")}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => setVoted(voted === "up" ? null : "up")}
              className={`flex items-center gap-1.5 px-3 py-2 border-2 border-black font-bold transition-all ${voted === "up" ? "bg-[#FF2D87] text-white" : "bg-white text-black hover:bg-[#FFD800]"}`}>
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={3} />
              <span>{hack.votes + voteDelta}</span>
            </button>
            <button onClick={() => setVoted(voted === "down" ? null : "down")}
              className={`p-2 border-2 border-black transition-all ${voted === "down" ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}>
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
          </div>
        </div>

        <blockquote className="p-6 lg:p-8 mb-12 max-w-3xl shadow-[8px_8px_0_0_#000] relative"
          style={{ background: c.bg, border: "4px solid #000" }}>
          <div className="absolute -top-4 -left-4 bg-[#FFD800] w-12 h-12 flex items-center justify-center font-serif text-3xl font-bold"
            style={{ border: "3px solid #000" }}>"</div>
          <p className="font-serif text-2xl lg:text-3xl leading-snug text-black italic font-medium mb-3">
            {hack.excerpt}
          </p>
          <cite className="text-sm text-black/70 not-italic font-bold">— {hack.authorName} ({hack.school} {hack.year}), on {hack.source}</cite>
        </blockquote>

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#FF2D87] mb-2 font-bold">─── How to do it</div>
              <h2 className="font-serif text-2xl text-black leading-tight mb-3 font-bold">
                Reproduce in <span className="italic" style={{ color: c.color }}>{hack.timeToSetup}</span>.
              </h2>
              <p className="text-sm text-black/70 leading-relaxed">
                We've turned the original post into actionable steps. Each one is copyable.
              </p>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-5">
            {hack.steps.map((step, idx) => {
              const stepColors = ["#FF2D87", "#7C3AED", "#FFD800", "#00C2A8"];
              const sc = stepColors[idx % stepColors.length];
              return (
                <div key={idx} className="bg-white p-6 lg:p-7 group hover:shadow-[6px_6px_0_0_#000] transition-all"
                  style={{ border: "3px solid #000" }}>
                  <div className="flex items-start gap-5">
                    <div className="font-serif text-5xl leading-none italic select-none flex-shrink-0 font-bold"
                      style={{ color: sc, WebkitTextStroke: "2px black" }}>
                      0{idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-serif text-xl text-black leading-tight font-bold">{step.title}</h3>
                        <button onClick={() => copyStep(idx, step.body)}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-black hover:text-white hover:bg-black transition-colors flex-shrink-0 px-2 py-1 border-2 border-black font-bold">
                          {copiedStep === idx ? (
                            <><Check className="w-3 h-3" strokeWidth={3} /> Copied</>
                          ) : (
                            <><Copy className="w-3 h-3" strokeWidth={2.5} /> Copy</>
                          )}
                        </button>
                      </div>
                      <p className="text-black/80 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t-4 border-black pt-6 flex items-center justify-between text-sm gap-3 flex-wrap">
              <span className="text-black/70 font-bold">Did this work for you?</span>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-[#00C2A8] text-black border-2 border-black font-bold uppercase tracking-wider text-xs shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#000] transition-all">
                  ✓ It worked
                </button>
                <button className="px-4 py-2 bg-white text-black border-2 border-black font-bold uppercase tracking-wider text-xs hover:bg-[#FFF6BD] transition-colors">
                  Didn't work
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
