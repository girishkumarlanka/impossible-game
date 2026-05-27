import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const moods = ["😡", "😂", "🙄", "❤️"];

const memoryCards = [
  { emoji: "☕", text: "Those Ginger Chai conversations ☕" },
  { emoji: "🌙", text: "Evening walk sessions 🌙" },
  { emoji: "😂", text: "Pulling each other's leg 😂" },
  { emoji: "🎵", text: "Those singing moments 🎵" },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("home");
  const [score, setScore] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      {screen === "home" && (
        <HomeScreen onStart={() => setScreen("level2")} />
      )}

      {screen === "level1" && (
        <CatchMoodLevel
          onComplete={(points) => {
            setScore((s) => s + points);
            setScreen("level2");
          }}
        />
      )}

      {screen === "level2" && (
        <SwipeLevel
          onComplete={(points) => {
            setScore((s) => s + points);
            setScreen("level3");
          }}
        />
      )}

      {screen === "level3" && (
        <MemoryLevel
          onComplete={() => {
            setScreen("final");
          }}
        />
      )}

      {screen === "final" && <FinalScreen score={score} />}
    </div>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
  <div className="loadingScreen">
    <div className="center">
      <motion.h1
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        Measuring Navya's Cuteness 😌
      </motion.h1>

      <div className="meter">
        <div
          className="fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{progress}% Completed</p>

      <p className="hint">
        Warning: dangerous levels of cuteness detected 💃🏻
      </p>
   </div>
  </div>
);
}

function HomeScreen({ onStart }) {
  return (
    <motion.div
      className="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>❤️ Message Impossible ❤️</h1>

      <p className="subtitle">
        Mission: Pulling cutiepie back to conversation  💔
      </p>

      <p className="danger">
        Challange: Dealing with a Very Angry Girl ☠️
      </p>

      <button onClick={onStart}>
        Start 😭
      </button>
    </motion.div>
  );
}

function CatchMoodLevel({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [points, setPoints] = useState(0);

  const randomMood = useMemo(
    () => moods[Math.floor(Math.random() * moods.length)],
    [current]
  );

  function handleClick(mood) {
    if (mood === randomMood) {
      setPoints((p) => p + 1);
    }

    if (current >= 4) {
      onComplete(points + (mood === randomMood ? 1 : 0));
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div className="center">
      <h2>LEVEL 1 — Catch Her Mood 😌</h2>

      <div className="bigEmoji">{randomMood}</div>

      <div className="row">
        {moods.map((m) => (
          <button key={m} onClick={() => handleClick(m)}>
            {m}
          </button>
        ))}
      </div>

      <p className="hint">
        Anger dancing on nose probability increasing 📈
      </p>
    </div>
  );
}

function SwipeLevel({ onComplete }) {
  const messages = [
    "Do 'someone' remember a person named Girish exist? ",
"Has Girish become soo boring to even message? ",
    "Are you still angry? 😭",
    "Fine... I won't disturb you 🙄",
    "Want to end the relationship?",
  ];

  const [index, setIndex] = useState(0);

  function react() {
    if (index >= messages.length - 1) {
      onComplete(5);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="center">
      <h2>LEVEL 1 — Judge Girish's Messages 📱</h2>

      <motion.div
        className="card"
        key={index}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {messages[index]}
      </motion.div>

      <div className="row">
        <button onClick={react}>❤️ Cute</button>
        <button onClick={react}>🙄 Annoying</button>
        <button onClick={react}>😂 Idiot</button>
      </div>
    </div>
  );
}

function MemoryLevel({ onComplete }) {
  const [opened, setOpened] = useState([]);

  function openCard(index) {
    if (!opened.includes(index)) {
      setOpened([...opened, index]);
    }
  }

  useEffect(() => {
    if (opened.length === memoryCards.length) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [opened, onComplete]);

  return (
    <div className="center">
      <h2>LEVEL 2 — Memory Unlock 🔓</h2>

      <div className="grid">
        {memoryCards.map((card, index) => (
          <div
            key={index}
            className="memoryCard"
            onClick={() => openCard(index)}
          >
            {opened.includes(index) ? (
              <>
                <div className="emoji">{card.emoji}</div>
                <div>{card.text}</div>
              </>
            ) : (
              "Tap to Reveal 💌"
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalScreen({ score }) {
  const [progress, setProgress] = useState(10);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) {
          clearInterval(timer);
          return 99;
        }
        return p + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="center">
      <h1>⚠️ FINAL ANALYSIS ⚠️</h1>

      <p>AI Prediction Meter 😌</p>

      <div className="meter">
        <div
          className="fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2>{progress}% chance cutiepie misses me ❤️</h2>

      {progress >= 99 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>Reward Unlocked 💌</h3>


          <p className="ending">
            One stubborn idiot is still waiting for your message ❤️
          </p>

          <p>Total Score: {score}</p>

          <motion.div
            className="letter"
            animate={{
  y: [0, -10, 0],
  scale: [1, 1.08, 1],
}}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            onClick={() => setShowLetter(true)}
          >
            💌
          </motion.div>

          <p className="tapHint">
  ✨ Tap the letter ✨
</p>

          {showLetter && (
            <motion.div
              className="letterBox"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2>To my Angry Bird 😌</h2>

              <p>
                After detailed investigation, it has
                been discovered that:
              </p>

              <p>
                No messages were received from a gorgeous young lady for a suspiciously long time.
              </p>

              <p>
                Meanwhile…
              </p>

              <p>
                A poor handsome soul who loves her, was checking WhatsApp
                unnecessarily…
                remembering old conversations,smiling, and pretending not to miss her 😭
              </p>

              <p>
                Scientists are still confused why
                someone so cute can stay silent for
                this long.
              </p>

              <p>
                Recommended solution:
                <br />
                Send one message.
                <br />
                Maybe two 😌❤️
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}