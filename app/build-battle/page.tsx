"use client";

import { useMemo, useState } from "react";

type Car = {
  name: string;
  brand: string;
  image: string;
  stockHp: number;
  stage1Hp: number;
  stage2Hp: number;
  fullBuildHp: number;
  sound: number;
  clout: number;
  reliability: number;
  vibe: string;
};

type Mod = {
  name: string;
  price: number;
  hp: number;
  sound: number;
  clout: number;
  reliability: number;
  category: string;
};

const cars: Car[] = [
  {
    name: "Lamborghini Sterrato",
    brand: "Lamborghini",
    image: "/cars/sterrato.jpg",
    stockHp: 610,
    stage1Hp: 650,
    stage2Hp: 690,
    fullBuildHp: 760,
    sound: 95,
    clout: 96,
    reliability: 88,
    vibe: "Off-road exotic chaos.",
  },
  {
    name: "Lamborghini Temerario",
    brand: "Lamborghini",
    image: "/cars/temerario.jpg",
    stockHp: 907,
    stage1Hp: 940,
    stage2Hp: 980,
    fullBuildHp: 1100,
    sound: 90,
    clout: 100,
    reliability: 84,
    vibe: "Hybrid supercar future weapon.",
  },
  {
    name: "Lamborghini Huracán STO",
    brand: "Lamborghini",
    image: "/cars/sto.jpg",
    stockHp: 640,
    stage1Hp: 675,
    stage2Hp: 720,
    fullBuildHp: 900,
    sound: 100,
    clout: 98,
    reliability: 80,
    vibe: "Track toy with street-villain energy.",
  },
  {
    name: "Lamborghini Aventador S",
    brand: "Lamborghini",
    image: "/cars/aventador-s.jpg",
    stockHp: 730,
    stage1Hp: 760,
    stage2Hp: 790,
    fullBuildHp: 850,
    sound: 100,
    clout: 99,
    reliability: 74,
    vibe: "V12 drama machine.",
  },
  {
    name: "Lamborghini Aventador SV",
    brand: "Lamborghini",
    image: "/cars/aventador-sv.jpg",
    stockHp: 740,
    stage1Hp: 770,
    stage2Hp: 805,
    fullBuildHp: 870,
    sound: 100,
    clout: 100,
    reliability: 70,
    vibe: "Angry V12 collector energy.",
  },
  {
    name: "Lamborghini Aventador SVJ",
    brand: "Lamborghini",
    image: "/cars/aventador-svj.jpg",
    stockHp: 770,
    stage1Hp: 800,
    stage2Hp: 835,
    fullBuildHp: 900,
    sound: 100,
    clout: 100,
    reliability: 66,
    vibe: "The V12 final boss.",
  },
  {
    name: "McLaren 570S",
    brand: "McLaren",
    image: "/cars/570s.jpg",
    stockHp: 562,
    stage1Hp: 650,
    stage2Hp: 720,
    fullBuildHp: 900,
    sound: 78,
    clout: 78,
    reliability: 82,
    vibe: "Lightweight roll-race starter pack.",
  },
  {
    name: "McLaren 720S",
    brand: "McLaren",
    image: "/cars/720s.jpg",
    stockHp: 710,
    stage1Hp: 820,
    stage2Hp: 900,
    fullBuildHp: 1200,
    sound: 92,
    clout: 96,
    reliability: 70,
    vibe: "Roll-racing cheat code.",
  },
  {
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    image: "/cars/gt3rs.jpg",
    stockHp: 518,
    stage1Hp: 535,
    stage2Hp: 560,
    fullBuildHp: 590,
    sound: 88,
    clout: 96,
    reliability: 96,
    vibe: "Apex predator.",
  },
  {
    name: "Ferrari 458",
    brand: "Ferrari",
    image: "/cars/458.jpg",
    stockHp: 562,
    stage1Hp: 585,
    stage2Hp: 620,
    fullBuildHp: 660,
    sound: 100,
    clout: 100,
    reliability: 84,
    vibe: "Naturally aspirated royalty.",
  },
  {
    name: "Ferrari F8",
    brand: "Ferrari",
    image: "/cars/f8.jpg",
    stockHp: 710,
    stage1Hp: 790,
    stage2Hp: 850,
    fullBuildHp: 950,
    sound: 96,
    clout: 99,
    reliability: 80,
    vibe: "Twin-turbo Italian weapon.",
  },
  {
    name: "AMG GT R",
    brand: "AMG",
    image: "/cars/amg-gtr.jpg",
    stockHp: 577,
    stage1Hp: 650,
    stage2Hp: 720,
    fullBuildHp: 820,
    sound: 93,
    clout: 82,
    reliability: 88,
    vibe: "Green Hell energy.",
  },
  {
    name: "C63 AMG",
    brand: "AMG",
    image: "/cars/c63.jpg",
    stockHp: 503,
    stage1Hp: 580,
    stage2Hp: 650,
    fullBuildHp: 800,
    sound: 96,
    clout: 78,
    reliability: 84,
    vibe: "V8 neighborhood warning system.",
  },
];

