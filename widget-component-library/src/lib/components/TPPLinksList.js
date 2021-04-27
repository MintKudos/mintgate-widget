import React from "react";
import TPPCardWideEmbed from "./TPPCardWideEmbed"

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
      <TPPCardWideEmbed />
      <TPPCardWideEmbed />
      <TPPCardWideEmbed />
      <TPPCardWideEmbed />
      </div>
      </div>
  );
}

export default TPPLinksList