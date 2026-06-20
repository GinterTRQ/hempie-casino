"use client";

import { useState } from "react";

type Card = {
  suit: string;
  value: string;
  hidden?: boolean;
};

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const winMessages = [
  "🌿 Cosmo approves this payout.",
  "🚀 Absolutely launched.",
  "👑 King of Cary energy detected.",
  "🐶 Good human.",
  "🏎️ Lamborghini payment secured.",
];

const loseMessages = [
  "💨 Ruff hand.",
  "🦴 Thank you for the treat fund donation.",
  "🐶 I’ve seen squirrels manage money better.",
  "😬 Let’s never speak of this again.",
  "🌿 The house needed that one.",
];

const roastMessages = [
  "🐶 Bold strategy, human.",
  "🌿 Even Cosmo wouldn’t have hit on that.",
  "🦴 I’ve seen squirrels make better plays.",
  "🐶 That was certainly a decision.",
];

function random(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function drawCard(): Card {
  return {
    suit: suits[Math.floor(Math.random() * suits.length)],
    value: values[Math.floor(Math.random() * values.length)],
  };
}

function handValue(hand: Card[]) {
  let total = 0;
  let aces = 0;

  hand.filter((c) => !c.hidden).forEach((card) => {
    if (card.value === "A") {
      total += 11;
      aces++;
    } else if (["J", "Q", "K"].includes(card.value)) {
      total += 10;
    } else {
      total += Number(card.value);
    }
  });

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function speak(text: string) {
  if (typeof window === "undefined") return;
  if (!window.speechSynthesis) return;

  const clean = text.replace(/[^\w\s.,!?'-]/g, "");
  const voice = new SpeechSynthesisUtterance(clean);
  voice.rate = 1;
  voice.pitch = 1.25;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(voice);
}

function beep(type: "deal" | "win" | "lose" | "blackjack") {
  if (typeof window === "undefined") return;

  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;

  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value =
    type === "win" ? 660 : type === "blackjack" ? 880 : type === "lose" ? 160 : 360;

  gain.gain.value = 0.06;
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    ctx.close();
  }, type === "blackjack" ? 220 : 120);
}

function CardBox({ card }: { card: Card }) {
  const red = card.suit === "♥" || card.suit === "♦";

  return (
    <div
      style={{
        width: 94,
        height: 134,
        background: card.hidden ? "linear-gradient(135deg,#12351f,#06140b)" : "white",
        color: card.hidden ? "#22c55e" : red ? "#dc2626" : "#111",
        borderRadius: 16,
        border: card.hidden ? "3px solid #22c55e" : "3px solid #eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 34,
        fontWeight: "bold",
        boxShadow: "0 14px 30px rgba(0,0,0,.55)",
        margin: 6,
        animation: "dealCard .75s cubic-bezier(.2,.9,.2,1)",
      }}
    >
      {card.hidden ? (
        <>
          <div style={{ fontSize: 42 }}>🌿</div>
          <div style={{ fontSize: 12, letterSpacing: 2 }}>HEMPIE</div>
        </>
      ) : (
        <>
          <div>{card.value}</div>
          <div style={{ fontSize: 38 }}>{card.suit}</div>
        </>
      )}
    </div>
  );
}

const tableButton = {
  padding: "18px 28px",
  border: "none",
  borderRadius: 18,
  background: "linear-gradient(180deg, #22c55e, #15803d)",
  color: "#071107",
  fontWeight: 900,
  fontSize: 17,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,.35)",
};

export default function Blackjack() {
  const [points, setPoints] = useState(2500);
  const [bet, setBet] = useState(50);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [message, setMessage] = useState("Cosmo is waiting. Place your bet.");
  const [popup, setPopup] = useState("");
  const [gameActive, setGameActive] = useState(false);
  const [dealing, setDealing] = useState(false);

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  function setCosmo(text: string, talk = true) {
    setMessage(text);
    if (talk) speak(text);
  }

  async function deal() {
    if (gameActive || dealing || points < bet) return;

    setPopup("");
    setPlayerHand([]);
    setDealerHand([]);
    setCosmo("🐶 Cosmo is shuffling...");
    setDealing(true);

    const p1 = drawCard();
    const d1 = drawCard();
    const p2 = drawCard();
    const d2 = { ...drawCard(), hidden: true };

    await wait(400);
    beep("deal");
    setPlayerHand([p1]);

    await wait(400);
    beep("deal");
    setDealerHand([d1]);

    await wait(400);
    beep("deal");
    setPlayerHand([p1, p2]);

    await wait(400);
    beep("deal");
    setDealerHand([d1, d2]);

    if (handValue([p1, p2]) === 21) {
      const win = Math.floor(bet * 1.5);
      setPoints((p) => p + win);
      beep("blackjack");
      setPopup(`🤠 SPACE COWBOY BLACKJACK! +${win} THC POINTS`);
      setCosmo("Space cowboy detected. Cosmo has entered goblin mode.");
      setDealing(false);
      return;
    }

    setGameActive(true);
    setDealing(false);
    setCosmo("🐶 Cosmo says: Hit, Stand, or Double?");
  }

  async function hit() {
    if (!gameActive || dealing) return;

    setDealing(true);
    setCosmo(random(roastMessages));

    await wait(450);
    beep("deal");

    const nextHand = [...playerHand, drawCard()];
    setPlayerHand(nextHand);

    if (handValue(nextHand) > 21) {
      setPoints((p) => p - bet);
      beep("lose");
      setPopup(`💨 BUST — LOST ${bet} THC POINTS`);
      setCosmo(random(loseMessages));
      setGameActive(false);
    } else {
      setCosmo("🐶 Cosmo says: Hit, Stand, or Double?");
    }

    setDealing(false);
  }

  async function finishRound(roundBet: number, finalPlayerHand: Card[]) {
    setDealing(true);

    let dealer = dealerHand.map((c) => ({ ...c, hidden: false }));
    setDealerHand(dealer);
    setCosmo("🐶 Cosmo reveals the hidden card...");

    await wait(700);

    while (handValue(dealer) < 17) {
      dealer = [...dealer, drawCard()];
      beep("deal");
      setDealerHand(dealer);
      setCosmo("🐶 Cosmo draws...");
      await wait(700);
    }

    const playerTotal = handValue(finalPlayerHand);
    const dealerTotal = handValue(dealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setPoints((p) => p + roundBet);
      beep("win");
      setPopup(`🎉 YOU WON ${roundBet} THC POINTS`);
      setCosmo(random(winMessages));
    } else if (playerTotal < dealerTotal) {
      setPoints((p) => p - roundBet);
      beep("lose");
      setPopup(`💨 LOST ${roundBet} THC POINTS`);
      setCosmo(random(loseMessages));
    } else {
      setPopup("🤝 PUSH — BET RETURNED");
      setCosmo("🐶 Push. Cosmo calls it even.");
    }

    setGameActive(false);
    setDealing(false);
  }

  async function stand() {
    if (!gameActive || dealing) return;
    await finishRound(bet, playerHand);
  }

  async function doubleDown() {
    if (!gameActive || dealing || points < bet * 2) return;

    setDealing(true);
    setCosmo("🐶 BOLD STRATEGY, HUMAN.");

    await wait(500);
    beep("deal");

    const nextHand = [...playerHand, drawCard()];
    setPlayerHand(nextHand);

    if (handValue(nextHand) > 21) {
      setPoints((p) => p - bet * 2);
      beep("lose");
      setPopup(`💨 DOUBLE BUST — LOST ${bet * 2} THC POINTS`);
      setCosmo("🐶 That was certainly a decision.");
      setGameActive(false);
      setDealing(false);
      return;
    }

    await finishRound(bet * 2, nextHand);
  }

  function preRolls() {
    const count = bet === 25 ? 1 : bet === 50 ? 2 : bet === 100 ? 4 : 6;
    return "💨".repeat(count);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #174d2a, #071107 60%, #020402)",
        color: "white",
        padding: 28,
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 46 }}>🌿 Hempie’s Underground Blackjack</h1>
      <h2 style={{ color: "#22c55e" }}>{points.toLocaleString()} THC Points</h2>

      {popup && (
        <div
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#22c55e",
            color: "#071107",
            padding: "18px 34px",
            borderRadius: 18,
            fontSize: 22,
            fontWeight: 900,
            zIndex: 999,
            boxShadow: "0 20px 70px rgba(0,0,0,.6)",
          }}
        >
          {popup}
        </div>
      )}

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 18,
              textAlign: "left",
              background: "rgba(0,0,0,.35)",
              border: "2px solid #22c55e",
              borderRadius: 24,
              padding: 16,
            }}
          >
            <img
              src="/cosmo.png"
              alt="Cosmo"
              style={{
                width: 112,
                height: 112,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #22c55e",
                boxShadow: "0 0 30px rgba(34,197,94,.8)",
              }}
            />

            <div>
              <h2 style={{ margin: 0, color: "white" }}>🐶 Cosmo</h2>
              <p style={{ color: "#bbf7d0", fontWeight: "bold", margin: "4px 0" }}>
                Chief Treat Officer
              </p>
              <small>Professional Treat Inspector · Part-Time Blackjack Dealer</small>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(0,0,0,.45)",
              border: "2px solid #3b7a45",
              borderRadius: 24,
              padding: 24,
              fontSize: 20,
              fontStyle: "italic",
            }}
          >
            “{message}”
          </div>
        </div>

        <div
          style={{
            background: "radial-gradient(circle at center, #14532d, #0f3b22 58%, #062010)",
            border: "10px solid #3b2412",
            borderRadius: 42,
            padding: 28,
            boxShadow: "0 35px 90px rgba(0,0,0,.7)",
          }}
        >
          <h2>Dealer: {gameActive ? "?" : handValue(dealerHand)}</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, minHeight: 150 }}>
            {dealerHand.map((card, i) => (
              <CardBox key={`dealer-${i}-${card.value}-${card.suit}-${card.hidden}`} card={card} />
            ))}
          </div>

          <div
            style={{
              margin: "26px auto",
              width: 280,
              minHeight: 100,
              border: "2px dashed rgba(255,255,255,.35)",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbf7d0",
              fontWeight: "bold",
              fontSize: 22,
              animation: dealing ? "pushBet .45s ease-in-out" : "none",
            }}
          >
            <div style={{ fontSize: 32 }}>{preRolls()}</div>
            <div>THC BET: {bet}</div>
          </div>

          <h2>Your Hand: {handValue(playerHand)}</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, minHeight: 150 }}>
            {playerHand.map((card, i) => (
              <CardBox key={`player-${i}-${card.value}-${card.suit}`} card={card} />
            ))}
          </div>

          <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button onClick={deal} disabled={gameActive || dealing} style={tableButton}>DEAL 🌿</button>
            <button onClick={hit} disabled={!gameActive || dealing} style={tableButton}>HIT 💨</button>
            <button onClick={stand} disabled={!gameActive || dealing} style={tableButton}>STAND ✋</button>
            <button onClick={doubleDown} disabled={!gameActive || dealing} style={tableButton}>DOUBLE 2X 🚀</button>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          {[25, 50, 100, 250].map((amount) => (
            <button
              key={amount}
              onClick={() => setBet(amount)}
              disabled={gameActive || dealing}
              style={{
                margin: 6,
                padding: "12px 20px",
                borderRadius: 12,
                border: "none",
                background: bet === amount ? "#22c55e" : "#222",
                color: bet === amount ? "#071107" : "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      <p style={{ color: "#bbf7d0", fontSize: 13, marginTop: 18 }}>
        Free-to-play demo. THC Points have no cash value.
      </p>

      <style jsx>{`
        @keyframes dealCard {
          from {
            transform: translateY(-220px) translateX(120px) rotate(18deg) scale(0.4);
            opacity: 0;
          }
          60% {
            transform: translateY(12px) translateX(-8px) rotate(-4deg) scale(1.05);
            opacity: 1;
          }
          to {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes pushBet {
          0% { transform: scale(1); }
          50% { transform: scale(1.08) translateY(-8px); }
          100% { transform: scale(1); }
        }
      `}</style>
    </main>
  );
}