"use client";

import { useEffect, useRef, useState } from "react";

type GameState = "idle" | "running" | "crashed" | "cashed";

const reactions = [
  "🚀 Frank says let it ride...",
  "💰 Big multiplier energy.",
  "🐶 Cosmo likes this rocket.",
  "⚠️ Frank smells danger.",
  "🔥 Full send.",
  "🌿 This rocket is getting spicy.",
];

function getCrashPoint() {
  const random = Math.random();

  if (random < 0.45) return Number((1 + Math.random() * 1.4).toFixed(2));
  if (random < 0.8) return Number((2.4 + Math.random() * 3).toFixed(2));
  if (random < 0.95) return Number((5.5 + Math.random() * 8).toFixed(2));

  return Number((14 + Math.random() * 20).toFixed(2));
}

export default function Crash() {
  const [points, setPoints] = useState(2500);
  const [bet, setBet] = useState(50);
  const [multiplier, setMultiplier] = useState(1);
  const [crashPoint, setCrashPoint] = useState(0);
  const [state, setState] = useState<GameState>("idle");
  const [message, setMessage] = useState("Frank is checking the rocket fuel.");
  const [lastResult, setLastResult] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startGame() {
    if (state === "running" || points < bet) return;

    const point = getCrashPoint();

    setCrashPoint(point);
    setMultiplier(1);
    setState("running");
    setLastResult("");
    setMessage("🚀 Frank launched the rocket. Cash out before it crashes!");
  }

  function cashOut() {
    if (state !== "running") return;

    const winnings = Math.floor(bet * multiplier);

    setPoints((prev) => prev + winnings - bet);
    setState("cashed");
    setLastResult(`✅ CASHED OUT AT ${multiplier.toFixed(2)}x — WON ${winnings} THC POINTS`);
    setMessage("💰 Frank says: smart move. Bag secured.");
  }

  useEffect(() => {
    if (state !== "running") return;

    intervalRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const next = Number((prev + 0.04 + prev * 0.018).toFixed(2));

        if (Math.random() < 0.07) {
          setMessage(reactions[Math.floor(Math.random() * reactions.length)]);
        }

        if (next >= crashPoint) {
          if (intervalRef.current) clearInterval(intervalRef.current);

          setState("crashed");
          setPoints((prevPoints) => prevPoints - bet);
          setLastResult(`💥 CRASHED AT ${crashPoint.toFixed(2)}x — LOST ${bet} THC POINTS`);
          setMessage("💥 Frank saw that coming.");

          return crashPoint;
        }

        return next;
      });
    }, 110);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state, crashPoint, bet]);

  const rocketY = Math.min(multiplier * 18, 210);

  return (
    <main className="page">
      <h1>🚀 Frank&apos;s Crash</h1>
      <h2>{points.toLocaleString()} THC Points</h2>

      <div className="casino">
        <div className="topHud">
          <div className="dealerBadge">
            <img src="/cosmo.png" alt="Cosmo" className="cosmoPhoto" />
            <div>
              <h3>🔥 Frank</h3>
              <p>Rocket Risk Manager</p>
              <small>High multiplier specialist · Part-time chaos dealer</small>
            </div>
          </div>

          <div className="quote">“{message}”</div>
        </div>

        <div className={`crashTable ${state}`}>
          <div className="sky">
            <div
              className="rocket"
              style={{
                transform: `translateY(-${rocketY}px) scale(${state === "crashed" ? 1.3 : 1})`,
              }}
            >
              {state === "crashed" ? "💥" : "🚀"}
            </div>

            <div className="multiplier">{multiplier.toFixed(2)}x</div>
          </div>

          <div className="line" />

          {lastResult && <div className="result">{lastResult}</div>}

          <div className="controls">
            <button onClick={startGame} disabled={state === "running" || points < bet}>
              LAUNCH 🚀
            </button>

            <button onClick={cashOut} disabled={state !== "running"}>
              CASH OUT 💰
            </button>
          </div>
        </div>

        <div className="bets">
          {[25, 50, 100, 250].map((amount) => (
            <button
              key={amount}
              onClick={() => setBet(amount)}
              disabled={state === "running"}
              className={bet === amount ? "activeBet" : ""}
            >
              {amount}
            </button>
          ))}
        </div>

        <p className="disclaimer">Free-to-play demo. THC Points have no cash value.</p>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #174d2a, #071107 55%, #020402);
          color: white;
          padding: 28px;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        h1 {
          font-size: 46px;
          margin: 8px 0;
        }

        h2 {
          color: #22c55e;
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
          border: 2px solid #22c55e;
          border-radius: 22px;
          padding: 16px;
        }

        .dealerBadge {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }

        .cosmoPhoto {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #22c55e;
          box-shadow: 0 0 28px rgba(34, 197, 94, 0.75);
        }

        .dealerBadge h3 {
          font-size: 28px;
          margin: 0;
        }

        .dealerBadge p {
          color: #bbf7d0;
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
          background: radial-gradient(circle at center, #14532d 0%, #0f3b22 58%, #062010 100%);
          border: 10px solid #3b2412;
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
          filter: drop-shadow(0 0 18px rgba(34, 197, 94, 0.9));
        }

        .multiplier {
          position: absolute;
          top: 40%;
          font-size: 68px;
          font-weight: 900;
          color: #bbf7d0;
          text-shadow: 0 0 30px rgba(34, 197, 94, 0.8);
        }

        .line {
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.2) 10px,
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
          color: #bbf7d0;
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
          background: linear-gradient(180deg, #22c55e, #15803d);
          color: #071107;
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
        }

        .bets button {
          margin: 6px;
          padding: 12px 20px;
          background: #222;
          color: white;
        }

        .bets .activeBet {
          background: #22c55e;
          color: #071107;
        }

        .disclaimer {
          color: #bbf7d0;
          font-size: 13px;
          margin-top: 18px;
        }

        @media (max-width: 750px) {
          .page {
            padding: 14px;
            overflow-x: hidden;
          }

          h1 {
            font-size: 32px;
            line-height: 1.1;
          }

          h2 {
            font-size: 24px;
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

          .cosmoPhoto {
            width: 80px;
            height: 80px;
          }

          .crashTable {
            padding: 16px;
            border-width: 6px;
            border-radius: 28px;
            min-height: 390px;
          }

          .multiplier {
            font-size: 48px;
          }

          .rocket {
            font-size: 56px;
          }

          .controls button {
            width: 46%;
            padding: 13px 8px;
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}