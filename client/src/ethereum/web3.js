import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    // "https://rinkeby.infura.io/xEqvuZ5Z3dnG1FzJ5XYr" /* vishal */
    // "http://18.219.213.49:8545/"
    "http://18.217.227.228:8545/" /* now using rinkby internally */
  );

  web3 = new Web3(provider);
}

export default web3;
