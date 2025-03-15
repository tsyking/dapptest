// 初始化Web3
let web3;
const contractAddress = '0x11f2790DdCB3e48A2e20b64A1F7C3f605521Adea';
let contractABI;

// 同步加载ABI文件
async function loadABI() {
  try {
    const response = await fetch('./abi.json');
    if (!response.ok) throw new Error(`HTTP错误 ${response.status}`);
    contractABI = await response.json();
    await initApp();
  } catch (error) {
    console.error('ABI加载失败:', error);
    alert(`加载ABI失败: ${error.message}`);
  }
}

// 页面加载时立即加载ABI
loadABI();

// 自动连接钱包


// 初始化应用
function initApp() {
  // 自动连接钱包
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    (async () => {
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        updateButtonState(true, accounts[0]);
      } catch (error) {
        console.error('用户拒绝连接');
      }
    })();
  } else {
    alert('请安装MetaMask!');
  }

  // 先移除旧的事件监听器
  const newConnectButton = document.getElementById('connectButton').cloneNode(true);
  document.getElementById('connectButton').replaceWith(newConnectButton);

  // 连接按钮事件
  newConnectButton.addEventListener('click', async () => {
    if (web3 && web3.eth.accounts.wallet.length > 0) {
      web3.eth.accounts.wallet.clear();
      web3 = null;
      updateButtonState(false);
      addTransactionLog('已断开钱包连接');
    } else {
      await connectWallet();
    }
  });
  
  // 铸造按钮事件
  document.getElementById('mintButton').addEventListener('click', async () => {
    const amount = document.getElementById('mintAmount').value;
    if (!amount || amount <= 0) {
      alert('请输入有效数量');
      return;
    }
    
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const transaction = contract.methods.mint(web3.utils.toWei(amount, 'ether'));
      
      // 发送交易
      const receipt = await transaction.send({ from: accounts[0] });
      
      // 更新界面
      addTransactionLog(`成功铸造 ${amount} 代币`);
      updateTotalMinted();
    } catch (error) {
      console.error('铸造失败:', error);
      alert('交易失败，请查看控制台');
    }
  });
}

// 钱包连接函数
async function connectWallet() {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    updateButtonState(true, accounts[0]);
    initApp();
  } catch (error) {
    console.error('连接失败:', error);
  }
}

// 更新按钮状态
function updateButtonState(connected, account) {
  const button = document.getElementById('connectButton');
  const formattedAddress = account && account.length >= 10 
    ? `${account.slice(0,6)}...${account.slice(-4)}` 
    : '连接钱包';
  button.textContent = connected ? formattedAddress : '连接钱包';
  button.style.background = connected 
    ? 'linear-gradient(45deg, #27ae60, #219a52)' 
    : 'linear-gradient(45deg, #2ecc71, #1abc9c)';
}

// 添加交易记录
function addTransactionLog(message) {
  const logDiv = document.createElement('div');
  logDiv.textContent = `🔖 ${new Date().toLocaleString()} - ${message}`;
  document.getElementById('transactionList').prepend(logDiv);
}

// 更新总铸造量
async function updateTotalMinted() {
  if (!web3) return;
  try {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const total = await contract.methods.totalSupply().call();
    document.getElementById('totalMinted').textContent = 
      web3.utils.fromWei(total, 'ether');
  } catch (error) {
    console.error('获取总数失败:', error);
  }
}

// 定期更新数据
setInterval(updateTotalMinted, 15000);

// 添加钱包地址变更监听
window.ethereum.on('accountsChanged', (accounts) => {
  if (accounts.length > 0) {
    updateButtonState(true, accounts[0]);
  } else {
    updateButtonState(false);
  }
});