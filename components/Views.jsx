"use client";
import { useState } from "react";
import { ArrowUpRight, Bookmark, X, ChevronRight, Settings2 } from "lucide-react";
import { CATEGORIES, HACKS, SCHOOLS } from "../lib/data";
import HackCard from "./HackCard";

export function CategoriesView() {
  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-5 font-bold">─── Browse by category</div>
      <h1 className="font-serif text-5xl lg:text-6xl text-black tracking-tight mb-12 max-w-3xl leading-[1] font-bold">
        What part of the MBA do you want to <span className="italic" style={{ color: "#7C3AED" }}>unlock?</span>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((c, i) => (
          <button key={c.id}
            className="p-7 text-left group transition-all hover:shadow-[8px_8px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ background: c.bg, border: "3px solid #000" }}>
            <div className="flex items-start justify-between mb-6">
              <span className="font-serif text-5xl italic font-bold" style={{ color: c.color, WebkitTextStroke: "2px black" }}>
                0{i + 1}
              </span>
              <ArrowUpRight className="w-5 h-5 text-black group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
            </div>
            <h2 className="font-serif text-2xl text-black mb-1 font-bold">{c.label}</h2>
            <p className="text-sm font-bold" style={{ color: c.text }}>{c.count} hacks →</p>
          </button>
        ))}
      </div>
    </main>
  );
}

export function SavedView({ onHackClick }) {
  const saved = HACKS.filter(h => h.saved);
  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <div className="text-[11px] uppercase tracking-[0.25em] text-[#FF2D87] mb-5 font-bold">─── Your library</div>
      <h1 className="font-serif text-5xl lg:text-6xl text-black tracking-tight mb-12 font-bold">Saved hacks</h1>
      {saved.length === 0 ? (
        <div className="border-4 border-black p-16 text-center bg-[#FFF6BD] shadow-[6px_6px_0_0_#000]">
          <Bookmark className="w-8 h-8 text-black mx-auto mb-3" strokeWidth={2} />
          <p className="text-black font-bold">Nothing saved yet. Tap the bookmark on any hack.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((hack) => (
            <HackCard key={hack.id} hack={hack} onClick={() => onHackClick(hack)} />
          ))}
        </div>
      )}
    </main>
  );
}

export function SubmitModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setStep(2); }, 1800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0_0_#FF2D87]"
        style={{ border: "4px solid #000" }}>
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFD800]"
          style={{ borderBottom: "4px solid #000" }}>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-black mb-0.5 font-bold">Step {step} of 2</div>
            <h2 className="font-serif text-xl text-black font-bold">{step === 1 ? "Submit a hack" : "Review the steps"}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-black hover:text-[#FF2D87] transition-colors">
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>

        {step === 1 && (
          <div className="p-6 lg:p-8">
            <p className="text-black/80 mb-6 leading-relaxed">
              Saw a great AI hack in r/MBA, on X, in your school's GroupMe, or on a classmate's Loom? Drop the link. We'll extract the idea and turn it into reproducible steps for everyone.
            </p>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-black mb-2 font-bold">Source URL</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://reddit.com/r/MBA/comments/..."
              className="w-full px-4 py-3 bg-white focus:bg-[#FFF6BD] focus:outline-none text-black font-medium"
              style={{ border: "3px solid #000" }} />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-black mb-2 font-bold">Your school</label>
                <select className="w-full px-3 py-2.5 text-sm bg-white text-black font-medium" style={{ border: "3px solid #000" }}>
                  {SCHOOLS.slice(1).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-black mb-2 font-bold">Year</label>
                <select className="w-full px-3 py-2.5 text-sm bg-white text-black font-medium" style={{ border: "3px solid #000" }}>
                  <option>MBA1</option>
                  <option>MBA2</option>
                  <option>EMBA</option>
                  <option>Pre-MBA</option>
                </select>
              </div>
            </div>
            <div className="mt-5 p-4 bg-[#E9DDFF] text-sm text-black leading-relaxed font-medium" style={{ border: "3px solid #000" }}>
              <strong className="font-bold">What happens next:</strong> We pull the post, identify the hack, generate step-by-step instructions, and tag the right MBA category. You review before publishing. The original creator is always cited.
            </div>
            <div className="flex items-center justify-between mt-6 gap-3 flex-wrap">
              <span className="text-xs text-black/60 font-medium">Verified .edu = blue checkmark on your profile</span>
              <button onClick={handleGenerate} disabled={!url || generating}
                className="bg-black text-[#FFD800] px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#FF2D87] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 border-2 border-black shadow-[4px_4px_0_0_#7C3AED]">
                {generating ? (
                  <><span className="w-3 h-3 border-2 border-[#FFD800] border-t-transparent rounded-full animate-spin"></span> Generating…</>
                ) : (
                  <>Generate steps <ChevronRight className="w-4 h-4" strokeWidth={3} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 lg:p-8">
            <div className="bg-[#FFE0EE] p-5 mb-5" style={{ border: "3px solid #000" }}>
              <div className="text-[10px] uppercase tracking-[0.25em] text-black mb-2 font-bold">● Detected hack</div>
              <h3 className="font-serif text-xl text-black leading-tight mb-2 font-bold">
                Use Claude to write your behavioral interview stories in the SOAR framework
              </h3>
              <p className="text-sm text-black/80 italic">"Spent a Sunday and now I have 12 stories ready for any 'tell me about a time' question…"</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black text-[#FFD800] font-bold">Claude</span>
                <select className="text-xs px-2 py-1 border-2 border-black bg-white text-black font-bold">
                  <option>Recruiting</option>
                  <option>Personal Brand</option>
                  <option>Career Switching</option>
                </select>
              </div>
            </div>
            <div className="space-y-2.5 mb-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-black mb-2 font-bold">Generated steps (editable)</div>
              {["Brain dump 20 stories from the last 3 years", "Run each through the SOAR template", "Tag stories by competency", "Drill 'tell me about a time' in random order"].map((s, i) => {
                const colors = ["#FF2D87", "#7C3AED", "#FFD800", "#00C2A8"];
                return (
                  <div key={i} className="flex items-center gap-3 p-3 border-2 border-black bg-white text-sm">
                    <span className="font-serif text-xl italic font-bold" style={{ color: colors[i] }}>0{i + 1}</span>
                    <span className="text-black flex-1 font-medium">{s}</span>
                    <button className="text-black/40 hover:text-black transition-colors">
                      <Settings2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t-4 border-black pt-5 gap-2 flex-wrap">
              <button onClick={() => setStep(1)} className="text-xs text-black/70 hover:text-black transition-colors font-bold uppercase tracking-wider">← Back</button>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="px-4 py-2 text-xs border-2 border-black bg-white text-black hover:bg-[#FFF6BD] transition-colors font-bold uppercase tracking-wider">Save draft</button>
                <button onClick={onClose} className="px-5 py-2.5 text-xs bg-[#00C2A8] text-black border-2 border-black hover:bg-[#FFD800] transition-colors font-bold uppercase tracking-wider shadow-[3px_3px_0_0_#000]">Publish hack</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
