import styles from "./HeapNodeCircle.module.scss";

interface HeapNodeProps {
  positionX: number;
  positionY: number;
  value: number;
  current?: boolean;
  visited: boolean;
}

export const HeapNodeCircle: React.FC<HeapNodeProps> = (props) => {
  return (
    <div
      className={styles.heapNode}
      style={{
        left: `calc(48vw + ${props.positionX}vw * 20)`,
        top: `calc(10vh + ${props.positionY}vh * 20)`,
        borderColor: props.current ? 'aqua' : 'black',
        backgroundColor: props.visited ? 'aquamarine' : 'white'
      }}
    >
      {props.value}
    </div>
  );
};
