async function connectWallet() {
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

async function checkBalance(address) {
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
}

async function transferEther(to, amount) {
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

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('请安装 MetaMask!');
        return;
    }

    const connectButton = document.getElementById('connectButton');
    const transferButton = document.getElementById('transferButton');
    const balanceSpan = document.getElementById('balance');

    let walletAddress;

    connectButton.addEventListener('click', async () => {
        console.log('Connect button clicked');
        walletAddress = await connectWallet();
        if (walletAddress) {
            console.log('Wallet connected:', walletAddress);
            const balance = await checkBalance(walletAddress);
            balanceSpan.innerText = balance;
        }
    });

    transferButton.addEventListener('click', async () => {
        console.log('Transfer button clicked');
        const recipient = document.getElementById('recipient').value;
        const amount = document.getElementById('amount').value;
        if (!recipient || !amount) {
            alert('请输入接收者地址和转账金额');
            return;
        }

        const transferResult = await transferEther(recipient, amount);
        alert(transferResult);
    });
});