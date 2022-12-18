import { TGraph } from "../../types";

export class Vertex {
  x: number;
  y: number;
  visited: boolean;
  sink: boolean;
  source: boolean;
  parent: number | null;

  constructor(x: number, y: number, sink?: boolean, source?: boolean) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.sink = sink ? sink : false;
    this.source = source ? source : false;
    this.parent = null;
  }
}

export class Edge {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  weight: number;

  constructor(x1: number, x2: number, y1: number, y2: number, weight: number) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.weight = weight;
  }
}

export class Graph {
  graph: TGraph;
  size: number;
  source: number;
  sink: number;
  vertices: Vertex[];
  edges: Edge[];

  constructor(source: number, sink: number) {
    this.size = 0;
    this.source = source;
    this.sink = sink;
    this.vertices = [];
    this.edges = [];
    this.graph = [[]]
  }

  bfs: (residualGraph: TGraph, parent: Array<number>) => boolean = (
    residualGraph,
    parent
  ) => {
    let visited = Array<boolean>(this.size);
    let queue = [this.source];
    visited[this.source] = true;
    parent[this.source] = -1;

    while (queue.length > 0) {
      const current = queue.unshift();
      for (let i = 0; i < this.size; i++) {
        if (!visited[i] && residualGraph[current][i] > 0) {
          queue.push(i);
          parent[i] = current;
          visited[i] = true;
        }
      }
    }

    return visited[this.sink];
  };

  dfs: (residualGraph: TGraph, current: number, visited: boolean[]) => void = (
    residualGraph,
    current,
    visited
  ) => {
    visited[current] = true;
    for (let i = 0; i < this.size; i++) {
      if (residualGraph[current][i] && !visited[i]) {
        this.dfs(residualGraph, i, visited);
      }
    }
  };

  minCut: () => Array<Array<number>> = () => {
    let minCutEdges: Array<Array<number>> = [];
    let residualGraph = [...this.graph];
    let parent = Array<number>(this.size);
    while (this.bfs(residualGraph, parent)) {
      let pathFlow = Number.POSITIVE_INFINITY;
      let currentIndex = this.sink;
      while (currentIndex !== this.source) {
        let currentValue = parent[currentIndex];
        pathFlow = Math.min(
          pathFlow,
          residualGraph[currentValue][currentIndex]
        );
        currentIndex = parent[currentIndex];
        currentIndex = this.sink;
        while (currentIndex !== this.source) {
          let currentValue = parent[currentIndex];
          residualGraph[currentValue][currentIndex] += pathFlow;
          residualGraph[currentIndex][currentValue] -= pathFlow;
          currentIndex = parent[currentIndex];
        }
        let visited = Array<boolean>(this.size);
        this.dfs(residualGraph, this.source, visited);
        for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
            if (visited[i] && !visited[j] && this.graph[i][j] !== 0) {
              minCutEdges.push([i, j]);
            }
          }
        }
      }
    }
    return minCutEdges;
  };
}
