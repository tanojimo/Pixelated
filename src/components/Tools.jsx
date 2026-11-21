import { useEffect } from "react";
import Brush from "./svg/brush";
import Bucket from "./svg/bucket";
import Eraser from "./svg/eraser";
import Picker from "./svg/picker";

const Tools = ({
  selected,
  setSelected,
  selectedColorLeft,
  selectedColorRight,
  setSelectedColorLeft,
  setSelectedColorRight,
  setCanvas,
  historyIndex,
  setHistoryIndex,
  history,
}) => {
  const undo = () => {
    setHistoryIndex((prev) => Math.max(0, prev - 1));
  };
  const redo = () => {
    setHistoryIndex((prev) => Math.min(history.length - 1, prev + 1));
  };

  useEffect(() => {
    const handleCTRLZ = (e) => {
      if (e.ctrlKey && e.key == "z") {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key == "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleCTRLZ);

    return () => {
      window.removeEventListener("keydown", handleCTRLZ);
    };
  }, [historyIndex, history]);

  useEffect(() => {
    if (historyIndex >= 0 && history[historyIndex]) {
      setCanvas(history[historyIndex]);
    }

    return () => {};
  }, [historyIndex, history]);

  return (
    <div className="col-span-2 w-full h-full bg-bl400 rounded-r-2xl gap-1 grid grid-rows-12 z-10 tool">
      {/* Undo/Redo/Clear */}
      <div className="row-span-1 flex justify-center gap-1 items-center">
        <div
          className="w-7 aspect-square p-1.5 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] cursor-pointer"
          onClick={() => {
            undo();
          }}
        >
          <img src="/undo.svg" alt="" className="w-full" />
        </div>
        <div
          className="w-7 aspect-square p-1.5 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] cursor-pointer"
          onClick={() => {
            redo();
          }}
        >
          <img src="/redo.svg" alt="" className="w-full" />
        </div>
        <div
          className="w-7 aspect-square p-1.5 bg-red-500 rounded-xl flex justify-center items-center text-[0.8rem] cursor-pointer"
          onClick={() =>
            setCanvas((prev) => prev.map((row) => row.map(() => "#3e3e3e")))
          }
        >
          <img src="/trash.svg" alt="" className="w-full" />
        </div>
      </div>

      <div className="w-full h-full row-span-6 flex flex-col justify-center">
        {/* Tools */}

        <div className="grid grid-cols-2 grid-rows-2 px-2 py-2 gap-[7%] p-[5%] w-full">
          <div
            className={`w-full aspect-square rounded-lg border-2 ${selected == 1 ? "border-white" : "border-bl200"} flex justify-center items-center group hover:border-white duration-75`}
            onClick={() => {
              if (selected == 1) {
                setSelected(0);
              } else {
                setSelected(1);
              }
            }}
          >
            <div className="w-[50%]">
              <Brush selected={selected} />
            </div>
          </div>
          <div
            className={`w-full aspect-square rounded-lg border-2 ${selected == 2 ? "border-white" : "border-bl200"} flex justify-center items-center group hover:border-white duration-75`}
            onClick={() => {
              if (selected == 2) {
                setSelected(0);
              } else {
                setSelected(2);
              }
            }}
          >
            <div className="w-[45%]">
              <Bucket selected={selected} />
            </div>
          </div>
          <div
            className={`w-full aspect-square rounded-lg border-2 ${selected == 3 ? "border-white" : "border-bl200"} flex justify-center items-center group hover:border-white duration-75`}
            onClick={() => {
              if (selected == 3) {
                setSelected(0);
              } else {
                setSelected(3);
              }
            }}
          >
            <div className="w-[45%]">
              <Eraser selected={selected} />
            </div>
          </div>
          <div
            className={`w-full aspect-square rounded-lg border-2 ${selected == 4 ? "border-white" : "border-bl200"} flex justify-center items-center group hover:border-white duration-75`}
            onClick={() => {
              if (selected == 4) {
                setSelected(0);
              } else {
                setSelected(4);
              }
            }}
          >
            <div className="w-[45%]">
              <Picker selected={selected} />
            </div>
          </div>
        </div>

        {/* Color Picker */}

        <div className="flex flex-col gap-3 items-center">
          <div className="relative w-[min(100%,6rem)] aspect-square">
            <input
              type="color"
              name=""
              id=""
              value={selectedColorLeft}
              className="absolute top-0 left-0 w-5/6 h-5/6 rounded-2xl z-10"
              onChange={(e) => setSelectedColorLeft(e.target.value)}
            />
            <input
              type="color"
              name=""
              id=""
              value={selectedColorRight}
              className="absolute bottom-0 right-0 w-5/6 h-5/6 rounded-2xl"
              onChange={(e) => setSelectedColorRight(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Color Palletes */}

      <div className="w-full h-full row-span-4 flex flex-col gap-5 px-2 items-center">
        <p>Pallete</p>
        <div className="w-full h-full flex gap-1 justify-center flex-wrap content-start">
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
          <div className="bg-amber-200 w-6 h-6 rounded-xs"></div>
        </div>
      </div>

      {/* Export */}
      <div className="w-full h-full row-span-1 flex flex-col justify-center items-center gap-2">
        <div className="w-22 h-6 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] pb-px cursor-pointer">
          Export
        </div>
      </div>
    </div>
  );
};

export default Tools;
