import React, {useState, useEffect} from "react";
import Masonry from 'react-masonry-css';
import TPPCardEmbed from "./TPPCardEmbed.js"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksGridUser(props) {  

  const [tokenData, setTokenData] = useState();

  let _url = new URL(`${TPP}/api/v2/links/user?uid`);

  useEffect(() => {
    async function fetchlinks() {
    const data = await fetch(_url + '=' + props.userid + '&jwt=' + props.jwttoken).then(resp => resp.json());
    setTokenData(data);
    }
    fetchlinks();
  }, []);

    console.log('APIv2:', props.tokentid);
    console.log('POST url', _url.toString());
    console.log('data', tokenData);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    800: 2,
    600: 1,
    500: 1
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

export default TPPLinksGridUser