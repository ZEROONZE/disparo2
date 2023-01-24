import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "react-flow-renderer";
import { Container } from "./styles";
import { ColorRing } from "react-loader-spinner";
import { FcCheckmark, FcPlus } from "react-icons/fc";

// Source e target Diagrama
const initialEdges = [
  {
    id: "inicio",
    source: "inicio",
    type: "smoothstep",
    target: "mensagem-1",
    animated: true,
  },
  {
    id: "horizontal-e1-3",
    source: "inicio",
    type: "smoothstep",
    target: "mensagem-0",
    animated: true,
  },
  {
    id: "horizontal-e1-4",
    source: "mensagem-1",
    type: "smoothstep",
    target: "mensagem-3",
    animated: true,
  },
  {
    id: "horizontal-e1-44",
    source: "mensagem-1",
    type: "smoothstep",
    target: "mensagem-4",
    animated: true,
  },
  {
    id: "horizontal-e1-46",
    source: "mensagem-3",
    type: "smoothstep",
    target: "mensagem-5",
    animated: true,
  },
  {
    id: "horizontal-e1-45",
    source: "mensagem-6",
    type: "smoothstep",
    target: "mensagem-5",
    animated: true,
  },
  {
    id: "horizontal-e1-0",
    source: "mensagem-7",
    type: "smoothstep",
    target: "mensagem-5",
    animated: true,
  },
  {
    id: "mensagem-2",
    source: "mensagem-2",
    type: "smoothstep",
    target: "mensagem-4",
    animated: true,
  },
  {
    id: "mensagem-2.1",
    source: "mensagem-2",
    type: "smoothstep",
    target: "mensagem-2.3",
    animated: true,
  },
  {
    id: "mensagem-2.3",
    source: "mensagem-2",
    type: "smoothstep",
    target: "mensagem-2.4",
    animated: true,
  },
];

