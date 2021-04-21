import { createOvermind } from "overmind";
import { createHook } from "overmind-react";
import * as Roll from "../utils/Roll";
import * as Wallet from "../utils/Web3Wallet";

export const useOvermind = createHook();

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://link.mintgate.app`;

const DEFAULT_STATE = {
  application: {
    walletConnectModal: false,
    redirectTo: null,
  },
  currentStep: 1,
  twitter: {
    username: null,
    uid: null,
  },
  user: {
    discordID: null,
    loggedIn: null,
    hasNeverLoggedIn: null,
    isAuthenticated: false,
    uid: null,
    username: '',
    photo: null,
    wallets: {
      address: null,
      balance: null,
      signature: null,
      hasAccess: false,
    },
    tokens: [],
    balances: [],
  },
  network: "homestead", // "mainnet",
  walletTrigger: 0,
};

var DEFAULT_ACTIONS = {
  async refreshUser({ state, actions }, symbol) {
    if (!symbol) return;
    let user = await Wallet.getTokenBalance(symbol);
    //console.log("User after web3 check", user);
    if (!user) user = await Roll.getUserData();
    //console.log("User after Roll check", user);

    state.user.isAuthenticated = true;
    actions.updateUser(user);
    //console.log("Final user in ostate", user);
  },


  async getTokens({ state, actions }, uid) {
    uid = uid || state.user.uid;
    if (!uid) return;

    let url = `${TPP}/api/tokens?uid=${uid}`;
    if (state.user.wallets.address) {
      url += `&address=${state.user.wallets.address}`
    }
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    //console.log('OM data /api/tokens?uid=', data);
    const tokens = data.tokens; //.filter(t => t.owner);
    state.user.tokens = tokens;
    state.user.photo = data.profile.photo;
    // state.user.username = data.profile.dname || data.profile.twittername;
  },

  logOut({ state }, forceAll) {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    if (forceAll) {
      localStorage.removeItem('callback');
      localStorage.removeItem('referral');
      localStorage.removeItem('referralExpire');
    }
    state.user = { loggedIn: false, wallets: {}, balances: [], tokens: [] };
  },
  logIn({ state, actions }, { uid, username }) {
    // console.log('logging in', uid);
    const newUser = uid && state.user.uid !== uid;
    state.user = { ...state.user, uid, username, loggedIn: true, hasNeverLoggedIn: null };
    state.twitter.uid = uid;
    state.twitter.username = username;
    localStorage.setItem('uid', uid);
    localStorage.setItem('username', username);
    if (newUser) actions.getTokens(uid);
  },
  updateUser({ state, actions }, user) {
    if (!user) return;
    const newUser = user.uid && state.user.uid !== user.uid;
    state.user = { ...state.user, ...user };
    if (newUser) actions.getTokens(user.uid);
  },
  updateTwitter({ state }, { username, uid }) {
    if (username) {
      state.twitter.username = username;
      state.user.username = username;
    }
    if (uid) {
      state.twitter.uid = uid;
      state.user.uid = uid;
    }
    console.log('updated id', username, uid);
  },
  updateTokens({ state }, params) {
    const { token, refreshToken, hasAccess } = params;

    // console.log("apiRefreshToken", token, refreshToken, params);
    state.roll.apiToken = token;
    state.roll.apiRefreshToken = refreshToken;
    state.roll.hasAccess = hasAccess;

    if (state.roll.apiToken) {
      state.user.isAuthenticated = true;
    }
  },
  triggerWallet({ state }) {
    state.walletTrigger++;
  },
  syncWallet({ state, actions }, account) {
    state.user.wallets.address = account;
    if (account) actions.getTokens();
    /* if (state.user.wallets.address) {
      state.user.isAuthenticated = true;
    }*/
  },
  syncNetwork({ state }, network) {
    state.network = parseInt(network, 16).toString();
    if (state.network === "1") state.network = "homestead";
    else if (state.network === "2") state.network = "Molochv2 DAO Shares";
    else if (state.network === "100") state.network = "xDai";
    else if (state.network === "122") state.network = "Fuse";
    else if (state.network === "137") state.network = "Matic";
    else if (state.network === "80001") state.network = "Mumbai";
    else if (state.network === "3") state.network = "Ropsten";
    else if (state.network === "4") state.network = "Rinkeby";
    else if (state.network === "5") state.network = "Goerli";
    else if (state.network === "42") state.network = "Kovan";
    console.log("syncNetwork", state.network);
  },
  updateWalletData({ state, actions }, account, balance, signature, hasAccess) {
    account = account || null;
    balance = balance || null;

    // Check for invalid account value
    account = account ? account.toString() : null;

    if (account && account.indexOf("0x") === -1) {
      console.log("===invalid account", account);
      account = null;
      // throw new Error('invalid', JSON.stringify(balance));
    }

    console.log("updateWalletData", account);
    localStorage.setItem("account", account);

    state.user.wallets.address = account;
    state.user.wallets.balance = balance;
    state.user.wallets.signature = signature;
    state.user.wallets.hasAccess = hasAccess;

    if (account) actions.getTokens();

    /*if (state.user.wallets.address) {
      state.user.isAuthenticated = true;
    }*/
  },
  resetBalance({ state }, balance) {
    state.user.balances = balance;
  },
  updateStep({ state }, step) {
    state.currentStep = step;
  },
  updateUsername({ state }, username) {
    state.username = username;
  },
  toggleWalletConnectModal({ state }, url) {
    state.application.walletConnectModal = !state.application
      .walletConnectModal;
    state.application.redirectTo = url;
  },
};

export const overmind = createOvermind(
  {
    state: DEFAULT_STATE,
    actions: DEFAULT_ACTIONS
  },
  {
    devtools: process.env.NODE_ENV !== 'production',
    logProxies: true
  }
);

export const getNetworkDisplay = (val) => {
  if (!val) return 'none';
  val = val && val.toString();
  if (val === "1") return "Ethereum";
  else if (val === "2") return "Molochv2 DAO Shares";
  else if (val === "100") return "xDai";
  else if (val === "122") return "Fuse";
  else if (val === "137") return "Matic";
  else if (val === "80001") return "Mumbai";
  else if (val === "3") return "Ropsten";
  else if (val === "4") return "Rinkeby";
  else if (val === "5") return "Goerli";
  else if (val === "42") return "Kovan";
}

/*
const getNetworkDisplay = (network) => {
  if (network === 1) return 'ETH';
  else if (network === 100) return 'xDAI';
  else if (network === 122) return 'Fuse';
  else if (network === 137) return 'MATIC';
  else if (network === 80001) return 'Mumbai';
  else if (network === 3) return 'Ropsten';
  else if (network === 4) return 'Rinkeby';
  else if (network === 5) return 'Goerli';
  else if (network === 42) return 'Kovan';
  else throw new Error('Invalid network id ' + network);
}*/