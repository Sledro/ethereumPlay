const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

const web3 = new Web3(
  //new Web3.providers.HttpProvider('https://mainnet.infura.io/xgkzrFPUUo6yHXFPyVnL')
  new Web3.providers.HttpProvider('https://ropsten.infura.io/uNZpIkBeKIopoJs6s41z')
)

const TotalSupplyHex = '0x18160ddd'
const BalanceOfHex = '0x70a08231'
const TransferHex = '0xa9059cbb'

var address = ('0x25515e96470AF895CDD1f6a5ed6B32DDccAD7B91')
var contractAddress = ('0x5E030882F84BDf0C6307eB466518b5Ee0E3B7F47') // erc20 Contract

//const wallet = CreateAccount()
//console.log(wallet)

//GetPoolBalance(contractAddress)
//CheckBalance(address, contractAddress) // erc20 5555 transfer
//GetTransaction('0x844afa7f3b95bcaaa98f257ba8f76d2533ee219334db9ac12bb944bd91c476d1')
// GetTransactionReceipt('0xc836c5301821a13b3996e87e42e71d1c16c5ae64e25516009cee363c66228a1a')
//IsTransactionSuccessful('0x844afa7f3b95bcaaa98f257ba8f76d2533ee219334db9ac12bb944bd91c476d1')


Send(
  '0x651C22A8a8C0B3a8ffB3d41951C6c3164eCBf490', //From Address
  '58546655e15eedf0ffaaa7db385201778f1f89d732c2d1ac89fdff471ef0a0ac', //Private key
  '0xC514f7241B35c2C1B8F1B27384069215FF0b3e30', //To Address
  web3.utils.toWei('1', 'ether'),
  contractAddress)

function CreateAccount() {
  var account = web3.eth.accounts.create(web3.utils.randomHex(32))
  return {
    key: account.privateKey,
    address: account.address
  }
}

async function CheckBalance(address, contractAddress) {
  var tknAddress = (address).substring(2)
  var contractData = (BalanceOfHex + '000000000000000000000000' + tknAddress)
  web3.eth.call({
      to: contractAddress,
      data: contractData
      }, function(err, result) {
  	if (result) {
  		var tokens = web3.utils.toBN(result).toString()
  		console.log('Tokens Owned: ' + web3.utils.fromWei(tokens, 'ether'))
  	}
  	else {
  		console.log(err)
  	}
  })
}

async function GetPoolBalance(contractAddress) {
  var contractData = (TotalSupplyHex + '000000000000000000000000')
  web3.eth.call({
      to: contractAddress,
      data: contractData
      }, function(err, result) {
  	if (result) {
  		var tokens = web3.utils.toBN(result).toString()
  		console.log('Token Pool: ' + web3.utils.fromWei(tokens, 'ether'))
  	}
  	else {
  		console.log(err)
  	}
  })
}

async function GetTransaction(transactionHash) {
  try {
    var transaction = await web3.eth.getTransaction(transactionHash)
    console.log(transaction)
    return transaction
  }
  catch (err) {
    console.log(err)
  }
}

async function GetTransactionReceipt(transactionHash) {
  try {
    var transaction = await web3.eth.getTransactionReceipt(transactionHash)
    console.log(transaction)
    return transaction
  }
  catch (err) {
    console.log(err)
  }
}

async function IsTransactionSuccessful(transactionHash) {
  try {
    var transaction = await web3.eth.getTransactionReceipt(transactionHash)
    console.log(transaction.status)
    return transaction
  }
  catch (err) {
    console.log(err)
  }
}

async function Send(fromAddress, key, toAddress, amount, contractAddress) {
  try {

    var count = await web3.eth.getTransactionCount(fromAddress) //.then(function(v){console.log(v); count = v})
    console.log('count: ' + count)

    var privateKey = new Buffer(key, 'hex')

    // store this in db / cache
    var abiArray = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" } ], "name": "mintToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "burnFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "frozenAccount", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" } ], "name": "freezeAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "8000000000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "Sun Chain" }, { "name": "tokenSymbol", "type": "string", "index": 2, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "SUNC" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" } ], "name": "FrozenFunds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" } ]

    var contract = new web3.eth.Contract(abiArray, contractAddress, {from: fromAddress})

    var rawTransaction = {
      "from": fromAddress,
      "gasPrice": web3.utils.toHex(2 * 1e9),
      "gasLimit": web3.utils.toHex(210000),
      "to": contractAddress,
      "value":"0x0",
      "data":contract.methods.transfer(toAddress, amount).encodeABI(),
      "nonce":web3.utils.toHex(count)
    }

    var transaction = new EthereumTx(rawTransaction)
    transaction.sign(privateKey)
    const signedTransaction = '0x' + transaction.serialize().toString('hex')
    //console.log(signedTransaction)

    const transactionHash = await web3.eth.sendSignedTransaction(signedTransaction)
    console.log(transactionHash)

    contract.methods.balanceOf(fromAddress).call().then(function(balance){console.log(balance)})
  }
  catch (err) {
    console.log(err)
  }
}
