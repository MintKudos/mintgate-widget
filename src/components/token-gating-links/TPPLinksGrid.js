import React, {useState, useEffect} from "react";
import Masonry from 'react-masonry-css';
import TPPCardEmbed from "./TPPCardEmbed.js"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksGrid({tokentid, theme, base, lg, md, sm}) {  

  const [tokenData, setTokenData] = useState();

  useEffect(async () => {
    const data = await fetch(TPP + '/api/links?tid=' + tokentid).then(x => x.json());
    setTokenData(data);
  }, []);

  const breakpointColumnsObj = {
    default: base,
    1200: lg,
    600: md,
    500: sm
  };

  return(
    <div className="w-full">
      <Masonry
        className="flex h-auto flex-wrap w-auto"
        breakpointCols={breakpointColumnsObj}
      >
        {tokenData && tokenData.links.map(l =>
        <TPPCardEmbed link={l} theme={theme}/>
      )}
      </Masonry>
      </div>
  );
}

export default TPPLinksGrid