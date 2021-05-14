import React from "react";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

function TokenCard({info, theme, body}) {  

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
      <div className="w-full lg:w-2/3 mx-2 my-4 card border border-base-300 bg-base-100">
        <figure>
          <img src={info.img} 
          onError={e => e.target.src = info.photo}
          alt="Token Image" className="object-cover md:object-contain mx-auto max-h-32 md:max-h-64" />
        </figure> 
        <div className={`card-body ${body ? "" : "hidden"}`}>
          <h2 className="card-title text-base-content text-md text-left font-heading font-semibold">{info.name}</h2> 
          <p className="font-body text-base-content text-sm text-left"> Created by @{info.twittername}</p> 
          <p className="font-body text-base-content text-sm text-left">{convertTime(info.created)}</p> 
        </div>
      </div> 
</div>
  );
}
export default TokenCard