import React, { useEffect, useState } from "react";
import "./Log.css";
import { useContext } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import { useNavigate, useParams } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import totalTimeAgo from "../../utils/totalTimeAgo";
import formatTime from "../../utils/formatTime";
import TimeAgo from "../../components/TimeAgo/TimeAgo";
import TimeUnitSelector from "../../components/TimeUnitSelector/TimeUnitSelector";
import TotalTimeAgo from "../../components/TotalTimeAgo/TotalTimeAgo";
import EditOffIcon from "@mui/icons-material/EditOff";
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import EliminarConDialogo from "../../components/EliminarConDialogo/EliminarConDialogo";
import { blue, purple } from "@mui/material/colors";
import formatDate from "../../utils/formatDate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DateCalendar } from "@mui/x-date-pickers";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useIsFavorite from "../../hooks/useIsFavorite";
import ScrollUp from "../../components/ScrollUp/ScrollUp";

const Log = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const { id } = useParams();
  const detailedLog = data?.regs?.find((reg) => reg.id === id);
  const [timeUnit, setTimeUnit] = useState("horas");
  const navigate = useNavigate();
  const { isFavorite, setIsFavorite } = useIsFavorite(detailedLog?.text);
  const [editMode, setEditMode] = useState(false);
  const [editLtMode, setEditLtMode] = useState(false);

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  const formatearFecha = (date) => {
    const fecha = new Date(date);
    const year = fecha.getFullYear().toString().padStart(4, "0");
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const day = fecha.getDate().toString().padStart(2, "0");
    const hours = fecha.getHours().toString().padStart(2, "0");
    const minutes = fecha.getMinutes().toString().padStart(2, "0");
    const seconds = fecha.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  console.log(detailedLog);
  return (
    <div>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Volver
      </Button>
      <EliminarConDialogo registro={detailedLog}></EliminarConDialogo>
      <Card sx={{ pl: "8px", pr: "8px", mt: "8px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {editMode ? (
              <TextareaAutosize
                className="nombreRegistro"
                id="outlined-basic"
                variant="outlined"
                value={detailedLog.text}
                onChange={(event) => {
                  setData({
                    ...data,
                    regs: data.regs.map((reg) =>
                      reg.id === detailedLog.id
                        ? { ...reg, text: event.target.value }
                        : reg
                    ),
                  });
                }}
                sx={{ marginRight: "8px" }} // Añadir margen a la derecha
              />
            ) : (
              <Typography
                className="nombreRegistro"
                variant="h5"
                sx={{ marginRight: "8px" }}
              >
                {detailedLog.text}
              </Typography>
            )}
            {editMode ? (
              <EditOffIcon onClick={() => setEditMode(false)}></EditOffIcon>
            ) : (
              <ModeEditIcon onClick={() => setEditMode(true)}></ModeEditIcon>
            )}
          </Box>
          {isFavorite ? (
            <FavoriteIcon
              className="iconoFavorito"
              sx={{
                fontSize: "30px",
                color: "#ff0000",
                cursor: "pointer",
              }}
              onClick={() => setIsFavorite(false)}
            />
          ) : (
            <FavoriteBorderIcon
              className="iconoFavorito"
              sx={{
                fontSize: "30px",
                color: "#ff000077",
                cursor: "pointer",
              }}
              onClick={() => setIsFavorite(true)}
            />
          )}
        </Box>
        <p>{formatearFecha(detailedLog.date)}</p>

        <TimeAgo date={detailedLog.date}></TimeAgo>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TotalTimeAgo date={detailedLog.date} unit={timeUnit}></TotalTimeAgo>
          <TimeUnitSelector
            value={timeUnit}
            fatherFunctionProp={handleTimeUnitChange}
          ></TimeUnitSelector>
        </Box>
      </Card>
      <Card sx={{ pl: "8px", pr: "8px", mt: "8px" }}>
        <div style={{ maxHeight: "200px", overflow: "auto" }}>
          <table
            style={{
              margin: "auto",
              width: "100%",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            <tbody>
              {data.regs
                .filter((reg) => reg.text === detailedLog.text)
                .sort((a, b) => b.date - a.date)
                .map((record, index) => (
                  <tr
                    key={record.id}
                    style={{
                      backgroundColor: (() => {
                        if (record.id === detailedLog.id) {
                          return blue[300];
                        } else if (index % 2 === 0) {
                          return "white";
                        } else {
                          return "white";
                        }
                      })(),
                    }}
                    onClick={() => {
                      navigate(`/log/${record.id}`);
                    }}
                  >
                    <td style={{ padding: "5px" }}>
                      {new Date(record.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                      })}
                    </td>
                    <td>
                      {formatDate(record.date)} {formatTime(record.date)}
                    </td>
                    <td>{record.text}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <DateCalendar
          showDaysOutsideCurrentMonth
          value={formatearFecha(detailedLog.date)}
          readOnly
        />
      </Card>
      <Card sx={{ pl: "8px", pr: "8px", pb: "8px", mt: "8px", mb: "300px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {editLtMode ? (
            <EditOffIcon onClick={() => setEditLtMode(false)}></EditOffIcon>
          ) : (
            <ModeEditIcon onClick={() => setEditLtMode(true)}></ModeEditIcon>
          )}

          <Typography
            variant="h5"
            sx={{ marginLeft: "5px" }}
          >
            Texto largo
          </Typography>
          </Box>
          
          {editLtMode ? (
            <TextareaAutosize
              minRows={5}
              sx={{ width: "90%"}} 
              value={detailedLog.lt}
              onChange={(event) => {
                setData({
                  ...data,
                  regs: data.regs.map((reg) =>
                    reg.id === detailedLog.id
                      ? { ...reg, lt: event.target.value }
                      : reg
                  ),
                });
              }}
            />
          ) : (
            <Typography
              sx={{ marginRight: "8px", wordWrap: "break-word" }}
            >
              {detailedLog.lt}
            </Typography>
          )}

      </Card>

      <ScrollUp></ScrollUp>
    </div>
  );
};

export default Log;
