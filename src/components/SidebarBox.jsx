// components/SidebarBox.jsx
import React from "react";
import styled from "styled-components";

const ICON_AREA_HEIGHT = 56; // px, for top icon area
const CARD_PADDING = 16; // px, for internal padding

const Box = styled.div`
  width: 560px;
  height: 360px;
  background: #bdbdbd;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  padding: ${CARD_PADDING}px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background: #222;
  color: #7fff00;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2em;
  position: absolute;
  top: ${CARD_PADDING}px;
  left: 7%;
  transform: translateX(-50%);
  z-index: 2;
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: calc(100% - ${ICON_AREA_HEIGHT + CARD_PADDING}px);
  margin-top: ${ICON_AREA_HEIGHT}px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

export default function SidebarBox({ icon, link }) {
  return (
    <Box>
      <IconBox>
        {typeof icon === 'string' && icon.endsWith('.svg') ? (
          <img src={icon} alt="icon" style={{ width: 32, height: 32 }} />
        ) : (
          icon
        )}
      </IconBox>
      {link && (
        <IframeWrapper>
          <Iframe src={link} allow="autoplay; encrypted-media" allowFullScreen scrolling="no" title="Embedded content" />
        </IframeWrapper>
      )}
    </Box>
  );
}