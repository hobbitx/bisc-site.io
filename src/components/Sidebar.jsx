// components/Sidebar.jsx
import React from "react";
import styled from "styled-components";
import SidebarBox from "./SidebarBox";
import YoutubeIcon from '../icons/youtube.svg';
import KickIcon from '../icons/kick.svg';
import generalConfig from "../configs/general.json";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function getYouTubeEmbedUrlFromVideoUrl(videoUrl) {
  let videoId = null;
  const watchMatch = videoUrl.match(/[?&]v=([^&#]+)/);
  const shortMatch = videoUrl.match(/youtu\.be\/([^?&#]+)/);
  const embedMatch = videoUrl.match(/youtube\.com\/embed\/([^?&#]+)/);

  if (watchMatch) videoId = watchMatch[1];
  else if (shortMatch) videoId = shortMatch[1];
  else if (embedMatch) videoId = embedMatch[1];

  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function Sidebar() {
  const videoUrl = generalConfig.lastVideo;
  const embedUrl = getYouTubeEmbedUrlFromVideoUrl(videoUrl);

  return (
    <SidebarContainer>
      <SidebarBox icon={KickIcon} link="https://player.kick.com/biscoitao" />
      <SidebarBox icon={YoutubeIcon} link={embedUrl} />
    </SidebarContainer>
  );
}