import React, {useState, useEffect} from "react";
import Masonry from 'react-masonry-css';
import TPPCardEmbedId from "../link-cards/TPPCardEmbedId.js"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksGridId(props) {  

  const [linkData, setLinkData] = useState();

  let _url = new URL(`${TPP}/api/v2/links/linkid?id`);

  useEffect(() => {
    async function fetchlink() {
    const data = await fetch(_url + '=' + props.id).then(resp => resp.json());
    setLinkData(data);
    }
    fetchlink();
  }, []);

    console.log('APIv2:', props.id);
    console.log('POST url', _url.toString());
    console.log('data', linkData);

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
        {linkData && 
        <TPPCardEmbedId key={linkData.id} link={linkData} theme={props.theme} />
      }
      </Masonry>
  );
}

export default TPPLinksGridId