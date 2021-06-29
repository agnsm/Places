import { Point } from "./point";

export interface Place {
  name: string;
  kinds: string;
  dist: number;
  rate: number;
  point: Point;
}
