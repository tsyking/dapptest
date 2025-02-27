import Web3 from 'web3';

export default async function transferEther(to, amount) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];

    const transactionParameters = {
        to,
        from,
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
    };

    try {
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        return '转账成功';
    } catch (error) {
        console.error('转账失败', error);
        return '转账失败';
    }
}