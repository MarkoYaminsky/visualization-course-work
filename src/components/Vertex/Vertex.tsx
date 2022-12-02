import { IVertex } from "../../types";
import styles from "./Vertex.module.scss";

export const Vertex: React.FC<IVertex> = (props) => {
  return (
    <p className={styles.vertex}>{props.index}</p>
  );
}