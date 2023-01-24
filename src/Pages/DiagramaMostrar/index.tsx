//import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import api, { token } from "../../hooks/Api";
import Button from "@mui/material/Button";
import { RiFileExcel2Line } from "react-icons/ri";
import { BodyContainer, Container } from "./styles";

import { read, utils, writeFile } from "xlsx";

interface IChats {
  jid: string;
  name: string;
  id: string;
}

export const Mostrar = () => {
  //const [id, setId] = React.useState([]);
  const [id, setId] = useState<IChats[]>([]);
  const [movies, setMovies] = useState([]);
  const [grups, setGrups] = useState([]);

  useEffect(() => {}, []);

  const getUser = async (e: any) => {
    e.preventDefault();
    const api_response = await axios;
    api
      .get("/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((result) => {
        console.log(result.data);

        setId(result.data);
      });
  };

  function IdNew() {
    id.map((item) => {
      if (item.jid.length > 20) {
        const id2 = JSON.parse(item.jid);
        setGrups(id2);
        console.log(id2);
      } else {
        console.log("erro");
      }
    });
  }
  console.log(grups);
  // Exportar arquivo

  const handleExport = () => {
    const headings = [["jid", "name"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([["jid"]]);
    utils.sheet_add_aoa(ws, [["jid"]], { origin: "A1" });
    utils.sheet_add_json(
      ws,
      id,

      {}
    );
    utils.book_append_sheet(wb, ws);
    writeFile(wb, "Grupos WhatsApp.xlsx", { type: "array" }).join("");

    console.log(ws);
    console.log(headings);
    console.log(wb);
  };

  return (
    <Container>
      {/* Titulo  */}
      <div className="title-form">
        <div>
          <h3>Exportar numeros</h3>
        </div>

        <div>
          <button onSubmit={IdNew}>teste</button>
          <Button
            className="btn btn-primary float-right"
            variant="contained"
            style={{
              background: "rgb(8, 203, 148)",
              color: "#fff",
            }}
            onClick={handleExport}
          >
            <RiFileExcel2Line
              style={{ marginRight: "10px", fontSize: "20px" }}
            />
            {"  "}
            Export GRUPOS <i className="fa fa-download"></i>
          </Button>
        </div>
      </div>
      <BodyContainer>
        <form onSubmit={getUser}>
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
                <TableCell style={{ color: "#fff" }}>Nome do grupo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: 20, maxHeight: 10 }}>
              {id.map((item) => {
                if (item.jid.length > 20)
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>{item.jid}</TableCell>
                      <TableCell>{item.name}</TableCell>
                    </TableRow>
                  );
              })}
            </TableBody>
          </Table>
          <div
            style={{
              justifyContent: "center",
              margin: "auto",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                background: "rgb(9, 53, 197)",
                color: "#fff",
                justifyContent: "center",
                margin: "13px",
              }}
            >
              Trazer{" "}
            </Button>
          </div>
        </form>
      </BodyContainer>
    </Container>
  );
};
