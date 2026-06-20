"use client";

import { useState } from "react";

type Card = {
  suit: string;
  value: string;
  hidden?: boolean;
};

const suits = ["♠️", "♥️", "♦️", "♣️"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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

export default function Blackjack() {
  const [credits, setCredits] = useState(2500);
  const [bet, setBet] = useState(50);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [message, setMessage] = useState("Place your bet and deal.");
  const [gameActive, setGameActive] = useState(false);
  const [dealing, setDealing] = useState(false);

  async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function startGame() {
    if (credits < bet || dealing) return;

    setPlayerHand([]);
    setDealerHand([]);
    setMessage("Dealing...");
    setGameActive(false);
    setDealing(true);

    const p1 = drawCard();
    const d1 = drawCard();
    const p2 = drawCard();
    const d2 = { ...drawCard(), hidden: true };

    await wait(350);
    setPlayerHand([p1]);

    await wait(350);
    setDealerHand([d1]);

    await wait(350);
    setPlayerHand([p1, p2]);

    await wait(350);
    setDealerHand([d1, d2]);

    setMessage("Hit or stand.");
    setGameActive(true);
    setDealing(false);
  }

  async function hit() {
    if (!gameActive || dealing) return;

    setDealing(true);
    setMessage("Drawing card...");

    await wait(300);

    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);

    if (handValue(newHand) > 21) {
      setCredits((prev) => prev - bet);
      setMessage("Bust! You lost.");
      setGameActive(false);
    } else {
      setMessage("Hit or stand.");
    }

    setDealing(false);
  }

  async function stand() {
    if (!gameActive || dealing) return;

    setDealing(true);
    setMessage("Dealer reveals card...");

    let dealer = dealerHand.map((card) => ({ ...card, hidden: false }));
    setDealerHand(dealer);

    await wait(600);

    while (handValue(dealer) < 17) {
      const next = drawCard();
      dealer = [...dealer, next];
      setDealerHand(dealer);
      setMessage("Dealer draws...");
      await wait(600);
    }

    const playerTotal = handValue(playerHand);
    const dealerTotal = handValue(dealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setCredits((prev) => prev + bet);
      setMessage("You win!");
    } else if (playerTotal < dealerTotal) {
      setCredits((prev) => prev - bet);
      setMessage("Dealer wins.");
    } else {
      setMessage("Push. Bet returned.");
    }

    setGameActive(false);
    setDealing(false);
  }

  function renderCard(card: Card, index: number) {
    const red = card.suit === "♥️" || card.suit === "♦️";

    return (
      <div
        key={index}
        style={{
          width: 86,
          height: 124,
          background: card.hidden ? "#12351f" : "white",
          color: card.hidden ? "#22c55e" : red ? "#dc2626" : "black",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontSize: 28,
          fontWeight: "bold",
          boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
          border: card.hidden ? "2px solid #22c55e" : "2px solid #ddd",
        }}
      >
        {card.hidden ? (
          <>
            <div style={{ fontSize: 34 }}>🌿</div>
            <div style={{ fontSize: 13 }}>HEMPIE</div>
          </>
        ) : (
          <>
            <div>{card.value}</div>
            <div>{card.suit}</div>
          </>
        )}
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #12351f, #071107 55%)",
        color: "white",
        padding: 30,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 52 }}>🃏 Hempie Blackjack</h1>

      <h2 style={{ color: "#22c55e" }}>
        {credits.toLocaleString()} Green Credits
      </h2>

      <p>Bet Amount</p>

      {[25, 50, 100, 250].map((amount) => (
        <button
          key={amount}
          onClick={() => setBet(amount)}
          disabled={gameActive || dealing}
          style={{
            margin: 6,
            padding: "10px 18px",
            borderRadius: 10,
            cursor: "pointer",
            background: bet === amount ? "#22c55e" : "#222",
            color: bet === amount ? "#071107" : "white",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {amount}
        </button>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={startGame} disabled={gameActive || dealing} style={buttonStyle}>
          Deal
        </button>
        <button onClick={hit} disabled={!gameActive || dealing} style={buttonStyle}>
          Hit
        </button>
        <button onClick={stand} disabled={!gameActive || dealing} style={buttonStyle}>
          Stand
        </button>
      </div>

      <h3 style={{ marginTop: 28, minHeight: 30 }}>{message}</h3>

      <section style={{ marginTop: 35 }}>
        <h2>Dealer: {gameActive ? "?" : handValue(dealerHand)}</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, minHeight: 130 }}>
          {dealerHand.map(renderCard)}
        </div>
      </section>

      <section style={{ marginTop: 45 }}>
        <h2>Your Hand: {handValue(playerHand)}</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, minHeight: 130 }}>
          {playerHand.map(renderCard)}
        </div>
      </section>
    </main>
  );
}

const buttonStyle = {
  margin: 6,
  padding: "14px 28px",
  borderRadius: 12,
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 16,
};