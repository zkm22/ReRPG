import React from 'react';
import './Left.scss';
import UNITS from './Units';
import { Unit } from '../../Maps/BaseInterface';

interface State {

}
interface Props {
  rowCount: number;
  columnCount: number;
  grid: boolean;
  currentUnit: string;
  currentMode?: string;
  handleGridChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
  handleCurrentUnitChange: (unit: {name: string, unit: Omit<Unit, 'index'>} | undefined)=>void;
  handleColumnCountChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
  handleRowCountChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
  pushButtonClick: () => void;
  exportMap: ()=>void;
  resetMap: () => void;
  saveChanges: () => void;
}

class Left extends React.Component<Props, State> {

  // constructor(props:Props, state:State) {
  //   super(props, state);
  // }
  handlePushButtonClick = () => {
    this.props.pushButtonClick();
  }
  handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = UNITS.find((item) => {
      return item.name === e.target.value;
    })
    this.props.handleCurrentUnitChange(unit);
  }
  render() {
    return <React.Fragment>
      <fieldset>
        <legend>Config</legend>
        <label className="row">
          grid
          <input type="checkbox" name="grid" value="grid" 
            checked={this.props.grid}
            onChange={this.props.handleGridChange}
            />
        </label>
      </fieldset>
      <fieldset>
        <legend>Sets</legend>
        <label className="row">
          rowCount:
          <input type="text"
            value={this.props.rowCount}
            onChange={this.props.handleRowCountChange}></input>
        </label>
        <label className="row">
          columnCount:
          <input type="text"
            value={this.props.columnCount}
            onChange={this.props.handleColumnCountChange}></input>
        </label>
        <div className="row">
          <span>BlockType: </span>
          {/* <label>
            plain
            <input type="radio" name="unit" value="plain" 
              checked={this.props.currentUnit === 'plain'}
              onChange={this.props.handleCurrentUnitChange}
              />
          </label>
          <label>
            wall
            <input type="radio" name="unit" value="wall" 
              checked={this.props.currentUnit === 'wall'}
              onChange={this.props.handleCurrentUnitChange}
              />
          </label> */}
          <select onChange={this.handleUnitChange}>
            {UNITS.map(item => {
              return <option value={item.name}>{item.name}</option>
            })}
          </select>
          <button onClick={this.handlePushButtonClick}>push</button>
        </div>
      </fieldset>
      <fieldset>
        <button onClick={()=>{this.props.resetMap()}}>ResetMap</button>
        <button onClick={()=>{this.props.saveChanges()}}>SaveMap</button>
        <button onClick={()=>{this.props.exportMap()}}>Export</button>
      </fieldset>
    </React.Fragment>
  }
}

export default Left;
