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
import PlotRisk from '../Components/Charts/Line2';
import CorrLabel from '../Components/Charts/Bar';
import BasicTable from '../Components/Tabel';
import UncertaintyPlot from '../Components/Charts/Area';
import Dropdown from '../Components/dropdown';
import HeatMapTable from '../Components/Charts/HeatMapTable';
import PlotlyComponent from '../Components/Charts/AreaChart2';
import PermanentDrawerLeft from '../Components/Sidebar';

export default function Monitor() {
  const [value, setValue] = React.useState('1');
  const [featureList, setFeatureList] = React.useState([]);
  const [dateList, setdateList] = React.useState([]);
  const [line1Fitur, setLine1Fitur] = React.useState(null);
  const [line1Date, setLine1Date] = React.useState(null);
  const [line2Date, setLine2Date] = React.useState(null);
  const [areaDate, setAreaDate] = React.useState(null);
  const [heatMapDate, setHeatMapDate] = React.useState(null);

  const [tabelArea, setTabelArea] = React.useState(null);
  const [tabelStart, setTabelStart] = React.useState(null);
  const [tabelEnd, setTabelEnd] = React.useState(null);
  const [tableRows, setTableRows] = React.useState([
    {
        "index": "count",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "mean",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "std",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "min",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "25%",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "50%",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "75%",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 0,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 0,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    },
    {
        "index": "max",
        "c_k0": 0,
        "c_k1": 0,
        "c_k2": 30,
        "c_v1": 0,
        "c_v2": 0,
        "c_v3": 0,
        "c_v4": 0,
        "c_v5": 0,
        "m_k0": 0,
        "m_k1": 90,
        "m_k2": 0,
        "m_weight": 0,
        "b_k0": 0,
        "b_k1": 0,
        "b_k2": 0
    }
]);

  // const [tabelAreaList, setTabelAreaList] = React.useState(null);
  const tabelAreaList = [
    'a','b','c','d'
  ]

  const [line1Data, setLine1Data] = React.useState(null);
  const [areaData, setAreaData] = React.useState(null);
  const [line2Data, setLine2Data] = React.useState(null);
  const [barData, setBarData] = React.useState(null);
  const [heatMapAccuracy, setHeatMapAccuracy] = React.useState(0)
  const [heatMapData, setHeatMapData] = React.useState([
    [
        0,
        0,
        0,
        0
    ],
    [
        0,
        0,
        0,
        0
    ],
    [
        0,
        0,
        0,
        0
    ],
    [
        0,
        0,
        0,
        0
    ]]);

  const [pageSection,setPageSection] = React.useState('');

  const [mainData, setMainData] = React.useState([]);
  const [mainStart, setMainStart] = React.useState([]);
  const [mainEnd, setMainEnd] = React.useState([]);
  const [mainArea, setMainArea] = React.useState([]);
  const [toggle, setToggle] = React.useState(false)


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const params = useParams();
  // console.log(params.id)

  const baseURL = "http://localhost:8000/api/features/"+params.id;
  var lineDataURL2 = "http://localhost:8000/api/monitor/plot_fitur/"+params.id+"/"+line1Date+"/"+line1Fitur;
  var barDataURL = "http://localhost:8000/api/monitor/corr/"+params.id;
  var areaDataURL = "http://localhost:8000/api/monitor/uncertainty/"+params.id+"/"+areaDate;
  var line2DataURL = "http://localhost:8000/api/monitor/plot_risk/"+params.id+"/"+line2Date;
  var tableURL = "http://localhost:8000/api/monitor/stats/"+params.id+"/"+tabelArea+"/"+tabelStart+"/"+tabelEnd;
  var datesURL = "http://localhost:8000/api/all_dates/"+params.id;
  var heatmapURL = "http://localhost:8000/api/monitor/confusion_matrix/"+params.id+"/"+heatMapDate;
  var areaURL = "http://localhost:8000/api/monitor/area/"+params.id+"/"+mainArea+"/"+mainStart+"/"+mainEnd;

 

    React.useEffect(() => {
      const element = document.getElementById(pageSection);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: 'smooth',block: "center" });
      }
        
    }, [toggle]);

  React.useEffect(() => {
    if(mainArea && mainStart && mainEnd){
      axios.get(areaURL).then((res) => {
        console.log(res.data[0]);
        setMainData(res.data[0]);
      });
    }
      
  }, [mainArea,mainStart,mainEnd]);
  
  React.useEffect(() => {
    if(featureList.length==0){
      axios.get(baseURL).then((res) => {
        setFeatureList(res.data);
        // console.log(featureList[0]);
      });
    }
    axios.get(barDataURL).then((res) => {
      setBarData(res.data);
    });
    axios.get(datesURL).then((res) => {
      setdateList(res.data);
    });
    
  }, []);

  React.useEffect(() => {
    if(line1Fitur && line1Date){
      axios.get(lineDataURL2).then((res) => {
        setLine1Data(res.data);
      });
    }
  }, [line1Fitur,line1Date]);

  React.useEffect(() => {
    if(line2Date){
      axios.get(line2DataURL).then((res) => {
        setLine2Data(res.data);
      });
    }
  }, [line2Date]);

  React.useEffect(() => {
    if(areaDate){
      axios.get(areaDataURL).then((res) => {
        setAreaData(res.data);
      });
    }
    
  }, [areaDate]);

  React.useEffect(() => {
    if(tabelArea && tabelStart && tabelEnd){
      axios.get(tableURL).then((res) => {
        setTableRows(res.data);
      });
    }
  }, [tabelArea, tabelStart, tabelEnd]);

  React.useEffect(() => {
    if(heatMapDate){
      axios.get(heatmapURL).then((res) => {
        setHeatMapData(res.data.cm);
        setHeatMapAccuracy(res.data.accuracy)
        // console.log(res.data.cm);
      });
    }
  }, [heatMapDate]);

  return (
    <div className='charts-container'>
      <PermanentDrawerLeft setToggle={setToggle} toggle={toggle} scrollTo={setPageSection}/>  
      <div className='top-monitor' >
        <div className='plot-title' id='3D'>
          <img className={'icon-img'} src={require('../assets/scatter-plot24.png')}/>
            <h3>3D Area Plot</h3>
            <Dropdown placeholder = {'Area'} list={tabelAreaList} setData={setMainArea}/>
            <Dropdown placeholder = {'Start Date'} list={dateList} setData={setMainStart}/>
            <Dropdown placeholder = {'End Date'} list={dateList} setData={setMainEnd}/>
        </div>
        <div className='chart-3d'>
          {console.log(mainData.series)}
          <PlotlyComponent x={mainData.x} y={mainData.y} z={mainData.z} series={mainData.series}/>
        </div>
        <div className="chart-legend"><span>Series (Color): </span> <span className="bhn">o C</span><span className="bhz">o M</span><span className="bhe">o B</span></div>
        
        <br></br>
        <div className='stat-table' id='stat-table'>
            <div className='plot-title'>
            <img className={'icon-img'} src={require('../assets/table24.png')}/>
              <h3>Statistic Features</h3>
              {/* {console.log(tableRows)} */}
              <Dropdown placeholder = {'Area'} list={tabelAreaList} setData={setTabelArea}/>
              <Dropdown  placeholder = {'Start Date'} list={dateList} setData={setTabelStart}/>
              <Dropdown  placeholder = {'End Date'} list={dateList} setData={setTabelEnd}/>
            </div>
            <BasicTable rows={tableRows}/>
        </div>
        <br></br>
          
          <div className='matrix'>
            <div className='plot-title' >
            <img className={'icon-img'} src={require('../assets/evaluation24.png')}/>
              <h3 >Confusion Matrix</h3>
              <Dropdown placeholder = {'Date'} list={dateList} setData={setHeatMapDate}/>
            </div>
            <div  id='matrix'>
              <HeatMapTable data={heatMapData}/>
            </div>
            <br ></br >
            <h7>Predicted Label (ACC={heatMapAccuracy})</h7>
          </div>
          
      </div>
      <br></br>
      <div className='bottom-monitor'>
        <div className='plot'>
          <div className='plot-title' >
          <img className={'icon-img'} src={require('../assets/stats24.png')}/>
            <h4>Time Series Feature</h4>
            <Dropdown placeholder = {'Feature'} list={featureList} setData={setLine1Fitur}/>
            <Dropdown placeholder = {'Date'} list={dateList} setData={setLine1Date}/>
          </div>
          <PlotFitur data={line1Data}/>
        </div>
        <div className='plot'>
          <div className='plot-title' id='line1'>
          <img className={'icon-img'} src={require('../assets/stats24.png')}/>
            <h4>Risk Classification</h4>
              <Dropdown placeholder = {'Date'} list={dateList} setData={setLine2Date}/>
          </div>
          <PlotRisk data={line2Data}/>
        </div>
        <div className='plot'>
          <div className='plot-title' >
          <img className={'icon-img'} src={require('../assets/stats24.png')}/>
            <h4>Correlation to Label</h4>
          </div>
          <CorrLabel data={barData}/>
        </div>
        <div className='plot'>
         
          <div className='plot-title' id='area'> 
          <img className={'icon-img'} src={require('../assets/stats24.png')}/>
          <h4>Uncertainty Prediction</h4>
              <Dropdown placeholder = {'Date'} list={dateList} setData={setAreaDate}/>
          </div>
          <UncertaintyPlot data={areaData}/>
        </div>
        <br></br>
      </div>
    </div>
    
  );
}
