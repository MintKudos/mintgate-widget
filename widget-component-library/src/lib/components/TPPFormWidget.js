import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import TPPFormTokenPanel from "./TPPFormTokensPanel";

function TPPFormWidget(props) { 

  const [nextStepOpen, setNextStepOpen] = useState(false);

  return(
    <div data-theme={props.theme}>  {/* 
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
                <span className={`font-heading font-semibold label-text ${nextStepOpen ? 'hidden' : ''}`}>Enter Link To Gate</span>
              </label> 
          <div className="relative ">
            <input type="text" placeholder="Paste the link you wanna token gate" className={`w-full pr-16 input focus:ring-primary focus:ring-4 label-text text-base font-heading font-semibold ${nextStepOpen ? 'input-gohst' : 'ring-4 ring-primary ring-opacity-20'}`} /> 
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

          {/* Beginning of the Token Details Card */}
          <TPPFormTokenPanel />
          {/* Add another token button */}
          <button class="btn btn-primary hover:btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Token
          </button> 

          {/* Generate Link and Loading button */}
          <div className="form-control mt-8">
            <input type="button" value="Create Gated Link" className="btn btn-primary hover:btn-secondary" />
            {/* Loading Button
            <button className="btn btn-primary loading">loading</button> 
            */}
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default TPPFormWidget