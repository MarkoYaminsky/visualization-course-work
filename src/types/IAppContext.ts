import { Dispatch, SetStateAction } from "react";
import { HeapNode } from "../components";
import { IEdge, IVertex } from "./GraphTypes";

export interface IAppContext {
  edges: IEdge[];
  vertices: IVertex[];
  setEdges: Dispatch<SetStateAction<IEdge[]>>;
  setVertices: Dispatch<SetStateAction<IVertex[]>>;
  nodeSteps: Array<HeapNode[]>;
  setNodeSteps: Dispatch<SetStateAction<Array<HeapNode[]>>>;
  visSpeed: number;
  setVisSpeed: Dispatch<SetStateAction<number>>;
}