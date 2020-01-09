import * as BaseInterface from './BaseInterface';

export class Block implements BaseInterface.Block {
  index: number;
  units:BaseInterface.Unit[];
  row: number;
  column: number;
  blocked: boolean;
  constructor(row: number, column: number, index: number, blocked: boolean) {
    this.row = row;
    this.column = column;
    this.index = index;
    this.blocked = blocked;
    this.units = []
  }
}
