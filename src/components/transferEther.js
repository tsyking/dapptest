function transferEther(receiverAddress, amount) {
    if (!window.ethereum) {
        alert("请安装MetaMask钱包");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    signer.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther(amount)
    })
    .then((transaction) => {
        console.log("转账成功:", transaction);
    })
    .catch((error) => {
        console.error("转账失败:", error);
    });
}

export default transferEther;