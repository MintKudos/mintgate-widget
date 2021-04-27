import React from "react";

function TPPCardEmbed() {  

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
      <div className="mx-4 my-6 card border border-base-300 bg-base-100">
        <figure>
          <img src="https://picsum.photos/id/1005/400/250" alt="Link Title" className="object-cover md:object-cover w-full max-h-56" />
        </figure> 
        <div className="card-body">
          <h2 className="card-title">Link Title</h2> 
          <p>A token gated link that is only visitable for the holders of this NFT.</p> 
          <div className="card-actions">
            <button className="btn btn-primary text-xs">Access Content</button> 
            <button className="btn btn-ghost text-xs">More info</button>
          </div>
        </div>
      </div> 
</div>
  );
}

export default TPPCardEmbed