export const Diagrama = () => {
  const [alertt, setAlertt] = useState(false);
  const [alerterr, setAlerterr] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const Url = "http://localhost:3000/nodes/";

  // Ref ipunt para usar o valor de input
  const FormRefabc1 = useRef();
  const FormRefNode = useRef();
  const FormRefAbc1 = useRef();

  // Atualizar resultados
  const [atualizaGrid, setAtualizarGrid] = useState(false);
  async function CarregaDados() {
    await axios.get(Url).then((response) => setData(response.data));
  }
  useEffect(() => {
    setLoading(true);
    CarregaDados();
    setLoading(false);
  }, [atualizaGrid]);

  // Abc1 já é cliente
  async function PatchRequestabc1(e) {
    e.preventDefault();
    const { InputDescabc1 } = FormRefabc1.current;
    await fetch("http://localhost:3000/nodes/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        abc1: {
          id: "abc1",
          type: "options",
          name: "ja_cliente",
          text: InputDescabc1.value,
          next: "abc1",
        },
      }),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
  }

  // rootNode
  async function PatchRequestNode(e) {
    e.preventDefault();
    // sending PUT request with fetch API in javascript
    const { InputDescNode } = FormRefNode.current;
    await fetch("http://localhost:3000/nodes/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        rootNode: {
          id: "rootNode",
          type: "text",
          name: "welcome",
          text: InputDescNode.value,
          next: "abc1",
        },
      }),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
  }

  // Blibioteca React diagrama
  const initialNodes = [
    //Saudação
    {
      id: "inicio",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <div>
            <form
              onSubmit={PatchRequestNode()}
              className="form"
              ref={FormRefNode}
            >
              <TextareaAutosize
                type="text"
                className="input-text"
                id="InputDescNode"
                placeholder="Saudação..."
              />
              {loading ? (
                <ColorRing
                  height={27}
                  width={25}
                  ariaLabel="loading"
                  wrapperStyle={{
                    marginLeft: "8.9rem",
                    marginBottom: "-1rem",
                    curso: "point",
                    width: "2rem",
                    zIndex: "99999",
                  }}
                />
              ) : (
                <button
                  type="submit"
                  className="buttonIcon"
                  style={{
                    background: "transparent",
                    border: "none",
                    marginLeft: "7.9rem",
                    marginBottom: "-7rem",
                    curso: "point",
                    width: "0.5rem",
                  }}
                  onClick={(e) => PatchRequestNode(e)}
                >
                  <FcPlus
                    style={{
                      width: "2rem",
                    }}
                  />
                </button>
              )}
            </form>
          </div>
        ),
      },
      position: { x: 10, y: 30 },
    },

    // Já é Cliente
    {
      id: "mensagem-1",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <div>
            <form
              onSubmit={(e) => PatchRequestabc1(e)}
              className="form"
              ref={FormRefabc1}
            >
              <TextareaAutosize
                type="text"
                className="input-text"
                id="InputDescabc1"
                placeholder="Já e cliente..."
                // value={item.Json.abc1.text}
              />
              {loading ? (
                <ColorRing
                  height={27}
                  width={25}
                  ariaLabel="loading"
                  wrapperStyle={{
                    marginLeft: "8.9rem",
                    marginBottom: "-1rem",
                    curso: "point",
                    width: "2rem",
                    zIndex: "99999",
                  }}
                />
              ) : (
                <button
                  type="submit"
                  className="buttonIcon"
                  style={{
                    background: "transparent",
                    border: "none",
                    marginLeft: "7.9rem",
                    marginBottom: "-7rem",
                    curso: "point",
                    width: "0.5rem",
                  }}
                  onClick={(e) => PatchRequestabc1(e)}
                >
                  <FcPlus
                    style={{
                      width: "2rem",
                    }}
                  />
                </button>
              )}
            </form>
          </div>
        ),
      },
      position: { x: 250, y: -70 },
    },
    // Não é cliente
    // {
    //   id: "mensagem-2",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: (
    //       <div>
    //         {inputList.map((item, index) => {
    //           return (
    //             <form
    //               // onSubmit={EditarAbc5}
    //               className="form"
    //               // ref={FormRefAbc5}
    //               // key={item.Json.abc15.id}
    //             >
    //               <TextareaAutosize
    //                 // key={item.Json.abc15.id}
    //                 type="text"
    //                 className="input-text"
    //                 id="InputDescAbc5"
    //                 placeholder="Não é cliente..."
    //               />

    //               {loading ? (
    //                 <ColorRing
    //                   height={27}
    //                   width={25}
    //                   ariaLabel="loading"
    //                   wrapperStyle={{
    //                     marginLeft: "8.9rem",
    //                     marginBottom: "-1rem",
    //                     curso: "point",
    //                     width: "2rem",
    //                     zIndex: "99999",
    //                   }}
    //                 />
    //               ) : (
    //                 <button
    //                   type="submit"
    //                   className="buttonIcon"
    //                   style={{
    //                     background: "transparent",
    //                     border: "none",
    //                     marginLeft: "7.9rem",
    //                     marginBottom: "-7rem",
    //                     curso: "point",
    //                     width: "0.5rem",
    //                   }}
    //                   onClick={() => Editar(item.Json.rootNode.id)}
    //                 >
    //                   <FcPlus
    //                     style={{
    //                       width: "2rem",
    //                     }}
    //                   />
    //                 </button>
    //               )}
    //             </form>
    //           );
    //         })}
    //       </div>
    //     ),
    //   },
    //   position: { x: 750, y: 150 },
    // },

    // // NÃO
    // {
    //   id: "mensagem-3",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: <h1 className="nao">NÃO</h1>,
    // <div>
    //   {inputList.map((item, index) => {
    //     return (
    //       <select onSubmit={EditarAbc5} className="form">
    //         <TextareaAutosize
    //           key={item.Json.abc15.id}
    //           type="text"
    //           className="input-text"
    //           id="InputDesc5"
    //         />
    //         <option value="volvo">SIM</option>
    //       </select>
    //     );
    //   })}
    // </div>
    // ),
    //   },
    //   position: { x: 500, y: -119 },
    // },

    // Qual plano
    // {
    //   id: "mensagem-5",
    //   sourcePosition: "right",
    //   targetPosition: "left",

    //   data: {
    //     label: (
    //       <div>
    //         {inputList.map((item, index) => {
    //           return (
    //             <form
    //               onSubmit={EditarAbc5}
    //               className="form"
    //               ref={FormRefAbc5}
    //               key={item.Json.abc15.id}
    //             >
    //               <TextareaAutosize
    //                 key={item.Json.abc15.id}
    //                 type="text"
    //                 className="input-text"
    //                 id="InputDescAbc5"
    //                 placeholder="Qual plano..."
    //               />

    //               {loading ? (
    //                 <ColorRing
    //                   height={27}
    //                   width={25}
    //                   ariaLabel="loading"
    //                   wrapperStyle={{
    //                     marginLeft: "8.9rem",
    //                     marginBottom: "-1rem",
    //                     curso: "point",
    //                     width: "2rem",
    //                     zIndex: "99999",
    //                   }}
    //                 />
    //               ) : (
    //                 <button
    //                   type="submit"
    //                   className="buttonIcon"
    //                   style={{
    //                     background: "transparent",
    //                     border: "none",
    //                     marginLeft: "7.9rem",
    //                     marginBottom: "-7rem",
    //                     curso: "point",
    //                     width: "0.5rem",
    //                   }}
    //                   onClick={() => Editar(item.Json.rootNode.id)}
    //                 >
    //                   <FcPlus
    //                     style={{
    //                       width: "2rem",
    //                     }}
    //                   />
    //                 </button>
    //               )}
    //             </form>
    //           );
    //         })}
    //       </div>
    //     ),
    //   },
    //   position: { x: 700, y: -129 },
    // },

    // // SIM
    // {
    //   id: "mensagem-4",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: <h1 className="nao">SIM</h1>,
    //   },

    //   position: { x: 500, y: -59 },
    // },

    // {
    //   id: "mensagem-2.1",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: (
    //       <Input
    //         className="input-text"
    //         id="mensage6"
    //         name="mensage6"
    //         onChange={(ev) => {
    //           onChange(ev);
    //         }}
    //       />
    //     ),
    //   },
    //   position: { x: 500, y: 100 },
    // },
    // {
    //   id: "mensagem-2.3",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: (
    //       <Input
    //         className="input-text"
    //         id="mensage7"
    //         name="mensage7"
    //         type="text"
    //         onChange={(ev) => {
    //           onChange(ev);
    //         }}
    //       />
    //     ),
    //   },
    //   position: { x: 500, y: 150 },
    // },
    // {
    //   id: "mensagem-2.4",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   style: {
    //     strokeWidth: 2,
    //     stroke: "#FF0072",
    //   },
    //   data: {
    //     label: (
    //       <Input
    //         className="input-text"
    //         id="mensage8"
    //         name="mensage8"
    //         type="text"
    //         onChange={(ev) => {
    //           onChange(ev);
    //         }}
    //       />
    //     ),
    //   },
    //   position: { x: 500, y: 200 },
    // },

    // EMPRESARIAL
    // {
    //   id: "mensagem-6",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: <h1 className="nao">EMPRESARIAL</h1>,
    // <div>
    //   {inputList.map((item, index) => {
    //     return (
    //       <select onSubmit={EditarAbc5} className="form">
    //         <TextareaAutosize
    //           key={item.Json.abc15.id}
    //           type="text"
    //           className="input-text"
    //           id="InputDesc5"
    //         />
    //         <option value="volvo">SIM</option>
    //       </select>
    //     );
    //   })}
    // </div>
    // ),
    //   },
    //   position: { x: 900, y: -120 },
    // },

    // RESIDÊNCIAL
    // {
    //   id: "mensagem-7",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: {
    //     label: <h1 className="nao">RESIDÊNCIAL</h1>,
    // <div>
    //   {inputList.map((item, index) => {
    //     return (
    //       <select onSubmit={EditarAbc5} className="form">
    //         <TextareaAutosize
    //           key={item.Json.abc15.id}
    //           type="text"
    //           className="input-text"
    //           id="InputDesc5"
    //         />
    //         <option value="volvo">SIM</option>
    //       </select>
    //     );
    //   })}
    // </div>
    // ),
    //     },
    //     position: { x: 900, y: -61 },
    //  },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  // Return JSX
  return (
    <Container>
      {alertt ? (
        <Alert
          className="alert"
          severity="info"
          onClose={(event) => setAlertt(false)}
        >
          Fluxo alterado!
          {alertContent}
        </Alert>
      ) : (
        <></>
      )}
      {alerterr ? (
        <Alert
          className="alert"
          severity="error"
          onClose={(event) => setAlerterr(false)}
        >
          Não alterado!
          {alertContent}
        </Alert>
      ) : (
        <></>
      )}
      <ReactFlow
        className="ReactFlow"
        edges={edges}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
    </Container>
  );
};
