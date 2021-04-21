import React, { useState, useEffect } from "react";
import { useOvermind } from "../../stores/Overmind";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import TPPFormPanelToken from "./TPPFormPanelToken";
import { useList } from 'react-use';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://link.mintgate.app`;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const TOKEN_DEFAULT = {
  userSelectedType: "1",
  amount: "1",
  tokenAddress: "", // preselect || 
  subid: 0,
  network: '1'
};
function TPPFormPanel({ preselect, onClose }) {
  const { state: ostate, actions } = useOvermind();
  // const [platformTokenData, setplatformTokenData] = useState(null);
  const platformTokenData = !preselect ? ostate.user.tokens : ([{ name: preselect, tid: preselect }].concat(ostate.user.tokens));

  const [linkTitle, setLinkTitle] = useState('');

  const [list, { set, push, updateAt, insertAt, update, updateFirst, upsert, sort, filter, removeAt, clear, reset }]
    = useList([TOKEN_DEFAULT]);

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [formURL, setFormURL] = useState('');
  const [waitingWallet, setWaitingWallet] = useState(false);

  const [nftSelected, setnftSelected] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const nftSelected = sp.get('tid') || false;
    setnftSelected(nftSelected);
    if (nftSelected) updateAt(0, { ...list[0], tokenAddress: nftSelected, userSelectedType: "1", amount: '1' });
  }, []);

  // Referral
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    let _url = sp.get("url") || null;
    if (!_url && localStorage.getItem('referral')) {
      const o = JSON.parse(localStorage.getItem('referral'));
      _url = o.url;
    }

    if (_url) setFormURL(_url);
  }, []);

  // Referral
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    let url = sp.get("url") || null;
    let token1 = sp.get("token1") || null;
    let amount1 = sp.get("amount1") || TOKEN_DEFAULT.amount;
    let type1 = sp.get("type1") || '20';
    let network1 = sp.get("network1") || TOKEN_DEFAULT.network;

    if (preselect) {
      if (token1) updateAt(0, { ...list[0], tokenAddress: preselect });
    }
    else if (token1 || amount1) {
      if (token1) updateAt(0, {
        ...list[0], tokenAddress: token1,
        userSelectedType: type1, amount: amount1, network: network1
      });
    }
    else if (localStorage.getItem('referral')) {
      const o = JSON.parse(localStorage.getItem('referral'));
      url = o.url;
      token1 = o.token1;
      amount1 = o.amount1;
      if (token1) updateAt(0, {
        ...list[0], tokenAddress: token1,
        userSelectedType: type1, amount: amount1, network: network1
      });
    }
  }, []);


  useEffect(() => {
    if (!waitingWallet || !ostate.user.wallets.address) return;
    setWaitingWallet(false);
  }, [waitingWallet, ostate.user.wallets.address]);

  const onSubmit = function (e) {
    if (e.preventDefault) e.preventDefault();
    if (isLoading) return;

    // console.log('nftSelected', nftSelected)
    // return;

    const tokenParams = list.map((x, idx) => {
      if (x.tokenAddress.indexOf("0x") === "-1" && x.userSelectedType !== "1"
        && x.userSelectedType !== "-1") {
        window.alert(
          `Please enter a valid token address.\n${address} not a valid address.\nExample: 0x6b175474e89094c44da98b954eedeac495271d0f`
        );
        return null;
      }

      if (!isNumeric(x.amount)) {
        window.alert("Please enter a valid number for minimum token balance.");
        return null;
      }

      if (!x.tokenAddress || x.tokenAddress === "DEFAULT") {
        alert("Please enter or select a token");
        return;
      }

      // x.tokenAddress = x.tokenAddress || "0x6b175474e89094c44da98b954eedeac495271d0f";

      return {
        network: x.network || 0,
        subid: x.subid || 0,
        ttype: x.userSelectedType,
        balance: x.amount || "1",
        token: encodeURIComponent(x.tokenAddress)
      }
    });

    if (tokenParams.filter(x => !x).length > 0) return; // there was error

    const tokenParams2 = tokenParams.map((x, idx) => {
      const i = idx === 0 ? '' : idx;
      return [
        `network${i}=${x.network}`,
        `ttype${i}=${x.ttype}`,
        `balance${i}=${x.balance}`,
        `token${i}=${x.token}`,
        `subid${i}=${x.subid}`,
      ].join('&')
    }).join('&') + `&num=${tokenParams.length}`;

    console.log(tokenParams2);

    let url = formURL;
    if (url.indexOf('http') === -1) url = `https://${url}`;

    // Check if the URL is valid
    try {
      new URL(url);
      if (url.indexOf('.') === -1) throw new Error('no domain');
    } catch (e) {
      return alert(`Invalid URL ${url}, please check the link address.`);
    }
    // return console.log('ok')

    let uid = ostate.user.uid || localStorage.getItem("uid") || -1;
    let symbol = localStorage.getItem("symbol") || null;

    let subid;
    if (document.getElementById("subid")) {
      subid = document.getElementById("subid").value;
    }
    /* TODO recheck subid
    if (ttype === "1155" && !subid) {
      alert(
        "Please enter a 1155 token ID. You can find this ID using OpenSea.io"
      );
      return;
    }
    */

    let tokenid;
    if (document.getElementById("tokenid")) {
      tokenid = document.getElementById("tokenid").value;
    }

    /* TODO readd 
    if (ttype === "721" && !tokenid) {
      const _config = confirm(
        "Continue without a 721 token ID? This will allow link access from any 721 token from that address. You can find this ID using OpenSea.io"
      );
      if (!_config) return;
    }*/

    const email = ''; //document.getElementById("form_email").value;

    url = url || "";
    url = url.replace("http://", "").replace("https://", "");

    // balance = balance || "1";
    // balance = balance.replace(" tokens", "").replace(" token", "");

    /* if (!email || email.indexOf("@") === -1) {
      window.alert("Please enter an email address to send status updates.");
      return null;
    }*/

    /* fetch('/event_email?email=' + email).catch(e => {
            console.log('called event');
        }); */

    url = url || "demo.ghost.io";
    url = url.replace("http://", "").replace("https://", "");

    const url2 = encodeURIComponent(url);

    window.gtag &&
      window.gtag("event", "pre_gen_link", {
        user: acct,
        transport_type: "beacon",
        email: email || "",
        url: url,
        // balance: balance,
        // address: address,
      });

    /// setLoading(true); // TODO fix loading

    let acct = "0"; // ostate.user.wallets.address;
    if (ostate.user && ostate.user.wallets && ostate.user.wallets.address) acct = ostate.user.wallets.address;
    // const emailEn = encodeURIComponent(email); &email=${emailEn}

    let _url = `${TPP}/gen?url=${url2}&account=${acct}&uid=${uid}`;

    if (ostate.user.discordID) {
      _url = _url + `&discordID=${ostate.user.discordID}`;
    }

    _url += '&' + tokenParams2;

    _url += `&title=${encodeURIComponent(linkTitle)}`;
    // console.log('_url', _url)
    // return;

    fetch(_url)
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem('referral');
        localStorage.removeItem('referralExpire');

        if (data && (data.status === 'fail' || data.msg)) {
          setLoading(false);
          alert("Oh no! Server failed with: " + data.msg);
          console.error(e);
          return;
        }

        const link = data.social;
        localStorage.setItem("genurl", link);
        localStorage.setItem("tpp_code", data.code);
        localStorage.setItem("tpp_namespace", data.namespace);
        localStorage.setItem("tpp_template", data.template);
        localStorage.setItem("tpp_social", data.social);

        setTimeout(() => {
          if (preselect) window.location.reload();
          else {
            const qs = new URLSearchParams(window.location.search);
            if (qs.get('tid')) router.push(`/t/${qs.get('tid')}?created=success`)
            else if (qs.get('returnTo')) {
              const returnTo = new URL(decodeURIComponent(qs.get('returnTo')));
              returnTo.searchParams.set('link', link);
              window.location.href = returnTo.toString();
              return;
            }
            else router.push("/tpp/linkdisplay") // tpp/linkdisplay
          }

          if (onClose) onClose();
        }, 10);
      })
      .catch((e) => {
        alert("Oh no! Server failed with: " + e.toString());
        setLoading(false);
        console.error(e);
      });
  };

  const login = () => {
    localStorage.setItem('callback', window.location.href);
    window.location.href = '/login';
  };

  const hasAnID = ostate.user.uid || ostate.user.discordID;

  const [nextStepOpen, setNextStepOpen] = useState(false);


  return (
    <div className="px-2 lg:px-0 w-full">
      <form
        id="tppform"
        name="tppCreate"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value="tppCreate" />
        <div className={`justify-center w-full pb-5 ${!hasAnID ? 'hidden' : ''}`}>
          <div className="appearance-none shadow hover:shadow-lg border-2 border-gray-100 hover:border-brand1 bg-white ring-8 ring-brand1-light ring-opacity-30 mt-1 py-1 lg:py-3 px-4 rounded-xl focus:outline-none">
            <div className="flex w-full focus:outline-none focus:ring-1 focus:ring-brand1">
              <span
                className="flex items-center py-3 pr-3 text-lg">🔗</span>
              <input
                required
                value={formURL}
                onChange={(e) => setFormURL(e.target.value)}
                id="form_url"
                name="contentUrl"
                placeholder="Paste a link that you wanna token gate."
                className="appearance-none w-full font-heading font-medium text-xs lg:text-md focus:outline-none"
              />
              <span onClick={() => {
                setNextStepOpen(true);
              }}
                className="cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center shadow-lg bg-brand1 hover:shadow-sm px-4 lg:px-10 rounded-lg font-semibold text-sm lg:text-md text-white font-heading">
                <div
                >Next</div>
              </span>
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
          <div className={`justify-center w-full pb-5 ${!hasAnID ? 'hidden' : ''}`}>
            <h3 className="pt-4 text-left font-semibold font-heading text-lg flex justify-start">
              Title (short description)
            </h3>
            <input
              required
              onChange={(e) => setLinkTitle(e.target.value)}
              id="linkTitle"
              name="linkTitle"
              placeholder="Check out this exclusive content!"
              className="mb-1 appearance-none shadow-sm hover:shadow-lg bg-white border border-gray-200 mt-1 p-2 font-body text-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
            />
          </div>

          <h3 className={`pb-2 text-left font-semibold font-heading text-lg flex justify-start ${router.query.tid && 'hidden'}`}>
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
