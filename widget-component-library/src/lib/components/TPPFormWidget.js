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
      <div class="h-full w-full card-body bg-base-100">
        <div class="form-control">
        <label class="label">
                <span class="font-heading font-semibold label-text">Enter Link To Gate</span>
              </label> 
          <div class="relative ">
            <input type="text" placeholder="Paste the link you wanna token gate" class={`w-full pr-16 input ring-4 ring-primary ring-opacity-20 focus:ring-primary focus:ring-4 label-text font-body font-medium ${nextStepOpen ? '' : ''}`} /> 
            <button onClick={() => {
                            setNextStepOpen(true);}} class={`absolute right-0 rounded-l-none btn btn-primary hover:btn-secondary ${nextStepOpen ? 'hidden' : ''}`}>next</button>
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
            <div class="form-control mt-4">
              <label class="label">
                <span class="font-heading font-semibold label-text">Title</span>
              </label> 
              <input type="text" placeholder="Title of your Gated Link" class="font-body font-medium input label-text input-bordered" /> 
            </div>

          <label class="label mt-4">
              <span class="font-heading font-semibold label-text">Set Gated Link Details</span>
            </label> 
          <div class="card bg-base-200 shadow mb-6">
            <div class="card-body -mt-3 space-y-4">
              {/* Select Token Type */}
              <div>
                <label class="label">
                  <span class="label-text">Token Type</span>
                </label> 
                <select class="font-body font-medium select select-bordered w-full label-text">
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
                <label class="label">
                  <span class="label-text">Select Token</span>
                </label> 
                <select class="font-body font-medium select select-bordered label-text w-full">
                  <option selected="selected">Token 1</option> 
                  <option>Token 2</option> 
                  <option>Token 3</option> 
                </select>
              </div>

              {/* Enter Minimum Amount */}
              <div className="w-1/2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Minimum Amount</span>
                  </label> 
                  <input type="number" placeholder="1" class="font-body font-medium input label-text input-bordered" />
                </div>
              </div>

              </div>
            </div>
          </div>
          <div class="form-control mt-8">
            <input type="button" value="Create Gated Link" class="btn btn-primary hover:btn-secondary" />
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default TPPFormWidget