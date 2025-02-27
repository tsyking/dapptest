import Web3 from 'web3';

export default async function checkBalance(address) {
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
}