// components/Navbar.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import generalConfig from "../configs/general.json";
import guias from '../configs/guias.json';
import LogoSVG from "../logo.svg";

const NavBar = styled.nav`
  background: #bdbdbd;
  padding: 12px 32px;
  display: flex;
    align-items: center;
    justify-content: center;
  gap: 24px;
  border-radius: 12px;
  width: 90%;
  margin: 0 auto;
  height: 56px;
  position: relative;
`;

const Logo = styled.img`
  height: 32px;
  display: block;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 24px;
  height: 100%;
  width: 60px;
  transition: background 0.2s;
  &:hover {
    background: #e0e0e0;
  }
`;

const NavItemWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  width: 120px;
`;

const NavButton = styled(Link)`
  background: transparent;
  border: none;
  padding: 0 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  &:hover {
    background: #e0e0e0;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const RecordIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #bdbdbd;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    background: #e53935;
    border-radius: 50%;
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;

export default function Navbar({ raidCards, dgCards }) {
  const [showRaid, setShowRaid] = useState(false);
  const [showDg, setShowDg] = useState(false);
  const [showGuias, setShowGuias] = useState(false);
  // Dynamically generate menu items from raidCards
  const raidMenuItems = raidCards.map(card => ({
    label: card.title,
  }));

  const dgMenuItems = dgCards.map(card => ({
    label: card.title,
  }));

  const categories = {};
  guias.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });

  const guiasMenuItems = Object.entries(categories).map(([category, items]) => ({
    label: category,
    submenu: items.map(card => ({
      label: card.title,
      description: card.desc,
      icon: "▶️",
      link: card.videoUrl
    }))
  }));

  return (
    <NavBar>
      <LogoLink to="/">
        <Logo src={LogoSVG} alt="Logo" />
      </LogoLink>
      <NavItemWrapper
        onMouseEnter={() => setShowDg(true)}
        onMouseLeave={() => setShowDg(false)}
      >
        <NavButton to="/dg">DUNGEONS</NavButton>
        {showDg && (
          <div
            style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}
          >
            <DropdownMenu title={`Season ${generalConfig.currentSeason}`} items={dgMenuItems} />
          </div>
        )}
      </NavItemWrapper>
      <NavItemWrapper
        onMouseEnter={() => setShowRaid(true)}
        onMouseLeave={() => setShowRaid(false)}
      >
        <NavButton to="/raid" style={{ zIndex: 2 }}>RAID</NavButton>
        {showRaid && (
          <div
            style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}
          >
            <DropdownMenu title={`Season ${generalConfig.currentSeason}`} items={raidMenuItems} />
          </div>
        )}
      </NavItemWrapper>
      <NavItemWrapper
        onMouseEnter={() => setShowGuias(true)}
        onMouseLeave={() => setShowGuias(false)}
      >
        <NavButton to="#" style={{ zIndex: 2 }}>GUIAS</NavButton>
        {showGuias && (
          <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}>
            <DropdownMenu title="Guias" items={guiasMenuItems} />
          </div>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        <NavButton to="/setup">SETUP</NavButton>
      </NavItemWrapper>
      <NavItemWrapper>
        <NavButton to="/contato">CONTATO</NavButton>
      </NavItemWrapper>
      <Spacer />
      <RecordIcon />
    </NavBar>
  );
}