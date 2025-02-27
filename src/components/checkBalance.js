export const checkBalance = async (provider) => {
    try {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            throw new Error('请连接钱包');
        }

        const balance = await provider.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
        });

        return parseFloat(balance) / Math.pow(10, 18); // 转换为以太币
    } catch (error) {
        console.error(error);
        throw new Error('查询余额失败');
    }
};