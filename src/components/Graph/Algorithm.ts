type graph = Array<Array<number>>;

export class Graph {
  graph: graph;
  size: number;
  source: number;
  sink: number;

  constructor(graph: graph, source: number, sink: number) {
    this.graph = graph;
    this.size = graph.length;
    this.source = source;
    this.sink = sink;
  }

  bfs: (residualGraph: graph, parent: Array<number>) => boolean = (
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

  dfs: (residualGraph: graph, current: number, visited: boolean[]) => void = (
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
