import styles from "./MinCut.module.scss";

import { Aside } from "../../components/Aside";
import { GraphComponent } from "../../components/Graph";

export const MinCut: React.FC = () => {
  return (
    <main className={styles.main}>
      <Aside option="mincut"/>
      <GraphComponent />
    </main>
  );
};
