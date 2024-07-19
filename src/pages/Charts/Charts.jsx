import React, { useContext } from "react";
import "./Charts.css";
import { Card } from "@mui/material";
import BarChart from "../../components/TimeLineChart/TimeLineChart";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
const Charts = () => {
  const { data } = useContext(LocalStorageContext);
  return (
    <Card>
      <BarChart data={data}></BarChart>
    </Card>
  );
};

export default Charts;
