const Canvas = ({
  canvas,
  setCanvas,
  canvasRef,
  gridVal,
  scale,
  selectedColor,
}) => {
  const paintPixel = (i, j) => {
    setCanvas((prev) =>
      prev.map((row, rowIndex) =>
        row.map((v, colIndex) =>
          rowIndex == i && colIndex == j ? selectedColor : v,
        ),
      ),
    );
  };
  return (
    <div className="col-span-9 w-full h-full flex justify-center items-center">
      <div
        ref={canvasRef}
        style={{ transform: `scale(${scale})` }}
        className={`grid grid-cols-[repeat(${gridVal},8px)] grid-rows-[repeat(${gridVal},8px)]`}
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
              onMouseDown={() => paintPixel(i, j)}
              onMouseEnter={(e) => {
                if (e.buttons == 1) {
                  paintPixel(i, j);
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
