import web3 from "../ethereum/web3";

export async function getAccountAddress() {
  return await web3.eth.getCoinbase();
}

export async function getAccountBalance(address) {
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");
  return balanceEth;
}
