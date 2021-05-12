import React, {useState, useEffect} from "react";
import TPPCardWideEmbed from "../link-cards/TPPCardWideEmbed"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksList(props) {  

  const [tokenData, setTokenData] = useState();

  let _url = new URL(`${TPP}/api/v2/links/token?tokenAddress`);

  useEffect(() => {
    async function fetchlinks() {
    const data = await fetch(_url + '=' + props.tokentid).then(resp => resp.json());
    setTokenData(data);
    }
    fetchlinks();
  }, []);

    console.log('APIv2:', props.tokentid);
    console.log('POST url', _url.toString());
    console.log('data', tokenData);

  return(
      <div className="space-y-4">
        {tokenData && tokenData.result.map(link =>
      <TPPCardWideEmbed key={link.id} link={link} theme={props.theme} />)}
      </div>
  );
}

export default TPPLinksList 
