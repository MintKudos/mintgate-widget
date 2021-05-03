import React from "react";

function tpplink(props) {

  return (
    <>
    <div data-theme={props.theme}>
     <div className="form-control card-body bg-base-100">
        <label className="label">
                <span className="font-heading font-semibold label-text">Your Link is Ready</span>
              </label> 
          <div className="relative">
            <input 
            required
            value="link"
            id="link"
            name="link"
            type="text" 
            className="w-full pr-16 mt-1 input focus:ring-primary focus:ring-4 label-text text-base font-heading font-semibold" /> 
            <span onClick={() => navigator.clipboard.writeText("link")}className="absolute right-0 rounded-l-none btn btn-primary hover:btn-secondary">Copy</span>
          </div>
        </div> 
        </div>
    </>
  );
}

export default tpplink;