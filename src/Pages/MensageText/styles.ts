import styled, { keyframes } from "styled-components";

const animate = keyframes`

  0% {
    transform: translateX(100px);
    opacity: 0;
}
50%{
    opacity: .3;
}
100%{
    transform: translateX(0px);
    opacity: 1;
}


`;

export const Container = styled.div`
  .container-two {
    background: #fff;
    border-radius: 1rem;
  }

  .tbody-container {
    max-height: 45vh;
    overflow: auto;
    height: 45vh;
  }
  .title-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table1 {
    overflow-y: scroll;
    max-height: 40vh;
    height: 40vh;
    background: #fff;
  }
  .subtitulo {
    display: flex;
    justify-content: space-between;
  }

  grid-template-columns: repeat(2, 1fr);
  .title-border {
    border: 4px #197781 solid;
    width: 40px;
    border-radius: 0.2rem;
    margin-top: -11px;
    margin-left: 5px;
  }
  .nome-whats1 p {
    font-weight: 500;

    font-size: 13px;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    width: 170px;
  }
  .nome-whats {
    position: absolute;
    top: 5.8rem;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    width: 170px;
    color: #6e6b7b;
    left: 38px;
    padding: 4px 8px;
    background: #d3ffc4;
    border-radius: 7px 0px 7px 7px;
    box-shadow: 1px 1px 1px 1px #d3d3d3;
  }
  .container-whats {
    flex-direction: row;

    display: flex;
    position: relative;
    margin-left: 0em;
  }

  .container-whats {
    transition: all 0.5s;
    padding: 10px;
    .img-foto3 {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 0 0 9px rgba(0, 0, 0, 0.1);
      border-radius: 1.7rem;
    }

    margin-top: 2rem;
  }
  .alert {
    transition: all 0.5s;
    animation: ${animate} 0.5s;

    font-family: "Montserrat", Helvetica, Arial, serif;
  }
  .Container-form {
    transition: all 0.3s;
  }
  .buttom {
    list-style: none;
    width: 8rem;
    height: 2.55rem;
    margin: auto;
    font-size: 16px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    outline: none;
    border-radius: 0.4rem;
    padding: 0.7rem 2.5rem;
    transition: all 0.2s ease 0s;
    cursor: pointer;
    background: rgb(23, 151, 136);
    border: 1px solid #d7d7d7;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 2rem;
  }

  margin-top: 10px;
  h3 {
    padding: 0.5rem 0.2rem;
    font-weight: 500;
    line-height: 1.45;
    color: #6e6b7b;
    font-size: 1.7rem;
  }
  .number-input {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
  }
  .buttons-form {
    margin: auto;
    justify-content: center;
    text-align: center;
  }
  .button-add {
    margin-left: -20px;
    padding-right: 5px;
  }

  .buttons-icon {
    justify-content: center;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 0.4rem;
    width: 92%;
    margin-top: 3rem;
  }

  label {
    color: #197781;
    font-weight: 500;
  }
  input {
    width: 21rem;
    display: flex;
    padding: 0.6rem 0.5rem;
    border-radius: 0.3rem;

    color: #6e6b7b;

    border: 1.5px solid #d8d5de;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    ::-webkit-input-placeholder {
      color: #ddd;
      justify-content: center;
      align-items: center;
      margin: auto;
      font-family: 0.1rem;
    }
    input:focus::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 20px;
    }
  }
  input[placeholder] {
    font-size: 0.9rem;
  }

  .mensage-input {
    font-family: "Montserrat", Helvetica, Arial, serif;
    margin-top: 0.3rem;
    background-clip: padding-box;
    line-height: 1.45;
    min-height: 2.714rem;
    line-height: 1.6rem;
    color: #6e6b7b;
    padding: 0.8rem 1rem;
    border: 1.5px solid #d8d5de;
    width: 20rem;
    border-radius: 0.3rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    ::-webkit-input-placeholder {
      color: #ddd;
      justify-content: center;
      align-items: center;
      margin: auto;
      font-family: 0.1rem;
    }
  }
`;