const mods: Mod[] = [
  {
    name: "ECU Tune",
    price: 3500,
    hp: 80,
    sound: 2,
    clout: 8,
    reliability: -4,
    category: "Power",
  },
  {
    name: "TCU Tune",
    price: 2500,
    hp: 20,
    sound: 1,
    clout: 5,
    reliability: 2,
    category: "Power",
  },
  {
    name: "Downpipes",
    price: 2500,
    hp: 55,
    sound: 16,
    clout: 12,
    reliability: -6,
    category: "Power",
  },
  {
    name: "Valved Exhaust",
    price: 6500,
    hp: 15,
    sound: 22,
    clout: 18,
    reliability: 0,
    category: "Sound",
  },
  {
    name: "Inconel Exhaust",
    price: 12000,
    hp: 25,
    sound: 30,
    clout: 25,
    reliability: 1,
    category: "Sound",
  },
  {
    name: "HRE Wheels",
    price: 20000,
    hp: 0,
    sound: 0,
    clout: 30,
    reliability: 2,
    category: "Visual",
  },
  {
    name: "Brixton Forged Wheels",
    price: 16000,
    hp: 0,
    sound: 0,
    clout: 25,
    reliability: 2,
    category: "Visual",
  },
  {
    name: "ANRKY Wheels",
    price: 18000,
    hp: 0,
    sound: 0,
    clout: 28,
    reliability: 2,
    category: "Visual",
  },
  {
    name: "Carbon Aero",
    price: 15000,
    hp: 0,
    sound: 0,
    clout: 30,
    reliability: -2,
    category: "Visual",
  },
  {
    name: "KW Suspension",
    price: 4500,
    hp: 0,
    sound: 0,
    clout: 12,
    reliability: 8,
    category: "Handling",
  },
  {
    name: "Twin Turbo Kit",
    price: 45000,
    hp: 350,
    sound: 12,
    clout: 35,
    reliability: -25,
    category: "Power",
  },
];

const events = [
  "Tunnel pull went viral. +20 clout.",
  "Customer asked for best price. -10 sanity.",
  "Titus approved the build. +15 reliability.",
  "Carbon fiber delayed 8 weeks. -8 patience.",
  "Dyno graph made Instagram explode. +25 clout.",
  "Check engine light appeared for dramatic effect.",
];

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

function getPackageName(selectedMods: string[]) {
  if (selectedMods.includes("Twin Turbo Kit")) return "Full Send Build";
  if (selectedMods.includes("ECU Tune") && selectedMods.includes("Downpipes")) return "Stage 2";
  if (selectedMods.includes("ECU Tune")) return "Stage 1";
  if (selectedMods.length >= 5) return "Show Build";
  return "Street Package";
}

