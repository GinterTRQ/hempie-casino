"use client";

import { useMemo, useState } from "react";

type StageKey = "stock" | "stage1" | "stage2";

type Car = {
  name: string;
  brand: string;
  short: string;
  image: string;
  classBase: string;
  rarity: string;
  vibe: string;
  stockHp: number;
  stockTq: number;
  stage1Hp?: number;
  stage1Tq?: number;
  stage2Hp?: number;
  stage2Tq?: number;
  carScale?: number;
};

const cars: Car[] = [
  {
    name: "Lamborghini Sterrato",
    brand: "Lamborghini",
    short: "HURACAN STERRATO",
    image: "/cars/sterrato.png",
    classBase: "S1",
    rarity: "Off-Road Exotic",
    vibe: "Rally-bred Huracán with exotic chaos.",
    stockHp: 630,
    stockTq: 417,
    stage1Hp: 680,
    stage1Tq: 480,
    stage2Hp: 700,
    stage2Tq: 500,
  },
  {
    name: "Lamborghini Huracán STO",
    brand: "Lamborghini",
    short: "HURACAN STO",
    image: "/cars/sto.png",
    classBase: "S1",
    rarity: "Track Special",
    vibe: "Track-focused V10 weapon.",
    stockHp: 630,
    stockTq: 417,
    stage1Hp: 680,
    stage1Tq: 480,
    stage2Hp: 700,
    stage2Tq: 500,
  },

  {
    name: "Lamborghini Aventador S",
    brand: "Lamborghini",
    short: "AVENTADOR S",
    image: "/cars/aventador-s.png",
    classBase: "S1",
    rarity: "V12 Icon",
    vibe: "Naturally aspirated V12 drama.",
    stockHp: 730,
    stockTq: 509,

  },

  {
    name: "Lamborghini Aventador SV",
    brand: "Lamborghini",
    short: "AVENTADOR SV",
    image: "/cars/aventador-sv.png",
    classBase: "S1",
    rarity: "Collector",
    vibe: "Raw V12 supercar energy.",
    stockHp: 740,
    stockTq: 509,
    stage1Hp: 797,
    stage1Tq: 550,
    stage2Hp: 815,
    stage2Tq: 570,
  },

  {
    name: "Lamborghini Aventador SVJ",
    brand: "Lamborghini",
    short: "AVENTADOR SVJ",
    image: "/cars/aventador-svj.png",
    classBase: "S1",
    rarity: "Collector",
    vibe: "V12 Vibe",
    stockHp: 759,
    stockTq: 531,
    stage1Hp: 815,
    stage1Tq: 560,
    stage2Hp: 830,
    stage2Tq: 600,

  }, 
    {
      name: "Lamborghini Urus",
      brand: "Lamborghini",
      short: "URUS",
      image: "/cars/urus.png",
      classBase: "S1",
      rarity: "Performance SUV",
      vibe: "Twin-turbo V8 super SUV",
      stockHp: 641,
      stockTq: 626,
      stage1Hp: 731,
      stage1Tq: 738,
      stage2Hp: 761,
      stage2Tq: 766,
      carScale: 1.05,
    },

  {
    name: "Ferrari 458 Italia",
    brand: "Ferrari",
    short: "458 ITALIA",
    image: "/cars/458.png",
    classBase: "S1",
    rarity: "NA Royalty",
    vibe: "Naturally aspirated Ferrari perfection.",
    stockHp: 570,
    stockTq: 398,
    stage1Hp: 600,
    stage1Tq: 425,
    stage2Hp: 620,
    stage2Tq: 440,
  },
  {
    name: "Ferrari F8 Tributo",
    brand: "Ferrari",
    short: "F8",
    image: "/cars/f8.png",
    classBase: "S1",
    rarity: "Twin Turbo Icon",
    vibe: "Modern Ferrari turbo power.",
    stockHp: 710,
    stockTq: 567,
    stage1Hp: 780,
    stage1Tq: 680,
    stage2Hp: 820,
    stage2Tq: 720,
    carScale: 0.70,
  },
  {
    name: "McLaren 570S",
    brand: "McLaren",
    short: "570S",
    image: "/cars/570s.png",
    classBase: "A",
    rarity: "Street Weapon",
    vibe: "Lightweight turbo car that wakes up hard.",
    stockHp: 570,
    stockTq: 443,
    stage1Hp: 695,
    stage1Tq: 600,
    stage2Hp: 720,
    stage2Tq: 620,
  },
  {
    name: "McLaren 720S",
    brand: "McLaren",
    short: "720S",
    image: "/cars/720s.png",
    classBase: "S1",
    rarity: "Roll Race King",
    vibe: "One of the best tuning platforms on earth.",
    stockHp: 720,
    stockTq: 568,
    stage1Hp: 820,
    stage1Tq: 680,
    stage2Hp: 870,
    stage2Tq: 720,
  },

  {
    name: "McLaren 765LT",
    brand: "McLaren",
    short: "765LT",
    image: "/cars/765lt.png",
    classBase: "S2",
    rarity: "Longtail Legend",
    vibe: "Track-focused twin-turbo brutality.",
    stockHp: 755,
    stockTq: 590,
    stage1Hp: 850,
    stage1Tq: 710,
    stage2Hp: 900,
    stage2Tq: 750,
  },

  {
    name: "AMG GT R",
    brand: "Mercedes-Benz",
    short: "AMG GT-R",
    image: "/cars/amg-gtr.png",
    classBase: "A",
    rarity: "Green Hell",
    vibe: "Front-engine AMG violence.",
    stockHp: 585,
    stockTq: 516,
    stage1Hp: 660,
    stage1Tq: 703,
    stage2Hp: 700,
    stage2Tq: 811,
  },
  {
    name: "C63 AMG",
    brand: "Mercedes-Benz",
    short: "C63 AMG",
    image: "/cars/c63.png",
    classBase: "A",
    rarity: "M156 Legend",
    vibe: "The last naturally aspirated C63 V8 before the turbocharged era.",
    stockHp: 451,
    stockTq: 443,
    stage1Hp: 540,
    stage1Tq: 494,
  },
  {
    name: "Porsche 991.2 GT3 RS",
    brand: "Porsche",
    short: "991.2  GT3 RS",
    image: "/cars/gt3rs.png",
    classBase: "S1",
    rarity: "Track God",
    vibe: "Apex predator. Built for corners, not excuses.",
    stockHp: 520,
    stockTq: 346,
    stage1Hp: 550,
    stage1Tq: 380,
    stage2Hp: 570,
    stage2Tq: 400,
  },
];


