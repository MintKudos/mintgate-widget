import React from "react";
import { Transition } from "@headlessui/react";



function TPPFormPanel() {
  return (
    <div className="px-2 lg:px-0 w-full">
      <form
        id="tppform"
        name="tppCreate"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value="tppCreate" />
        <div className="justify-center w-full pb-5">
          <div className="appearance-none shadow hover:shadow-lg border-2 border-gray-100 hover:border-brand1 bg-white ring-8 ring-brand1-light ring-opacity-30 mt-1 py-1 lg:py-3 px-4 rounded-xl focus:outline-none">
            <div className="flex w-full focus:outline-none focus:ring-1 focus:ring-brand1">
              <span
                className="flex items-center py-3 pr-3 text-lg">🔗</span>
              <input
                required
                id="form_url"
                name="contentUrl"
                placeholder="Paste a link that you wanna token gate."
                className="appearance-none w-full font-heading font-medium text-xs lg:text-md focus:outline-none"
              />
              <span
                className="cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center shadow-lg bg-brand1 hover:shadow-sm px-4 lg:px-10 rounded-lg font-semibold text-sm lg:text-md text-white font-heading">
                <div
                >Next</div>
              </span>
            </div>
          </div>
        </div>

        <Transition
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="justify-center w-full pb-5">
            <h3 className="pt-4 text-left font-semibold font-heading text-lg flex justify-start">
              Title (short description)
            </h3>
            <input
              required
              id="linkTitle"
              name="linkTitle"
              placeholder="Check out this exclusive content!"
              className="mb-1 appearance-none shadow-sm hover:shadow-lg bg-white border border-gray-200 mt-1 p-2 font-body text-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
            />
          </div>

          <h3 className="pb-2 text-left font-semibold font-heading text-lg flex justify-start">
            Token Details
          </h3>
          {list.map((field, idx) => {
            return (
              <div key={idx} className={`clear-both bg-white border border-gray-200 shadow-md rounded-xl p-4 mb-4 ${router.query.tid && 'hidden'}`}>
                {idx > 0 && // Remove Token Button
                  <button onClick={() => removeAt(idx)}
                    className="float-right mb-2 -mt-1 rounded-md text-gray-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                }

                <TPPFormPanelToken
                  tokenAddress={field.tokenAddress}
                  setTokenAddress={(x) => updateAt(idx, { ...field, tokenAddress: x })}
                  amount={field.amount}
                  setAmount={(x) => updateAt(idx, { ...field, amount: x })}
                  hasAnID={hasAnID}
                  preselect={preselect}
                  platformTokenData={platformTokenData}
                  setNetwork={(x) => updateAt(idx, { ...field, network: x })}
                  network={field.network}
                  userSelectedType={field.userSelectedType}
                  setUserSelectedType={(x) => {
                    console.log(idx, 'setUserSelectedType', x);
                    updateAt(idx, {
                      ...field,
                      userSelectedType: x,
                      tokenAddress: x === "-1" ? 'Ether' : ''
                    })
                  }}

                  setSubid={(x) => updateAt(idx, { ...field, subid: x })}
                />

              </div>
            );
          })}
          {!nftSelected &&
            <button type="button" className="text-green-500 px-4 py-2 font-body text-sm rounded-lg border border-gray-200 bg-white shadow mb-6"
              onClick={() => push({ ...TOKEN_DEFAULT })}>
              + add token
            </button>
          }

          {list.length > 1 && <p className='text-sm'><b>Note:</b> when adding additional tokens, the link will be accessible by <b>any</b> matching token balance that the user holds.</p>
          }
          <div className="justify-center my-2 mx-auto focus:border-0">
            <button
              type="submit"
              className="flex mx-auto items-center w-2/3  justify-center py-4 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-mg-black hover:bg-brand1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand1"
            >
              Create Unlockable Link
            </button>
            <p>{isLoading ? <b className="animate-ping">Loading....</b> : ""}</p>
          </div>
        </Transition>
      </form>
    </div >
  );
}

module.exports = TPPFormPanel;

export default TPPFormPanel;
