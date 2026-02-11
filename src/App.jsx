import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState("No 😏");
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);



  const noMessages = [
    "Are you sure? 😄",
    "Think again Zolotse 👀",
    "You sure sure? 🥲",
    "Say yes nowwww 😘",
    "You can’t escape 😌",
    "Last chance o 😏",
    "Please nowwww 😢"

  ];
  
  const startMusic = () => {
    if (!musicStarted && audioRef.current) {
      audioRef.current.play();
      setMusicStarted(true);
    }
  };


  const handleNoClick = () => {
    // Grow YES button
    setYesSize((prev) => Math.min(prev + 0.25, 2.5));
    startMusic();

    // Move NO button randomly
    setNoPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    });

    // Change NO text randomly
    setNoText(noMessages[Math.floor(Math.random() * noMessages.length)]);
  };

  const handleYesClick = () => {
    startMusic();
    setYesClicked(true);
  };

  return (
    <div className="container" onClick={startMusic}>
      <audio ref={audioRef} src="/romantic.mp3" loop />
      {/* Floating Hearts */}
      {!yesClicked && <Hearts />}

      {!yesClicked ? (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            💖 Zolotse 💖
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Will you be my Valentine?
          </motion.h2>

          <div className="buttons">
            <motion.button
              className="yes"
              style={{ scale: yesSize }}
              whileTap={{ scale: yesSize + 0.1 }}
              onClick={() => setYesClicked(true)}
            >
              Yes 💕
            </motion.button>

            <motion.button
              className="no"
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={handleNoClick}
            >
              {noText}
            </motion.button>
          </div>
        </>
      ) : (
        <motion.div
          className="yes-screen"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1>Yaaay Zolotse!!! 🥰💘</h1>
          <p>
            You just made me the happiest man alive ❤️
            <br />
            I promise to keep making you laughhhh 😄💕
          </p>
          <p>
            I promise to keep loving you,
            <br />
            and annoying you forever 😌❤️
          </p>

          <p className="signature">— Yours always 💞</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;



/* ❤️ Floating Hearts Component */
function Hearts() {
  return (
    <div className="hearts">
      {[...Array(20)].map((_, i) => (
        <span key={i}>❤️</span>
      ))}
    </div>
  );
}
