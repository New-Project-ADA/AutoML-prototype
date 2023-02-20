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
//   const [data,setData] = useState([]);
const rangeData = [
  {
    "day": "05-01",
    "temperature": [
      -1,
      10
    ],
    "x":2,
  },
  {
    "day": "05-02",
    "temperature": [
      2,
      15
    ],
    "x":2,
  },
  {
    "day": "05-03",
    "temperature": [
      3,
      12
    ],
    "x":2,
  },
  {
    "day": "05-04",
    "temperature": [
      4,
      12
    ],
    "x":2,
  },
  {
    "day": "05-05",
    "temperature": [
      12,
      16
    ],
    "x":2,
  },
  {
    "day": "05-06",
    "temperature": [
      5,
      16
    ],
    "x":2,
  },
  {
    "day": "05-07",
    "temperature": [
      3,
      12
    ],
    "x":2,
  },
  {
    "day": "05-08",
    "temperature": [
      0,
      8
    ],
    "x":2,
  },
  {
    "day": "05-09",
    "temperature": [
      -3,
      5
    ],
    "x":2,
  }
]

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
            <Area dataKey="lowerupper" stroke="#8884d8" fill="#8884d8" />
            <Line dataKey="actual" stroke="#FF0000" dot={false}/>
            <Line dataKey="median" stroke="#FFFFFF" dot={false}/>
            <Tooltip />
          </ComposedChart >
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};
export default UncertaintyPlot