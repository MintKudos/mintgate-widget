import React, {useState, useEffect} from "react";
import {createFilterOptions} from '@material-ui/lab/Autocomplete';

const cache = {};
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || 'https://mgate.io';
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  ignoreCase: true,
  stringify: option => {
    return option.symbol
  }
}
);

function TPPFormTokenPanel({ 
  amount, setAmount,
  setTokenAddress, tokenAddress,
  userSelectedType,
  setUserSelectedType,
  setNetwork,
  network,
  setSubid
}) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    let tokens = [];
    if (isEth) tokens = await getEthTokens();
    else if (isMatic) tokens = await getMaticTokens();

    tokens = tokens.map(x => {
      return { ...x, symbol: x.symbol + ' ' + x.address.slice(0,6) + '...'};
    })

    setOptions(tokens);
    setIsLoading(false);
  }, [open, userSelectedType, network]);

    const onTypeChange = (e) => {
      setUserSelectedType(e.target.value);
    };

    const onValueChange = (e) => {
      if (userSelectedType == "1") {
        setTokenAddress((e.target.value).toUpperCase)
      }
      setTokenAddress(e.target.value);
    };

    let selectDisplay;

    if (userSelectedType !== "1" &&
    userSelectedType !== "-1")

    {
      selectDisplay = (
        <>
          <div className="w-full">
                <label className="label">
                  <span className="label-text">Network</span>
                </label> 
                <select 
                id="form_ttype"
                name="tokenType"
                value={network}
                onChange={e => setNetwork(e.target.value)}
                className="font-body font-medium select select-bordered w-full label-text">
                  <option value="1">Ethereum Mainnet</option> 
                  <option value="100">xDai</option> 
                  <option value="137">Matic</option> 
                  <option value="122">Fuse</option> 
                  <option value="42">Ethereum Kovan</option>
                  <option value="3">Ethereum Ropsten</option>
                  <option value="4">Ethereum Rinkeby</option>
                  <option value="5">Ethereum Goerli</option>
                </select>
              </div>
        </>
      )
    }

  return(
    <>
    <div key={userSelectedType} className="mt-4 card">
          <label className="label">
              <span className="font-heading font-semibold label-text">Set Gated Link Details</span>
            </label> 
          <div className="card bg-base-200 shadow-lg w-full ">
            <div className="card-body space-y-4">
              {/* Select Token Type */}
              <div>
                <label className="label">
                  <span className="label-text">Token Type</span>
                </label> 
                <select 
                id="form_ttype"
                name="tokenType"
                value={userSelectedType}
                onChange={onTypeChange}
                className="font-body font-medium select w-full select-bordered label-text">
                  <option value="1">MintGate NFT</option> 
                  <option value="20">ERC-20 Tokens</option> 
                  <option value="721">NFT (ERC-721 Tokens)</option> 
                  <option value="1155">NFT (ERC-1155 Multi Asset Tokens)</option> 
                  <option value="2">Moloch V2 Shares</option>
                  <option value="-1">Ethereum Balance</option>
                </select>
              </div>

              {selectDisplay}
              <div className="flex flex-col lg:flex-row space-x-4">
              
              {/*Token Address */}
            {userSelectedType === "20" || userSelectedType === "721" || userSelectedType === "1155" ||
            userSelectedType === "2"   ? (
              <div className="flex w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Token Address</span>
                  </label> 
                  <input 
                  value={tokenAddress} 
                  onChange={onValueChange}
                  className="font-body font-medium input w-full label-text input-bordered" />
                </div>
              </div>
            ) : null
            }

            {userSelectedType === "1" ? (
              <div className="flex  w-full ">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Token Name</span>
                  </label> 
                  <input 
                  value={tokenAddress} 
                  onChange={onValueChange}
                  onInputChange={onValueChange}
                  className="font-body font-medium input label-text input-bordered" />
                </div>
              </div>
            ) : null
            }

            {userSelectedType === "721" ? (
              <>
              <div className="flex  w-full ">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Token ID</span>
                  </label> 
                  <input type="number" placeholder="721 Token ID" className="font-body font-medium input label-text input-bordered" />
                </div>
              </div>
              </>
            ): null}

            {userSelectedType === "1155" ? (
              <>
              <div className="flex w-full ">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Token ID</span>
                  </label> 
                  <input type="number" 
                  name="subid"
                  id="subid"
                  onChange={(e) => setSubid(e.target.value)}
                  placeholder="1155 Token ID" 
                  className="font-body font-medium input label-text input-bordered" />
                </div>
              </div>
              </>
            ): null}  
              </div>
              {/* Enter Minimum Amount */}
              <div className="flex  w-full ">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Minimum Amount</span>
                  </label> 
                  <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1" 
                  className="font-body font-medium input label-text input-bordered" />
                </div>
              </div>
            </div>
          </div>
          </div>
          </>
  );
}

export default TPPFormTokenPanel