export default function BuildBattle() {
  const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
  const [selectedMods, setSelectedMods] = useState<string[]>([]);
  const [built, setBuilt] = useState(false);
  const [event, setEvent] = useState("No dyno drama yet.");

  const selectedModObjects = mods.filter((mod) => selectedMods.includes(mod.name));

  const build = useMemo(() => {
    const cost = selectedModObjects.reduce((sum, mod) => sum + mod.price, 0);
    const addedHp = selectedModObjects.reduce((sum, mod) => sum + mod.hp, 0);
    const tunedHp = selectedCar.stockHp + addedHp;

    const sound = clamp(selectedCar.sound + selectedModObjects.reduce((sum, mod) => sum + mod.sound, 0));
    const clout = clamp(selectedCar.clout + selectedModObjects.reduce((sum, mod) => sum + mod.clout, 0));
    const reliability = clamp(
      selectedCar.reliability + selectedModObjects.reduce((sum, mod) => sum + mod.reliability, 0)
    );

    const packageName = getPackageName(selectedMods);

    let rank = "Cars & Coffee Rookie";
    if (packageName === "Stage 1") rank = "Stage 1 Street Menace";
    if (packageName === "Stage 2") rank = "Tunnel Menace";
    if (selectedMods.includes("Twin Turbo Kit")) rank = "Roll Racing Problem";
    if (clout > 95 && sound > 95 && cost > 25000) rank = "SEMA Candidate";
    if (selectedMods.includes("Twin Turbo Kit") && cost > 60000) rank = "Euromerch Legend";

    const achievements: string[] = [];
    if (selectedCar.name.includes("SVJ") && selectedMods.includes("Inconel Exhaust")) achievements.push("Sound Demon");
    if (selectedCar.name.includes("720S") && selectedMods.includes("Twin Turbo Kit")) achievements.push("Roll Racing King");
    if (selectedCar.name.includes("458") && selectedMods.includes("Valved Exhaust")) achievements.push("NA Royalty");
    if (selectedCar.name.includes("Sterrato") && selectedMods.includes("HRE Wheels")) achievements.push("Cars & Coffee Champion");
    if (selectedCar.name.includes("GT3 RS") && selectedMods.includes("KW Suspension")) achievements.push("Apex Predator");

    return {
      cost,
      tunedHp,
      addedHp,
      sound,
      clout,
      reliability,
      packageName,
      rank,
      achievements,
    };
  }, [selectedCar, selectedMods, selectedModObjects]);

  function toggleMod(name: string) {
    setBuilt(false);
    setSelectedMods((prev) =>
      prev.includes(name) ? prev.filter((mod) => mod !== name) : [...prev, name]
    );
  }

  function runDyno() {
    setBuilt(true);
    setEvent(events[Math.floor(Math.random() * events.length)]);
  }

  return (
    <main className="page">
      <section className="topBar">
        <div>
          <p className="eyebrow">Euromerch Performance</p>
          <h1>Build Battle</h1>
          <p className="sub">Choose the platform. Pick the parts. See the build report.</p>
        </div>

        <div className="budgetBox">
          <span>Estimated Build Cost</span>
          <strong>${build.cost.toLocaleString()}</strong>
        </div>
      </section>

      <section className="garage">
        <aside className="carRail">
          {cars.map((car) => (
            <button
              key={car.name}
              className={selectedCar.name === car.name ? "carCard activeCar" : "carCard"}
              onClick={() => {
                setSelectedCar(car);
                setSelectedMods([]);
                setBuilt(false);
                setEvent("No dyno drama yet.");
              }}
            >
              <img src={car.image} alt={car.name} />
              <div>
                <strong>{car.name}</strong>
                <small>{car.stockHp} HP stock</small>
              </div>
            </button>
          ))}
        </aside>

        <section className="stage">
          <div className="hero">
            <div className="imageWrap">
              <img src={selectedCar.image} alt={selectedCar.name} className="heroImage" />
              <div className="speedLines" />
            </div>

            <div className="carInfo">
              <p className="brand">{selectedCar.brand}</p>
              <h2>{selectedCar.name}</h2>
              <p>{selectedCar.vibe}</p>

              <div className="hpBox">
                <div>
                  <span>Stock</span>
                  <strong>{selectedCar.stockHp} HP</strong>
                </div>
                <div>
                  <span>Tuned</span>
                  <strong>{build.tunedHp} HP</strong>
                </div>
                <div>
                  <span>Gain</span>
                  <strong>+{build.addedHp} HP</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="modsPanel">
            <div className="panelHeader">
              <h3>Euromerch Upgrade Menu</h3>
              <span>{build.packageName}</span>
            </div>

            <div className="modsGrid">
              {mods.map((mod) => (
                <button
                  key={mod.name}
                  className={selectedMods.includes(mod.name) ? "mod activeMod" : "mod"}
                  onClick={() => toggleMod(mod.name)}
                >
                  <span className="cat">{mod.category}</span>
                  <strong>{mod.name}</strong>
                  <small>${mod.price.toLocaleString()}</small>
                </button>
              ))}
            </div>

            <button className="dynoButton" onClick={runDyno}>
              Run Dyno / Generate Build Report
            </button>
          </div>
        </section>
      </section>

      <section className="results">
        <div className="resultCard">
          <h3>Build Report</h3>
          <p className="rank">{built ? build.rank : "Waiting for dyno run..."}</p>

          <Stat label="Horsepower" value={Math.min(100, Math.round(build.tunedHp / 12))} text={`${build.tunedHp} HP`} />
          <Stat label="Sound" value={build.sound} />
          <Stat label="Clout" value={build.clout} />
          <Stat label="Reliability" value={build.reliability} />

          <div className="eventBox">{event}</div>
        </div>

        <div className="resultCard">
          <h3>Secret Achievements</h3>

          {build.achievements.length ? (
            build.achievements.map((achievement) => (
              <div className="achievement unlocked" key={achievement}>
                🏆 {achievement}
              </div>
            ))
          ) : (
            <>
              <div className="achievement">🔒 Sound Demon</div>
              <div className="achievement">🔒 Roll Racing King</div>
              <div className="achievement">🔒 Euromerch Legend</div>
            </>
          )}
        </div>

        <div className="resultCard share">
          <h3>Share Build</h3>
          <p>{selectedCar.name}</p>
          <p>{build.packageName}</p>
          <p>{build.tunedHp} HP</p>
          <a href="https://euromerchperformance.com/startyourbuild" target="_blank">
            Start Your Real Build
          </a>
        </div>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          color: white;
          padding: 24px;
          font-family: Arial, sans-serif;
          background:
            linear-gradient(135deg, rgba(255, 0, 0, 0.18), transparent 32%),
            radial-gradient(circle at top, #1b1b1b, #050505 70%);
          overflow-x: hidden;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-bottom: 22px;
        }

        .eyebrow {
          color: #facc15;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 900;
          margin: 0;
        }

        h1 {
          font-size: 64px;
          margin: 0;
          text-transform: uppercase;
          font-style: italic;
          letter-spacing: -3px;
        }

        .sub {
          color: #bbb;
          margin-top: 6px;
        }

        .budgetBox {
          padding: 18px 24px;
          border-radius: 18px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(250, 204, 21, 0.45);
          text-align: right;
        }

        .budgetBox span {
          display: block;
          color: #aaa;
          text-transform: uppercase;
          font-size: 12px;
        }

        .budgetBox strong {
          font-size: 30px;
          color: #facc15;
        }

        .garage {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 18px;
        }

        .carRail {
          display: grid;
          gap: 12px;
          max-height: 790px;
          overflow: auto;
          padding-right: 4px;
        }

        .carCard {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 12px;
          align-items: center;
          padding: 10px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          color: white;
          text-align: left;
          cursor: pointer;
        }

        .carCard img {
          width: 110px;
          height: 70px;
          border-radius: 12px;
          object-fit: cover;
          background: #111;
        }

        .carCard small {
          display: block;
          color: #aaa;
          margin-top: 4px;
        }

        .activeCar {
          border-color: #facc15;
          box-shadow: 0 0 24px rgba(250, 204, 21, 0.25);
        }

        .stage,
        .resultCard {
          background: rgba(10, 10, 10, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 22px;
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.5);
        }

        .stage {
          padding: 18px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr;
          gap: 20px;
          align-items: center;
        }

        .imageWrap {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          min-height: 360px;
          background: #111;
        }

        .heroImage {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          transform: scale(1.04);
          animation: carReveal 0.6s ease-out;
        }

        .speedLines {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,.08) 45%, transparent 60%);
          transform: translateX(-100%);
          animation: shine 2.5s infinite;
        }

        .brand {
          color: #facc15;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .carInfo h2 {
          font-size: 42px;
          margin: 0;
        }

        .carInfo p {
          color: #bbb;
          line-height: 1.5;
        }

        .hpBox {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 18px;
        }

        .hpBox div {
          padding: 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.06);
        }

        .hpBox span {
          display: block;
          color: #aaa;
          font-size: 12px;
          text-transform: uppercase;
        }

        .hpBox strong {
          color: #facc15;
          font-size: 22px;
        }

        .modsPanel {
          margin-top: 18px;
        }

        .panelHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panelHeader h3,
        .resultCard h3 {
          color: #facc15;
          text-transform: uppercase;
        }

        .panelHeader span {
          color: #111;
          background: #facc15;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 900;
        }

        .modsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .mod {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-radius: 16px;
          padding: 14px;
          text-align: left;
          cursor: pointer;
        }

        .mod .cat {
          display: inline-block;
          font-size: 11px;
          color: #facc15;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .mod strong,
        .mod small {
          display: block;
        }

        .mod small {
          color: #aaa;
          margin-top: 6px;
        }

        .activeMod {
          border-color: #facc15;
          box-shadow: 0 0 24px rgba(250, 204, 21, 0.25);
        }

        .dynoButton {
          width: 100%;
          margin-top: 16px;
          padding: 18px;
          border-radius: 16px;
          border: none;
          color: white;
          font-size: 20px;
          font-weight: 900;
          background: linear-gradient(180deg, #ef4444, #7f1d1d);
          cursor: pointer;
          box-shadow: 0 0 32px rgba(239, 68, 68, 0.35);
        }

        .results {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr;
          gap: 18px;
          margin-top: 18px;
        }

        .resultCard {
          padding: 18px;
        }

        .rank {
          font-size: 28px;
          color: #facc15;
          font-weight: 900;
          margin-top: 0;
        }

        .eventBox,
        .achievement {
          margin-top: 12px;
          padding: 14px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
        }

        .unlocked {
          border: 1px solid #facc15;
        }

        .share {
          text-align: center;
        }

        .share a {
          display: inline-block;
          margin-top: 12px;
          color: #111;
          background: #facc15;
          padding: 12px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 900;
        }

        .stat {
          margin: 12px 0;
        }

        .statTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .bar {
          height: 10px;
          background: #222;
          border-radius: 20px;
          overflow: hidden;
        }

        .fill {
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(90deg, #ef4444, #facc15);
          transition: width 0.8s ease;
        }

        @keyframes carReveal {
          from {
            opacity: 0;
            transform: scale(1.12) translateX(40px);
          }
          to {
            opacity: 1;
            transform: scale(1.04) translateX(0);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          55% {
            transform: translateX(120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @media (max-width: 900px) {
          .topBar,
          .garage,
          .hero,
          .results {
            display: grid;
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 42px;
          }

          .carRail {
            max-height: 310px;
          }

          .heroImage {
            height: 260px;
          }

          .modsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .hpBox {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

function Stat({
  label,
  value,
  text,
}: {
  label: string;
  value: number;
  text?: string;
}) {
  return (
    <div className="stat">
      <div className="statTop">
        <span>{label}</span>
        <strong>{text || `${value}/100`}</strong>
      </div>
      <div className="bar">
        <div className="fill" style={{ width: `${clamp(value)}%` }} />
      </div>
    </div>
  );
}