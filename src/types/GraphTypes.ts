export type TGraph = Array<Array<number>>;

export interface IVertex {
  index: number;
}

export interface IEdge {
  from: number;
  to: number;
  weight: number;
}
