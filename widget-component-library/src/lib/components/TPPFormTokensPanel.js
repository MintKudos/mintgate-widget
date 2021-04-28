import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function TPPFormWidget() {  

  const [nextStepOpen, setNextStepOpen] = useState(false);

  return(
    <div data-theme="luxury">  {/* 
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
      <div className="h-full w-full card-body bg-base-100">
        <div className="form-control">
        <label className="label">
                <span className="font-heading font-semibold label-text">Enter Link To Gate</span>
              </label> 
          <div className="relative ">
            <input type="text" placeholder="Paste the link you wanna token gate" className={`w-full pr-16 input ring-4 ring-primary ring-opacity-20 focus:ring-primary focus:ring-4 label-text font-body font-medium ${nextStepOpen ? '' : ''}`} /> 
            <button onClick={() => {
                            setNextStepOpen(true);}} className={`absolute right-0 rounded-l-none btn btn-primary hover:btn-secondary ${nextStepOpen ? 'hidden' : ''}`}>next</button>
          </div>
        </div> 
        <Transition
          show={nextStepOpen}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
            {/* Enter Token Title */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="font-heading font-semibold label-text">Title</span>
              </label> 
              <input type="text" placeholder="Title of your Gated Link" className="font-body font-medium input label-text input-bordered" /> 
            </div>

          <label className="label mt-4">
              <span className="font-heading font-semibold label-text">Set Gated Link Details</span>
            </label> 
          <div className="card bg-base-200 shadow mb-6">
            <div className="card-body -mt-3 space-y-4">
              {/* Select Token Type */}
              <div>
                <label className="label">
                  <span className="label-text">Token Type</span>
                </label> 
                <select className="font-body font-medium select select-bordered w-full label-text">
                  <option selected="selected">MintGate NFT</option> 
                  <option>ERC-20 Tokens</option> 
                  <option>NFT (ERC-721 Tokens)</option> 
                  <option>NFT (ERC-1155 Multi Asset Tokens)</option> 
                  <option>Moloch V2 Shares</option>
                  <option>Ethereum Balance</option>
                </select>
              </div>

              <div className="flex justify-between space-x-4">

              {/* Select Token */}
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text">Select Token</span>
                </label> 
                <select className="font-body font-medium select select-bordered label-text w-full">
                  <option selected="selected">Token 1</option> 
                  <option>Token 2</option> 
                  <option>Token 3</option> 
                </select>
              </div>

              {/* Enter Minimum Amount */}
              <div className="w-1/2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Minimum Amount</span>
                  </label> 
                  <input type="number" placeholder="1" className="font-body font-medium input label-text input-bordered" />
                </div>
              </div>

              </div>
            </div>
          </div>
          <div className="form-control mt-8">
            <button type="button" value="Create Gated Link" className="btn btn-primary hover:btn-secondary" />
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default TPPFormWidget