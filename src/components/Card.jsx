// components/InfoCard.jsx
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px 16px 16px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 1.1rem;
`;

const InfoIcon = styled.span`
  font-size: 1.2rem;
  color: #888;
`;

const Desc = styled.div`
  font-size: 0.98rem;
  color: #555;
  margin: 8px 0 16px 0;
`;

const VideoButton = styled.button`
  background: #eee;
  border: 1px solid #bbb;
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
`;

function InfoCard({ title, desc }) {
  return (
    <Card>
      <TitleRow>
        <InfoIcon>ℹ️</InfoIcon>
        {title}
      </TitleRow>
      <Desc>{desc}</Desc>
      <VideoButton>VIDEO</VideoButton>
    </Card>
  );
}

export default InfoCard;