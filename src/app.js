const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

// Set Web3 provider to our local Ganache (on port 7545)
const provider = new Web3.providers.HttpProvider('http://localhost:7545');

const web3 = new Web3(provider);

// Retrieve ethereum account from our provider
const { accounts } = web3.eth;
console.log('Accounts:');
console.log(accounts);
console.log('--------------------------------------\n');


// Get balance from the first account
const balanceBigNumber = web3.eth.getBalance(accounts[0]);
console.log('Balance of the first account:');
console.log(balanceBigNumber);
console.log('--------------------------------------\n');


// Convert the balance from "big number" to "wei"
const balanceWei = balanceBigNumber.toNumber();
console.log('Balance of the first account (wei):');
console.log(balanceWei);
console.log('--------------------------------------\n');


// Convert the balance from "wei" to "ether"
const balanceEth = web3.fromWei(balanceWei, 'ether');
console.log('Balance of the first account (eth):');
console.log(balanceEth);
console.log('--------------------------------------\n');


// Read the contract file "greetings.sol"
const contractSource = fs.readFileSync('contracts/greetings.sol').toString();
console.log('Contract source:');
// console.log(contractSource);
console.log('--------------------------------------\n');


// Compile the contract
const compiledCode = solc.compile(contractSource);
console.log('Contract compiled:');
// console.log(compiledCode);
console.log('--------------------------------------\n');


// ?
const contractABI = JSON.parse(compiledCode.contracts[':GreetingsFactory'].interface);
const greetingsContract = web3.eth.contract(contractABI);
// console.log(greetingsContract);
console.log('--------------------------------------\n');


// Create contract on the blockchain
const byteCode = compiledCode.contracts[':GreetingsFactory'].bytecode;
const greetingsDeployed = greetingsContract.new({
  data: byteCode,
  from: web3.eth.accounts[0],
  gas: 4700000
});
console.log('greetingsDeployed:');
// console.log(greetingsDeployed);
console.log('--------------------------------------\n');

console.log('transactionHash:');
console.log(greetingsDeployed.transactionHash);
console.log('--------------------------------------\n');


//
const greetingsInstance = greetingsContract.at(greetingsDeployed.address);
console.log('greetingsInstance:');
console.log(greetingsInstance);
const test = greetingsInstance.getGreetings();
// console.log(test.toString());
console.log('--------------------------------------\n');

