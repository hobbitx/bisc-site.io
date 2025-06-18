// components/CardGrid.jsx
import React from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 360px);
  gap: 48px;
`;



export default function CardGrid({ cards }) {
  return (
    <Grid>
      {cards.map((card, idx) => (
        <InfoCard key={idx} title={card.title} desc={card.desc} videoUrl={card.videoUrl} />
      ))}
    </Grid>
  );
}