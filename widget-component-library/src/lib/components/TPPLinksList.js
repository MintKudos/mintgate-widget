import React from "react";
import TPPCardWideEmbedd from "./TPPCardWideEmbedd"

function TPPLinksList() {  

  return(
    <div data-theme="light">  {/* 
      17 Themes are available: 
      - aqua
      - black
      - bumblebee
      - cupcake
      - cyberpunk
      - dark
      - dracula
      - fantasy
      - forest
      - garden
      - halloween
      - light (default)
      - luxury
      - pastel
      - retro
      - synthwave
      - valentine  */}
      <div className="space-y-4">
      <TPPCardWideEmbedd />
      <TPPCardWideEmbedd />
      <TPPCardWideEmbedd />
      <TPPCardWideEmbedd />
      </div>
      </div>
  );
}

export default TPPLinksList