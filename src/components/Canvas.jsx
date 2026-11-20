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
  historyIndex,
  setHistoryIndex,
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

  const floodFill = (x, y) => {
    let final = [];
    let arr = [[x, y]];
    let visited = new Set();
    console.log("Set arr: ", arr);
    const color = canvas[x][y];
    console.log("Set color: ", color);
    if (color == selectedColor) {
      return;
    }
    while (arr.length > 0) {
      const [i, j] = arr.shift();
      const key = `${i},${j}`;

      if (visited.has(key)) {
        continue;
      }
      visited.add(key);

      if (
        i < 0 ||
        i >= canvas.length ||
        j < 0 ||
        j >= canvas.length ||
        canvas[i][j] !== color
      ) {
        continue;
      }

      final.push([i, j]);
      arr.push([i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]);
    }
    for (const val of final) {
      paintPixel(val[0], val[1]);
    }
  };
  return (
    <div className="col-span-10 w-full h-full flex justify-center items-center">
      <div
        ref={canvasRef}
        onDragStart={(e) => e.preventDefault()}
        onMouseUp={() => {
          if (selected != 0 && selected != 4) {
            setHistory((prev) => [...prev.slice(0, historyIndex + 1), canvas]);
            setHistoryIndex((prev) => prev + 1);
          }
        }}
        style={{
          transform: `scale(${scale})`,
          userSelect: "none",
          WebkitUserDrag: "none",
          touchAction: "none",
        }}
        className={`grid grid-cols-[repeat(32,12px)] grid-rows-[repeat(32,12px)] select-none cursor-pointer`}
      >
        {canvas.flat().map((val, index) => {
          const i = Math.floor(index / gridVal);
          const j = index % gridVal;
          return (
            <div
              key={index}
              draggable={false}
              className="w-full h-full border-[0.2px] border-bl200 text-black text-[0.3rem]"
              style={{ background: val }}
              onMouseDown={() => {
                if (selected == 1) {
                  lastPixel.current = { i, j };
                  paintPixel(i, j);
                } else if (selected == 2) {
                  console.log("Set arr: ");
                  floodFill(i, j);
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
