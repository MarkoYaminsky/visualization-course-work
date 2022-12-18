import styles from "./Aside.module.scss";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { AppContext } from "../../context";
import { Heap } from "../HeapVis";

export const Aside: React.FC<{ option: "heap" | "mincut" }> = (props) => {
  const context = useContext(AppContext);
  const [insertInput, setInsertInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const heap = useMemo(() => new Heap(), []);


  const handleInsertInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInsertInput(event.target.value);
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleVisSpeedInput = (event: ChangeEvent<HTMLInputElement>) => {
    context?.setVisSpeed(parseInt(event.target.value));
  };

  const insert = () => {
    const steps = heap.insert(parseInt(insertInput));
    context?.setNodeSteps(steps);
  };

  const deleteRoot = () => {
    const steps = heap.deleteRoot();
    context?.setNodeSteps(steps);
  };

  const search = () => {
    const steps = heap.searchForValue(parseInt(searchInput));
    context?.setNodeSteps(steps);
  };

  return (
    <aside
      className={styles.aside}
    >
      <div className={styles.functional}>
        {props.option === "mincut" ? (
          <>
          
          </>
        ) : (
          <>
            <h1>Вставка ноди</h1>
            <input
              className={styles.insertInput}
              type="number"
              value={insertInput}
              onChange={handleInsertInput}
            />
            <button onClick={insert}>Тиць</button>
            <h1>Пошук значення</h1>
            <input
              className={styles.insertInput}
              type="number"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <button onClick={search}>Тиць</button>
            <h1>Видалення найменшого</h1>
            <button onClick={deleteRoot} style={{ marginTop: "1vh" }}>
              Тиць
            </button>
            <h1>Швидкість руху кроку в мс</h1>
            <input
              className={styles.insertInput}
              type="number"
              value={context?.visSpeed}
              onChange={handleVisSpeedInput}
            />
          </>
        )}
      </div>
    </aside>
  );
};
