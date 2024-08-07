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
import { Box, Button, Card, Typography, TextareaAutosize } from "@mui/material";
import EliminarConDialogo from "../../components/EliminarConDialogo/EliminarConDialogo";
import { blue } from "@mui/material/colors";
import formatDate from "../../utils/formatDate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DateCalendar } from "@mui/x-date-pickers";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useIsFavorite from "../../hooks/useIsFavorite";
import ScrollUp from "../../components/ScrollUp/ScrollUp";
import { countRecordsByDay } from "../../utils/countRecordsByDay";
import DayWithCount from "../../components/DayWithCount/DayWithCount";
import "../../App.css";
import encontrarNumeroMasCercano from "../../utils/encontrarNumeroMasCercano";
import useColors from "../../hooks/useColors";
import getCustomDay from "../../utils/getCustomDay";
import getTextColorForBackground from "../../utils/getTextColorForBackground";

const Log = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const { id } = useParams();
  const detailedLog = data?.regs?.find((reg) => reg.id === id);
  const [timeUnit, setTimeUnit] = useState("horas");
  const navigate = useNavigate();
  const { isFavorite, setIsFavorite } = useIsFavorite(detailedLog?.text);
  const [editMode, setEditMode] = useState(false);
  const [editLtMode, setEditLtMode] = useState(false);
  const { colors, setcolors, colorChange } = useColors();
  console;

  const registrosMismoNombre = data.regs
    .filter((reg) => reg.text === detailedLog.text)
    .sort((a, b) => b.date - a.date);

  console.log(registrosMismoNombre);

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };
  function cambiarDia(day) {
    const nuevodia = new Date(day).setHours(12, 0, 0, 0);
    const timestamps = registrosMismoNombre.map((reg) => reg.date);
    const registroMasCercano = encontrarNumeroMasCercano(timestamps, nuevodia);
    navigate(`/log/${detailedLog.text}_${registroMasCercano}`);
  }
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

  // Contar los registros por día con el texto de detailedLog.text
  const counts = countRecordsByDay(data.regs, detailedLog.text);

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
              {registrosMismoNombre.map((record, index) => (
                <tr
                  key={record.id}
                  style={{
                    color: (() => {
                      if (record.id === detailedLog.id) {
                        return "white"
                      } else {
                        return "black"
                      }
                      
                    })(),
                    backgroundColor: (() => {
                      const numeroDiaSemana = getCustomDay(
                        new Date(record.date)
                      );
                      const color = colors[numeroDiaSemana];
                      if (record.id === detailedLog.id) {
                        return color;
                      } else {
                        return color + "50";
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
      <Card sx={{ p: "0", m: "0" }}>
        <DateCalendar
          onChange={(e) => {
            cambiarDia(e);
          }}
          sx={{ width: "100%", margin: "0px" }}
          showDaysOutsideCurrentMonth
          value={new Date(detailedLog.date)}
          slots={{
            day: DayWithCount,
          }}
          slotProps={{
            day: {
              counts,
            },
          }}
        />
      </Card>
      <Card sx={{ pl: "8px", pr: "8px", pb: "8px", mt: "8px", mb: "300px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {editLtMode ? (
            <EditOffIcon onClick={() => setEditLtMode(false)}></EditOffIcon>
          ) : (
            <ModeEditIcon onClick={() => setEditLtMode(true)}></ModeEditIcon>
          )}

          <Typography variant="h5" sx={{ marginLeft: "5px" }}>
            Texto largo
          </Typography>
        </Box>

        {editLtMode ? (
          <TextareaAutosize
            minRows={5}
            sx={{ width: "90%" }}
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
          <Typography sx={{ marginRight: "8px", wordWrap: "break-word" }}>
            {detailedLog.lt}
          </Typography>
        )}
      </Card>

      <ScrollUp></ScrollUp>
    </div>
  );
};

export default Log;
