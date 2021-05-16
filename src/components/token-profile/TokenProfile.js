import React, {useState, useEffect} from "react";
import Masonry from 'react-masonry-css';
import TokenCard from "./TokenCard"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TokenProfile(props) {  

  const [tokenInfo, setTokenInfo] = useState();

  let _url = new URL(`${TPP}/api/v2/tokens/owner/`);

  useEffect(() => {
    async function fetchinfo() {
    const data = await fetch(_url + props.tokenName.toUpperCase()).then(resp => resp.json());
    setTokenInfo(data);
    }
    fetchinfo();
  }, []);

    console.log('APIv2:', props.tokenName.toUpperCase());
    console.log('POST url', _url.toString());
    console.log('data', tokenInfo);

  return(
      <Masonry
        className="flex h-auto flex-wrap w-auto"
      >
        {tokenInfo && tokenInfo.map(info =>
        <TokenCard key={info.name} info={info} theme={props.theme} body={props.body} />
      )}
      </Masonry>
  );
}

export default TokenProfile