import { useState, useRef, useEffect } from "react";
import Canvas from "./components/Canvas";
import Tools from "./components/Tools";

const App = () => {
  const gridVal = 32;
  const initialCanvas = Array.from({ length: gridVal }, () =>
    Array(gridVal).fill("#3e3e3e"),
  );
  const canvasRef = useRef(null);
  const pickerRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [selectedColorLeft, setSelectedColorLeft] = useState("#ffffff");
  const [selectedColorRight, setSelectedColorRight] = useState("#000000");
  const [scale, setScale] = useState(1);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [history, setHistory] = useState([initialCanvas]);
  const [palette, setPalette] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    color: null,
  });
  const [canvas, setCanvas] = useState(initialCanvas);
  useEffect(() => {
    const canvas = canvasRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      setScale((prev) => {
        const zoomFactor = 0.001;
        const next = prev - e.deltaY * zoomFactor;

        return Math.min(Math.max(next, 0.2), 4);
      });
    };
    canvas.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="w-screen min-h-screen grid grid-cols-12"
      onClick={() => {
        setContextMenu((prev) => ({ ...prev, visible: false, color: null }));
      }}
    >
      {contextMenu.visible && (
        <div
          className="fixed bg-bl400 w-30 h-10 rounded-xl text-sm cursor-pointer flex items-center select-none z-20 overflow-hidden"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="hover:bg-bl300 w-full h-[80%] active:bg-bl400 flex justify-center items-center duration-75"
            onClick={() => {
              const color = contextMenu.color;
              setContextMenu((prev) => ({
                ...prev,
                visible: false,
                color: null,
              }));
              if (!palette.includes(color)) {
                setPalette((prev) => [...prev, color]);
              }
            }}
          >
            <p>Add to Pallete</p>
          </div>
        </div>
      )}
      <Tools
        selected={selected}
        setSelected={setSelected}
        pickerRef={pickerRef}
        selectedColorLeft={selectedColorLeft}
        selectedColorRight={selectedColorRight}
        setSelectedColorLeft={setSelectedColorLeft}
        setSelectedColorRight={setSelectedColorRight}
        setCanvas={setCanvas}
        setHistoryIndex={setHistoryIndex}
        historyIndex={historyIndex}
        history={history}
        gridVal={gridVal}
        setContextMenu={setContextMenu}
        palette={palette}
        setPalette={setPalette}
      />
      <Canvas
        canvas={canvas}
        setCanvas={setCanvas}
        canvasRef={canvasRef}
        gridVal={gridVal}
        scale={scale}
        selectedColorLeft={selectedColorLeft}
        selectedColorRight={selectedColorRight}
        selected={selected}
        setHistory={setHistory}
        history={history}
        setSelectedColorLeft={setSelectedColorLeft}
        setSelectedColorRight={setSelectedColorRight}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
      />
    </div>
  );
};

export default App;
