import React from "react";

function TPPCardWideEmbed() {  

  return(
    <div data-theme="light">  {/* 
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
        <a href="https://mintgate.app" target="_blank" rel="noreferrer">
          <div className=" w-full card bg-base-100 border border-base-300 p-4  shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none">
            <div id="header" className="flex flex-wrap sm:flex-nowrap">
              <img src="https://source.unsplash.com/random/1280x720" alt="Link Title" className="object-cover md:object-cover w-full sm:w-32 max-h-32 rounded-lg"/>
              <div id="body" className="flex flex-col mt-6 md:mt-0 ml-5">
                <h4 id="name" className="card-title text-base-content font-heading text-sm md:text-md font-semibold mb-2">Gated Link - Unlockable with this NFT</h4>
                <p id="job" className="font-body text-xs md:text-sm text-base-content">A token gated link that is only visitable for the holders of this NFT</p>
              </div>
            </div>
          </div>
        </a>
      </div>

      </div>

    
  );
}

export default TPPCardWideEmbed