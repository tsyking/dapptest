const connectWallet = require('./components/connectWallet');
const checkBalance = require('./components/checkBalance');
const transferEther = require('./components/transferEther');

async function initApp() {
    // 连接MetaMask钱包
    const walletAddress = await connectWallet();
    if (!walletAddress) {
        console.error('未连接钱包');
        return;
    }

    console.log(`连接的地址: ${walletAddress}`);

    // 查询以太坊余额
    const balance = await checkBalance(walletAddress);
    console.log(`当前余额: ${balance} ETH`);

    // 示例转账操作
    const recipientAddress = '0xRecipientAddress'; // 替换为实际接收者地址
    const amount = '0.01'; // 转账金额
    const transferResult = await transferEther(recipientAddress, amount);
    console.log(transferResult);
}

window.onload = initApp;