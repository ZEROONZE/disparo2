import styled from "styled-components";

export const Container = styled.div`
  height: 3.9rem;

  background: #fff;
  position: relative;

  border-bottom: 1px solid #babfc7;

  z-index: 7;

  .img-user {
    position: absolute;

    right: 22px;
    top: 10px;
    cursor: pointer;
    img {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
      -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
      border-radius: 1.2rem;
    }
  }
  .user-content {
    display: flex;
    flex-direction: row;
  }
  .user-name {
    position: absolute;
    align-items: flex-end;
    justify-content: space-between;
    right: 70px;
    text-align: right;
    font-size: 0.5rem;
    color: #d7d7d7;
    padding: 2px;
    top: 17px;
    cursor: pointer;
    font-family: "Montserrat", Helvetica, Arial, serif;
  }
`;
