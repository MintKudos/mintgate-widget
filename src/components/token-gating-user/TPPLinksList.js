import React, {useState, useEffect} from "react";
import TPPCardWideEmbed from "./TPPCardWideEmbed"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPLinksListUser(props) {  

  const [tokenData, setTokenData] = useState();

  let _url = new URL(`${TPP}/api/v2/links/user?uid`);

  useEffect(() => {
    async function fetchlinks() {
    const data = await fetch(_url + '=' + props.userid + '&jwt=' + props.jwttoken).then(resp => resp.json());
    setTokenData(data);
    }
    fetchlinks();
  }, []);

    console.log('APIv2:', props.userid);
    console.log('POST url', _url.toString());
    console.log('data', tokenData);

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
        {tokenData && tokenData.result.map(link =>
      <TPPCardWideEmbed key={link.id} link={link} theme={props.theme} />)}
      </div>
      </div>
  );
}

export default TPPLinksListUser
