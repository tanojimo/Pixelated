import { useState, useRef, useEffect } from "react";
import Canvas from "./components/Canvas";
import Tools from "./components/Tools";
import iro from "@jaames/iro";

const App = () => {
  const canvasRef = useRef(null);
  const pickerRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [scale, setScale] = useState(1);
  const [canvas, setCanvas] = useState(
    Array.from({ length: 32 }, () => Array(32).fill("")),
  );
  useEffect(() => {
    const picker = new iro.ColorPicker(pickerRef.current, {
      width: 100,
      color: selectedColor,
    });

    picker.on("color:change", (color) => {
      setSelectedColor(color.hexString);
    });
    return () => {
      pickerRef.current.innerHTML = "";
    };
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    setScale((prev) => {
      const zoomFactor = 0.001;
      const next = prev - e.deltaY * zoomFactor;

      return Math.min(Math.max(next, 0.2), 4);
    });
  };
  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <Tools
        selected={selected}
        setSelected={setSelected}
        pickerRef={pickerRef}
        selectedColor={selectedColor}
      />
      <Canvas
        canvas={canvas}
        setCanvas={setCanvas}
        canvasRef={canvasRef}
        handleWheel={handleWheel}
        scale={scale}
      />
    </div>
  );
};

export default App;
