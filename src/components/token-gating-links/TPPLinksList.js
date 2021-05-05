import React, {useState} from "react";
import TPPCardWideEmbed from "./TPPCardWideEmbed"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;
const [tokenData, setTokenData] = useState();

function TPPLinksList({tokentid}) {  

  useEffect(async () => {
    const data = await fetch(TPP + '/api/links?tid=' + tokentid).then(x => x.json());
    setTokenData(data);
  }, []);

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
      <TPPCardWideEmbed l={l} />
      )}
      </div>
      </div>
  );
}

export default TPPLinksList 
