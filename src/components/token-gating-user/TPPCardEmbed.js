import React from "react";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TPPCardEmbedUser({link, theme}) {  

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
      <div className="mx-2 my-4 card border border-base-300 bg-base-100">
        <figure>
          <img src={link.img} alt="Link Title" className={`${link.img ? 'object-cover md:object-cover w-full max-h-56' : 'hidden'}`} />
        </figure> 
        <div className="card-body">
          <h2 className="card-title text-base-content text-md text-left font-heading font-semibold">{link.title ? link.title : "Gated Link"}</h2> 
          <p className="font-body text-base-content text-xs text-left">{link.desc ? link.desc : "A token gated link that is only visitable for the holders of this NFT"}</p> 
          <div className="card-actions">
          <a href={TPP + '/go/' + link.id} target="_blank">
            <button className="btn btn-primary text-xs">Access Content</button> 
            </a> 
          </div>
        </div>
      </div> 
</div>
  );
}
export default TPPCardEmbedUser