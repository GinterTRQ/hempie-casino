"use client";

import { useEffect, useRef, useState } from "react";

type GameState = "idle" | "running" | "crashed" | "cashed";

const reactions = [
  "🪚 Frank says: measure twice, gamble once.",
  "📐 This cabinet layout is absolutely cooking.",
  "🚚 Delivery truck is somehow still on schedule.",
  "🧰 Installer says this wall is definitely not straight.",
  "💰 Invoice is getting dangerously large.",
  "🚪 Soft-close hinges engaged.",
  "🔥 Booming Cabinets is printing money.",
  "📦 Someone ordered 47 uppers and no lowers.",
  "🧾 Change order detected... keep riding?",
  "👷 Frank says the customer wants gold handles now.",
];

function getCrashPoint() {
  const random = Math.random();

  if (random < 0.15) return Number((1.5 + Math.random() * 1.5).toFixed(2));
  if (random < 0.6) return Number((3 + Math.random() * 4).toFixed(2));
  if (random < 0.88) return Number((7 + Math.random() * 10).toFixed(2));
  if (random < 0.98) return Number((18 + Math.random() * 32).toFixed(2));

  return Number((75 + Math.random() * 175).toFixed(2));
}

function beep(type: "start" | "cashout" | "crash" | "tick") {
  if (typeof window === "undefined") return;

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value =
    type === "start" ? 440 : type === "cashout" ? 740 : type === "crash" ? 100 : 320;

  gain.gain.value = type === "crash" ? 0.09 : 0.045;
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    ctx.close();
  }, type === "crash" ? 300 : 85);
}

