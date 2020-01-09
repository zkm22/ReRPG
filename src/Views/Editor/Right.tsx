import React from 'react';
import { Block } from '../../Maps/Base';
import { MapFrame, Unit } from '../../Maps/BaseInterface';
import UnitForm, { AttrList } from './UnitForm';

interface Props {
  blockInfo?: Block;
  mapInfo: MapFrame;
  editBlock: (block: Block) => any;
  resetBlock: () => void;
  saveChanges: () => void;
}
interface State {
  unitForm: Unit;
}

const attrList: AttrList = [
  {name: 'background', type: 'string'},
  {name: 'offsetLeft', type: 'number'},
  {name: 'offsetTop', type: 'number'},
  {name: 'blocked', type: 'boolean', readonly: true},
  {name: 'zIndex', type: 'bumber'}
]

class Right extends React.Component<Props, State> {
  // private _block: Block | undefined;
  // constructor(props: Props, state: State) {
  //   super(props, state);
  //   // this._block = props.blockInfo;
  // }
  handleUnitDelete = (unit: Unit) => {
    let block = this.props.blockInfo;
    if (block) {
      delete block.units[unit.index];
      this.props.editBlock(block);
    }
  }
  handleUnitValueChange = (name: keyof Unit, value: any, index: number) => {
    let _block = this.props.blockInfo;
    if (_block) {
      switch(name) {
        case 'background':
          _block.units[index][name] = value;
          break;
        case 'offsetLeft':
        case 'offsetTop':
          _block.units[index][name] = value;
          break;
        case 'zIndex':
          _block.units[index][name] = value;
          break;
      }
      this.props.editBlock(_block);
    }
  }
  resetBlock = () => {
    this.props.resetBlock();
  }
  render() {
    return (
      <div>
        {this.props.blockInfo&&<fieldset>
          <legend>BlockInfo</legend>
          <fieldset>
            <legend>BaseInfo</legend>
            <div>
              <span>index: {this.props.mapInfo.columnCount * this.props.blockInfo.row + this.props.blockInfo.column}; </span>
              <span>row: {this.props.blockInfo.row}; </span>
              <span>column: {this.props.blockInfo.column}; </span>
              <span>blocked: {this.props.blockInfo.blocked.toString()}; </span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Units</legend>
            {this.props.blockInfo.units.map((item, index) => {
              return (
                <div key={index}>
                  <span>{index}: </span>
                  {/* <span>{JSON.stringify(item)}</span> */}
                  <UnitForm
                    attrList={attrList}
                    unit={item}
                    handleUnitValueChange={this.handleUnitValueChange}
                  ></UnitForm>
                  <button onClick={() => {this.handleUnitDelete(item)}}>delete</button>
                </div>
              )
            })}
          </fieldset>
          <fieldset>
            <button onClick={this.resetBlock}>reset</button>
            {/* <button onClick={this.props.saveChanges}>save</button> */}
          </fieldset>
        </fieldset>}
      </div>
    )
  }
}

export default Right;
