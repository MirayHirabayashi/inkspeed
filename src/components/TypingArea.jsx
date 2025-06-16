import React from "react";

const TypingArea = ({
  typingText,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  accuracy,
  charIndex,
  resetGame,
}) => {
  return (
    <div className="w-full">
      {/* Typing Text */}
      <div className="mb-6">
        <p className="text-white text-[30px] text-left text-xl leading-relaxed break-words">
          {typingText.split("").map((letter, index) => {
            const isCaret = index === charIndex;
            const shouldHideCaret = isCaret && timeLeft <= 0;

            return (
              <span
                key={index}
                className={`inline-block ${
                  isCaret && !shouldHideCaret ? "border-b-2 border-blue-500 animate-pulse" : ""
                }`}
                style={{
                  visibility: shouldHideCaret ? "hidden" : "visible",
                  color: letter !== " " ? "white" : "transparent",
                }}
              >
                {letter !== " " ? letter : "_"}
              </span>
            );
          })}
        </p>
      </div>

      {/* Stats + Button */}
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-300 gap-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span>Time Left: <b>{timeLeft}</b>s</span>
          <span>Mistakes: {mistakes}</span>
          <span>Accuracy: {accuracy}%</span>
          <span>WPM: {WPM}</span>
          <span>CPM: {CPM}</span>
        </div>

        <button
          onClick={resetGame}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TypingArea;

