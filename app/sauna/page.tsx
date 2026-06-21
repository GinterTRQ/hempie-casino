"use client";

import { useState } from "react";

type Answer = {
  text: string;
  points: number;
};

type Question = {
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    question: "How hot do you like your sauna?",
    answers: [
      { text: "Warm and cozy", points: 10 },
      { text: "Pretty hot", points: 20 },
      { text: "Make me sweat", points: 30 },
      { text: "As hot as legally possible", points: 40 },
    ],
  },
  {
    question: "Cold plunge after sauna?",
    answers: [
      { text: "Absolutely not", points: 5 },
      { text: "Maybe a cold shower", points: 15 },
      { text: "Yes, every round", points: 30 },
      { text: "Straight into ice water", points: 40 },
    ],
  },
  {
    question: "Someone pours water on the rocks. You...",
    answers: [
      { text: "Immediately reconsider life", points: 5 },
      { text: "Respect it, but suffer", points: 15 },
      { text: "Lean into the steam", points: 30 },
      { text: "Yell MORE STEAM", points: 40 },
    ],
  },
  {
    question: "How long can you stay in the hot room?",
    answers: [
      { text: "5 minutes max", points: 10 },
      { text: "10–15 minutes", points: 20 },
      { text: "20+ minutes", points: 30 },
      { text: "Until the sauna gives up first", points: 40 },
    ],
  },
  {
    question: "What are you drinking after?",
    answers: [
      { text: "Water only", points: 15 },
      { text: "Tea like a civilized person", points: 25 },
      { text: "Electrolytes, I came prepared", points: 30 },
      { text: "Whatever the sauna spirits provide", points: 40 },
    ],
  },
];

function getRank(score: number) {
  if (score < 55) {
    return {
      emoji: "🫖",
      title: "Tea Tourist",
      time: "12 minutes",
      message: "Asked if the sauna has WiFi.",
    };
  }

  if (score < 90) {
    return {
      emoji: "🌿",
      title: "Sauna Rookie",
      time: "34 minutes",
      message: "Made it through one round. Barely.",
    };
  }

  if (score < 130) {
    return {
      emoji: "🔥",
      title: "Heat Hunter",
      time: "1 hour 11 minutes",
      message: "Knows the difference between hot and HOT.",
    };
  }

  if (score < 165) {
    return {
      emoji: "🧊",
      title: "Ice Viking",
      time: "2 hours 3 minutes",
      message: "Probably takes cold showers for fun.",
    };
  }

  return {
    emoji: "👑",
    title: "Baltic Legend",
    time: "3 hours+",
    message: "May have Baltic ancestry hidden somewhere.",
  };
}

export default function SaunaTest() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];
  const rank = getRank(score);
  const percent = Math.min(100, Math.round((score / 200) * 100));

  function answerQuestion(points: number) {
    const nextScore = score + points;
    setScore(nextScore);

    if (questionIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  }

  function restart() {
    setStarted(false);
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
  }

  return (
    <main className="page">
      {!started && !finished && (
        <section className="card hero">
          <div className="steam">🔥🧊🌿</div>
          <h1>Baltic Sauna Survival Test</h1>
          <p>
            Can you survive a real Baltic sauna session? Answer 5 questions and
            discover your heat rank.
          </p>

          <button onClick={() => setStarted(true)}>START TEST 🔥</button>
        </section>
      )}

      {started && !finished && (
        <section className="card quiz">
          <div className="progress">
            Question {questionIndex + 1} of {questions.length}
          </div>

          <h1>{currentQuestion.question}</h1>

          <div className="answers">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.text}
                onClick={() => answerQuestion(answer.points)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </section>
      )}

      {finished && (
        <section className="card result">
          <p className="label">OFFICIAL BALTIC SAUNA REPORT</p>

          <div className="rankEmoji">{rank.emoji}</div>

          <h1>{rank.title}</h1>

          <div className="stat">
            <span>Heat Tolerance</span>
            <strong>{percent}%</strong>
          </div>

          <div className="stat">
            <span>Estimated Survival Time</span>
            <strong>{rank.time}</strong>
          </div>

          <p className="message">“{rank.message}”</p>

          <div className="shareCard">
            <h2>🔥 Baltic Sauna Survival Report 🔥</h2>
            <p>Heat Tolerance: {percent}%</p>
            <p>
              Rank: {rank.emoji} {rank.title}
            </p>
            <p>Survival Time: {rank.time}</p>
            <small>BalticSauna.net</small>
          </div>

          <div className="actions">
            <a href="https://balticsauna.net" target="_blank">
              BOOK YOUR SESSION
            </a>

            <button onClick={restart}>RETAKE TEST</button>
          </div>
        </section>
      )}

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #3b1d0f, #0b0705 65%);
          color: white;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .card {
          width: 100%;
          max-width: 760px;
          background: rgba(0, 0, 0, 0.55);
          border: 3px solid #f97316;
          border-radius: 30px;
          padding: 34px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        }

        .steam {
          font-size: 52px;
          margin-bottom: 10px;
        }

        h1 {
          font-size: 44px;
          margin: 12px 0;
        }

        p {
          font-size: 20px;
          line-height: 1.5;
          color: #fed7aa;
        }

        button,
        a {
          display: inline-block;
          margin: 10px;
          padding: 16px 26px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(180deg, #fb923c, #c2410c);
          color: white;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
          text-decoration: none;
        }

        .progress {
          color: #fdba74;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .answers {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }

        .answers button {
          width: 100%;
          text-align: left;
          font-size: 18px;
        }

        .label {
          font-size: 14px;
          letter-spacing: 2px;
          color: #fdba74;
          font-weight: bold;
        }

        .rankEmoji {
          font-size: 76px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 16px;
          margin: 12px 0;
          font-size: 18px;
        }

        .stat strong {
          color: #fdba74;
        }

        .message {
          font-style: italic;
          font-size: 22px;
        }

        .shareCard {
          margin-top: 24px;
          padding: 22px;
          border-radius: 24px;
          background: linear-gradient(135deg, #7c2d12, #1c0a03);
          border: 2px solid #fb923c;
        }

        .shareCard h2 {
          margin-top: 0;
        }

        .shareCard p {
          margin: 8px 0;
        }

        .shareCard small {
          color: #fdba74;
          font-weight: bold;
        }

        .actions {
          margin-top: 22px;
        }

        @media (max-width: 750px) {
          .page {
            padding: 14px;
            align-items: flex-start;
          }

          .card {
            padding: 22px;
            border-radius: 22px;
          }

          h1 {
            font-size: 30px;
          }

          p {
            font-size: 16px;
          }

          .answers button {
            font-size: 15px;
            padding: 14px;
          }

          .stat {
            flex-direction: column;
            text-align: left;
          }
        }
      `}</style>
    </main>
  );
}