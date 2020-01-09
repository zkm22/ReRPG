import React from 'react';
import { Block } from '../Maps/Base';

interface Props {
  withGrid: boolean;
  block: Block;
  onBlockClick?: (block:Block) => any;
  isCurrent?: boolean;
  saved?: boolean;
}
interface State {
  
}
class MapBlock extends React.Component<Props, State> {
  handleBlockClick = (block:Block) => {
    if (this.props.onBlockClick) {
      this.props.onBlockClick(block);
    }
  }
  render() {
    const block = this.props.block;
    const withGrid = this.props.withGrid;
    return (
      <div
        className={`block`}
        onClick={()=>this.handleBlockClick(block)}>
        {block.units.map((unit, index) => {
          return (
            <div
              style={{
                background: unit.background,
                zIndex: unit.zIndex
              }}
              className="unit"
              key={index}>
            </div>
          )
        })}
        {withGrid && <div className="unit __grid"></div>}
        {this.props.isCurrent && <div className={`unit current-block ${this.props.saved === false ? 'editing' : ''}`}></div>}
      </div>
    )
  }
}

export default MapBlock;
