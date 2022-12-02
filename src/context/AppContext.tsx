import React, { createContext, useState } from "react";
import { HeapNode } from "../components";
import { IEdge, IVertex } from "../types";
import { IAppContext } from "../types";

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [edges, setEdges] = useState<IEdge[]>([]);
  const [vertices, setVertices] = useState<IVertex[]>([]);
  const [nodeSteps, setNodeSteps] = useState<Array<HeapNode[]>>([]);

  return (
    <AppContext.Provider value={{ edges, setEdges, vertices, setVertices, nodeSteps, setNodeSteps }}>
      {props.children}
    </AppContext.Provider>
  );
};
