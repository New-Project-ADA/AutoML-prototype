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

const PlotRisk = (props) => {
//   const [data,setData] = useState([]);
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

  return (
    <div className='responsive-container'>
      <div className='flex-container'>
        <ResponsiveContainer width="100%"height="100%">
            <LineChart width={730} height={250} data={props.data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#FF0000" dot={false}/>
                <Line type="monotone" dataKey="predicted" stroke="#8884d8" dot={false}/>
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};
export default PlotRisk