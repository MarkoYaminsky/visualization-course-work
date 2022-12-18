import React, { createContext, useState } from "react";
import { HeapNode } from "../components";
import { Edge, Vertex } from "../components/Graph/Mincut";
import { IAppContext } from "../types";

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [vertices, setVertices] = useState<Vertex[]>([]);
  const [nodeSteps, setNodeSteps] = useState<Array<HeapNode[]>>([]);
  const [visSpeed, setVisSpeed] = useState(1000);

  return (
    <AppContext.Provider
      value={{
        edges,
        setEdges,
        vertices,
        setVertices,
        nodeSteps,
        setNodeSteps,
        visSpeed,
        setVisSpeed,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
