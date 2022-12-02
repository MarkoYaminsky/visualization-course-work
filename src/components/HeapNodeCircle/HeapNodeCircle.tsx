import styles from "./HeapNodeCircle.module.scss";

interface HeapNodeProps {
  positionX: number;
  positionY: number;
  value: number;
}

export const HeapNodeCircle: React.FC<HeapNodeProps> = (props) => {
  return (
    <div
      className={styles.heapNode}
      style={{
        left: `calc(48vw + ${props.positionX}vw * 20)`,
        top: `calc(10vh + ${props.positionY}vh * 20)`,
      }}
    >
      {props.value}
    </div>
  );
};
