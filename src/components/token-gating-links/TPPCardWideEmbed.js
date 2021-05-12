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
      <div className="cursor-pointer w-full">
      <a href={TPP + '/go/' + link.id} target="_blank">
      <div className="card lg:card-side bg-base-100 bordered border-base-300 shadow hover:shadow-none transform hover:scale-95 transition duration-300">
  <div className="card-body">
    <h2 className="card-title text-neutral-content text-md text-left font-heading font-semibold">{link.title ? link.title : "Gated Link"}</h2> 
    <p className="font-body text-neutral-content text-sm text-left">{link.desc ? link.desc : "A token gated link that is only visitable for the holders of this NFT"}</p> 
  </div>
</div> 
        </a>
      </div>
      </div>


  );
}

export default TPPCardWideEmbed 