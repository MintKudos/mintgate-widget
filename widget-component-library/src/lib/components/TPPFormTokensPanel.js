import React from "react";

function TPPFormTokenPanel() {  

  return(
    <>
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
          </>
  );
}

export default TPPFormTokenPanel