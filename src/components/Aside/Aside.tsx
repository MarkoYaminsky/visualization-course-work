import styles from "./Aside.module.scss";
import { ChangeEvent, useState } from "react";

export const Aside: React.FC = () => {
  const [matrixInput, setMatrixInput] = useState<string>();

  const handleMatrixInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMatrixInput(event.target.value);
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.functional}>
        <h1>Задання графа матрицею суміжності</h1>
        <textarea
          id="matrixInput"
          value={matrixInput}
          onChange={handleMatrixInput}
          cols={45}
          rows={20}
        ></textarea>
        <button>Побудувати граф</button>
      </div>
    </aside>
  );
};
