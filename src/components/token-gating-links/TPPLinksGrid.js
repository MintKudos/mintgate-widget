import React, {useState, useEffect} from "react";
import Masonry from 'react-masonry-css';
import TPPCardEmbed from "../link-cards/TPPCardEmbed.js"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksGrid(props) {  

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

  const breakpointColumnsObj = {
    default: props.base,
    1200: props.lg,
    800: props.md,
    600: props.sm,
    500: props.xs
  };

  return(
      <Masonry
        className="flex h-auto flex-wrap w-auto"
        breakpointCols={breakpointColumnsObj}
      >
        {tokenData && tokenData.result.map(link =>
        <TPPCardEmbed key={link.id} link={link} theme={props.theme} />
      )}
      </Masonry>
  );
}

export default TPPLinksGrid