import React, { SyntheticEvent } from 'react';
import * as MapInterface from '../../Maps/BaseInterface';
import Map from '../Map';
import { Block } from '../../Maps/Base';
import './Editor.scss';
import Left from './Left';
import Right from './Right';
import { deepCopy } from '../../utils/tools';
// import { cloneDeep } from 'lodash';

interface State {
  currentUnit: string;
  unitTarget: Omit<MapInterface.Unit, 'index'>;
  currentMode?: string;
  rowCount: number;
  columnCount: number;
  mapRes: MapInterface.MapFrame;
  grid: boolean;
  blocks: Block[];
  currentBlock?: Block;
  mapOffsetX: number;
  mapOffsetY: number;
  saved: boolean;
}

class Editor extends React.Component<{}, State> {
  state: State;
  _block?: Block;
  _mapRes?: MapInterface.MapFrame;
  constructor(props: {}, state: State) {
    super(props, state);
    const blocks: Block[] = [];
    const rowCount = 23;
    const columnCount = 23;
    for (let row = 0; row < rowCount; ++ row) {
      for (let col = 0; col < columnCount; ++col) {
        blocks.push({
          index: row * columnCount + col,
          row: row,
          column: col,
          blocked: false,
          units: [{
            index: 0,
            type: 'default',
            background: 'green',
            blocked: false,
            zIndex: 1
          }]
        })
      }
    }
    const mapRes = {
      rowCount: rowCount,
      columnCount: columnCount,
      blocks: blocks
    }
    this._mapRes = deepCopy(mapRes);
    this.state = {
      mapOffsetX: 0,
      mapOffsetY: 0,
      unitTarget: {
        type: 'plain',
        blocked: false,
        background: 'lightgreen',
        zIndex: 1,
      },
      rowCount,
      columnCount,
      mapRes: mapRes,
      grid: true,
      blocks: blocks,
      currentUnit: 'plain',
      saved: true,
    }
  }
  handleCurrentUnitChange = (unit?: {name: string, unit: Omit<MapInterface.Unit, 'index'>}) => {
    // const value = e.target.value;
    // let unit: Omit<MapInterface.Unit, 'index'>;
    // switch(value) {
    //   case 'plain':
    //     unit = {
    //       background: 'lightgreen',
    //       blocked: false,
    //       type: 'plain',
    //       zIndex: 1
    //     }
    //   break;
    //   case 'wall':
    //     unit = {
    //       background: 'gray',
    //       blocked: true,
    //       type: 'wall',
    //       zIndex: 1
    //     }
    //   break;
    //   default:
    //     unit = {
    //       background: 'transparent',
    //       blocked: true,
    //       type: 'empty',
    //       zIndex: 1
    //     }
    // }
    // this.setState({
    //   currentUnit: value,
    //   unitTarget: unit
    // })
    if (unit) {
      this.setState({
        unitTarget: unit.unit
      })
    }
  }
  handleRowCountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      this.setState({
        rowCount: value
      })
    }
  }
  handleColumnCountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      this.setState({
        columnCount: value
      })
    }
  }
  handleGridChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({grid: !this.state.grid})
  }
  handleMapClick(e:SyntheticEvent) {
    console.log(e)
    console.log(e.currentTarget)
    console.log(e.target)
  }
  handleBlockClick(block:Block) {
    console.log(block)
    // if (!this.state.saved) {
    //   alert('save or reset your changes');
    //   return;
    // }
    this._block = deepCopy(block);
    // this._block = cloneDeep(block);
    this.setState({
      currentBlock: block
    })
  }
  editBlock = (block: Block) => {
    this.setState({
      saved: false
    });
    this.setState((state) => {
      const mapRes = state.mapRes;
      mapRes.blocks[block.index] = block;
      return {mapRes}
    })
  }
  resetBlock = () => {
    this.setState((state) => {
      const mapRes = state.mapRes;
      console.log(this._block)
      if (this._block) {
        mapRes.blocks[this._block.index] = deepCopy(this._block);
        return {
          mapRes,
          currentBlock: deepCopy(this._block),
        }
      }
      return {
        mapRes,
        currentBlock: undefined,
      }
    }, () => {
      this.setState({
        saved: true
      });
    })
  }
  resetMap = () => {
    if (this._mapRes) {
      this.setState({mapRes: deepCopy(this._mapRes)}, () => {
        const _block = this.state.currentBlock;
        if (_block) {
          this._block = _block;
          this.setState({
            currentBlock: this.state.mapRes.blocks[_block.index],
            saved: true,
          })
        }
      })
    }
  }
  pushButtonClick = () => {
    const unitTarget = this.state.unitTarget;
    const currentBlock = this.state.currentBlock;
    if (currentBlock && unitTarget) {
      this.setState({
        saved: false
      });
      const lastUnit = currentBlock.units[currentBlock.units.length - 1];
      this.setState((state) => {
        const mapRes = this.state.mapRes;
        currentBlock.units.push({
          ...unitTarget,
          index: lastUnit ? lastUnit.index + 1 : 0,
        });
        currentBlock.blocked = currentBlock.units.some(item => {
          return item.blocked
        })
        mapRes.blocks[currentBlock.row * mapRes.columnCount + currentBlock.column]
        = currentBlock;
        return {
          mapRes
        }
      })
    }
  }
  handleMapPostionClick = (direct:string) => {
    switch(direct) {
      case 'up':
        this.setState((state) => {
          return {mapOffsetY: state.mapOffsetY - 1}
        })
      break;
      case 'down':
        this.setState((state) => {
          return {mapOffsetY: state.mapOffsetY + 1}
        })
      break;
      case 'left':
        this.setState((state) => {
          return {mapOffsetX: state.mapOffsetX - 1}
        })
      break;
      case 'right':
        this.setState((state) => {
          return {mapOffsetX: state.mapOffsetX + 1}
        })
      break;
    }
  }
  saveChanges = () => {
    this._mapRes = deepCopy(this.state.mapRes);
    this.setState({
      saved: true
    });
  }
  render() {
    return (
      <div id="editor">
        <div id="left">
          <Left
            pushButtonClick={this.pushButtonClick}
            columnCount={this.state.columnCount}
            rowCount={this.state.rowCount}
            currentMode={this.state.currentMode}
            currentUnit={this.state.currentUnit}
            grid={this.state.grid}
            handleColumnCountChange={this.handleColumnCountChange}
            handleCurrentUnitChange={this.handleCurrentUnitChange}
            handleGridChange={this.handleGridChange}
            handleRowCountChange={this.handleRowCountChange}
            exportMap={()=>console.log(this.state.mapRes)}
            resetMap={this.resetMap}
            saveChanges={this.saveChanges}
            >
          </Left>
        </div>
        <div id="middle">
          <button className="map-up" onClick={()=>this.handleMapPostionClick('up')}>↑</button>
          <div className="center-wrapper">
            <button className="map-left" onClick={()=>this.handleMapPostionClick('left')}>←</button>
            <Map
              mapOffsetX={this.state.mapOffsetX}
              mapOffsetY={this.state.mapOffsetY}
              withGrid={this.state.grid}
              onBlockClick={(block)=>{this.handleBlockClick(block)}}
              mapData={this.state.mapRes}
              currentBlock={this.state.currentBlock}
              saved={this.state.saved}></Map>
            <button className="map-right" onClick={()=>this.handleMapPostionClick('right')}>→</button>
          </div>
          <button className="map-down" onClick={()=>this.handleMapPostionClick('down')}>↓</button>
        </div>
        <div id="right">
          <Right
            mapInfo={this.state.mapRes}
            blockInfo={this.state.currentBlock}
            editBlock={this.editBlock}
            resetBlock={this.resetBlock}
            saveChanges={this.saveChanges}
          ></Right>
        </div>
      </div>
    )
  }
}

export default Editor;
