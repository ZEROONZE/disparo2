import React, { useState, useMemo, useEffect, useRef } from "react";
import api, { token } from "../../hooks/Api";
import { Container } from "./styles";
import { RotatingSquare } from "react-loader-spinner";
import { Alert, Checkbox, Fab, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { read, utils, writeFile } from "xlsx";

import axios from "axios";
import { response } from "express";

import { BiX, BiMessageSquareX } from "react-icons/bi";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import { IoMdAdd } from "react-icons/io";
import { FcUpload } from "react-icons/fc";
import { RiFileExcel2Line } from "react-icons/ri";
// modal mateiral ui

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  maxHeight: "600px",
  overflowY: "scroll",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Tabela
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

// Tabela

const initialValues = {
  title: "",
  mensage: "",
};
interface IData {
  number: number;
  message: string;
  statusCode: number;
  error: number;
}
interface IError {
  message: string;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "#f8f7f7",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
  },
};
interface IErroSend {
  error: String;
}
interface ISucessSend {
  sucess: String;
}
interface Iimport {
  number: string;
  message: string;
}
interface Itoken {
  token: string;
  instacia?: string;
  prevState: null;
}

export const MensageText = () => {
  const [alertt, setAlertt] = useState(false);
  const [alerterr, setAlerterr] = useState(false);
  const [alertcriar, setAlertcriar] = useState(false);
  const [mensage, setMensage] = useState("");

  const [loading, setLoading] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [values, setValues] = useState(initialValues);
  const [NotEnviado, SetNotEnviado] = useState([]);
  const [error, setError] = useState<IErroSend[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [sucess, setSucess] = useState(false);

  const [importE, setImportE] = useState<Iimport[]>([]);

  const [tokenNew, setTokenNew] = useState<Itoken[]>([]);
  const [somarArray, SetSomarArray] = useState(0);
  //Modal ui
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function Jsonnn() {
    const jsonTarefa1 = localStorage.getItem("isntância");

    console.log(jsonTarefa1);

    setTokenNew(JSON.parse(jsonTarefa1!));
  }

  const inputEl = useRef(null);
  //ModalsetSucess

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Jrows: any[] = [];
  // const data

  function onChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = ev.target;
    setMensage(ev.target.value);
    setValues({ ...values, [name]: value });
  }

  // Importar contatos excel
  const [movies, setMovies] = useState([]);

  useEffect(() => {}, []);

  function handleImport(event: any) {
    const files = event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

          for (let i = 0; i < rows.length; i++) {
            const dato: any = rows[i];
            Jrows.push({
              ...dato,
              number: (dato.number += ""),
            });
          }
          setImportE(Jrows);
          console.log(Jrows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const handleExport = () => {
    const headings = [["number", "message"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, movies, {});
    utils.book_append_sheet(wb, ws);
    writeFile(wb, "Movie Report.xlsx", { type: "string" }).join("");
    console.log(ws);
    console.log(headings);
    console.log(wb);
  };

  const timeSort = [30, 3];
  const numero = Math.floor(Math.random() * timeSort.length);

  const emoji = useMemo(() => {
    const numero = Math.floor(Math.random() * timeSort.length);

    return timeSort[numero];
  }, []);

  async function Submit() {
    var resultado = [];
    setLoading(true);
    const timer = (seconds: number) => {
      let time = seconds * 1000;
      return new Promise((res) => setTimeout(res, time));
    };

    console.log("Iniciou");

    for (var i = 0; i < importE.length; i++) {
      console.log("Looping... " + i);
      var count = 4;
      for (var j = 0; j < Math.floor(Math.random() * 20); j++) {
        count++;
      }
      await timer(count++);
      console.log(count++);

      const responsedata = api
        .post("/send_message", importE[i], {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })

        .then((response) => {
          setAlertContent(response.data.result);
          setAlertt(true);
          console.log(response);

          const catThen = JSON.parse(response.config.data);
          var dateThen = data.push({ ...catThen, error: 200 });
          setData(data);

          setSucess(sucess);
          console.log(data);
          return { dateThen };
        })

        .catch(async (err) => {
          setAlerterr(true);
          console.log(err.response);
          const cat = JSON.parse(err.response.config.data);
          var date = data.push({ ...cat, error: 400 });

          setData(data);
          setSucess(sucess);

          console.log(error);
          return { date };
        })
        .finally(function () {
          setData(data);
        });
    }
    setLoading(false);
    const final = await setData(data);
    return final;
    console.log("Finish");
  }

  console.log(data);
  useEffect(() => {
    setData(data);
    Jsonnn();
    setImportE(importE);
  }, [data]);
  const imageInputRef = React.useRef();

  const [fileInput_ref, setFileInputRef] = useState({});
  const listerro = data.map((c, index) => <p key={index}>{c.error}</p>);
  console.log(listerro);

  let counter = 0;
  for (let i = 0; i < importE.length; i++) {
    if (importE[i]) counter++;
  }

  console.log(counter);

  function somar() {
    let soma = 0;
    for (let i in importE) {
    }
    console.log(soma);
    console.log(somarArray);
    return SetSomarArray(soma);
  }
  return (
    <Container>
      {/* Titulo  */}
      <div className="title-form">
        <div>
          <h3>Disparo de mensagem</h3>
        </div>
        {/* <button onClick={Jsonnn}>Json</button> */}
        {/* {tokenNew.map((item) => (
          <div>
            <p>{item.token}</p>
          </div>
        ))} */}
        <div>
          <Button
            onClick={handleExport}
            className="btn btn-primary float-right"
            variant="contained"
            style={{
              background: "rgb(8, 203, 148)",
              color: "#fff",
            }}
          >
            <RiFileExcel2Line
              style={{ marginRight: "10px", fontSize: "20px" }}
            />
            {"  "}
            Export Exemplo <i className="fa fa-download"></i>
          </Button>
        </div>
      </div>

      {/* Container */}
      <section className="container-two">
        <div className="subtitulo">
          {/* Upload Planilha */}
          <div
            className="App"
            style={{
              width: "400px",
              background: "#ffffff",
              height: "50px",
              borderRadius: "10px",
              margin: "10px",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="inputGroupFile">
              <input
                style={{ display: "none" }}
                id="inputGroupFile"
                name="upload-photo"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleImport}
                ref={(ref: HTMLInputElement) => {
                  setFileInputRef(ref);
                }}
              />

              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                style={{ background: "#0dbd82", paddingRight: "1rem" }}
              >
                <IoMdAdd
                  style={{
                    fontSize: "20px",
                    alignItems: "center",
                    background: "#0dbd82",
                    marginLeft: "7px",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                />
                {"   "} Upload Excel
              </Fab>
            </label>
            <div>
              <p style={{ margin: "10px 10px 19px 10px" }}>
                Total de contatos
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    margin: "3px 3px 3px 3px",
                    padding: "3px 3px -3px 3px",
                  }}
                >
                  {counter}
                </span>
              </p>
            </div>
          </div>

          {/* Ver resultado */}

          <div style={{ margin: "10px" }}>
            <button
              onClick={handleOpen}
              style={{
                margin: "10px",
                padding: "2px",
                background: "none",
                border: "none",
                color: "#3927ff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <u> Ver Resultado </u>
            </button>
          </div>
        </div>

        <div className="tbody-container">
          <Table
            sx={{
              width: "98%",
              border: "1px #ddd solid",
              borderRadius: "16px",
              justifyContent: "center",
              margin: "auto",
              marginTop: "9px",
            }}
            className="table1"
          >
            <TableHead
              sx={{
                width: "100%",
                background: "#3927ff",
                borderRadius: "16px",
                color: "#fff",
              }}
            >
              <TableRow style={{ color: "#fff", borderRadius: "16px" }}>
                <TableCell style={{ color: "#fff" }}>Numero</TableCell>
                <TableCell style={{ color: "#fff" }}>Messagem</TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ height: 20, maxHeight: 10 }}>
              {importE.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{item.number}</TableCell>
                  <TableCell>{item.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <div style={{ width: "100%" }}>
                    <TableContainer component={Paper}>
                      <Table
                        aria-label="simple table"
                        sx={{ overFlow: "scroll" }}
                        className="tabela-1"
                      >
                        <TableHead
                          sx={{
                            background: "blue",
                            color: "#fff",
                          }}
                        >
                          <TableRow
                            style={{
                              position: "sticky",
                              top: "1px",
                              color: "#fff",
                            }}
                          >
                            <TableCell align="center" style={{ color: "#fff" }}>
                              Numero{" "}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#fff" }}>
                              Menssagem
                            </TableCell>
                            <TableCell align="center" style={{ color: "#fff" }}>
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="tbody-table">
                          {data.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                  height: 10,
                                  maxHeight: 10,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.number}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ height: 10, maxHeight: 10 }}
                              >
                                {row.message}
                              </TableCell>

                              {(row.error === 200 && (
                                <TableCell
                                  style={{
                                    color: "#0dbd82",
                                    fontWeight: "bold",
                                    justifyItems: "center",
                                    height: 10,
                                    maxHeight: 10,
                                  }}
                                >
                                  <GiCheckMark /> Enviado com sucesso!
                                </TableCell>
                              )) ||
                                (row.error === 400 && (
                                  <TableCell
                                    style={{
                                      color: "red",
                                      textAlign: "center",
                                      justifyContent: "center",
                                      justifyItems: "center",
                                      padding: "1px",
                                      alignItems: "center",
                                      margin: "auto",
                                      height: 10,
                                    }}
                                  >
                                    <MdOutlineSpeakerNotesOff
                                      style={{
                                        fontSize: "15px",
                                        alignItems: "center",
                                        margin: "auto",
                                        marginBottom: "-4.6px",
                                        padding: "1px 5px",
                                      }}
                                    />
                                    Numero não tem WhatsApp!
                                  </TableCell>
                                ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
        <form>
          {loading ? (
            <div className="buttons-icon">
              <RotatingSquare
                height="50"
                width="50"
                color="#0a9a41"
                ariaLabel="rotating-square-loading"
                wrapperStyle={{}}
                wrapperClass="buttons-icon"
                visible={true}
              />

              <p
                style={{ display: "flex", color: "#bfbebe" }}
                className="buttons-icon"
              >
                Enviando...
              </p>
            </div>
          ) : (
            <div className="buttons-form">
              <Button
                variant="contained"
                onClick={Submit}
                onChange={() => setData(data)}
                disabled={loading}
                endIcon={<SendIcon />}
                style={{
                  background: "rgb(0, 64, 255)",
                  color: "#fff",
                  top: "5px",
                }}
              >
                Disparar mensagens
              </Button>
            </div>
          )}
        </form>
      </section>
    </Container>
  );
};
