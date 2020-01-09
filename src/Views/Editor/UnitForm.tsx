import React from 'react';
import { Unit } from '../../Maps/BaseInterface';

export type AttrList = Array<{
  name: keyof Unit;
  type: string;
  readonly?: boolean;
}>

interface Props {
  unit: Unit;
  attrList: AttrList;
  handleUnitValueChange: (name: keyof Unit, value: any, index: number) => any;
}
interface State {
  
}
class UnitForm extends React.Component<Props, State> {
  handleUnitInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = e.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.handleUnitValueChange(name as keyof Unit, value, this.props.unit.index);
  }
  renderInput = (type: 'boolean'|'number'|'string'|string, name: keyof Unit, readonly?:boolean) => {
    switch(type) {
      case 'boolean':
        return (<input type="checkbox" value={name} checked={this.props.unit[name] as boolean} disabled={readonly}></input>)
      default:
        return (
          <input
            type="text" 
            defaultValue={this.props.unit[name] as string}
            disabled={readonly}
            onChange={this.handleUnitInputChange}
            name={name}
          ></input>
        )
    }
  }
  render() {
    return (
      <form>
        {/* {Object.keys(this.props.unit).map(item => {
          return (
            <div>
              <input
                name={item}
                value={this.props.unit[item]}
                onChange={(value)=>this.props.handleUnitValueChange(item,value)}
              ></input>
            </div>
          )
        })} */}
        {this.props.attrList.map(item => {
          return (
            <div key={item.name}>
              <label>
                {item.name}: 
                {this.renderInput(item.type, item.name, item.readonly)}
              </label>
            </div>
          )
        })}
      </form>
    )
  }
}

export default UnitForm;
