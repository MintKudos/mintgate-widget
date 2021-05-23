import React, {useState, useEffect} from "react";
import TPPCardWideEmbed from "../link-cards/TPPCardWideEmbed"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksListId(props) {  

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

  return(
    <div data-theme={props.theme}>  {/* 
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
        {linkData &&
      <TPPCardWideEmbed key={linkData.id} link={linkData} theme={props.theme} />}
      </div>
      </div>
  );
}

export default TPPLinksListId
