import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import "./Monitor.css"
import { useParams } from "react-router-dom";
import PlotFitur from '../Components/Charts/Line';
import CorrLabel from '../Components/Charts/Bar';
import BasicTable from '../Components/Tabel';
import UncertaintyPlot from '../Components/Charts/Area';


export default function Monitor() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const params = useParams();
  console.log(params.id)

  const baseURL = "http://localhost:8000/api/datainput/"+params.id;

  React.useEffect(() => {
    axios.get(baseURL).then((res) => {
      
    });
  }, []);

  return (
    // <Box sx={{ width: '100%', typography: 'body1', marginLeft: '6%', marginRight:'6%', marginTop:'10px' }}>
    //   <TabContext value={value}>
    //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //       <TabList onChange={handleChange} aria-label="lab API tabs example">
    //         <Tab label="Item One" value="1" />
    //         <Tab label="Item Two" value="2" />
    //         <Tab label="Item Three" value="3" />
    //       </TabList>
    //     </Box>
    //     <TabPanel value="1">
    //       <img src='https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png' class="center"/>
    //     </TabPanel>
    //     <TabPanel value="2">  </TabPanel>
    //     <TabPanel value="3">  </TabPanel>
    //   </TabContext>
    // </Box>
    <div className='charts-container'>
      <div className='top-monitor'>
        <img src='https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png' class="center"/>
        <div className='side-top'>
          <div className='matrix'>
            <img src='https://scikit-learn.org/stable/_images/sphx_glr_plot_confusion_matrix_002.png' class="center"/>
          </div>
          <div className='table'>
            <BasicTable/>
          </div>
        </div>
      </div>
      <div className='bottom-monitor'>
        <div className='plot'>
          <h3>Time Series Feature</h3>
          <PlotFitur/>
        </div>
        <div className='plot'>
          <h3>Risk Classification</h3>
          <PlotFitur/>
        </div>
        <div className='plot'>
          <h3>Corr Label</h3>
          <CorrLabel/>
        </div>
        <div className='plot'>
          <h3>Uncertainty Plot</h3>
          <UncertaintyPlot/>
        </div>
        
      </div>
    </div>
    
  );
}
