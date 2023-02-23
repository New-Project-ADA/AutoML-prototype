import { useEffect, useState,useRef } from 'react';
import React from 'react';
import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  Line,
  Legend,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import './Chart.css'

const UncertaintyPlot = (props) => {


  return (
    <div className='responsive-container'>
      <div className='flex-container'>
        <ResponsiveContainer  width="100%"height="100%">
          <ComposedChart 
            width={730}
            height={250}
            data={props.data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <XAxis dataKey="index" />
            <YAxis />
            <Area dataKey="lowerupper" stroke="#8884d8" fill="#00FFFF" />
            <Line dataKey="actual" stroke="#FF0000" dot={false}/>
            <Line dataKey="median" stroke="#0000FF" dot={false}/>
            <Tooltip />
            <Legend />
          </ComposedChart >
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};
export default UncertaintyPlot