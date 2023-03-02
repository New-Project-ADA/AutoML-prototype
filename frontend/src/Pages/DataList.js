import axios from 'axios';
import './Input.css'
import React,{useState} from 'react';
import CustomButton from '../Components/StartButton';
import BasicTable from '../Components/TabelData';

export default function DataList() {
    const [data, setData] = React.useState([])
	
	axios.get('http://localhost:8000/api/datainput/').then((res) => {
        setData(res.data);
        console.log(res.data);
      });

	return (
		<div className='body-cont'>
            <div className='upload-container'>
            <div className='input-title'>
				{/* <img className={'icon-img'} src={require('../assets/enter24.png')}/> */}
				<h3>List of Data Inputted</h3>
			</div>
                <BasicTable rows={data}/>
            
                <div>
				</div>
            </div>
		</div>
	);
}
