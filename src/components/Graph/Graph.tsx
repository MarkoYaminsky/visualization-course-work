import { useState } from "react";
import styles from "./Graph.module.scss";
import { NodeCircle, NodeProps } from "../NodeCircle";
import { Edge, EdgeProps } from "../Edge";

export const GraphComponent: React.FC = () => {
  const [isVisGoing, setIsVisGoing] = useState(false);

  const [edges, setEdges] = useState<EdgeProps[]>([]);

  const toggleNode = (event: React.MouseEvent, value: number) => {
    if (!isVisGoing) {
      setCircles((prevState) =>
        prevState.map((circle) => {
          if (circle.value === value) {
            circle.visited = !circle.visited;
            console.log(circle);
          }
          return circle;
        })
      );
      event.stopPropagation();
    }
  };

  const drawElement = (event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    const newValue =
      circles.length > 0 ? circles[circles.length - 1].value + 1 : 0;
    const newCircle: NodeProps = {
      positionX: x - 25,
      positionY: y - 25,
      value: newValue,
      visited: false,
      option: "graph",
      toggleNode,
    };
    setCircles((prevState) => [...prevState, newCircle]);
  };

  const drawEdge = (x1: number, x2: number, y1: number, y2: number) => {
    const weight = parseInt(prompt("Input edge weight")!);
    const newEdge: EdgeProps = {
      childX: x1,
      parentX: x2,
      childY: y1,
      parentY: y2,
      option: "graph",
      weight,
    };
    setEdges((prevState) => [...prevState, newEdge]);
  };

  const nodes = () => {
    let edge: {
      from: { x: number; y: number } | null;
      to: { x: number; y: number } | null;
    } = { from: null, to: null };
    const nodes = circles.map((circle) => {
      if (circle.visited) {
        const currentNode = {
          x: circle.positionX - 170,
          y: circle.positionY + 30,
        };
        if (!edge.from) {
          edge.from = currentNode;
        } else {
          edge.to = currentNode;
        }
      }
      if (edge.from && edge.to) {
        drawEdge(edge.from.x, edge.to.x, edge.from.y, edge.to.y);
        setCircles((prevState) =>
          prevState.map((circle) => {
            return { ...circle, visited: false };
          })
        );
      }
      return (
        <NodeCircle
          {...circle}
          key={`${circle.value}-${circle.positionX}-${circle.positionY}`}
        />
      );
    });
    return nodes;
  };

  const [circles, setCircles] = useState<NodeProps[]>([]);

  return (
    <div className={styles.graph} onClick={drawElement}>
      {nodes()}
      {edges.map((edge, index) => (
        <Edge
          {...edge}
          key={`${edge.childX}-${edge.childY}-${edge.parentX}-${edge.parentY}-${index}`}
        />
      ))}
    </div>
  );
};
