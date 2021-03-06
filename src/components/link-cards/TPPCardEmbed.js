import React from "react";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPCardEmbed({link, theme}) {  

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
      <a href={TPP + '/go/' + link.id} target="_blank">
        <div className="mx-2 my-4 card border border-base-300 bg-base-100 shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none">
          <figure>
            <img src={link.img} alt="Link Title" className={`${link.img ? 'object-cover w-full max-h-56' : 'hidden'}`} />
          </figure> 
          <div className="card-body">
            <h2 className="card-title text-base-content text-md text-left font-heading font-semibold">{link.title ? link.title : "Gated Link"}</h2> 
            <p className="font-body text-base-content text-sm text-left">{link.desc ? link.desc : "A token gated link that only holders of this NFT can access"}</p> 
          </div>
        </div> 
      </a>
    </div>
  );
}
export default TPPCardEmbed