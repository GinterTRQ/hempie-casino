"use client";

import { useState } from "react";

const cars = [
  "Lamborghini Sterrato",
  "Lamborghini Temerario",
  "Lamborghini Huracán STO",
  "Lamborghini Aventador S",
  "Lamborghini Aventador SV",
  "Lamborghini Aventador SVJ",
  "McLaren 570S",
  "McLaren 720S",
  "Porsche 911 GT3 RS",
  "Ferrari 458",
  "Ferrari F8",
  "AMG GT R",
  "C63 AMG",
];

const mods = [
  "ECU Tune",
  "TCU Tune",
  "Catless Downpipes",
  "200 Cell Downpipes",
  "Valved Exhaust",
  "Inconel Exhaust",
  "HRE Wheels",
  "Carbon Aero",
  "KW Suspension",
  "Twin Turbo Kit",
];

export default function BuildBattle() {
  const [car, setCar] = useState("");
  const [selectedMods, setSelectedMods] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  function toggleMod(mod: string) {
    if (selectedMods.includes(mod)) {
      setSelectedMods(selectedMods.filter((m) => m !== mod));
    } else {
      setSelectedMods([...selectedMods, mod]);
    }
  }

  function buildCar() {
    const hp = 500 + selectedMods.length * 75;
    const sound = 60 + selectedMods.length * 4;
    const clout = 70 + selectedMods.length * 5;
    const reliability = 100 - selectedMods.length * 3;

    let rank = "Cars & Coffee Rookie";

    if (clout > 90) rank = "🔥 Tunnel Menace";
    if (hp > 900) rank = "🚀 SEMA Candidate";
    if (selectedMods.includes("Twin Turbo Kit"))
      rank = "👑 Euromerch Legend";

    setResult({
      hp,
      sound,
      clout,
      reliability,
      rank,
    });
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        padding: 30,
        fontFamily: "Arial",
      }}
    >
      <h1>Euromerch Build Battle</h1>

      <h2>Select Vehicle</h2>

      <select
        value={car}
        onChange={(e) => setCar(e.target.value)}
        style={{
          padding: 10,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <option value="">Choose Vehicle</option>

        {cars.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <h2 style={{ marginTop: 30 }}>Select Mods</h2>

      {mods.map((mod) => (
        <div key={mod}>
          <label>
            <input
              type="checkbox"
              checked={selectedMods.includes(mod)}
              onChange={() => toggleMod(mod)}
            />
            {" "}
            {mod}
          </label>
        </div>
      ))}

      <button
        onClick={buildCar}
        style={{
          marginTop: 30,
          padding: "12px 24px",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        Build My Car
      </button>

      {result && (
        <div
          style={{
            marginTop: 40,
            border: "1px solid #333",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h2>{car}</h2>

          <p>Horsepower: {result.hp} HP</p>
          <p>Sound: {result.sound}/100</p>
          <p>Clout: {result.clout}/100</p>
          <p>Reliability: {result.reliability}/100</p>

          <h2>{result.rank}</h2>
        </div>
      )}
    </main>
  );
}