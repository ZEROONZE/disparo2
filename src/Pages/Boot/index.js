// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Input from "@mui/material/Input";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// // const initialValues = {
// //   rootNode: {
// //     type: "text",
// //     name: "welcome",
// //     text: "",
// //     next: "abc1",
// //   },

// //   // },
// //   // abc1: {
// //   //   type: "options",
// //   //   name: "ja_cliente",
// //   //   text: "Você já é nosso cliente?",
// //   //   options: [
// //   //     {
// //   //       name: "cliente",
// //   //       view: true,
// //   //       text: "Sim",
// //   //       descricao: "Já Sou Cliente",
// //   //       next: "abc1-5",
// //   //     },
// //   //     {
// //   //       name: "cliente",
// //   //       view: true,
// //   //       text: "Não",
// //   //       descricao: "Ainda não Sou Cliente",
// //   //       next: "abc5",
// //   //     },
// //   //   ],
// //   // },
// // };

// export const Boot = () => {
//   const [values, setValues] = useState("");
//   // const { register, handleSubmit } = useForm(initialValues);
//   // const [inputList, setInputList] = useState([
//   //   // id: "rootNode",
//   //   // name: "text",
//   //   // typeInput: "input",
//   //   // type: "text",
//   //   // placeholder: "Nome",
//   //   // text: "",
//   //   // next: "abc1",

//   //   {
//   //     rootNode: {
//   //       id: "rootNodee",
//   //       name: "text",
//   //       typeInput: "input",
//   //       type: "text",
//   //       placeholder: "Nome",
//   //       text: "",
//   //       next: "abc1",
//   //     },
//   //   },
//   //   {
//   //     abc1: {
//   //       id: "abc1",
//   //       type: "options",
//   //       name: "ja_cliente",
//   //       text: "Você já é nosso cliente?",
//   //       options: [
//   //         {
//   //           id: "1",
//   //           name: "cliente",
//   //           view: true,
//   //           text: "Sim",
//   //           descricao: "Já Sou Cliente",
//   //           next: "abc1-5",
//   //         },
//   //         {
//   //           id: "2",
//   //           name: "cliente",
//   //           view: true,
//   //           text: "Não",
//   //           descricao: "Ainda não Sou Cliente",
//   //           next: "abc5",
//   //         },
//   //       ],
//   //     },
//   //   },
//   //   {
//   //     abc15: {
//   //       id: "abc1",
//   //       type: "options",
//   //       name: "novoProduto",
//   //       text: "Voce gostaria de adquirir um novo plano de internet Residencial/Empresarial?",
//   //       options: [
//   //         {
//   //           id: "1",
//   //           name: "novoProduto",
//   //           view: true,
//   //           text: "Sim",
//   //           descricao: "Sim",
//   //           next: "abc5",
//   //         },
//   //         {
//   //           id: "2",
//   //           name: "novoProduto",
//   //           view: true,
//   //           text: "Não",
//   //           descricao: "Não",
//   //           next: "abc2",
//   //         },
//   //       ],
//   //     },
//   //   },
//   // ]);

//   // function onChange(ev) {
//   //   const { name, value } = ev.target;
//   //   setText({ ...values.rootNode.text });
//   //   setValues({ ...values, [name]: value });
//   // }
//   // const {rootNode: text} = initialValues

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];

//     list[index][name] = value;
//     setInputList(list);
//   };

//   // const handleChange = (event) => {
//   //   setValues({
//   //     ...values,
//   //     [initialValues.rootNode.text]: {
//   //       ...(values.rootNode.text[initialValues.rootNode.text] ?? {}),
//   //       text: event.target.value,
//   //     },
//   //   });
//   // };

//   function onSubmit(e) {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3000/posts", inputList)

//       .then((response) => {
//         console.log(response.data);
//         alert("Enviado");
//       })
//       .cath((err) => {
//         console.log(err);
//         alert("not");
//       });
//   }

//   return (
//     <div id="formulario">
//       <form onSubmit={(e) => onSubmit(e)}>
//         {inputList.map((item, index) => (
//           <div>
//             <label> Nome: </label>

//             <Input
//               key={index}
//               name={item.rootNode.name}
//               type="text"
//               // placeholder={item.rootNode.placeholder}
//               id={item.rootNode.name}
//               onChange={(e) => handleInputChange(e, index)}
//             />
//           </div>
//         ))}
//         <div>
//           <label htmlFor=""> Menssagem: </label>
//           <Input type="text" id="text" name="text" />
//         </div>

//         <div style={{ marginTop: "1rem" }}>
//           <Button type="submit" variant="contained" style={{ margin: "1rem" }}>
//             Criar menssagem
//           </Button>
//           <Button variant="outlined" style={{ margin: "1rem" }}>
//             deletar
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };
