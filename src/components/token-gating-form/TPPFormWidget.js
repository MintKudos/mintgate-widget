import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import TPPFormTokenPanel from "./TPPFormTokensPanel";
import { useList } from 'react-use';
import TPPFormLinkDisplay from "./TPPFormLinkDisplay"

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || 'https://mgate.io'


function isNumeric(n) {
  return !isNaN(parseFloat(n) && isFinite(n));
}


function TPPFormWidget({ tokenType, tokenAddress, subid, network, jwttoken, theme, gateTokens }, preselect, onClose) {
  const TOKEN_DEFAULT = {
    userSelectedType: tokenType || "1",
    amount: "1",
    tokenAddress: tokenAddress || "",
    subid: subid || 0,
    network: network || '1'
  }

  const [linkTitle, setLinkTitle] = useState('');
  const [formURL, setFormURL] = useState('');
  const [list, { set, push, updateAt, insertAt, update, updateFirst, upsert, sort, filter, removeAt, clear, reset }] = useList([TOKEN_DEFAULT]);
  const [nftSelected, setnftSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCreated, setCreated] = useState(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const nftSelected = sp.get('tid') || false;
    setnftSelected(nftSelected);
    if (nftSelected) updateAt(0, { ...list[0], tokenAddress: nftSelected, userSelectedType: "1", amount: '1' })
  }, []);



  const onSubmit = function (e) {
    if (e.preventDefault) e.preventDefault();
    if (isLoading) return;

    console.log('list', list)

    const tokenParams = list.map((x, idx) => {
      if ((x.tokenAddress.indexOf("0x")) === "-1" && x.userSelectedType !== "1" && x.userSelectedType !== "-1") {
        window.alert(`Please enter a valid token address.`
        );
        return null;
      }

      if (!isNumeric(x.amount)) {
        window.alert("Please enter a valid number of minimum token balance.");
        return null;
      }

      if (!x.tokenAddress || x.tokenAddress === "DEFAULT") {
        alert("Please enter or select a token");
        return;
      }

      return {
        network: x.network || 0,
        subid: x.subid || 0,
        ttype: x.userSelectedType,
        balance: x.amount || "1",
        token: x.tokenAddress
      }
    });

    if (tokenParams.filter(x => !x).length > 0) return;

    let url = formURL;
    if (url.indexOf('http') === -1) url = `https://${url}`;

    try {
      new URL(url);
      if (url.indexOf('.') === -1) throw new Error('no domain');
    } catch (e) {
      return alert(`Invalid URL ${url}, please check the link address.`);
    }

    let _url = new URL(`${TPP}/api/v2/links/create`);

    if (!jwttoken) throw new Error('no JWT token. Pass in your JWT token which you can find at https://mintgate,.app/token_api');

    const v2Params = {
      url,
      "title": linkTitle,
      tokens: tokenParams,
      jwt: jwttoken
    }

    fetch(_url.toString(), {
      method: 'POST',
      headers: {
        'Accept': 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(v2Params)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && (data.status === 'fail')) {
          setLoading(false);
          let msg = data.message;
          if (data.details) msg += ': ' + JSON.stringify(data.details, null);
          alert("Form Error: " + msg);
          console.log(e);
          return;
        }

        const link = data.url;

        setCreated(link);
        if (onClose) onClose();
      })
      .catch((e) => {
        alert("Oh no! We have an error: " + e.toString());
        setLoading(false);
        console.log(e);
      })
  }


  const [nextStepOpen, setNextStepOpen] = useState(false);

  if (isCreated) {
    return <TPPFormLinkDisplay link={isCreated} theme={theme}></TPPFormLinkDisplay>
  }

  return (
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
      <form
        id="tppform"
        name="tppcreate"
        onSubmit={onSubmit}
        className="h-full w-full card-body bg-transparent">
        <div className="form-control">
          <div className="relative ">
            <input
              required
              value={formURL}
              onChange={(e) => setFormURL(e.target.value)}
              id="form_url"
              name="contentURL"
              type="text"
              placeholder="Paste the link you want to token gate" className={`w-full py-4 px-6 input shadow-md focus:ring-primary focus:ring-4 label-text text-sm font-heading font-semibold ${nextStepOpen ? 'input-gohst shadow-none' : 'ring-4 ring-primary ring-opacity-20'}`} />
            <span onClick={() => {
              setNextStepOpen(true);
            }} className={`absolute right-0 rounded-lg btn btn-primary hover:btn-secondary ${nextStepOpen ? 'hidden' : ''}`}>next</span>
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
            <input required type="text"
              onChange={(e) => setLinkTitle(e.target.value)}
              id="linkTitle"
              name="linkTitle"
              placeholder="Title of your Gated Link" className="font-body font-medium input label-text input-bordered" />
          </div>

          {list.map((field, idx) => {
            return (
              <div key={idx} className="mb-20">
                {idx > 0 && // Remove Token Button
                  <button onClick={() => removeAt(idx)}
                    className="float-right mt-3 rounded-md text-gray-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close panel</span>
                    <span className="text-lg label-text">x</span>
                  </button>
                }

                <TPPFormTokenPanel
                  platformTokenData={gateTokens}
                  tokenAddress={field.tokenAddress}
                  setTokenAddress={(x) => updateAt(idx, { ...field, tokenAddress: x })}
                  amount={field.amount}
                  setAmount={(x) => updateAt(idx, { ...field, amount: x })}
                  preselect={preselect}
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
          <div className="w-full flex flex-row justify-between mt-12 space-x-4">
          {!nftSelected &&
              <button type="button" className="max-w-96 btn btn-primary border-2 text-primary bg-transparent hover:btn-secondary" onClick={() => push({ ...TOKEN_DEFAULT })}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                Add Token
              </button>
            }
            {/* Generate Link button*/}
              <button type="submit"
                className="btn btn-primary hover:btn-secondary">
                Generate Gated Link
            </button>
            </div>
        </Transition>
      </form>
    </div>
  );
}

export default TPPFormWidget