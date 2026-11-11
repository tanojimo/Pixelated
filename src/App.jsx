import { useState } from "react";
import Canvas from "./components/Canvas";
import Tools from "./components/Tools";

const App = () => {
  const [canvas, setCanvas] = useState(
    Array.from({ length: 32 }, () => Array(32).fill("")),
  );
  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <Tools />
      <Canvas canvas={canvas} setCanvas={setCanvas} />
    </div>
  );
};

export default App;
