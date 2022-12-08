import styles from "./Heap.module.scss";

import { Aside } from "../../components";
import { HeapVis } from "../../components";

export const Heap: React.FC = () => {
  return (
    <main className={styles.main}>
      <Aside option="heap"/>
      <HeapVis />
    </main>
  );
};
