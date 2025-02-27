function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log('连接成功，当前账户:', accounts[0]);
            })
            .catch(error => {
                console.error('连接失败:', error);
            });
    } else {
        console.log('请安装MetaMask!');
    }
}

export default connectWallet;