const partners = [
  { name: "FI Exhaust", logo: "/partners/FI.png", scale: 0.85, glow: 2.0 },
  { name: "AMS", logo: "/partners/ams.png", scale: 1.25, glow: 2.0 },
  { name: "KW", logo: "/partners/kw.png", scale: 1.25, glow: 2.0 },
  { name: "1016 Industries", logo: "/partners/1016.png", scale: 1.25, glow: 1.0, contrast: 1.6, saturate: 2.3 },
  { name: "Capristo", logo: "/partners/Capristo.png", scale: 3.0, glow: 3.0 },
  { name: "Brixton Forged", logo: "/partners/brixton.png", scale: 2.8, glow: 4.0 },
  { name: "HRE", logo: "/partners/hre.png", scale: 1.7, glow: 2.0 },
];


const options = [
  "Sport Exhaust",
  "Race Exhaust",
  "Suspension",
  "Forged Wheels",
  "Carbon Aero",
];

function getStageValue(car: Car, stage: StageKey) {
  if (stage === "stage2" && car.stage2Hp && car.stage2Tq) {
    return {
      label: "Stage 2",
      hp: car.stage2Hp,
      tq: car.stage2Tq,
      requirements: ["ECU Tune", "Downpipes"],
    };
  }

  if (stage === "stage1" && car.stage1Hp && car.stage1Tq) {
    return {
      label: "Stage 1",
      hp: car.stage1Hp,
      tq: car.stage1Tq,
      requirements: ["ECU Tune"],
    };
  }

  return {
    label: "Stock",
    hp: car.stockHp,
    tq: car.stockTq,
    requirements: ["Factory Setup"],
  };
}

function boostPercent(current: number, stock: number) {
  const gain = current - stock;
  return Math.min(100, Math.max(8, 30 + gain / 1.7));
}

