import React from "react";
import HeatMap from "react-heatmap-grid";

const xLabels = ["Low Risk", "Normal", "Risk","High Risk"];
const yLabels = ["Low Risk", "Normal", "Risk","High Risk"];


const HeatMapTable  = (props) => {
  

    return (
      <div>
          <HeatMap
            xLabels={xLabels}
            yLabels={yLabels}
            data={props.data}
            xLabelsLocation={"bottom"}
            xLabelWidth={800}
            yLabelWidth={80}
            height={50}
            squares={false}
            cellStyle={(background, value, min, max, data, x, y) => ({
              background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
              fontSize: "11px",
            })}
            cellRender={(value) => value}
            title={(value, unit) => `${value}`}
          />  
      </div>
    );
  }

export default HeatMapTable


