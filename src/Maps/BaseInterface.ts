export interface Unit {
  index: number;
  background: string;
  type?: string;
  blocked: boolean;
  zIndex: number;
  offsetLeft?: number;
  offsetTop?: number;
}
export interface Block {
  index: number;
  row: number;
  column: number;
  units: Array<Unit>;
  blocked: boolean;
}
export interface MapFrame {
  rowCount: number;
  columnCount: number;
  blocks: Array<Block>;
}
export type convertToBlock = (units: Unit[]) => Block;