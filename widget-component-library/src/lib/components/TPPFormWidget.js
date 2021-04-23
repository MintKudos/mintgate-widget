import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function TPPFormWidget() {  

  const [nextStepOpen, setNextStepOpen] = useState(false);

  return(
  <div data-theme="pastel">
      <div class="h-full w-full card-body bg-base-100">
      <div className="justify-center w-full pb-5">
          <div className="card ring-8 ring-secondary ring-opacity-30 mt-1 py-1 lg:py-3 px-4 focus:outline-none">
            <div className="flex w-full focus:outline-none focus:ring-1 focus:ring-brand1">
              <span className="flex items-center py-3 pr-3 text-lg">🔗</span>
                <div class="w-full form-control">
                <div class="flex space-x-2">
                  <input type="text" placeholder="Paste the link you wanna token gate" class="w-full input focus:outline-none" /> 
                  <button onClick={() => {
                    setNextStepOpen(true);}} 
                    class="btn btn-primary">next</button>
                </div>
              </div>
            </div>
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
        <div class="form-control">
          <label class="label">
            <span class="label-text">Link to Protect</span>
          </label> 
          <input type="text" placeholder="username" class="input input-bordered"></input>
          <input type="text" placeholder="https://yourlink.com" class="input input-bordered" />
        </div> 
        <div class="mt-4 form-control">
          <label class="label">
            <span class="label-text">Title</span>
          </label> 
          <input type="text" placeholder="Title of your Gated Link" class="input input-bordered" /> 
          <label class="label">
            <a href="#" class="label-text-alt">Forgot password?</a>
          </label>
        </div> 
        
        <div class="card lg:card-side bordered shadow-lg my-4">
        
  <div class="card-body">
  <label class="label">
            <span class="label-text">Select Token Type</span>
          </label> 
  <select class="select select-bordered w-full">
  <option disabled="disabled" selected="selected">MintGate NFT</option> 
  <option>ERC-20 Tokens</option> 
  <option>NFT (ERC-721 Tokens)</option> 
  <option>NFT (ERC-1155 Multi Asset Tokens)</option> 
  <option>Moloch V2 Shares</option>
  <option>Ethereum Balance</option>
</select>

  </div>
</div>
<div class="form-control mt-4">
          <input type="button" value="Create Gated Link" class="btn btn-primary" />
        </div>
</Transition>
      </div>
  </div>
  );
}

export default TPPFormWidget