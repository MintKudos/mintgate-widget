import {useState, useEffect} from "react";
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

    const onValueChange = (e, newValue) => {
      if(typeof newValue === "string" && options && newValue.charAt(0) !== "0") {
        newValue = newValue.toUpperCase();
        const obj = options.find((elem) => elem.symbol === newValue);
        if (obj) {
          newValue = obj.address;
          localStorage.set('symbol', newValue.symbol); 
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

      setTokenAddress(addr);

    }

    


  return(
    <>
    <div key={userSelectedType}>
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
                <select 
                id="form_ttype"
                name="tokenType"
                value={userSelectedType}
                onChange={onTypeChange}
                className="font-body font-medium select select-bordered w-full label-text">
                  <option value="1">MintGate NFT</option> 
                  <option value="20">ERC-20 Tokens</option> 
                  <option value="721">NFT (ERC-721 Tokens)</option> 
                  <option value="1155">NFT (ERC-1155 Multi Asset Tokens)</option> 
                  <option value="2">Moloch V2 Shares</option>
                  <option value="-1">Ethereum Balance</option>
                </select>
              </div>

              <div className="flex justify-between space-x-4">

              {/*Token Address */}
            {userSelectedType === "20" ? (
              <div className="w-1/2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Token Address</span>
                  </label> 
                  <input value={tokenAddress} className="font-body font-medium input label-text input-bordered" />
                </div>
              </div>
            ) : null
            }

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
          </div>
          </>
  );
}

export default TPPFormTokenPanel