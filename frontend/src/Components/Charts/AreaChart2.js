import React from 'react';
import Plot from "react-plotly.js"

function PlotlyComponent(props) {
//   const linspaceFn = (startValue, stopValue, cardinality) => {
//   var arr = [];
//   var step = (stopValue - startValue) / (cardinality - 1);
//   for (var i = 0; i < cardinality; i++) {
//     arr.push(parseFloat((startValue + (step * i)).toFixed(3)));
//   }
//   return arr;
// }
//   const t = linspaceFn(0, 20, 100)
//   const x = t.map(i => (Math.cos(i)))
//   const y = t.map(i => Math.sin(i))
//   const z = t

  return (
      <Plot

        data={[
          {
            x: props.x,
            y: props.y,
            z: props.z,
            mode: 'markers', 
            type:'scatter3d',
            marker: {
              size:5,
              color:props.series,     
              colorscale:'Viridis', 
              opacity:0.8
            }
          }
        ]}
      />
  );
}

export default PlotlyComponent;