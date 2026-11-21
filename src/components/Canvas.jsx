import { useRef } from "react";

const Canvas = ({
  canvas,
  setCanvas,
  canvasRef,
  gridVal,
  scale,
  selectedColorLeft,
  selectedColorRight,
  setSelectedColorLeft,
  setSelectedColorRight,
  selected,
  setHistory,
  historyIndex,
  setHistoryIndex,
  capturing,
}) => {
  const lastPixel = useRef(null);
  const paintLine = (x0, y0, x1, y1, color, erase = false) => {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const step = Math.max(Math.abs(dx), Math.abs(dy));
    if (step != 0) {
      const sx = dx / step;
      const sy = dy / step;

      for (let i = 0; i <= step; i++) {
        paintPixel(
          Math.round(y0 + i * sy),
          Math.round(x0 + i * sx),
          color,
          erase,
        );
      }
    }
  };

  const paintPixel = (i, j, color, erase = false) => {
    setCanvas((prev) =>
      prev.map((row, rowIndex) =>
        row.map((v, colIndex) =>
          rowIndex == i && colIndex == j ? (!erase ? color : "#3e3e3e") : v,
        ),
      ),
    );
  };

  const floodFill = (x, y, selectedColor) => {
    let final = [];
    let arr = [[x, y]];
    let visited = new Set();
    const color = canvas[x][y];
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
      paintPixel(val[0], val[1], selectedColor);
    }
  };
  return (
    <div className="w-full h-full flex gap-4 justify-center items-center overflow-hidden">
      <div
        ref={canvasRef}
        onDragStart={(e) => e.preventDefault()}
        onMouseUp={() => {
          lastPixel.current = null;
          if (selected != 0 && selected != 4) {
            setHistory((prev) => [...prev.slice(0, historyIndex + 1), canvas]);
            setHistoryIndex((prev) => prev + 1);
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
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
              className={`w-full h-full ${capturing ? "border-0" : "border-[0.2px]"} border-bl200 text-black text-[0.3rem]`}
              style={{ background: val }}
              onMouseDown={(e) => {
                if (e.button == 0) {
                  if (selected == 1) {
                    lastPixel.current = { i, j };
                    paintPixel(i, j, selectedColorLeft);
                  } else if (selected == 2) {
                    floodFill(i, j, selectedColorLeft);
                  } else if (selected == 3) {
                    lastPixel.current = { i, j };
                    paintPixel(i, j, selectedColorLeft, true);
                  } else if (selected == 4) {
                    setSelectedColorLeft(val);
                  }
                } else if (e.button == 2) {
                  if (selected == 1) {
                    lastPixel.current = { i, j };
                    paintPixel(i, j, selectedColorRight);
                  } else if (selected == 2) {
                    floodFill(i, j, selectedColorRight);
                  } else if (selected == 3) {
                    lastPixel.current = { i, j };
                    paintPixel(i, j, selectedColorRight, true);
                  } else if (selected == 4) {
                    console.log("COLOR: ", val);
                    setSelectedColorRight(val);
                  }
                }
              }}
              onMouseEnter={(e) => {
                // console.log("Buttons:", e.buttons);
                if (e.buttons == 1 && lastPixel.current) {
                  if (selected == 1) {
                    paintLine(
                      lastPixel.current.j,
                      lastPixel.current.i,
                      j,
                      i,
                      selectedColorLeft,
                    );
                    lastPixel.current = { i, j };
                  } else if (selected == 3) {
                    paintLine(
                      lastPixel.current.j,
                      lastPixel.current.i,
                      j,
                      i,
                      selectedColorLeft,
                      true,
                    );
                  }
                } else if (e.buttons == 2 && lastPixel.current) {
                  if (selected == 1) {
                    paintLine(
                      lastPixel.current.j,
                      lastPixel.current.i,
                      j,
                      i,
                      selectedColorRight,
                    );
                    lastPixel.current = { i, j };
                  } else if (selected == 3) {
                    paintLine(
                      lastPixel.current.j,
                      lastPixel.current.i,
                      j,
                      i,
                      selectedColorRight,
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
