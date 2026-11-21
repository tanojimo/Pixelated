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

  // useEffect(() => {
  //   const picker = new iro.ColorPicker(pickerRef.current, {
  //     width: 100,
  //     color: selectedColorLeft,
  //   });

  //   picker.on("color:change", (color) => {
  //     setSelectedColorLeft(color.hexString);
  //   });
  //   return () => {
  //     pickerRef.current.innerHTML = "";
  //   };
  // }, []);

  return (
    <div className="w-screen min-h-screen grid grid-cols-12">
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
