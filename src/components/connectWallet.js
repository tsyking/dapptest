import Web3 from 'web3';

export default async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum); // 初始化 Web3 实例
            return accounts[0];
        } catch (error) {
            console.error('连接钱包失败', error);
            return null;
        }
    } else {
        alert('请安装 MetaMask!');
        return null;
    }
}