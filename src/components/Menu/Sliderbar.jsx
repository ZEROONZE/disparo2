import { BiComment } from "react-icons/bi";
import {
  FiChevronDown,
  FiMessageSquare,
  FiImage,
  FiFolder,
  FiChevronUp,
} from "react-icons/fi";

import { TbUsers, TbDoorExit } from "react-icons/tb";
import { IoBarChartOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Conainter, Submenu, Icon, Name, DropdownLink } from "./styles";

export const Sliderbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const menuItem = [
    {
      path: "/diagrama",
      name: "Dasboard",
      icon: <IoBarChartOutline />,
    },
    {
      path: "#",
      name: "Enviar mensagem",
      icon: <IoPaperPlaneOutline />,
      iconClosed: (
        <FiChevronDown
          style={{ marginBottom: "-0.2rem", marginLeft: "1rem" }}
        />
      ),
      iconOpened: (
        <FiChevronUp
          style={{
            color: "#30343c",
            marginBottom: "-0.2rem",
            marginLeft: "1rem",
            fontSize: "1rem",
          }}
        />
      ),

      subNav: [
        {
          name: "Enviar texto",
          path: "/texto",
          icon: (
            <FiMessageSquare
              style={{
                color: "#01c0b0",
              }}
            />
          ),
        },
        {
          name: "Enviar imagem",
          path: "/foto",
          icon: (
            <FiImage
              style={{
                color: "#01c0b0",
              }}
            />
          ),
        },
        {
          name: "Enviar arquivo",
          path: "/arquivo",
          icon: (
            <FiFolder
              style={{
                color: "#01c0b0",
              }}
            />
          ),
        },
      ],
    },
    {
      path: "/multiplos",
      name: "Múltiplos disparos",
      icon: <BiComment />,
    },
    {
      path: "/home",
      name: "Lista de contatos",
      icon: <TbUsers />,
    },
    {
      path: "/mostrar",
      name: "sair",
      icon: <TbDoorExit />,
    },
  ];

  return (
    <Conainter style={{ zIndex: "5" }}>
      <div style={{ width: isOpen ? "15rem" : "3rem" }} className="slider">
        <div className="top_section">
          <img
            src="fastapi.svg"
            style={{
              display: isOpen ? "block" : "none",
              paddingLeft: "1rem",
            }}
            width={20}
            alt=""
          />
          <h1
            style={{
              display: isOpen ? "block" : "none",
              width: "100px",
              paddingRigth: "30px",
              alignItems: "center",
              whiteSpace: "nowrap",
              marginLeft: "1rem",
              color: "#939191",
              fontFamily: "Montserrat",
              fontWeigt: "900",
            }}
          >
            CHAT-API
          </h1>
          <div
            style={{
              marginLeft: isOpen ? "7.3rem" : "-0.3rem",
              marginTop: "-0.54rem",
            }}
            className="bars"
          >
            <FaBars
              style={{
                marginLeft: isOpen ? "-4.6rem" : "0.3rem",
              }}
              onClick={toggle}
            />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClasseName="active"
          >
            <Icon
              className="icon"
              style={{
                fontWeigt: "900",
                color: "#01c0b0",
                fontSize: isOpen ? "1.2rem" : "1.5rem",
                marginTop: isOpen ? "" : "1rem",
                marginLeft: isOpen ? "" : "5px",
                fontWeight: "bold",
                lineHeight: "5.45",
              }}
            >
              {item.icon}
            </Icon>
            <Name
              style={{
                opacity: "1",
                display: isOpen ? "block" : "none",
              }}
              onClick={item.subNav && showSubnav}
            >
              {item.name}
              {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
              <Submenu className="submenu">
                {subnav &&
                  item.subNav?.map((item, subindex) => (
                    <DropdownLink to={item.path} key={subindex}>
                      <div className="icon-submenu">{item.icon}</div>
                      <div className="title-submenu"> {item.name}</div>
                    </DropdownLink>
                  ))}
              </Submenu>
            </Name>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </Conainter>
  );
};
