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
          if (!selected == 0 || !selected == 4) {
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
                  paintPixel(i, j);
                } else if (selected == 3) {
                  paintPixel(i, j, true);
                } else if (selected == 4) {
                  setSelectedColor(val);
                }
              }}
              onMouseEnter={(e) => {
                if (e.buttons == 1) {
                  if (selected == 1) {
                    paintPixel(i, j);
                  } else if (selected == 3) {
                    paintPixel(i, j, true);
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
