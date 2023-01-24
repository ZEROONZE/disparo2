import React, { useState, useMemo, useEffect } from "react";
import api, { token } from "../../hooks/Api";
import { Container } from "./style";
import { ColorRing } from "react-loader-spinner";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import { read, utils, writeFile } from "xlsx";
import axios from "axios";

const initialValues = {
  title: "",
  mensage: "",
};
interface IData {
  number: number;
  message: string;
}
export const MensageText2 = () => {
  const [alertt, setAlertt] = useState(false);
  const [alerterr, setAlerterr] = useState(false);
  const [alertcriar, setAlertcriar] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [mensage, setMensage] = useState("");

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [NotEnviado, SetNotEnviado] = useState([]);

  const [error, setError] = useState("");
  const [dataa, setData] = useState<IData[]>([]);

  const Jrows: any[] = [];
  // const data

  const Numeros = [
    { number: "62994719784", message: mensage },
    { number: "62981099920", message: mensage },
  ];

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
  console.log(timeSort[numero]);

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
    console.log(timeSort);

    for (var i = 0; i < Jrows.length; i++) {
      console.log("Looping... " + i);
      var count = 4;
      for (var j = 0; j < Math.floor(Math.random() * 20); j++) {
        count++;
      }
      await timer(count++);
      console.log(count++);

      const responsedata = api
        .post("/send_message", Jrows[i], {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })

        .then((response) => {
          console.log(response);
          setAlertContent(response.data.result);
          SetNotEnviado(response.data);
          console.log(response.data);
          setAlertt(true);
          return JSON.parse(response.data);
        })

        .catch((err) => {
          SetNotEnviado(err.response.data);
          setAlerterr(true);
          const cat = JSON.parse(err.response.config.data);
          setData(cat);
          console.log(cat);
        });
    }

    setLoading(false);
    console.log("Finish");
  }
  console.log(dataa);

  return (
    <Container>
      {alertcriar ? (
        <Alert
          style={{
            width: "19rem",
            height: "37px",
            position: "absolute",
            right: "7px",
            transition: "all 0.5s",
            boxShadow: "2px 2px 9px rgba(0, 0, 0, 0.1)",
            zIndex: "9",
          }}
          className="alert"
          severity="info"
          onClose={(event) => setAlertcriar(false)}
        >
          Menssagem criada!
          {alertContent}
        </Alert>
      ) : (
        <></>
      )}
      <div className="container-form">
        <div className="title-form">
          <h3>Enviar mensagem</h3>
          <p className="title-border"></p>
        </div>
        <form>
          <label htmlFor="mensage"> Mensagem: </label>
          <textarea
            value={mensage}
            id="mensage"
            onChange={(ev) => {
              onChange(ev);
            }}
            name="mensage"
            className="mensage-input"
            placeholder="Digite sua menssagem de texto..."
          />
          {loading ? (
            <ColorRing
              height={77}
              width={75}
              ariaLabel="loading"
              wrapperStyle={{ margin: "auto" }}
            />
          ) : (
            <div className="buttons-form">
              {/* <Button
                variant="contained"
                type="submit"
                style={{ margin: "1rem" }}
                endIcon={<Add />}
                className="button-add"
              >
                CRIAR
              </Button> */}

              <Button
                variant="contained"
                onClick={Submit}
                disabled={loading}
                endIcon={<SendIcon />}
                style={{
                  background: "rgb(8, 203, 148)",
                  color: "#fff",
                  top: "16px",
                }}
              >
                Enviar
              </Button>
            </div>
            // {/* /* <Alert
            //   severity="success"
            //   icon={<Check fontSize="inherit" />}
            //   onClose={() => setOpen(false)}

            //   // style={{
            //   //   display: open ? "none" : "block",
            //   //   position: "absolute",
            //   // }}

            //   <AlertTitle>Sucesso!</AlertTitle>
            //   Menssagem enviada.
            // </Alert> */}
          )}
        </form>
      </div>

      {/* <div className="container-whats">
        <div className="img-foto2">
          <img className="img-foto3" alt="" width={230} src="p5.png" />
        </div>
        <div className="nome-whats1">
          <p className="nome-whats">
            {mensage}
            {emoji}
          </p>
        </div>
        <br />
        <br />
        <br />
      </div> */}
      {/* <Boot /> */}
      <>
        <div className="row mb-2 mt-5">
          <div className="col-sm-6 offset-3">
            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="file"
                      className="custom-file-input"
                      id="inputGroupFile"
                      required
                      onChange={handleImport}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile"
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <button
                  onClick={handleExport}
                  className="btn btn-primary float-right"
                >
                  Export <i className="fa fa-download"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {dataa.map((product, index) => (
          <div key={index} className="display" id={"product_" + index}>
            <div className="middle">{product.number}</div>
            <div className="middle">{product.message}</div>
          </div>
        ))}
        <div className="row">
          <div className="col-sm-6 offset-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Numero</th>
                  <th scope="col">Menssagem</th>
                  <th scope="col">status</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>
                {Jrows.length ? (
                  Jrows.map((movie, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{movie.number}</td>
                      <td>{movie.message}</td>
                      <td id="errorr">{error}</td>

                      <td>
                        {alertt ? (
                          <Alert
                            style={{
                              transition: "all 0.5s",
                              boxShadow: "2px 2px 9px rgba(0, 0, 0, 0.1)",
                              zIndex: "9",
                            }}
                            className="alert"
                            severity="success"
                            onClose={(event) => setAlertt(false)}
                          >
                            {alertContent}
                          </Alert>
                        ) : (
                          <></>
                        )}
                        {alerterr ? (
                          <Alert
                            style={{
                              transition: "all 0.5s",
                              boxShadow: "2px 2px 9px rgba(0, 0, 0, 0.1)",
                              zIndex: "9",
                            }}
                            className="alert"
                            severity="error"
                            onClose={(event) => setAlerterr(false)}
                          >
                            {alertContent}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center">No Movies Found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </Container>
  );
};
