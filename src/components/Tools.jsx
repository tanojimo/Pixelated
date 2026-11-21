import { useEffect, useRef, useState } from "react";
import Brush from "./svg/brush";
import Bucket from "./svg/bucket";
import Eraser from "./svg/eraser";
import Picker from "./svg/picker";
import html2canvas from "html2canvas";
import { flushSync } from "react-dom";

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
  setContextMenu,
  palette,
  setPalette,
  canvasRef,
  setCapturing,
}) => {
  const [entered, setEntered] = useState(false);
  const dragCounter = useRef(0);
  const undo = () => {
    setHistoryIndex((prev) => Math.max(0, prev - 1));
  };
  const redo = () => {
    setHistoryIndex((prev) => Math.min(history.length - 1, prev + 1));
  };
  const capture = async () => {
    flushSync(() => {
      setCapturing(true);
    });
    const c = await html2canvas(canvasRef.current, { scale: 1 });
    const img = c.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "save.png";
    link.click();
    setCapturing(false);
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
  }, [historyIndex, history, setCanvas]);

  return (
    <div className="w-full h-full bg-bl400 rounded-r-2xl gap-1 grid grid-rows-12 z-10 tool">
      {/* Undo/Redo/Clear */}
      <div className="row-span-1 flex justify-center gap-1 items-center">
        <div
          className="w-7 aspect-square p-1.5 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] cursor-pointer controlBtn hover:shadow-[0_0_10px_rgba(255,255,255,255)] duration-75"
          onClick={() => {
            undo();
          }}
        >
          <img src="/undo.svg" alt="" className="w-full" />
        </div>
        <div
          className="w-7 aspect-square p-1.5 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] cursor-pointer hover:shadow-[0_0_10px_rgba(255,255,255,255)] duration-75"
          onClick={() => {
            redo();
          }}
        >
          <img src="/redo.svg" alt="" className="w-full" />
        </div>
        <div
          className="w-7 aspect-square p-1.5 bg-red-500 rounded-xl flex justify-center items-center text-[0.8rem] cursor-pointer hover:shadow-[0_0_10px_rgba(255,255,255,255)] duration-75"
          onClick={() =>
            setCanvas((prev) => prev.map((row) => row.map(() => "#3e3e3e")))
          }
        >
          <img src="/trash.svg" alt="" className="w-full" />
        </div>
      </div>

      <div className="w-full h-full row-span-6 flex flex-col justify-center gap-2.5">
        {/* Tools */}

        <div className="grid grid-cols-2 grid-rows-2 px-4 py-2 gap-x-[7%] gap-y-[14%] w-full">
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
              className="absolute top-0 left-0 w-5/6 h-5/6 rounded-2xl z-10 cursor-pointer"
              onChange={(e) => setSelectedColorLeft(e.target.value)}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({
                  visible: true,
                  x: e.clientX,
                  y: e.clientY,
                  color: selectedColorLeft,
                });
              }}
            />
            <input
              type="color"
              name=""
              id=""
              value={selectedColorRight}
              className="absolute bottom-0 right-0 w-5/6 h-5/6 rounded-2xl cursor-pointer"
              onChange={(e) => setSelectedColorRight(e.target.value)}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({
                  visible: true,
                  x: e.clientX,
                  y: e.clientY,
                  color: selectedColorLeft,
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Color Palletes */}

      <div className="w-full h-full row-span-4 flex flex-col gap-5 px-2 items-center">
        <div className="w-full px-1 flex flex-row justify-between items-center gap-2">
          <p>Pallete</p>
          <div
            className={`w-8 h-8 border-bl200 border-[1.5px] rounded-lg flex justify-center items-center overflow-auto ${entered && "bg-red-500"}`}
            onDragEnter={(e) => {
              e.preventDefault();
              dragCounter.current++;
              if (dragCounter.current == 1) {
                console.log("Entered");
                setEntered(true);
              }
            }}
            onDragLeave={() => {
              dragCounter.current--;

              if (dragCounter.current == 0) {
                console.log("Left");
                setEntered(false);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              dragCounter.current = 0;
              console.log("Dropped");
              setEntered(false);
              const color = e.dataTransfer.getData("text/plain");
              setPalette((prev) => prev.filter((e) => e != color));
            }}
          >
            <svg
              width="17"
              viewBox="0 0 32 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-bl200 ${entered && "text-white"}`}
            >
              <path
                d="M15.7929 2.56096C14.1223 2.56096 12.6977 3.62808 12.1698 5.12181C11.9341 5.78858 11.2025 6.13807 10.5358 5.90239C9.86898 5.66671 9.51951 4.93515 9.75519 4.26839C10.6335 1.78344 13.0033 0 15.7929 0C18.5826 0 20.9524 1.78344 21.8308 4.26839C22.0664 4.93515 21.7169 5.66671 21.0502 5.90239C20.3833 6.13807 19.6518 5.78858 19.4161 5.12181C18.8882 3.62808 17.4635 2.56096 15.7929 2.56096Z"
                fill="currentColor"
              />
              <path
                d="M0 8.10861C0 7.40142 0.573297 6.82812 1.28048 6.82812H30.3049C31.0121 6.82812 31.5854 7.40142 31.5854 8.10861C31.5854 8.81579 31.0121 9.38909 30.3049 9.38909H1.28048C0.573297 9.38909 0 8.81579 0 8.10861Z"
                fill="currentColor"
              />
              <path
                d="M5.40387 12.2911C5.35683 11.5854 4.74667 11.0516 4.04106 11.0986C3.33543 11.1456 2.80154 11.7558 2.84859 12.4614L3.63984 24.3301C3.7858 26.5203 3.90371 28.2892 4.18024 29.6774C4.46775 31.1206 4.95676 32.3261 5.9668 33.271C6.97683 34.216 8.21215 34.6237 9.6713 34.8145C11.0748 34.9981 12.8478 34.9981 15.0427 34.9981H16.5431C18.738 34.9981 20.5109 34.9981 21.9144 34.8145C23.3735 34.6237 24.6089 34.216 25.6189 33.271C26.629 32.3261 27.118 31.1206 27.4055 29.6774C27.6819 28.2892 27.7999 26.5203 27.9458 24.3301L28.7372 12.4614C28.7841 11.7558 28.2503 11.1456 27.5446 11.0986C26.839 11.0516 26.2288 11.5854 26.1818 12.2911L25.3965 24.0699C25.2432 26.3712 25.1337 27.9723 24.8939 29.177C24.661 30.3457 24.3361 30.9642 23.8693 31.4009C23.4025 31.8375 22.7636 32.1207 21.5822 32.2753C20.3642 32.4345 18.7593 32.4371 16.4531 32.4371H15.1327C12.8264 32.4371 11.2215 32.4345 10.0035 32.2753C8.82202 32.1207 8.18321 31.8375 7.7164 31.4009C7.2496 30.9642 6.92465 30.3457 6.69186 29.177C6.45186 27.9723 6.34255 26.3712 6.18914 24.0699L5.40387 12.2911Z"
                fill="currentColor"
              />
              <path
                d="M11.3973 15.3717C12.101 15.3013 12.7284 15.8147 12.7989 16.5185L13.6526 25.055C13.7229 25.7586 13.2095 26.3862 12.5058 26.4566C11.8021 26.5269 11.1746 26.0135 11.1042 25.3098L10.2506 16.7732C10.1802 16.0696 10.6936 15.442 11.3973 15.3717Z"
                fill="currentColor"
              />
              <path
                d="M21.3362 16.7732C21.4065 16.0696 20.8931 15.442 20.1894 15.3717C19.4858 15.3013 18.8582 15.8147 18.7878 16.5185L17.9342 25.055C17.8638 25.7586 18.3772 26.3862 19.081 26.4566C19.7846 26.5269 20.412 26.0135 20.4825 25.3098L21.3362 16.7732Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="w-full h-full flex gap-1 justify-center flex-wrap content-start">
          {palette.map((val) => (
            <div
              className="w-6 h-6 rounded-xs"
              style={{ backgroundColor: val }}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", val);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                if (e.button == 2) {
                  setSelectedColorRight(val);
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                if (e.button == 0) {
                  setSelectedColorLeft(val);
                }
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="w-full h-full row-span-1 flex flex-col justify-center items-center gap-2">
        <div
          className="w-22 h-6 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] pb-px cursor-pointer hover:shadow-[0_0_10px_rgba(255,255,255,255)]"
          onClick={capture}
        >
          Export
        </div>
      </div>
    </div>
  );
};

export default Tools;
