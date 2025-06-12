import React from "react";

const TypingArea = ({
  typingText,
  inpFieldValue,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  accuracy,
  charIndex,
  resetGame,
}) => {
  return (
    <div className="border bg-black border-[#ced4da] rounded-[5px] px-5 pb-5 pt-0">
      {/* Text Section */}
      <div className="border-b border-[#ced4da]">
        <p className="break-all text-white text-left">
          {typingText.split("").map((letter, index) => {
  const isCaret = index === charIndex;
  const shouldHideCaret = isCaret && timeLeft <= 0;

  return (
    <span
      key={index}
      className={`char inline-block ${
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

      {/* Stats Section */}
      <div className="flex justify-between text-white items-center mt-[5px]">
        <ul className="flex flex-wrap justify-between items-center w-full sm:w-[calc(100%-120px)] p-0 m-0 list-none">
          <li className="mx-2">
            <p className="m-[5px] text-xs">Time Left:</p>
            <span className="text-lg">
              <b>{timeLeft}</b>s
            </span>
          </li>
          <li className="mx-2">
            <p className="m-[5px] text-xs">Mistakes:</p>
            <span className="text-lg">{mistakes}</span>
          </li>
          <li className="mx-2">
            <p className="m-[5px] text-xs">Accuracy:</p>
            <span className="text-lg">{accuracy}%</span>
          </li>
          <li className="mx-2">
            <p className="m-[5px] text-xs">WPM:</p>
            <span className="text-lg">{WPM}</span>
          </li>
          <li className="mx-2">
            <p className="m-[5px] text-xs">CPM:</p>
            <span className="text-lg">{CPM}</span>
          </li>
        </ul>
        <button
          onClick={resetGame}
          className="px-5 py-2 mt-2 sm:mt-0 bg-sky-500 text-white rounded border border-gray-300 text-base hover:bg-sky-700 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TypingArea;

