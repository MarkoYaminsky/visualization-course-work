import styles from "./Main.module.scss";

import { Aside } from "../Aside";
import { Graph } from "../Graph";

export const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <Aside />
      <Graph />
    </main>
  );
};
