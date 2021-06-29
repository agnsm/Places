import { Point } from "./point";

export interface Place {
  xid: string;
  name: string;
  kinds: string;
  osm: string;
  wikidata: string;
  dist: number;
  rate: number;
  point: Point;
}
