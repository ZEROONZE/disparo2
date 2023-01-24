import React from "react";
import { Container } from "./styles";

export const Header = () => {
  return (
    <Container>
      <div className="user-content">
        <div className="user-name">
          <h1>user name</h1>
        </div>
        <div className="img-user">
          <img alt="" width={40} src="user.png" />
        </div>
      </div>
    </Container>
  );
};
