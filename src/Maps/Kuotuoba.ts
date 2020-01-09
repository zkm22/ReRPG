import * as BaseInterface from './BaseInterface';
// import * as Base from './Base';

const unitsList: BaseInterface.Unit[][] = [];
for(let i = 0; i < 1600; ++i) {
  unitsList.push([{
    index: 0,
    background: 'lightgreen',
    type: 'grass',
    blocked: false,
    zIndex: 1
  }])
}

const blocks: BaseInterface.Block[] = [];
unitsList.forEach((units, index) => {
  let row = Number.parseInt((index / 40).toString());
  let column = Number((index % 40).toFixed(0));
  blocks.push({
    index,
    row,
    column,
    blocked: false,
    units: units
  })
})

export const Kuotuoba:BaseInterface.MapFrame = {
  rowCount: 40,
  columnCount: 40,
  blocks: blocks
}
