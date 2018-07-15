import web3 from "../ethereum/web3";
import * as contracts from "./contracts";
import axios from "axios";

export const fetchProducts = async () =>
  axios
    .get("https://damp-savannah-40143.herokuapp.com/api/products")
    .then(res => res.data);

export const fetchProduct = async serial =>
  axios
    .get(`https://damp-savannah-40143.herokuapp.com/api/products/${serial}`)
    .then(res => res.data);

export const createProduct = async product =>
  axios.post("https://damp-savannah-40143.herokuapp.com/api/products", {
    ...product
  });

export const getProposalsCount = async () => {
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods.getProposalLength().call();
};

export const fetchProposals = async () => {
  const count = await getProposalsCount();
  console.log("count = ", count);
  const proposals = await Promise.all(
    Array(parseInt(count, 10))
      .fill()
      .map((element, index) => fetchProposal(index))
  );
  console.log("proposals = ", proposals);
  return proposals;
};

export const fetchProposal = async index =>
  await (await contracts.getConsortiumContract()).methods
    .proposals(index)
    .call();

export const approveProposal = async index => await vote(index, true);

export const rejectProposal = async index => await vote(index, false);

export const vote = async (index, approve) => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods.vote(index, approve).send({
    from: accounts[0]
  });
};

export const processProposal = async index => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods.processProposal(index).send({
    from: accounts[0]
  });
};

/* Add/Remove Member */

export const addMember = async member => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods.proposeAddMember(member).send({
    from: accounts[0]
  });
};

export const removeMember = async member => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods.proposeRemoveMember(member).send({
    from: accounts[0]
  });
};

/* Consortium Member Eligibility */

export const getMinimumEligibilityAmount = async () => {
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods.minimumBalance().call();
};

export const proposeMinimumMemberEligibility = async amount => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods
    .proposeSetMinimumMemberEligibility(amount)
    .send({ from: accounts[0] });
};

/* New Expenditure */

export const proposeExpenditure = async (recipient, amount, memo) => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods
    .proposeSendEther(recipient, web3.utils.toWei(amount, "ether"), memo)
    .send({ from: accounts[0] });
};

/* Diamond Registration Price */

export const getBasePricePerCarat = async () => {
  const registry = await contracts.getRegistryContract();
  return await registry.methods.getBasePricePerCarat().call();
};

export const getPricePower = async () => {
  const registry = await contracts.getRegistryContract();
  return (await registry.methods.getPricePowerx100().call()) / 100;
};

export const proposeBasePrice = async (proposedPrice, proposedPower) => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods
    .proposeSetPriceBase(proposedPrice /*, proposedPower * 100 */)
    .send({ from: accounts[0] });
};

/* Earnings Rate */

export const getEarningsRate = async () => {
  const bcde = await contracts.getBCDEContract();
  return await bcde.methods.getEarningsRatePercent().call();
};

export const proposeEarningsRate = async rate => {
  const accounts = await web3.eth.getAccounts();
  const consortium = await contracts.getConsortiumContract();
  return await consortium.methods
    .proposeSetEarningsRatePercent(rate)
    .send({ from: accounts[0] });
};
