import { Dispatch, SetStateAction } from "react";
import { HeapNode } from "../components";
import { Edge, Vertex } from "../components/Graph/Mincut";

export interface IAppContext {
  edges: Edge[];
  vertices: Vertex[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  setVertices: Dispatch<SetStateAction<Vertex[]>>;
  nodeSteps: Array<HeapNode[]>;
  setNodeSteps: Dispatch<SetStateAction<Array<HeapNode[]>>>;
  visSpeed: number;
  setVisSpeed: Dispatch<SetStateAction<number>>;
}