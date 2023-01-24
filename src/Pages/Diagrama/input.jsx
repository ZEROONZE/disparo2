import Input from "@mui/material/Input";
import axios from "axios";
import api from "../../hooks/Api";
import React, { useState } from "react";

const initialValues = {
  title: "",
  mensage1: "",
  mensage2: "",
  mensage3: "",
  mensage4: "",
  mensage5: "",
  mensage6: "",
  mensage7: "",
  mensage8: "",
};

export const InputBoot = () => {
  const [values, setValues] = useState(initialValues);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }
  function onSubmit2(ev) {
    ev.preventDefault();
    axios
      .post("http://localhost:3000/posts", values)

      .then((response) => {
        console.log(response.data);
        alert("ok");
      })
      .catch((error) => {
        console.log(error);
        alert("not");
      });
  }
  return (
    <form onSubmit={onSubmit2}>
      <Input
        onSubmit={onSubmit2}
        className="input-text"
        id="mensage2"
        name="mensage2"
        onChange={(ev) => {
          onChange(ev);
        }}
      />
    </form>
  );
};
