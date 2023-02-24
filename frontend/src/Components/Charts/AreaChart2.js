import React from 'react';
import Plot from "react-plotly.js"

function PlotlyComponent(props) {

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