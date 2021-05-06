import React, {useState, useEffect} from "react";
import Masonry from 'react-masonry-css';
import TPPCardEmbed from "./TPPCardEmbed.js"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksGrid({tokentid}) {  

  const [tokenData, setTokenData] = useState();

  useEffect(async () => {
    const data = await fetch(TPP + '/api/links?tid=' + tokentid).then(x => x.json());
    setTokenData(data);
  }, []);

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
        {tokenData && tokenData.links.map(l =>
        <TPPCardEmbed link={l} />
      )}
      </Masonry>
    </div>
  );
}

export default TPPLinksGrid