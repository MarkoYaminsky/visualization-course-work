import styles from "./NodeCircle.module.scss";

export interface NodeProps {
  positionX: number;
  positionY: number;
  value: number;
  current?: boolean;
  visited: boolean;
  option: "graph" | "heap";
  hasVisStarted?: boolean;
  toggleNode: (event: React.MouseEvent, value: number) => void | undefined;
}

export const NodeCircle: React.FC<NodeProps> = (props) => {

  return (
    <button
      onClick={(event) => props.toggleNode(event, props.value)}
      className={styles.node}
      style={{
        left:
          props.option === "heap"
            ? `calc(48vw + ${props.positionX}vw * 20)`
            : props.positionX,
        top:
          props.option === "heap"
            ? `calc(10vh + ${props.positionY}vh * 20)`
            : props.positionY,
        borderColor: props.current ? "aqua" : "black",
        backgroundColor: props.visited ? "aquamarine" : "white",
        width: props.option === "heap" ? "3vw" : "4vw",
        height: props.option === "heap" ? "3vw" : "4vw",
      }}
    >
      {props.value}
    </button>
  );
};
