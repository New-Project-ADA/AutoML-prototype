import { useEffect, useState,useRef } from 'react';
import React from 'react';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import './Chart.css'

const CorrLabel = (props) => {


  return (
    <div className='responsive-container'>
      <div className='flex-container'>
        <ResponsiveContainer width="100%"height="100%">
          <BarChart width={730} height={250} data={props.data} barGap={0.1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis domain={[-1, 1]}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="topTen" fill="#8884d8" maxBarSize={true}/>
            <Bar dataKey="botTen" fill="#82ca9d" maxBarSize={true}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};
export default CorrLabel