export default function Crash() {
  const [money, setMoney] = useState(250000000);
  const [bet, setBet] = useState(50000);
  const [multiplier, setMultiplier] = useState(1);
  const [crashPoint, setCrashPoint] = useState(0);
  const [state, setState] = useState<GameState>("idle");
  const [message, setMessage] = useState("Frank is pricing out the cabinet job.");
  const [lastResult, setLastResult] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startGame() {
    if (state === "running" || money < bet) return;

    const point = getCrashPoint();

    setCrashPoint(point);
    setMultiplier(1);
    setState("running");
    setLastResult("");
    setMessage("🚀 Job started. Collect the invoice before the client changes the layout!");
    beep("start");
  }

  function cashOut() {
    if (state !== "running") return;

    const winnings = Math.floor(bet * multiplier);

    if (intervalRef.current) clearInterval(intervalRef.current);

    setMoney((prev) => prev + winnings - bet);
    setState("cashed");
    setLastResult(`✅ INVOICE COLLECTED AT ${multiplier.toFixed(2)}x — MADE $${winnings.toLocaleString()}`);
    setMessage("💰 Frank says: paid in full. No change orders today.");
    beep("cashout");
  }

  useEffect(() => {
    if (state !== "running") return;

    intervalRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const next = Number((prev + 0.035 + prev * 0.014).toFixed(2));

        if (Math.random() < 0.08) {
          setMessage(reactions[Math.floor(Math.random() * reactions.length)]);
        }

        if (Math.random() < 0.12) beep("tick");

        if (next >= crashPoint) {
          if (intervalRef.current) clearInterval(intervalRef.current);

          setState("crashed");
          setMoney((prevMoney) => prevMoney - bet);
          setLastResult(`💥 CHANGE ORDER AT ${crashPoint.toFixed(2)}x — LOST $${bet.toLocaleString()}`);
          setMessage("💥 Customer changed from shaker white to walnut inset after delivery.");
          beep("crash");

          return crashPoint;
        }

        return next;
      });
    }, 115);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state, crashPoint, bet]);

  const cabinetY = Math.min(multiplier * 12, 230);

  return (
    <main className="page">
      <h1>🧰 Frank&apos;s Crash</h1>
      <h2>💰 ${money.toLocaleString()} Cabinet Empire Fund</h2>

      <div className="casino">
        <div className="topHud">
          <div className="dealerBadge">
            <div className="cabinetIcon">🚪</div>
            <div>
              <h3>Booming Cabinets</h3>
              <p>Change Order Risk Desk</p>
              <small>Soft-close specialist · Full-time invoice collector</small>
            </div>
          </div>

          <div className="quote">“{message}”</div>
        </div>

        <div className={`crashTable ${state}`}>
          <div className="sky">
            <div
              className="rocket"
              style={{
                transform: `translateY(-${cabinetY}px) scale(${state === "crashed" ? 1.35 : 1})`,
              }}
            >
              {state === "crashed" ? "💥" : "🧰"}
            </div>

            <div className="multiplier">{multiplier.toFixed(2)}x</div>
          </div>

          <div className="line" />

          {lastResult && <div className="result">{lastResult}</div>}

          <div className="controls">
            <button onClick={startGame} disabled={state === "running" || money < bet}>
              START INSTALL 🪚
            </button>

            <button onClick={cashOut} disabled={state !== "running"}>
              COLLECT INVOICE 💰
            </button>
          </div>
        </div>

        <div className="bets">
          {[50000, 100000, 250000, 1000000, 5000000].map((amount) => (
            <button
              key={amount}
              onClick={() => setBet(amount)}
              disabled={state === "running"}
              className={bet === amount ? "activeBet" : ""}
            >
              ${amount.toLocaleString()}
            </button>
          ))}
        </div>

        <p className="disclaimer">Free-to-play cabinet chaos simulator. No real money value.</p>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #8b5a2b, #24140a 55%, #080402);
          color: white;
          padding: 28px;
          text-align: center;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }

        h1 {
          font-size: 46px;
          margin: 8px 0;
        }

        h2 {
          color: #fbbf24;
          margin-bottom: 18px;
        }

        .casino {
          max-width: 1050px;
          margin: 0 auto;
        }

        .topHud {
          display: flex;
          gap: 18px;
          align-items: stretch;
          margin-bottom: 16px;
        }

        .dealerBadge,
        .quote {
          flex: 1;
          background: rgba(0, 0, 0, 0.38);
          border: 2px solid #fbbf24;
          border-radius: 22px;
          padding: 16px;
        }

        .dealerBadge {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }

        .cabinetIcon {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          background: linear-gradient(135deg, #a16207, #422006);
          border: 4px solid #fbbf24;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 54px;
          box-shadow: 0 0 28px rgba(251, 191, 36, 0.65);
          flex-shrink: 0;
        }

        .dealerBadge h3 {
          font-size: 28px;
          margin: 0;
        }

        .dealerBadge p {
          color: #fde68a;
          font-weight: bold;
          margin: 4px 0;
        }

        .quote {
          font-size: 24px;
          font-style: italic;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.35;
        }

        .crashTable {
          background: radial-gradient(circle at center, #78350f 0%, #451a03 58%, #1c0a02 100%);
          border: 10px solid #2b1608;
          border-radius: 42px;
          min-height: 430px;
          padding: 26px;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.7);
          position: relative;
          overflow: hidden;
        }

        .sky {
          height: 280px;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .rocket {
          font-size: 70px;
          transition: transform 0.12s linear;
          filter: drop-shadow(0 0 18px rgba(251, 191, 36, 0.9));
        }

        .multiplier {
          position: absolute;
          top: 40%;
          font-size: 68px;
          font-weight: 900;
          color: #fde68a;
          text-shadow: 0 0 30px rgba(251, 191, 36, 0.8);
        }

        .line {
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            rgba(255, 255, 255, 0.25),
            rgba(255, 255, 255, 0.25) 10px,
            transparent 10px,
            transparent 20px
          );
          margin: 10px auto 24px;
          max-width: 520px;
        }

        .result {
          font-size: 22px;
          font-weight: 900;
          margin: 18px 0;
          color: #fde68a;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        button {
          padding: 16px 28px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(180deg, #fbbf24, #b45309);
          color: #1c0a02;
          font-weight: 900;
          font-size: 17px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        }

        button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .bets {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .bets button {
          padding: 12px 20px;
          background: #2b1608;
          color: white;
        }

        .bets .activeBet {
          background: #fbbf24;
          color: #1c0a02;
        }

        .disclaimer {
          color: #fde68a;
          font-size: 13px;
          margin-top: 18px;
        }

        @media (max-width: 750px) {
          .page {
            padding: 14px;
          }

          h1 {
            font-size: 32px;
            line-height: 1.1;
          }

          h2 {
            font-size: 22px;
          }

          .topHud {
            flex-direction: column;
          }

          .dealerBadge {
            width: 100%;
            box-sizing: border-box;
          }

          .quote {
            width: 100%;
            box-sizing: border-box;
            font-size: 18px;
            padding: 16px;
          }

          .cabinetIcon {
            width: 80px;
            height: 80px;
            font-size: 42px;
          }

          .crashTable {
            padding: 16px;
            border-width: 6px;
            border-radius: 28px;
            min-height: 390px;
          }

          .multiplier {
            font-size: clamp(34px, 10vw, 48px);
          }

          .rocket {
            font-size: clamp(42px, 11vw, 56px);
          }

          .controls button {
            width: 47%;
            padding: 13px 8px;
            font-size: 13px;
          }

          .bets button {
            font-size: 13px;
            padding: 10px 12px;
          }
        }
      `}</style>
    </main>
  );
}