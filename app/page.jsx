"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Feed from "../components/Feed";
import HackDetail from "../components/HackDetail";
import LeaderboardView from "../components/LeaderboardView";
import { CategoriesView, SavedView, SubmitModal } from "../components/Views";

export default function Home() {
  const [view, setView] = useState("feed");
  const [selectedHack, setSelectedHack] = useState(null);
  const [submitOpen, setSubmitOpen] = useState(false);

  const handleHackClick = (hack) => {
    setSelectedHack(hack);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedHack(null);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  if (selectedHack) {
    return (
      <div className="min-h-screen" style={{ background: "#FAFAF7" }}>
        <HackDetail hack={selectedHack} onBack={handleBack} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7" }}>
      <Header view={view} setView={setView} onSubmit={() => setSubmitOpen(true)} />
      {view === "feed" && <Feed onHackClick={handleHackClick} />}
      {view === "categories" && <CategoriesView />}
      {view === "leaderboard" && <LeaderboardView onSubmit={() => setSubmitOpen(true)} />}
      {view === "saved" && <SavedView onHackClick={handleHackClick} />}
      <Footer />
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
