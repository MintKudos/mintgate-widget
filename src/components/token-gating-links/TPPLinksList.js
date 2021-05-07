import React, {useState, useEffect} from "react";
import TPPCardWideEmbed from "./TPPCardWideEmbed"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksList({tokentid}) {  

  const [tokenData, setTokenData] = useState();

  let _url = new URL(`${TPP}/api/v2/links/token?tokenAddress`);

  fetch('https://mgate.io/api/v2/links/token?tokenAddress=' + tokentid)
    .then(response => response.text())
    .then(data => console.log(data));

    console.log('APIv2:', tokentid);
    console.log('POST url', _url.toString());

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
      {tokenData && tokenData.links.map(l =>
      <TPPCardWideEmbed link={l} />
      )}
      </div>
      </div>
  );
}

export default TPPLinksList 
