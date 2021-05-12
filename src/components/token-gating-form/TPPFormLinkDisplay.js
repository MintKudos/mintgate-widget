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
          <input required
                  value={props.link}
                  id="link"
                  name="link"
                  type="text" className="w-full pr-16 input label-text ring-4 ring-primary text-base" /> 
          <button onClick={() => navigator.clipboard.writeText(props.link)} className="absolute right-0 rounded-l-none btn btn-primary">copy</button>
        </div>
        </div>
        </div>
    </>
  );
}

export default tpplink;