import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const moveToRight = keyframes`
0% {
 
  opacity: 0;
}
50%{
  opacity: 0;

}
100%{
  transition: opacity 3s linear 3s;
  opacity: 1;
}
  `;

export const Conainter = styled.div`
  text-decoration: none;
  margin-top: -5.4rem;
  display: flex;
  background: rgb(238, 238, 242);
  z-index: 9;

  main {
    width: 100%;
    padding: 68px 10px;
    height: calc(90vh -9rem);
  }

  .slider {
    background: #fff;
    color: #ccc;
    height: 100vh;

    width: 15rem;
    transition: all 0.5s;
    z-index: 9;
  }

  .top_section {
    display: flex;
    margin-bottom: 1.9rem;
    align-items: center;
    justify-content: center;
    align-items: center;
    padding: 1.4rem 1rem;
    border-bottom: 1px #babfc7 solid;
    h1 {
      font-size: 1rem;
      align-items: center;
      margin: auto;

      height: 1rem;
      margin-top: 1.4rem;
    }
    img {
      font-size: 1rem;
      align-items: center;
      margin: auto;

      height: 1rem;
      margin-top: 1.4rem;
    }
  }

  .bars {
    cursor: pointer;
    display: flex;
    font-size: 1.5rem;
    margin-left: 9.3rem;
    padding-top: 1.6rem;
  }
  .link {
    display: flex;
    color: #babfc7;
    line-height: 1.15rem;
    font-weight: 500;
    padding: 0.4rem 0.4rem;
    gap: 0.6rem;
    text-decoration: none;
  }

  .active {
    color: #babfc7;
    font-weight: bold;
  }
  .icon,
  .link_text {
    font-size: 0.4rem;
    text-overflow: ellipsis;
    margin-left: 0.6rem;
  }
  .link:hover {
    color: green;
    transform: translate(2%);
    transition: all 0.4s;

    .submenu {
      width: 220px;
    }
  }

  .icon-submenu:hover {
    transform: translate(2%);
    transition: all 0.4s;
  }
  .title-submenu:hover {
    transform: translate(3%);
    transition: all 0.4s;
  }
  .title-submenu {
    margin-left: -4px;
  }
  .icon {
    &:hover {
      color: #d7d7d7;
      cursor: pointer;
      color: #000;
      border-radius: 0.2rem;
    }
  }
`;
export const Submenu = styled.div`
  margin-top: 0.6rem;
  background: rgb(245, 245, 250);
  padding-left: 1rem;
  width: 225px;
  margin-left: -3rem;
  left: 0;
  align-items: center;
  text-align: center;
  justify-content: center;
  .icon-submenu {
    margin-top: 2px;
  }
  &:hover {
    width: 220px;
  }
`;

export const Icon = styled.div`
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.5;
  justify-content: first baseline;
  align-items: flex-start;
  margin-top: 1px;
  margin-left: 0.5rem;
  &:hover {
    color: #d7d7d7;
    cursor: pointer;
    color: green;
    border-radius: 0.2rem;
  }
`;
export const Name = styled.div`
  font-size: 1rem;
  animation: ${moveToRight} 0.6s;
  line-height: 1.45;
  font-family: "Montserrat", Helvetica, Arial, serif;
  font-weight: 500;
  margin-left: 0.2rem;
  color: #625f6e;

  &:hover {
    cursor: pointer;
    color: #000;

    border-radius: 0.2rem;
  }
`;
export const DropdownLink = styled(Link)`
  font-size: 1rem;

  animation: ${moveToRight} 0.6s;
  font-size: 0.9rem;
  font-family: "Montserrat", Helvetica, Arial, serif;
  font-weight: 500;
  margin-left: 1.5rem;
  text-decoration: none;

  display: flex;

  color: #343435;
  line-height: 1.45;
  font-weight: 500;
  padding: 0.6rem 0.9rem;
  gap: 1rem;

  &:hover {
    cursor: pointer;
    color: #000;
    border-radius: 0.2rem;
  }
`;
