import Plot from 'react-plotly.js';
import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './alpha_shape.csv';



const MainPlot = (props) => {
    
    const [xData, setXData] = React.useState(null);
    const [yData, setYData] = React.useState(null);
    const [zData, setZData] = React.useState(null);

    React.useEffect(() => {
        d3.csv(data).then(function(rows) {
            console.log(rows);
            function unpack(rows, key) {
                return rows.flatMap(function(row) { return parseFloat(row[key]); });
        
            }
            console.log(unpack(rows, 'x'));
            setXData();
            setYData(unpack(rows, 'y'));
            setZData(unpack(rows, 'Z'));

        }).catch(function(err) {
            throw err;
        })
        // d3.csv(data, function(rows) { 
        //     console.log(rows);
            
        // });
        // d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){
        //     function unpack(rows, key) {
        //         return rows.map(function(row) { return row[key]; });
        // }
    
    }, [setXData]);
 
    return (
        <div>
      <Plot
      
        data={[
            {
            x: xData,
            y: yData,
            z: zData,
            mode: 'markers', 
            type:'scatter3d',
            marker: {
                size:12,
                color:'rgb(23, 190, 207)',     
                colorscale:'Viridis', 
                opacity:0.8
            }
            }
        ]}
      />
      </div>
    );
  }

export default MainPlot
