import React, { useState, useEffect } from "react";
import { useOvermind, getNetworkDisplay } from "../../stores/Overmind";
import Link from "next/link";
import TPPList from "../tpp/TPPList";
import { TextField, CircularProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const cache = {};
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://link.mintgate.app`;
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  ignoreCase: true,
  stringify: option => {
    return option.symbol
  }
});

function TPPFormPanelToken({
  amount, setAmount,
  setTokenAddress, tokenAddress,
  hasAnID,
  preselect,
  platformTokenData,
  userSelectedType,
  setUserSelectedType,
  setNetwork,
  network,
  setSubid
}) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { state: ostate, actions } = useOvermind();
  const isEth = network === "1" || network === 'mainnet' || network === 'homestead';
  const isMatic = network === "137" || network === 'Matic';

  const valueIsPlatformToken = (e) => {
    setTokenAddress(e.target.value);
  };

  async function getMaticTokens() {
    if (cache.matic) return cache.matic;
    const x = await fetch(
      `${TPP}/chain.json?chain=137`
    ).then((x) => x.json());

    const tokens = x.tokens;
    return cache.matic = tokens;
  }

  async function getEthTokens() {
    if (cache.eth) return cache.eth;
    const x = await fetch(
      "https://tokens.coingecko.com/uniswap/all.json"
    ).then((x) => x.json());
    const tokens = x.tokens;
    tokens.push({
      chainId: 1,
      address: "0xDB7eB3edE973665b1BB9F3016861E3255062E4ED",
      name: "MagNFT",
      symbol: "MNFT",
      decimals: 4,
      logoURI:
        "https://roll-token.s3.amazonaws.com/MNFT/90f0a6d6-b100-40eb-a06f-ce72311ebca9",
    });
    tokens.push({
      chainId: 1,
      address: "0x61df1fd3454185a66b03c27f84ffb7e4d478553e",
      name: "JUNTO",
      symbol: "JUNTO",
      decimals: 4,
    });
    tokens.push({
      chainId: 1,
      address: "0x7732abae70c3b9319e27fa2ceae509f538d8e94f",
      name: "Camel",
      symbol: "CAMEL",
      decimals: 4,
    });
    return cache.eth = tokens;
  }

  useEffect(async () => {
    console.log('network', network)
    if (!open) {
      setIsLoading(false);
      return;
    }

    if (userSelectedType !== "20") {
      setOptions([]);
      return;
    }

    if (isLoading) { //  || options.length > 0
      return;
    }

    setIsLoading(true);

    let tokens = [];
    if (isEth) tokens = await getEthTokens();
    else if (isMatic) tokens = await getMaticTokens();

    tokens = tokens.map(x => {
      return { ...x, symbol: x.symbol + ' ' + x.address.slice(0, 6) + '…' };
    })

    setOptions(tokens);
    setIsLoading(false);
  }, [open, userSelectedType, network]);

  const onTypeChange = (e) => {
    setUserSelectedType(e.target.value);
  };

  const onValueChange = (e, newValue) => {
    if (typeof newValue === "string" && options && newValue.charAt(0) !== "0") {
      newValue = newValue.toUpperCase();
      const obj = options.find((elem) => elem.symbol === newValue);
      if (obj) {
        newValue = obj.address;
        localStorage.setItem('symbol', newValue.symbol);
        console.log("found", obj);
      }
    }

    let addr;

    if (newValue && newValue.address) {
      addr = newValue.address;
    } else {
      addr = newValue;
    }
    if (addr && addr.indexOf("0x") === -1) {
      return;
    }

    // console.log('addr', addr)

    setTokenAddress(addr);
  };

  let selectDisplay;

  //input: value={amount === 3 ? undefined : amount}
  if (
    userSelectedType === "1" &&
    platformTokenData &&
    hasAnID
  ) {
    selectDisplay = (
      <>
        <div className="w-full mb-4">
          <label className="block text-sm font-body font-medium text-mg-black">Token</label>
          <label className="sr-only">Select Token</label>
          <select
            onClick={valueIsPlatformToken}
            defaultValue={preselect || "DEFAULT"}
            required className="mt-1 w-full block border border-gray-200 shadow-sm hover:shadow-md pl-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm rounded-md">
            {!preselect && <option value="DEFAULT" disabled hidden>Select Token</option>}
            {platformTokenData ? (
              platformTokenData
                .map((symbol, i) => (
                  <option
                    key={symbol.tid}
                    name={symbol.tid}
                    value={symbol.tid}
                    className="font-body text-sm"
                  >
                    {symbol.isnft ? `${symbol.name}` : symbol.tid}
                  </option>
                ))
            ) : (
              ''
            )}
          </select>
        </div>
      </>
    );
  }

  if (hasAnID && !platformTokenData) {
    selectDisplay = (
      <>
        <div className="flex-col justify-center mb-6 mx-auto">
          <h3 className="ml-3 text-left font-semibold font-body text-sm mb-1">
            Create an MintGate NFT
          </h3>

          <Link href="/create_token">
            <button className="ml-3 h-10 items-center px-4 py-2 border bg-white border-gray-200 rounded-md shadow hover:shadow-lg text-sm font-body font-medium text-mg-black hover:border-brand1 focus:outline-none focus:ring-2 focus:bg-indigo-400 focus:text-white focus:ring-offset-2 focus:ring-indigo-400">
              Create Token
            </button>
          </Link>
        </div>
      </>
    );
  }

  if (
    userSelectedType !== "1" &&
    userSelectedType !== "-1" &&
    hasAnID
  ) {
    // const optionsList = options.filter()

    selectDisplay = (
      <>
        <h3 className="text-left font-medium font-body text-sm flex justify-start mb-2">
          Select Token & Minimum Amount
        </h3>
        <select
          id="network"
          name="network"
          value={network}
          // defaultValue={'1'}
          onChange={e => setNetwork(e.target.value)}
          className="appearance-none shadow-sm mb-4 bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
        >
          <option value="1">Ethereum Mainnet</option>
          <option value="100">xDAI</option>
          <option value="137">Matic</option>
          <option value="122">Fuse</option>
          <option value="42">Ethereum Kovan</option>
          <option value="3">Ethereum Ropsten</option>
          <option value="4">Ethereum Rinkeby</option>
          <option value="5">Ethereum Goerli</option>
        </select>

        <div className="flex flex-row">


          <Autocomplete
            filterOptions={filterOptions}
            id="form_address"
            freeSolo={true}
            autoSelect={false}
            autoHighlight={true}
            autoComplete={true}
            clearOnBlur={false}
            options={options}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            loading={isLoading}
            getOptionSelected={(option, value) =>
              option.symbol === value.symbol
            }
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.symbol
            }
            renderOption={(option) => (
              <span className="font-body ml-3">{option.symbol}</span>
            )}
            value={tokenAddress}
            onChange={onValueChange}
            onInputChange={onValueChange}
            style={{ width: 220 }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                className="appearance-none shadow-sm bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
                label="Token name/addr"
                inputProps={{
                  autoComplete: "new-password",
                  ...params.inputProps,
                }}
              />
            )}
          />
          <div className="flex justify-end pl-2 pb-5">
            <input
              id="form_balance"
              name="numberOfToken"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="3 Tokens"
              className="appearance-none shadow-sm hover:shadow-lg bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md mb-1"
            />
          </div>
        </div>
      </>
    );
  }

  if (userSelectedType === "-1" && hasAnID) {
    selectDisplay = (
      <>
        <div className="w-64 justify-center pb-5">
          <h3 className="text-left font-medium font-body text-sm tracking-wide flex justify-start mb-2">
            Select Network
          </h3>
          <select
            id="network"
            name="network"
            value={network}
            onChange={e => setNetwork(e.target.value)}
            className="appearance-none shadow-sm mb-4 bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
          >
            <option value="1">Ethereum Mainnet</option>
            <option value="100">xDAI</option>
            <option value="137">Matic</option>
            <option value="122">Fuse</option>
            <option value="42">Ethereum Kovan</option>
            <option value="3">Ethereum Ropsten</option>
            <option value="4">Ethereum Rinkeby</option>
            <option value="5">Ethereum Goerli</option>
          </select>
          <h3 className="text-left font-medium font-body text-sm tracking-wide flex justify-start mb-2">
            Select Minimum Amount
          </h3>
          <div className="flex flex-row">
            <div className="flex justify-end">
              <input
                id="form_balance"
                name="numberOfToken"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.1"
                className="appearance-none shadow-sm hover:shadow-lg bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div key={userSelectedType}>

      <div className={`justify-center pb-5 ${!hasAnID ? 'hidden' : ''}`}>
        <h3 className="text-left font-medium font-body text-sm flex justify-start">
          Select Token Type
        </h3>
        <select
          id="form_ttype"
          name="tokenType"
          value={userSelectedType} // [needed for deep links] I think this is the only necessary value for ttype in the form submit; the option values don't seem to be in use.
          onChange={onTypeChange}
          className="appearance-none shadow-sm hover:shadow-lg bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
        >
          <option value="1">MintGate NFTs</option>
          <option value="20">ERC-20 tokens</option>
          <option value="721">NFT ERC-721 collectibles</option>
          <option value="1155">ERC-1155 multi-asset tokens</option>
          <option value="2">Moloch-V2 Shares</option>
          <option value="-1">{getNetworkDisplay(network)} Balance</option>
        </select>
      </div>

      {(userSelectedType === "721" || userSelectedType === "1155") && (
        <p className="pb-5">
          <a
            href="https://opensea.io/account"
            target="_blank"
            className="no-underline font-body text-sm font-medium text-mg-black ml-3 hover:underline hover:text-purple-500"
          >
            🔗 Find your token info
          </a>
          <a
            href="https://www.youtube.com/watch?v=QLi4sgRE7tY&feature=youtu.be"
            target="_blank"
            className="no-underline font-body text-sm font-medium text-mg-black ml-3 hover:underline hover:text-purple-500"
          >
            🔗 NFT link tutorial video
          </a>
        </p>
      )}
      <div className="flex flex-wrap min-w-full">
        {selectDisplay}

        {(userSelectedType === "1") && (
          <div className="font-medium font-body text-sm justify-start">
            Minimum Amount
            <input
              id="form_balance"
              name="numberOfToken"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.1"
              className="appearance-none shadow-sm hover:shadow-lg bg-white border border-gray-200 mt-1 p-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full rounded-md"
            />
          </div>
        )}
        {userSelectedType === "20" ? (
          <>
            <div className="flex justify-start pb-5 mr-4 w-full">
            </div>
          </>
        ) : null}

        {userSelectedType === "1155" ? (
          <>
            <div className="flex justify-start pb-5 mr-4 w-full">
              <input
                name="subid"
                id="subid"
                onChange={(e) => setSubid(e.target.value)}
                placeholder="1155 Token ID"
                className="leading-tight font-body bg-white text-sm appearance-none border border-gray-200 shadow-sm hover:shadow rounded-md w-full p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent pt-3 pb-3 mt-1 tracking-wide mb-3"
              />
            </div>
          </>
        ) : null}
        {userSelectedType === "721" ? (
          <>
            <div className="flex justify-start pb-5 mr-4 w-full">
              <input
                name="tokenid"
                id="tokenid"
                onChange={(e) => setSubid(e.target.value)}
                placeholder="721 Token ID"
                className="font-body text-sm bg-white appearance-none border border-gray-200 shadow-sm hover:shadow-md rounded-md w-full p-2 placeholder-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent pt-3 pb-3 mt-1 tracking-wide mb-3"
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

module.exports = TPPFormPanelToken;

export default TPPFormPanelToken;