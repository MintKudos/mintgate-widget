import React from "react";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPCardWideEmbed({link, theme}) {  

  return(
    <div data-theme={theme}>  {/* 
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
      <div className="mx-4 cursor-pointer">
      <a href={TPP + '/go/' + link.id} target="_blank">
          <div className=" w-full card bg-base-100 border border-base-300 p-4 shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none">
            <div id="header" className="flex flex-wrap sm:flex-nowrap">
              <div id="body" className="flex flex-col mt-6 md:mt-0 ml-5">
                <h2 className="card-title text-base-content text-md text-left font-heading font-semibold">{link.title ? link.title : "Gated Link"}</h2> 
                <p className="font-body text-base-content text-sm text-left">{link.desc ? link.desc : "A token gated link that is only visitable for the holders of this NFT"}</p> 
              </div>
            </div>
          </div>
        </a>
      </div>

      </div>


  );
}

export default TPPCardWideEmbed