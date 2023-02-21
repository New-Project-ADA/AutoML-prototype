import { useEffect, useState,useRef } from 'react';
import React from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import './Chart.css'

const PlotFitur = (props) => {
  

  return (
    <div className='responsive-container'>
      <div className='flex-container'>
        <div>{console.log(props.data)}</div>
        <ResponsiveContainer width="100%"height="100%">
            <LineChart width={730} height={250} data={props.data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="data" stroke="#8884d8" dot={false}/>
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};
export default PlotFitur