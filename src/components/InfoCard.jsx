import React from "react";
import styled from "styled-components";
import YoutubeIcon from '../icons/youtube.svg';

const Card = styled.div`
  background: #bdbdbd;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 20px 20px 20px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoIcon = styled.span`
  font-size: 1.3em;
  color: #757575;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`;

const Desc = styled.div`
  color: #666;
  font-size: 0.98em;
`;

const Spacer = styled.div`
  flex: 1;
`;

const VideoButton = styled.a`
  align-self: flex-start;
  background: #bdbdbd;
  
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #e0e0e0;
  }
`;


export default function InfoCard({ title, desc, videoUrl }) {
  return (
    <Card>
      <TitleRow>
        
        <Title>{title}</Title>
      </TitleRow>
      <Desc>{desc}</Desc>
      <Spacer />
      {videoUrl ? (
        <VideoButton href={videoUrl} target="_blank" rel="noopener noreferrer">
         <img src={YoutubeIcon} alt="icon" style={{ width: 32, height: 32 }} />
        </VideoButton>
      ) : (
        <VideoButton>
         <img  style={{ filter: "grayscale(100%)", width: 32, height: 32 }} src={YoutubeIcon} alt="icon" />
        </VideoButton>
      )}
    </Card>
  );
} 