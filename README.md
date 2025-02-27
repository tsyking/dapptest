# my-dapp-project

这是一个简单的去中心化应用（DApp），用于连接MetaMask钱包，查询以太坊余额和执行以太坊转账。

## 项目结构

```
my-dapp-project
├── src
│   ├── index.html        # 应用的主HTML文件
│   ├── app.js            # 应用的入口文件
│   ├── styles.css        # 应用的样式文件
│   ├── components        # 组件目录
│   │   ├── connectWallet.js  # 连接MetaMask钱包的功能
│   │   ├── checkBalance.js   # 查询以太坊余额的功能
│   │   └── transferEther.js   # 执行以太坊转账的功能
├── package.json          # npm配置文件
└── README.md             # 项目文档
```

## 安装依赖

在项目根目录下运行以下命令以安装依赖：

```
npm install
```

## 运行项目

在项目根目录下运行以下命令以启动应用：

```
npm start
```

## 使用说明

1. 打开浏览器并确保已安装MetaMask扩展。
2. 点击“连接钱包”按钮以连接您的MetaMask钱包。
3. 使用“查询余额”按钮查看当前钱包地址的以太坊余额。
4. 输入接收者地址和转账金额，点击“转账”按钮以执行以太坊转账。

## 贡献

欢迎任何形式的贡献！请提交问题或拉取请求。