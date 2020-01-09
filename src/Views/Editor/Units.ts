import { Unit } from "../../Maps/BaseInterface";

const Units: Array<{
  name: string,
  unit: Omit<Unit, 'index'>,
}> = [{
  name: 'empty',
  unit: {
    background: 'transparent',
    blocked: true,
    zIndex: 0,
  }}, {
    name: 'plain',
    unit: {
      background: 'transparent',
      blocked: false,
      zIndex: 0,
    }
  }
]

export default Units;
