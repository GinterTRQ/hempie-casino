"use client";

import { useState } from "react";

type Card = {
  suit: string;
  value: string;
  hidden?: boolean;
};

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const blackjackMessages = [
  "🤠 SPACE COWBOY! BLACKJACK!",
  "🌿 Wow, look... it’s the owner of Hempie’s.",
  "🚀 Cosmo says this hand is going to the moon.",
  "👑 King of Cary energy detected.",
  "🏎️ Lamborghini payment secured.",
  "🛸 The aliens are betting with you today.",
];

const winMessages = [
  "🐶 Cosmo approves this payout.",
  "🎉 THC Points printer activated.",
  "🚀 Absolutely launched.",
  "😎 Dealer Cosmo is impressed.",
  "🌿 Main character energy.",
];

const loseMessages = [
  "💨 Ruff hand.",
  "🐶 Cosmo didn’t like that one.",
  "🌿 The house needed that.",
  "😬 Let’s never speak of this again.",
  "🦴 Thank you for the treat fund donation.",
];

const roastMessages = [
  "🐶 Bold strategy, human.",
  "🌿 Even Cosmo wouldn’t have hit on that.",
  "🦴 I’ve seen squirrels make better plays.",
  "🐶 That was certainly a decision.",
];

function randomMessage(list: string[]) {
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

function CardView({ card }: { card: Card }) {
  const red = card.suit === "♥" || card.suit === "♦";

  return (
    <div
      style={{
        width: 92,
        height: 132,
        background: card.hidden
          ? "linear-gradient(135deg,#12351f,#0b1f12)"
          : "white",
        color: card.hidden ? "#22c55e" : red ? "#dc2626" : "#111",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: 32,
        fontWeight: "bold",
        boxShadow: "0 14px 35px rgba(0,0,0,.55)",
        border: card.hidden ? "2px solid #22c55e" : "2px solid #eee",
        animation: "dealCard .8s cubic-bezier(.2,.9,.2,1)",
      }}
    >
      {card.hidden ? (
        <>
          <div style={{ fontSize: 40 }}>🌿</div>
          <div style={{ fontSize: 12, letterSpacing: 2 }}>HEMPIE</div>
        </>
      ) : (
        <>
          <div>{card.value}</div>
          <div style={{ fontSize: 34 }}>{card.suit}</div>
        </>
      )}
    </div>
  );
}

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

  async function startGame() {
    if (points < bet || dealing || gameActive) return;

    setPopup("");
    setPlayerHand([]);
    setDealerHand([]);
    setMessage("🐶 Cosmo is shuffling...");
    setDealing(true);

    const p1 = drawCard();
    const d1 = drawCard();
    const p2 = drawCard();
    const d2 = { ...drawCard(), hidden: true };

    await wait(500);
    setPlayerHand([p1]);

    await wait(500);
    setDealerHand([d1]);

    await wait(500);
    setPlayerHand([p1, p2]);

    await wait(500);
    setDealerHand([d1, d2]);

    if (handValue([p1, p2]) === 21) {
      const winAmount = Math.floor(bet * 1.5);
      setPoints((prev) => prev + winAmount);
      setMessage(randomMessage(blackjackMessages));
      setPopup(`🤠 SPACE COWBOY BLACKJACK! +${winAmount} THC POINTS`);
      setGameActive(false);
      setDealing(false);
      return;
    }

    setMessage("🐶 Cosmo says: Hit, Stand, or Double?");
    setGameActive(true);
    setDealing(false);
  }

  async function hit() {
    if (!gameActive || dealing) return;

    setDealing(true);
    setMessage(randomMessage(roastMessages));
    await wait(550);

    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);

    if (handValue(newHand) > 21) {
      setPoints((prev) => prev - bet);
      setMessage(randomMessage(loseMessages));
      setPopup(`💨 BUST — LOST ${bet} THC POINTS`);
      setGameActive(false);
    } else {
      setMessage("🐶 Cosmo says: Hit, Stand, or Double?");
    }

    setDealing(false);
  }

  async function finishDealer(customBet: number, customPlayerHand: Card[]) {
    setDealing(true);
    setMessage("🐶 Cosmo reveals the hidden card...");

    let dealer = dealerHand.map((card) => ({ ...card, hidden: false }));
    setDealerHand(dealer);

    await wait(700);

    while (handValue(dealer) < 17) {
      dealer = [...dealer, drawCard()];
      setDealerHand(dealer);
      setMessage("🐶 Cosmo draws...");
      await wait(700);
    }

    const playerTotal = handValue(customPlayerHand);
    const dealerTotal = handValue(dealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setPoints((prev) => prev + customBet);
      setMessage(randomMessage(winMessages));
      setPopup(`🎉 YOU WON ${customBet} THC POINTS`);
    } else if (playerTotal < dealerTotal) {
      setPoints((prev) => prev - customBet);
      setMessage(randomMessage(loseMessages));
      setPopup(`💨 LOST ${customBet} THC POINTS`);
    } else {
      setMessage("🐶 Push. Cosmo calls it even.");
      setPopup("🤝 PUSH — BET RETURNED");
    }

    setGameActive(false);
    setDealing(false);
  }

  async function stand() {
    if (!gameActive || dealing) return;
    await finishDealer(bet, playerHand);
  }

  async function doubleDown() {
    if (!gameActive || dealing || points < bet * 2) return;

    setDealing(true);
    setMessage("🐶 BOLD STRATEGY, HUMAN.");
    await wait(550);

    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);

    if (handValue(newHand) > 21) {
      setPoints((prev) => prev - bet * 2);
      setMessage(randomMessage(loseMessages));
      setPopup(`💨 DOUBLE BUST — LOST ${bet * 2} THC POINTS`);
      setGameActive(false);
      setDealing(false);
      return;
    }

    await finishDealer(bet * 2, newHand);
  }

  function preRolls() {
    const count = bet === 25 ? 1 : bet === 50 ? 2 : bet === 100 ? 4 : 6;

    return Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ fontSize: 28, margin: "0 2px" }}>
        💨
      </span>
    ));
  }

  return (
    <main className="page">
      <h1>🌿 Hempie’s Underground Blackjack</h1>
      <h2>{points.toLocaleString()} THC Points</h2>

      {popup && <div className="popup">{popup}</div>}

      <div className="casino">
        <div className="topHud">
          <div className="dealerBadge">
            <img src="/cosmo.png" alt="Cosmo" className="cosmoPhoto" />

            <div>
              <h3>🐶 Cosmo</h3>
              <p>Chief Treat Officer</p>
              <small>
                Professional Treat Inspector · Part-Time Blackjack Dealer
              </small>
            </div>
          </div>

          <div className="quote">“{message}”</div>
        </div>

        <div className="table">
          <section>
            <h3>Dealer: {gameActive ? "?" : handValue(dealerHand)}</h3>
            <div className="cards">
              {dealerHand.map((card, i) => (
                <CardView key={`dealer-${card.suit}-${card.value}-${i}-${card.hidden}`} card={card} />
              ))}
            </div>
          </section>

          <div className="betZone">
            <div>{preRolls()}</div>
            <div className="betText">THC BET: {bet}</div>
          </div>

          <section>
            <h3>Your Hand: {handValue(playerHand)}</h3>
            <div className="cards">
              {playerHand.map((card, i) => (
                <CardView key={`player-${card.suit}-${card.value}-${i}`} card={card} />
              ))}
            </div>
          </section>

          <div className="tableButtons">
            <button onClick={startGame} disabled={gameActive || dealing}>
              DEAL 🌿
            </button>
            <button onClick={hit} disabled={!gameActive || dealing}>
              HIT 💨
            </button>
            <button onClick={stand} disabled={!gameActive || dealing}>
              STAND ✋
            </button>
            <button onClick={doubleDown} disabled={!gameActive || dealing}>
              DOUBLE 2X 🚀
            </button>
          </div>
        </div>
      </div>

      <div className="bets">
        {[25, 50, 100, 250].map((amount) => (
          <button
            key={amount}
            onClick={() => setBet(amount)}
            disabled={gameActive || dealing}
            className={bet === amount ? "activeBet" : ""}
          >
            {amount}
          </button>
        ))}
      </div>

      <p className="disclaimer">
        Free-to-play demo. THC Points have no cash value.
      </p>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(
            circle at top,
            #174d2a 0%,
            #071107 50%,
            #020402 100%
          );
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
          margin: 0 0 18px;
        }

        .popup {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: #22c55e;
          color: #071107;
          padding: 18px 34px;
          border-radius: 18px;
          font-size: 22px;
          font-weight: 900;
          z-index: 999;
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.6);
          white-space: pre-line;
        }

        .casino {
          max-width: 1100px;
          margin: 0 auto;
        }

        .topHud {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-bottom: 12px;
        }

        .dealerBadge {
          display: flex;
          gap: 16px;
          align-items: center;
          text-align: left;
          background: rgba(0, 0, 0, 0.35);
          border: 2px solid #22c55e;
          border-radius: 22px;
          padding: 14px 18px;
          flex: 1;
        }

        .cosmoPhoto {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #22c55e;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.8);
          background: #f3dfba;
        }

        .dealerBadge h3 {
          font-size: 28px;
          margin: 0;
        }

        .dealerBadge p {
          margin: 2px 0;
          color: #bbf7d0;
          font-weight: bold;
        }

        .dealerBadge small {
          color: #d9f99d;
        }

        .quote {
          flex: 1;
          background: rgba(0, 0, 0, 0.45);
          border: 2px solid #3b7a45;
          border-radius: 22px;
          padding: 22px;
          font-size: 20px;
          font-style: italic;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .table {
          background: radial-gradient(
            circle at center,
            #14532d 0%,
            #0f3b22 58%,
            #062010 100%
          );
          border: 10px solid #3b2412;
          border-radius: 40px;
          padding: 26px;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.7);
        }

        .cards {
          display: flex;
          justify-content: center;
          gap: 14px;
          min-height: 142px;
          align-items: center;
          flex-wrap: wrap;
        }

        .betZone {
          margin: 28px auto;
          width: 260px;
          min-height: 90px;
          border: 2px dashed rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #bbf7d0;
          font-weight: bold;
        }

        .betText {
          margin-top: 8px;
          font-size: 18px;
        }

        .tableButtons {
          margin-top: 28px;
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tableButtons button {
          padding: 18px 28px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(180deg, #22c55e, #15803d);
          color: #071107;
          font-weight: 900;
          font-size: 17px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        }

        .tableButtons button:disabled,
        .bets button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .bets {
          margin-top: 22px;
        }

        .bets button {
          margin: 6px;
          padding: 12px 20px;
          border-radius: 12px;
          border: none;
          background: #222;
          color: white;
          font-weight: bold;
          cursor: pointer;
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

        @keyframes dealCard {
          from {
            transform: translateY(-260px) translateX(120px) rotate(18deg)
              scale(0.4);
            opacity: 0;
          }
          60% {
            transform: translateY(15px) translateX(-10px) rotate(-4deg)
              scale(1.05);
            opacity: 1;
          }
          to {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 750px) {
          .topHud {
            flex-direction: column;
          }

          h1 {
            font-size: 34px;
          }

          .tableButtons button {
            padding: 14px 18px;
          }
        }
      `}</style>
    </main>
  );
}