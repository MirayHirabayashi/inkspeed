import React, { useState, useEffect, useRef } from "react";
import TypingArea from "./TypingArea";
import paragraphData from "../assets/paragraphs.json";

const MAX_TIME = 60;

const TypingSpeedTest = () => {
  const paragraphs = paragraphData.paragraphs;
  const [typingText, setTypingText] = useState("");
  const [inpFieldValue, setInpFieldValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const inputRef = useRef(null);
  const [usedParagraphIndices, setUsedParagraphIndices] = useState([]);
  const [totalTypedChars, setTotalTypedChars] = useState(0);

  const loadParagraph = () => {
    let availableIndices = paragraphs
      .map((_, idx) => idx)
      .filter((idx) => !usedParagraphIndices.includes(idx));

    if (availableIndices.length === 0) {
      setUsedParagraphIndices([]);
      availableIndices = paragraphs.map((_, idx) => idx);
    }

    const ranIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];

    setTypingText(paragraphs[ranIndex]);
    setInpFieldValue("");
    setCharIndex(0);
    setIsTyping(false);
    setUsedParagraphIndices((prev) => [...prev, ranIndex]);
    inputRef.current?.focus();
  };

  const updateMetrics = (cIndex, mistakeCount) => {
    const timeUsed = MAX_TIME - timeLeft;
    if (timeUsed <= 0) return;
    const grossChars = cIndex - mistakeCount;
    const wpm = Math.round((grossChars / 5 / timeUsed) * 60);
    const cpm = Math.round((grossChars / timeUsed) * 60);
    setWPM(wpm > 0 && wpm !== Infinity ? wpm : 0);
    setCPM(cpm > 0 && cpm !== Infinity ? cpm : 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && charIndex > 0 && timeLeft > 0) {
      const newCharIndex = charIndex - 1;
      if (typingText[newCharIndex] !== inpFieldValue[newCharIndex]) {
        setMistakes((prev) => {
          const updated = prev - 1;
          updateMetrics(totalTypedChars - 1, updated);
          return updated;
        });
      }
      setCharIndex(newCharIndex);
      setInpFieldValue((prev) => prev.slice(0, -1));
      setTotalTypedChars((prev) => prev - 1);
    }
  };

  const initTyping = (event) => {
    const val = event.target.value;
    const currentChar = typingText[charIndex];
    const typedChar = val[val.length - 1];

    if (!isTyping) setIsTyping(true);

    if (charIndex < typingText.length && timeLeft > 0) {
      setInpFieldValue(val);
      setTotalTypedChars((prev) => prev + 1);
      if (typedChar !== currentChar) {
        setMistakes((prev) => {
          const updated = prev + 1;
          updateMetrics(totalTypedChars + 1, updated);
          return updated;
        });
      } else {
        updateMetrics(totalTypedChars + 1, mistakes);
      }
      setCharIndex((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setMistakes(0);
    setWPM(0);
    setCPM(0);
    setUsedParagraphIndices([]);
    setTimeLeft(MAX_TIME);
    loadParagraph();
  };

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) setIsTyping(false);
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTyping, timeLeft]);

  useEffect(() => {
    if (charIndex === typingText.length && timeLeft > 0) {
      loadParagraph();
    }
  }, [charIndex, typingText.length, timeLeft]);

  const accuracy =
    totalTypedChars > 0
      ? Math.round(((totalTypedChars - mistakes) / totalTypedChars) * 100)
      : 100;

  const isGameOver = timeLeft <= 0;

  return (
    <div className="mt-20 max-w-[650px] w-full mx-auto text-white font-sans">
      {isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white p-8 z-10">
          <h2 className="text-3xl font-semibold mb-4">Time's up!</h2>
          <p className="mb-2 text-lg">WPM: {WPM}</p>
          <p className="mb-2 text-lg">CPM: {CPM}</p>
          <p className="mb-4 text-lg">Accuracy: {accuracy}%</p>
          <button
            onClick={resetGame}
            className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 transition rounded"
          >
            Try Again
          </button>
        </div>
      )}

      <input
        type="text"
        ref={inputRef}
        className="absolute opacity-0 pointer-events-none input-field"
        value={inpFieldValue}
        onChange={initTyping}
        onKeyDown={handleKeyDown}
        onPaste={(e) => e.preventDefault()}
      />

      <div className="mb-6">
        <TypingArea
          typingText={typingText}
          inpFieldValue={inpFieldValue}
          timeLeft={timeLeft}
          mistakes={mistakes}
          WPM={WPM}
          CPM={CPM}
          accuracy={accuracy}
          charIndex={charIndex}
          resetGame={resetGame}
        />
      </div>
    </div>
  );
};

export default TypingSpeedTest;
