import React, { useState } from "react";
import api from "../../hooks/Api";
import { Container } from "./styles";
import { ColorRing } from "react-loader-spinner";
import { Alert } from "@mui/material";

export const MenssageFoto = () => {
  const [alertt, setAlertt] = useState(false);
  const [alerterr, setAlerterr] = useState(false);
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [url, setURl] = useState("");
  async function Submit() {
    setLoading(true);
    await api
      .post(
        "/send_message_file_from_url",
        { number: number, url: url, caption: text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "0uyw8haw86mzelmsug01yusrqb7raj",
          },
        }
      )

      .then((response) => {
        console.log(response.data);
        setAlertContent(response.data.result);
        setAlertt(true);
      })
      .catch((err) => {
        console.log(err);

        setAlerterr(true);
      });

    setLoading(false);
  }

  return (
    <Container>
      {alertt ? (
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
          severity="success"
          onClose={(event) => setAlertt(false)}
        >
          Menssagem enviada!
          {alertContent}
        </Alert>
      ) : (
        <></>
      )}
      {alerterr ? (
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
          severity="error"
          onClose={(event) => setAlerterr(false)}
        >
          Menssagem não enviada!
          {alertContent}
        </Alert>
      ) : (
        <></>
      )}

      <div className="container-form">
        <div className="title-form">
          <h3>Enviar imagem</h3>
          <p className="title-border"></p>
        </div>
        <form>
          <label>Numero: </label>
          <input
            type="text"
            placeholder="Digite o numero receptor da mensagem..."
            className="number-input"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            value={number}
          />
          <label> Url da imagem: </label>
          <input
            type="text"
            placeholder="Informe a Url da imagem..."
            className="number-input"
            name="image"
            value={url}
            onChange={(e) => {
              setURl(e.target.value);
            }}
          />
          <label> Mensagem: </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
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
            <button onClick={Submit} disabled={loading} className="buttom">
              Enviar
            </button>

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

      <div className="container-whats">
        <div className="img-foto2">
          <img className="img-foto3" alt="" width={230} src="p5.png" />
        </div>

        <div className="nome-whats1">
          <p className="nome-whats">
            <img src={url} alt="" width="171px" />
            {text}
          </p>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Container>
  );
};
