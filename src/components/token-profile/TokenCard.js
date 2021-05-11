import React from "react";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TokenCard({info, theme}) {  

  const convertTime = (timestamp) => {
		const dateObj = new Date(timestamp);
		const formattedDate = dateObj.toLocaleString("en-US", { timeZoneName: "short" });
		return formattedDate;
	}

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
      <div className="w-full mx-2 my-4 card border border-base-300 bg-base-100">
        <figure>
          <img src={info.img} 
          onError={e => e.target.src = info.photo}
          alt="Token Image" className="object-cover w-full max-h-64" />
        </figure> 
        <div className="card-body">
          <h2 className="card-title text-base-content text-md text-left font-heading font-semibold">{info.tid}</h2> 
          <p className="font-body text-base-content text-xs text-left">Description: {info.name}</p> 
          <p className="font-body text-base-content text-xs text-left"> Created by @{info.twittername}</p> 
          <p className="font-body text-base-content text-xs text-left">Created: {convertTime(info.created)}</p> 
        </div>
      </div> 
</div>
  );
}
export default TokenCard