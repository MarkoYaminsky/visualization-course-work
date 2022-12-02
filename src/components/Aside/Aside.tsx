import styles from "./Aside.module.scss";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { AppContext } from "../../context";
import { Heap } from "../HeapVis";

export const Aside: React.FC<{ option: "heap" | "mincut" }> = (props) => {
  const context = useContext(AppContext);
  const [matrixInput, setMatrixInput] = useState("");
  const [insertInput, setInsertInput] = useState("");
  const heap = useMemo(() => new Heap(), []);

  const handleMatrixInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMatrixInput(event.target.value);
  };

  const handleInsertInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInsertInput(event.target.value);
  };

  const insert = () => {
    const steps = heap.insert(parseInt(insertInput));    
    context?.setNodeSteps(() => {
      console.log("steps array");
      console.log(steps);
      console.log("------------------------");
      return steps;
    });
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.functional}>
        {props.option === "mincut" ? (
          <>
            <h1>Задання графа матрицею суміжності</h1>
            <textarea
              id="matrixInput"
              value={matrixInput}
              onChange={handleMatrixInput}
              cols={45}
              rows={20}
            ></textarea>
            <button>Побудувати граф</button>
          </>
        ) : (
          <>
            <h1>Вставка ноди</h1>
            <input
              type="text"
              value={insertInput}
              onChange={handleInsertInput}
            />
            <button onClick={insert}>Тиць</button>
          </>
        )}
      </div>
    </aside>
  );
};
