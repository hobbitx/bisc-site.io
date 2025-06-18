import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import CardGrid from "./components/CardGrid";
import Sidebar from "./components/Sidebar";
import raidCardsData from './configs/raidCards.json';
import dgCardsData from './configs/dgCards.json';

function Home() { return <div>Home Content</div>; }
function Setup() { return <div>Setup Content</div>; }
function Contato() { return <div>Contato Content</div>; }

const AppContainer = styled.div`
  
  min-height: 100vh;
  padding: 24px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 32px;
  margin-top: 32px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;


export default function App() {

  function Raid() { return <CardGrid cards={raidCardsData} />; }
  function DG() { return <CardGrid cards={dgCardsData} />; }

  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar raidCards={raidCardsData} dgCards={dgCardsData} />
        <ContentWrapper>
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dg" element={<DG />} />
              <Route path="/raid" element={<Raid />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </MainContent>
          <Sidebar />
        </ContentWrapper>
      </AppContainer>
    </BrowserRouter>
  );
}
