import axios from "axios";
import web3 from "../ethereum/web3";

let config;
const getConfig = async () => {
  if (config) return Promise.resolve(config);
  else {
    config = await axios
      .get(
        "https://raw.githubusercontent.com/gravitt8460/bc_config/master/config.json"
      )
      .then(res => res.data);
    return config;
  }
};

export const getConsortiumContract = async () => {
  const conf = await getConfig();
  const abi = conf.consortium_abi;
  const address = conf.consortium_address;
  return new web3.eth.Contract(abi, address);
};

export const getBCDEContract = async () => {
  const conf = await getConfig();
  const abi = conf.bcde_abi;
  const address = conf.bcde_address;
  return new web3.eth.Contract(abi, address);
};

export const getRegistryContract = async () => {
  const conf = await getConfig();
  const abi = conf.registry_abi;
  const address = conf.registry_address;
  return new web3.eth.Contract(abi, address);
};
