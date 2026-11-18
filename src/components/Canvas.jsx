const Canvas = ({ canvas, canvasRef, handleWheel, scale }) => {
  return (
    <div className="col-span-9 w-full h-full flex justify-center items-center">
      <div
        ref={canvasRef}
        onWheel={handleWheel}
        style={{ transform: `scale(${scale})` }}
        className="grid grid-cols-[repeat(32,8px)] grid-rows-[repeat(32,8px)] "
      >
        {canvas.flat().map((val, index) => {
          const i = Math.floor(index / 64);
          const j = index % 64;
          return (
            <div
              key={index}
              className="w-2 h-2 bg-bl300 border-[0.2px] border-bl200 text-black text-[1px]"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Canvas;
