import styles from "./Edge.module.scss";

export interface EdgeProps {
  childX: number;
  childY: number;
  parentX: number;
  parentY: number;
  option: "heap" | "graph";
  weight?: number;
}

export const Edge: React.FC<EdgeProps> = (props) => {
  const vw = window.innerWidth / 100;
  const vh = window.innerHeight / 100;
  const weightPosition = {
    x: (props.childX + props.parentX + 340) / 2,
    y: (props.childY + props.parentY - 60) / 2,
  };

  return (
    <>
      {props.weight && (
        <p
          style={{
            position: "absolute",
            top: weightPosition.y - 10,
            left: weightPosition.x + 10,
          }}
        >
          {props.weight}
        </p>
      )}
      <svg width={1000} height={1000} className={styles.heapEdge}>
        {props.option === "heap" ? (
          <line
            x1={34.5 * vw + 20 * props.childX * vw}
            x2={34.5 * vw + 20 * props.parentX * vw}
            y1={8 * vh + 20 * props.childY * vh}
            y2={8 * vh + 20 * props.parentY * vh}
          />
        ) : (
          <line
            x1={props.childX}
            x2={props.parentX}
            y1={props.childY}
            y2={props.parentY}
            strokeWidth={3}
          />
        )}
      </svg>
    </>
  );
};
