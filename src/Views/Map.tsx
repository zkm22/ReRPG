import React from 'react';
import * as MapBaseInterface from '../Maps/BaseInterface';
import './Map.scss';
import Round from './Figure/Round';
import { Block } from '../Maps/Base';
import MapBlock from './MapBlock';
import CONFIG from './CONFIG';

let onBlockClick: ((block:Block)=>void)|undefined;

function printRow(map: MapBaseInterface.MapFrame, withGrid = false, currentBlock?:Block, saved?: boolean) {
  const res = [];
  // const length = map.columnCount * map.rowCount;
  for (let i = 0; i < map.rowCount; ++i) {
    const row = [];
    for (let c = 0; c < map.columnCount; ++c) {
      const block = map.blocks[c + i * map.columnCount];
      row.push(
        // printBlock(map.blocks[c + i * map.columnCount], withGrid)
        <MapBlock
          block={block}
          withGrid={withGrid}
          onBlockClick={onBlockClick}
          key={block.column * map.columnCount + block.row}
          isCurrent={currentBlock&&currentBlock.row===block.row&&currentBlock.column===block.column}
          saved={saved}
        ></MapBlock>
      )
    }
    res.push(
      <div className={`row`} key={i}>
        {row}
      </div>
    );
  }
  return res;
}

interface Props {
  withGrid?: boolean,
  onBlockClick?:(block:Block)=>void,
  mapData: MapBaseInterface.MapFrame,
  currentBlock?: Block;
  mapOffsetX?: number,
  mapOffsetY?: number,
  saved?: boolean,
}
interface State {
  figureX: number,
  figureY: number,
  moving: boolean,
  mapOffsetX: number,
  mapOffsetY: number,
}

export default class MapView extends React.Component<Props, State> {
  moving = false;
  curKey: string | null = null;
  moveBoundle: (() => void) | null | 'busy' = null;
  curBoundleKey: string | null = null;
  constructor(props: Props, state: State) {
    super(props, state)
    onBlockClick = props.onBlockClick;
    this.state = {
      figureX: 10,
      figureY: 10,
      moving: false,
      mapOffsetX: 0,
      mapOffsetY: 0
    }
  }
  moveFigure(key:string, x:number, y:number) {
    const pos = {
      x, y
    };
    switch (key) {
      case 'w':
      case 'W':
        this.curKey = 'w';
        if (
          y > 0
          && !this.checkBlocked(x, y - 1)) { 
          // this.setState({figureY: y - 1});
          pos.y -= 1;
        }
      break;
      case 's':
      case 'S':
        this.curKey = 's';
        if (y < this.props.mapData.rowCount - 1
          && !this.checkBlocked(x, y + 1)) {
          // this.setState({figureY: y + 1});
          pos.y += 1;
        }
      break;
      case 'a':
      case 'A':
        this.curKey = 'a';
        if (x > 0 && !this.checkBlocked(x - 1, y)) {  
          // this.setState({figureX: x - 1});
          pos.x -= 1;
        }
      break;
      case 'd':
      case 'D':
        this.curKey = 'd';
        if (x < this.props.mapData.columnCount -1
          && !this.checkBlocked(x + 1, y)) {
          // this.setState({figureX: x + 1});
          pos.x += 1;
        }
      break;
    }
    return pos;
  }
  checkBlocked(x:number, y:number) {
    const mapData = this.props.mapData;
    return mapData.blocks[y * mapData.rowCount + x].blocked;
  }
  handleMove(e: KeyboardEvent, x: number, y: number) {
    this.moving = true;
      this.setState(() => {
        const {x: figureX, y: figureY} = this.moveFigure(e.key, x, y)
        return {
          moving: true,
          figureX,
          figureY
        }
      }, () => {
        // this.moveFigure(e.key, x, y)
        setTimeout(()=>{
          this.setState({
            moving: false
          }, () => {
            this.moving = false;
            if (typeof this.moveBoundle === 'function') {
              this.moveBoundle();
            }
          })
        }, 500)
      })
  }
  handleKeyPress = (e: KeyboardEvent) => {
    const x = this.state.figureX;
    const y = this.state.figureY;
    if (!this.moving) {
      // this.moveBoundle = 'busy';
      // setTimeout(() => {
      //   this.moveBoundle = null;
      // }, 450);
      this.handleMove(e, x, y);
    } else {
      if (this.moveBoundle !== 'busy') {
        this.moveBoundle = () => {
          this.handleMove(e, x, y);
          this.curBoundleKey = e.key;
          this.moveBoundle = null;
        }
      }
    }
  }
  handleKeyUp = (e:KeyboardEvent) => {
    if (this.curBoundleKey === e.key) {
      this.moveBoundle = null;
      this.curKey = null;
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
  // handlekeyUp = (e: KeyboardEvent) => {
  //   if (['w', 's', 'a', 'd'].indexOf(e.key) > -1) {

  //   }
  // }
  componentDidMount() {
    document.onkeydown = this.handleKeyPress;
    document.onkeyup = this.handleKeyUp;
  }
  componentWillUnmount() {
    document.onkeydown = null;
    document.onkeyup = null;
  }
  render() {
    return (
      <div id="map">
        <div id="full-map" style={{
          left: this.props.mapOffsetX && this.props.mapOffsetX * CONFIG.BLOCK_SIZE,
          top: this.props.mapOffsetY && this.props.mapOffsetY * CONFIG.BLOCK_SIZE,
        }}>
          {printRow(this.props.mapData, this.props.withGrid, this.props.currentBlock, this.props.saved)}
           <Round animated={this.state.moving} x={this.state.figureX} y={this.state.figureY}></Round>
        </div>
      </div>
    )
  }
}