export default function BuildBattle() {
  const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
  const [stage, setStage] = useState<StageKey>("stock");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [boostKey, setBoostKey] = useState(0);

  const activeStage = useMemo(
    () => getStageValue(selectedCar, stage),
    [selectedCar, stage]
  );

  const hpGain = activeStage.hp - selectedCar.stockHp;
  const tqGain = activeStage.tq - selectedCar.stockTq;

  function selectCar(car: Car) {
    setSelectedCar(car);
    setStage("stock");
    setSelectedOptions([]);
    setBoostKey((key) => key + 1);
  }

  function changeStage(nextStage: StageKey) {
    setStage(nextStage);
    setBoostKey((key) => key + 1);
  }

  function toggleOption(option: string) {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  }

  return (
    <main className="page">
      <div className="scanlines" />
      <div className="ambientGlow" />

      <header className="topbar">
        <div>
          <p className="eyebrow">EUROMERCH PERFORMANCE</p>
          <h1>START YOUR BUILD</h1>
          <p className="sub">Select your vehicle. Choose your upgrades. We'll handle the rest.</p>
        </div>

        <div className="classBadge">
          <span>{selectedCar.classBase}</span>
          <strong key={`${activeStage.hp}-${boostKey}`}>{activeStage.hp}</strong>
          <small>HP</small>
        </div>
      </header>

      <section className="layout">
        <aside className="garage">
          <div className="panelTitle">SELECT VEHICLE</div>

          {cars.map((car) => (
            <button
              key={car.name}
              className={selectedCar.name === car.name ? "car activeCar" : "car"}
              onClick={() => selectCar(car)}
            >
              <img src={car.image} alt={car.name} />
              <div>
                <strong>{car.short}</strong>
                <small>{car.stockHp} HP • {car.rarity}</small>
              </div>
            </button>
          ))}
        </aside>

        <section className="showroom">
          <div className="heroCard">
            <div className="garageScene">
              <img src="/garage/emp-garage.png" alt="" className="garageBg" />

              <div className="garagePartnerWall">
    
    {partners.map((partner) => (
      
      <div key={partner.name} className="garagePartnerPlaque">
        
        <img
  src={partner.logo}
  alt={partner.name}
  style={{
    transform: `scale(${partner.scale || 1})`,
    filter: `brightness(${partner.glow || 1}) contrast(${partner.contrast || 1}) saturate(${partner.saturate || 1}) drop-shadow(0 0 12px rgba(255,255,255,.5)) drop-shadow(0 0 24px rgba(250,204,21,.4))`,
  }}
/>
      </div>
    ))}
  </div>
              <img
                key={selectedCar.name}
                src={selectedCar.image}
                alt={selectedCar.name}
                className="garageCar"
              />
              
              <div className="headlightBeam" />
              <div className="floorGlow" />
              <div className="heroOverlay" />
              <div className="cinematicLight" />
            </div>

            <div className="carInfo">
              <p>{selectedCar.brand}</p>
              <h2>{selectedCar.short}</h2>
              <span>{selectedCar.vibe}</span>
            </div>

            <div className="stageButtons">
              <button
                className={stage === "stock" ? "stage activeStage" : "stage"}
                onClick={() => changeStage("stock")}
              >
                Stock
                <small>Factory</small>
              </button>

              {selectedCar.stage1Hp && (
                <button
                  className={stage === "stage1" ? "stage activeStage" : "stage"}
                  onClick={() => changeStage("stage1")}
                >
                  Stage 1
                  <small>ECU Tune</small>
                </button>
              )}

              {selectedCar.stage2Hp && (
                <button
                  className={stage === "stage2" ? "stage activeStage" : "stage"}
                  onClick={() => changeStage("stage2")}
                >
                  Stage 2
                  <small>ECU + Downpipes</small>
                </button>
              )}
            </div>

            <div className="gamePrompt">A SELECT / X STAGE / Y BUILD</div>
          </div>

          <div className="boostPanel">
            <div className="boostHeader">
              <div>
                <p>DYNO MODE</p>
                <h3>{activeStage.label}</h3>
              </div>

              <div className="gainPill" key={`pill-${boostKey}`}>
                +{hpGain} HP / +{tqGain} TQ
              </div>
            </div>

            <BoostBar
              key={`hp-${boostKey}-${activeStage.hp}`}
              label="Horsepower"
              stock={selectedCar.stockHp}
              current={activeStage.hp}
              gain={hpGain}
              unit="HP"
              fill={boostPercent(activeStage.hp, selectedCar.stockHp)}
            />

            <BoostBar
              key={`tq-${boostKey}-${activeStage.tq}`}
              label="Torque"
              stock={selectedCar.stockTq}
              current={activeStage.tq}
              gain={tqGain}
              unit="TQ"
              fill={boostPercent(activeStage.tq, selectedCar.stockTq)}
            />
          </div>
        </section>

        <aside className="summary">
          <div className="summaryTop">
            <p>BUILD SUMMARY</p>
            <h3>{selectedCar.name}</h3>
          </div>

          <div className="statCard">
            <span>POWER PACKAGE</span>
            <strong>{activeStage.label}</strong>
          </div>

          <div className="statCard">
            <span>HORSEPOWER</span>
            <strong>{selectedCar.stockHp} → {activeStage.hp}</strong>
          </div>

          <div className="statCard">
            <span>TORQUE</span>
            <strong>{selectedCar.stockTq} → {activeStage.tq}</strong>
          </div>

          <div className="requirements">
            <span>REQUIRED</span>
            {activeStage.requirements.map((req) => (
              <p key={req}>✓ {req}</p>
            ))}
          </div>

          <div className="requirements darkReq">
            <span>SELECTED OPTIONS</span>
            {selectedOptions.length ? (
              selectedOptions.map((option) => <p key={option}>✓ {option}</p>)
            ) : (
              <p>No supporting options selected.</p>
            )}
          </div>

          <a
            className="cta"
            href={`https://euromerchperformance.com/startyourbuild?vehicle=${encodeURIComponent(
              selectedCar.name
            )}&stage=${encodeURIComponent(activeStage.label)}&options=${encodeURIComponent(
              selectedOptions.join(", ")
            )}`}
            target="_blank"
          >
            START YOUR REAL BUILD
          </a>
        </aside>
      </section>

      <section className="optionsPanel">
        <div className="upgradeTop">
          <div>
            <p>BUILD OPTIONS</p>
            <h2>Add supporting modifications</h2>
          </div>
        </div>

        <div className="optionsGrid">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={selectedOptions.includes(option) ? "option activeOption" : "option"}
            >
              <span>{selectedOptions.includes(option) ? "✓ SELECTED" : "ADD OPTION"}</span>
              <strong>{option}</strong>
            </button>
          ))}
        </div>
      </section>


      <style jsx global>{`
        .page {
          min-height: 100vh;
          padding: 24px;
          color: white;
          background:
            radial-gradient(circle at top left, rgba(250,204,21,.15), transparent 30%),
            radial-gradient(circle at top right, rgba(239,68,68,.23), transparent 28%),
            linear-gradient(135deg, #050505, #111 48%, #030303);
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .ambientGlow {
          position: fixed;
          inset: -30%;
          background: conic-gradient(
            from 180deg,
            transparent,
            rgba(250, 204, 21, 0.08),
            transparent,
            rgba(239, 68, 68, 0.12),
            transparent
          );
          animation: rotateAmbient 16s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        .scanlines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          opacity: .13;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.06),
            rgba(255,255,255,.06) 1px,
            transparent 1px,
            transparent 6px
          );
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .eyebrow {
          margin: 0 0 8px;
          color: #facc15;
          font-weight: 900;
          letter-spacing: 4px;
        }

        h1 {
          margin: 0;
          font-size: clamp(48px, 7vw, 94px);
          line-height: .82;
          font-style: normal;
          letter-spacing: -6px;
          text-shadow: 0 20px 55px rgba(0,0,0,.8);
        }

        .sub {
          color: rgba(255,255,255,.7);
          margin-top: 12px;
        }

        .classBadge {
          width: 155px;
          height: 118px;
          border-radius: 24px;
          background: linear-gradient(135deg, #facc15, #ef4444);
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          box-shadow: 0 0 60px rgba(250,204,21,.35);
          transform: skew(-5deg);
        }

        .classBadge span {
          font-size: 22px;
          font-weight: 900;
        }

        .classBadge strong {
          font-size: 48px;
          line-height: .9;
          animation: numberPunch .7s cubic-bezier(.2, 1.4, .3, 1) forwards;
        }

        .classBadge small {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .layout {
          display: grid;
          grid-template-columns: 300px 1fr 330px;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .garage,
        .showroom,
        .summary,
        .optionsPanel {
          background: rgba(8,8,8,.74);
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 26px;
          box-shadow: 0 24px 80px rgba(0,0,0,.62);
          backdrop-filter: blur(14px);
        }

        .garage {
          padding: 14px;
          max-height: 730px;
          overflow: auto;
        }

        .panelTitle {
          color: #facc15;
          font-weight: 900;
          letter-spacing: 3px;
          margin: 8px 0 14px;
        }

        .car {
          width: 100%;
          display: grid;
          grid-template-columns: 88px 1fr;
          align-items: center;
          gap: 11px;
          padding: 10px;
          margin-bottom: 11px;
          color: white;
          text-align: left;
          cursor: pointer;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.11);
          background: linear-gradient(90deg, rgba(255,255,255,.065), rgba(255,255,255,.02));
          transition: .22s ease;
          position: relative;
          overflow: hidden;
        }

        .car:hover {
          transform: translateX(8px) scale(1.035);
          border-color: #facc15;
          box-shadow: 0 0 32px rgba(250,204,21,.22);
        }

        .car:hover img {
          transform: scale(1.13);
          filter: contrast(1.18) saturate(1.28);
        }

        .car img {
          width: 88px;
          height: 58px;
          object-fit: contain;
          border-radius: 12px;
          transition: .22s ease;
          background: rgba(255,255,255,.06);
        }

        .car strong {
          display: block;
          font-size: 14px;
        }

        .car small {
          display: block;
          color: rgba(255,255,255,.65);
          margin-top: 4px;
          font-size: 11px;
        }

        .activeCar {
          border-color: #facc15;
          background: linear-gradient(90deg, rgba(250,204,21,.28), rgba(239,68,68,.08));
          box-shadow: inset 3px 0 0 #facc15, 0 0 34px rgba(250,204,21,.16);
        }

        .showroom {
          padding: 18px;
          overflow: hidden;
        }

        .heroCard {
          height: 500px;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          background: #111;
          border: 1px solid rgba(250,204,21,.24);
          box-shadow: inset 0 0 90px rgba(0,0,0,.65);
        }

        .garageScene {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .garageBg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.02);
          animation: garagePan 10s ease-in-out infinite alternate;
          z-index: 1;
        }
          .garagePartnerWall {
  position: absolute;
  left: 55px;
  top: 55px;

  width: 320px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  z-index: 7;

  opacity: .7;

  transform:
    perspective(1000px)
    rotateY(12deg);
    
    transform: perspective(1000px) rotateY(12deg) scale(.85);
opacity: .85;
 filter: blur(.15px);
 background:
  radial-gradient(
    circle at center,
    rgba(250,204,21,.12),
    transparent 70%
  );

padding: 16px;
border-radius: 18px;
}

.garagePartnerPlaque {
  height: 58px;
  animation: partnerFade 1s ease forwards;
opacity: 0;

  border-radius: 12px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.04),
      rgba(0,0,0,.4) 
    );

  border: 1px solid rgba(250,204,21,.25);

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(6px);

  box-shadow:
  inset 0 1px 0 rgba(255,255,255,.08),
  inset 0 0 20px rgba(250,204,21,.12),
  0 0 24px rgba(250,204,21,.22),
  0 0 48px rgba(250,204,21,.10);
}

.garagePartnerPlaque img {
  max-width: 80%;
  max-height: 42px;
  object-fit: contain;
  opacity: 1;
}

.garagePartnerPlaque:hover {
  border-color: #facc15;

  transform: scale(1.08);
  z-index: 20;

  box-shadow:
    inset 0 0 35px rgba(250,204,21,.25),
    0 0 40px rgba(250,204,21,.45),
    0 0 80px rgba(250,204,21,.25),
    0 0 120px rgba(250,204,21,.10);
}

.garagePartnerPlaque:hover img {
  opacity: 1;
  transform: scale(1.05);
}
  .garagePartnerPlaque:nth-child(1){animation-delay:.2s;}
.garagePartnerPlaque:nth-child(2){animation-delay:.35s;}
.garagePartnerPlaque:nth-child(3){animation-delay:.5s;}
.garagePartnerPlaque:nth-child(
4){animation-delay:.65s;}
.garagePartnerPlaque:nth-child(5){animation-delay:.8s;}
.garagePartnerPlaque:nth-child(6){animation-delay:.95s;}
.garagePartnerPlaque:nth-child(7){animation-delay:1.1s;}

@keyframes partnerFade {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

        .garageCar {
          position: absolute;
          left: 56%;
          bottom: -5px;
          width: 98%;
          max-height: 85%;
          object-fit: contain;
          transform: translateX(-50%);
          z-index: 5;
          filter:
            drop-shadow(0 35px 45px rgba(0,0,0,.85))
            drop-shadow(0 0 60px rgba(250,204,21,.30));
          animation: carEnterGarage .55s ease-out, carFloat 9s ease-in-out infinite;
        }

        .floorGlow {
          position: absolute;
          left: 50%;
          bottom: 20px;
          width: 55%;
          height: 80px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(250,204,21,.16), transparent 65%);
          filter: blur(10px);
          z-index: 3;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.06), rgba(0,0,0,.62)),
            linear-gradient(0deg, rgba(0,0,0,.65), transparent 50%);
          pointer-events: none;
          z-index: 6;
        }

        .cinematicLight {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 10%, rgba(255,255,255,.16), transparent 35%),
            radial-gradient(circle at 50% 82%, rgba(250,204,21,.12), transparent 38%);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 7;
        }

        .carInfo {
          position: absolute;
          left: 34px;
          bottom: 38px;
          z-index: 8;
        }

        .carInfo p {
          margin: 0 0 8px;
          color: #facc15;
          font-weight: 900;
          letter-spacing: 5px;
          text-transform: uppercase;
        }

        .carInfo h2 {
          margin: 0;
          font-size: clamp(30px, 3.6vw, 52px);
          line-height: .85;
          font-style: italic;
          letter-spacing: -7px;
          text-shadow: 0 18px 55px rgba(0,0,0,.9);
        }

        .carInfo span {
          display: block;
          margin-top: 18px;
          color: rgba(255,255,255,.78);
        }

        .stageButtons {
          position: absolute;
          top: 24px;
          right: 24px;
          display: flex;
          gap: 10px;
          z-index: 9;
        }

        .stage {
          min-width: 120px;
          padding: 14px 16px;
          border-radius: 16px;
          color: white;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(0,0,0,.55);
          transition: .2s ease;
          font-weight: 900;
        }

        .stage:hover {
          transform: translateY(-4px);
          border-color: #facc15;
          box-shadow: 0 0 22px rgba(250,204,21,.22);
        }

        .stage small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,.64);
          font-weight: 400;
        }

        .activeStage {
          background: linear-gradient(135deg, #facc15, #ef4444);
          color: #111;
          border-color: transparent;
          box-shadow: 0 0 35px rgba(250,204,21,.34);
        }

        .activeStage small {
          color: rgba(0,0,0,.72);
        }

        .gamePrompt {
          position: absolute;
          right: 24px;
          bottom: 24px;
          z-index: 9;
          color: rgba(255,255,255,.7);
          letter-spacing: 2px;
          font-size: 11px;
        }

        .boostPanel {
          margin-top: 14px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.1);
        }

        .boostHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .boostHeader p {
          margin: 0;
          color: #facc15;
          font-weight: 900;
          letter-spacing: 3px;
          font-size: 12px;
        }

        .boostHeader h3 {
          margin: 4px 0 0;
          font-size: 32px;
        }

        .gainPill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(250,204,21,.14);
          border: 1px solid rgba(250,204,21,.35);
          color: #facc15;
          font-weight: 900;
          animation: numberPunch .7s cubic-bezier(.2, 1.4, .3, 1) forwards;
        }

        .summary {
          padding: 18px;
        }

        .summaryTop p,
        .requirements span {
          color: #facc15;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 3px;
          margin: 0 0 8px;
        }

        .summaryTop h3 {
          margin: 0 0 18px;
          font-size: 28px;
          line-height: 1;
        }

        .statCard {
          padding: 15px;
          border-radius: 16px;
          margin-bottom: 12px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.09);
        }

        .statCard span {
          display: block;
          color: rgba(255,255,255,.6);
          font-size: 11px;
          margin-bottom: 6px;
        }

        .statCard strong {
          font-size: 22px;
        }

        .requirements {
          margin-top: 18px;
          padding: 15px;
          border-radius: 16px;
          background: rgba(250,204,21,.09);
          border: 1px solid rgba(250,204,21,.22);
        }

        .darkReq {
          background: rgba(255,255,255,.045);
          border-color: rgba(255,255,255,.1);
        }

        .requirements p {
          margin: 8px 0 0;
          color: rgba(255,255,255,.85);
        }

        .cta {
          display: block;
          margin-top: 18px;
          text-align: center;
          color: #111;
          text-decoration: none;
          padding: 15px;
          border-radius: 16px;
          font-weight: 900;
          background: linear-gradient(135deg, #facc15, #ef4444);
          box-shadow: 0 0 30px rgba(250,204,21,.22);
          transition: .2s ease;
        }

        .cta:hover {
          transform: scale(1.04);
          box-shadow: 0 0 45px rgba(250,204,21,.34);
        }

        .optionsPanel {
          margin-top: 16px;
          padding: 18px;
          position: relative;
          z-index: 2;
        }

        .upgradeTop p {
          color: #facc15;
          margin: 0;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .upgradeTop h2 {
          margin: 4px 0 0;
          font-size: 32px;
        }

        .optionsGrid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .option {
          min-height: 110px;
          padding: 16px;
          text-align: left;
          color: white;
          cursor: pointer;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.025));
          transition: .2s ease;
        }

        .option:hover {
          transform: translateY(-6px);
          border-color: rgba(250,204,21,.7);
          box-shadow: 0 0 26px rgba(250,204,21,.16);
        }

        .option span {
          color: #facc15;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .option strong {
          display: block;
          margin-top: 10px;
          font-size: 18px;
        }

        .activeOption {
          border-color: #facc15;
          background: linear-gradient(145deg, rgba(250,204,21,.24), rgba(239,68,68,.08));
        }

        .boost {
          margin-bottom: 22px;
          position: relative;
          padding: 18px;
          border-radius: 20px;
          background:
            radial-gradient(circle at 20% 50%, rgba(250, 204, 21, 0.13), transparent 30%),
            linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
          border: 1px solid rgba(250,204,21,.18);
          overflow: hidden;
        }

        .boost::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.14), transparent);
          transform: translateX(-120%);
          animation: cinematicSweep 1.15s ease forwards;
        }

        .boostTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }

        .boostTop span {
          color: rgba(255,255,255,.75);
          font-weight: 800;
          letter-spacing: 1px;
        }

        .boostTop strong {
          color: #facc15;
        }

        .boostNumbers {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }

        .stockNumber {
          color: rgba(255,255,255,.5);
          font-size: 28px;
        }

        .currentNumber {
          color: #facc15;
          font-size: 44px;
          text-align: right;
          text-shadow: 0 0 28px rgba(250,204,21,.5);
          animation: numberPunch .85s cubic-bezier(.2, 1.4, .3, 1) forwards;
        }

        .boostArrow {
          text-align: center;
          color: #facc15;
        }

        .boostArrow span {
          display: block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 4px;
          animation: flicker .75s infinite alternate;
        }

        .boostArrow b {
          font-size: 34px;
        }

        .boostTrack {
          height: 26px;
          border-radius: 999px;
          background:
            linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.04)),
            #111;
          border: 1px solid rgba(255,255,255,.16);
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 18px rgba(0,0,0,.7);
          z-index: 2;
        }

        .boostFill {
          height: 100%;
          width: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #ef4444, #f97316, #facc15);
          box-shadow:
            0 0 22px rgba(239,68,68,.65),
            0 0 38px rgba(250,204,21,.45);
          animation: cinematicBoostFill 1.35s cubic-bezier(.15,.85,.2,1) forwards;
          position: relative;
          overflow: hidden;
        }

        .boostPulse {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            115deg,
            rgba(255,255,255,0) 0px,
            rgba(255,255,255,0) 12px,
            rgba(255,255,255,.3) 13px,
            rgba(255,255,255,.3) 20px
          );
          animation: boostStripes .42s linear infinite;
        }

        .boostNeedle {
          position: absolute;
          top: -8px;
          left: 0;
          width: 4px;
          height: 42px;
          background: white;
          box-shadow: 0 0 20px white, 0 0 35px #facc15;
          transform: translateX(0);
          animation: needleMove 1.35s cubic-bezier(.15,.85,.2,1) forwards;
        }

        .boostFlames {
          position: absolute;
          inset: -20px;
          background:
            radial-gradient(circle at 20% 50%, rgba(239,68,68,.25), transparent 18%),
            radial-gradient(circle at 40% 50%, rgba(249,115,22,.22), transparent 16%),
            radial-gradient(circle at 60% 50%, rgba(250,204,21,.18), transparent 16%);
          filter: blur(16px);
          animation: flamePulse .55s infinite alternate;
        }

        .boostMeta {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          color: rgba(255,255,255,.7);
          font-size: 12px;
          letter-spacing: 2px;
          position: relative;
          z-index: 2;
        }

        .boostMeta strong {
          color: #facc15;
        }

        @keyframes garagePan {
          from { transform: scale(1.02); }
          to { transform: scale(1.07); }
        }

        @keyframes carEnterGarage {
          from {
            opacity: 0;
            transform: translateX(-43%) scale(.92);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }

        @keyframes carFloat {
          0% { margin-bottom: 0; }
          50% { margin-bottom: 2px; }
          100% { margin-bottom: 0px; }
        }

        @keyframes cinematicBoostFill {
          0% { width: 0; filter: brightness(1); }
          70% { filter: brightness(1.8); }
          100% { width: var(--fill); filter: brightness(1.15); }
        }

        @keyframes needleMove {
          0% { left: 0; }
          100% { left: var(--fill); }
        }

        @keyframes cinematicSweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        @keyframes boostStripes {
          from { transform: translateX(-40px); }
          to { transform: translateX(0); }
        }

        @keyframes flamePulse {
          from { opacity: .45; transform: scale(1); }
          to { opacity: .9; transform: scale(1.05); }
        }

        @keyframes numberPunch {
          0% {
            opacity: 0;
            transform: scale(.65) translateY(16px);
          }
          65% {
            opacity: 1;
            transform: scale(1.18) translateY(-4px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        @keyframes flicker {
          from { opacity: .45; }
          to { opacity: 1; }
        }

        @keyframes rotateAmbient {
          to {
            transform: rotate(360deg);
          }
        }

.partnersSection {
  margin-top: 18px;
  padding: 28px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top, rgba(250,204,21,.14), transparent 38%),
    linear-gradient(135deg, rgba(255,255,255,.07), rgba(0,0,0,.78));
  border: 1px solid rgba(250,204,21,.25);
  box-shadow: 0 30px 90px rgba(0,0,0,.65);
}

.partnersEyebrow {
  color: #facc15;
  letter-spacing: 4px;
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 22px;
}

.partnersGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 14px;
}

.partnerCard {
  height: 150px;
  border-radius: 20px;
  background: rgba(0,0,0,.55);
  border: 1px solid rgba(250,204,21,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .28s ease;
}

.partnerCard:hover {
  transform: translateY(-7px) scale(1.03);
  border-color: #facc15;
  box-shadow: 0 0 32px rgba(250,204,21,.25);
}

.partnerCard img {
  max-width:88%;
  max-height: 82px;
  object-fit: contain;
  opacity: 1;
  filter:
    drop-shadow(0 0 18px rgba(255,255,255,.22))
    drop-shadow(0 0 28px rgba(250,204,21,.18));
}
    .partnersSection {
  margin-top: 18px;
  padding: 30px;
  border-radius: 30px;
  background:
    radial-gradient(circle at center, rgba(250,204,21,.10), transparent 45%),
    linear-gradient(180deg, rgba(255,255,255,.055), rgba(0,0,0,.82));
  border: 1px solid rgba(250,204,21,.25);
  box-shadow:
    0 30px 90px rgba(0,0,0,.7),
    inset 0 0 70px rgba(250,204,21,.035);
}

.partnersEyebrow {
  color: #facc15;
  letter-spacing: 5px;
  font-size: 12px;
  font-weight: 900;
  margin: 0 0 22px;
}

.partnersGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 14px;
}

.partnerCard {
  height: 135px;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.075), rgba(255,255,255,.018)),
    rgba(0,0,0,.65);
  border: 1px solid rgba(250,204,21,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s ease;
  box-shadow: inset 0 0 35px rgba(250,204,21,.035);
}

.partnerCard:hover {
  transform: translateY(-8px) scale(1.035);
  border-color: #facc15;
  box-shadow:
    0 0 36px rgba(250,204,21,.28),
    inset 0 0 45px rgba(250,204,21,.08);
}

.partnerCard img {
  max-width: 78%;
  max-height: 66px;
  object-fit: contain;
  opacity: .96;
  filter:
    brightness(1.9)
    contrast(1.25)
    drop-shadow(0 0 18px rgba(255,255,255,.24))
    drop-shadow(0 0 30px rgba(250,204,21,.20));
}

        @media (max-width: 1200px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .optionsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .heroCard {
            height: 390px;
          }

          .garageCar {
            width: 88%;
            max-height: 68%;
          }

          .stageButtons {
            position: static;
            padding: 14px;
            background: rgba(0,0,0,.55);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }

          .topbar {
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}

function BoostBar({
  label,
  stock,
  current,
  gain,
  unit,
  fill,
}: {
  label: string;
  stock: number;
  current: number;
  gain: number;
  unit: string;
  fill: number;
}) {
  return (
    <div className="boost">
      <div className="boostTop">
        <span>{label}</span>
        <strong>
          +{gain} {unit}
        </strong>
      </div>

      <div className="boostNumbers">
        <strong className="stockNumber">
          {stock} {unit}
        </strong>

        <div className="boostArrow">
          <span>BOOSTING</span>
          <b>→</b>
        </div>

        <strong className="currentNumber">
          {current} {unit}
        </strong>
      </div>

      <div className="boostTrack">
        <div className="boostFlames" />
        <div
          className="boostFill"
          style={{ "--fill": `${fill}%` } as React.CSSProperties}
        >
          <div className="boostPulse" />
        </div>
        <div
          className="boostNeedle"
          style={{ "--fill": `${fill}%` } as React.CSSProperties}
        />
      </div>

      <div className="boostMeta">
        <span>DYNO PULL COMPLETE</span>
        <strong>
          +{gain} {unit} GAIN
        </strong>
      </div>
    </div>
  );
}