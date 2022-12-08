import styles from "./HeapEdge.module.scss";

interface HeapEdgeProps {
  childX: number;
  childY: number;
  parentX: number;
  parentY: number;
}

export const HeapEdge: React.FC<HeapEdgeProps> = (props) => {
  const vw = window.innerWidth / 100;
  const vh = window.innerHeight / 100;
  return (
    <svg width={1000} height={1000} className={styles.heapEdge}>
      <line
        x1={34.5 * vw + 20 * props.childX * vw}
        x2={34.5 * vw + 20 * props.parentX * vw}
        y1={8 * vh + 20 * props.childY * vh}
        y2={8 * vh + 20 * props.parentY * vh}
      />
    </svg>
  );
};
