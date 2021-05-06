import React, {useState, useEffect} from "react";
import TPPCardWideEmbed from "./TPPCardWideEmbed"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksList({tokentid, theme}) {  

  const [tokenData, setTokenData] = useState();

  useEffect(async () => {
    const data = await fetch(TPP + '/api/links?tid=' + tokentid).then(x => x.json());
    setTokenData(data);
  }, []);

  return(
      <div className="space-y-4">
      {tokenData && tokenData.links.map(l =>
      <TPPCardWideEmbed link={l} theme={theme}/>
      )}
      </div>
  );
}

export default TPPLinksList 
