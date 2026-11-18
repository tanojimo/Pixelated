import { useRef } from "react";

const Canvas = ({
  canvas,
  setCanvas,
  canvasRef,
  gridVal,
  scale,
  selectedColor,
  setSelectedColor,
  selected,
  setHistory,
}) => {
  const lastPixel = useRef(null);
  const paintLine = (x0, y0, x1, y1, erase = false) => {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const step = Math.max(Math.abs(dx), Math.abs(dy));
    if (step != 0) {
      const sx = dx / step;
      const sy = dy / step;

      for (let i = 0; i <= step; i++) {
        paintPixel(Math.round(y0 + i * sy), Math.round(x0 + i * sx), erase);
      }
    }
  };
  const paintPixel = (i, j, erase = false) => {
    setCanvas((prev) =>
      prev.map((row, rowIndex) =>
        row.map((v, colIndex) =>
          rowIndex == i && colIndex == j
            ? !erase
              ? selectedColor
              : "#3e3e3e"
            : v,
        ),
      ),
    );
  };
  return (
    <div className="col-span-9 w-full h-full flex justify-center items-center">
      <div
        ref={canvasRef}
        onDragStart={(e) => e.preventDefault()}
        onMouseUp={() => {
          if (selected != 0 && selected != 4) {
            setHistory((prev) => [...prev, canvas]);
          }
        }}
        style={{
          transform: `scale(${scale})`,
          userSelect: "none",
          WebkitUserDrag: "none",
          touchAction: "none",
        }}
        className={`grid grid-cols-[repeat(${gridVal},8px)] grid-rows-[repeat(${gridVal},8px)] select-none cursor-pointer`}
      >
        {canvas.flat().map((val, index) => {
          const i = Math.floor(index / gridVal);
          const j = index % gridVal;
          return (
            <div
              key={index}
              draggable={false}
              className="w-2 h-2 border-[0.2px] border-bl200 text-black text-[0.3rem]"
              style={{ background: val }}
              onMouseDown={() => {
                if (selected == 1) {
                  lastPixel.current = { i, j };
                  paintPixel(i, j);
                } else if (selected == 3) {
                  lastPixel.current = { i, j };
                  paintPixel(i, j, true);
                } else if (selected == 4) {
                  setSelectedColor(val);
                }
              }}
              onMouseEnter={(e) => {
                if (e.buttons == 1 && lastPixel.current) {
                  if (selected == 1) {
                    paintLine(lastPixel.current.j, lastPixel.current.i, j, i);
                    lastPixel.current = { i, j };
                  } else if (selected == 3) {
                    paintLine(
                      lastPixel.current.j,
                      lastPixel.current.i,
                      j,
                      i,
                      true,
                    );
                  }
                }
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Canvas;
