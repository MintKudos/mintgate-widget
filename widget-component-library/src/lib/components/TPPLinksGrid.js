import React from "react";
import Masonry from 'react-masonry-css';
import TPPCardEmbedd from "./TPPCardEmbedd"

function TPPLinksGrid() {  

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    600: 1,
    500: 1
  };

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

      <Masonry
        className="flex h-auto flex-wrap w-auto"
        breakpointCols={breakpointColumnsObj}
      >
              <TPPCardEmbedd />
              <TPPCardEmbedd />
              <TPPCardEmbedd />
              <TPPCardEmbedd />
              <TPPCardEmbedd />
              <TPPCardEmbedd />
              <TPPCardEmbedd />
      </Masonry>
    </div>
  );
}

export default TPPLinksGrid
