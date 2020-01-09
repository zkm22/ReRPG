import React from 'react';
import './Round.scss';
import CONFIG from '../CONFIG';

interface Props {
  x: number;
  y: number;
  animated: boolean;
}

class RoundFigure extends React.Component<Props> {
  static defaultProps = {
    animated: false
  }
  dummy: number = 0;
  render() {
    if (this.props.animated) {
      this.dummy++;
    }
    return(
      <div
        id="figure"
        style={{
          left: `${this.props.x * CONFIG.BLOCK_SIZE}px`,
          top: `${this.props.y * CONFIG.BLOCK_SIZE}px`,
        }}
        >
        <div
          className={`run${this.dummy % 2} round`}
        >
        </div>
        <div
          className={`run${this.dummy % 2} shadow`}
        ></div>
      </div>
    )
  }
}

export default RoundFigure;
