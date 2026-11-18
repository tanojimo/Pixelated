import Brush from "./svg/brush";
import Bucket from "./svg/bucket";
import Eraser from "./svg/eraser";
import Picker from "./svg/picker";

const Tools = ({
  selected,
  setSelected,
  pickerRef,
  selectedColor,
  setCanvas,
}) => {
  return (
    <div className="col-span-3 w-full h-full bg-bl400 rounded-r-2xl gap-1 grid grid-rows-12">
      <div className="w-full h-full row-span-9">
        <div className="grid grid-cols-2 grid-rows2 px-2 py-2 gap-[5%] p-[5%] w-full aspect-square">
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
            className={`w-full aspect-square rounded-lg border-2 ${selected == 2 ? "border-white" : "border-bl200"} flex justify-center items-center hover:border-white duration-75`}
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
            className={`w-full aspect-square rounded-lg border-2 ${selected == 3 ? "border-white" : "border-bl200"} flex justify-center items-center hover:border-white duration-75`}
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
            className={`w-full aspect-square rounded-lg border-2 ${selected == 4 ? "border-white" : "border-bl200"} flex justify-center items-center hover:border-white duration-75`}
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
        <div className="w-full h-40 flex items-center justify-center gap-3">
          <div
            ref={pickerRef}
            className="w-[40%] aspect-square rounded-xl"
          ></div>
          <div
            className={`w-[40%] aspect-square rounded-xl`}
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>
      </div>
      <div className="w-full h-full row-span-3 flex flex-col justify-center items-center gap-2">
        <div className="flex gap-1">
          <div className="w-22 h-6 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] pb-px cursor-pointer">
            Undo
          </div>
          <div
            className="w-22 h-6 bg-red-500 rounded-xl flex justify-center items-center text-[0.8rem] pb-px cursor-pointer"
            onClick={() =>
              setCanvas((prev) => prev.map((row) => row.map(() => "#3e3e3e")))
            }
          >
            Remove All
          </div>
        </div>
        <div className="w-22 h-6 bg-green-500 rounded-xl flex justify-center items-center text-[0.8rem] pb-px cursor-pointer">
          Export
        </div>
      </div>
    </div>
  );
};

export default Tools;
