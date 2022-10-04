import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from './GiveForeverABI.json';

const contractAddress = '0xf0a8B14F0A9Ae12c994872028d3B520D303A8F68'; // Goerli & Mainnet
let provider = new ethers.providers.Web3Provider(window.ethereum);
let contract = new ethers.Contract(contractAddress, contractABI, provider);
let signer;

function App() {
  const [donated,setDonated] = useState(0);
  const [lidoBalance,setLidoBalance] = useState(0);
  const [surplus,setSurplus] = useState(0);
  const [connectionSatus,setConnection] = useState('Not Connected');

  const connect = async () => {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    const userAddress = await signer.getAddress();
    const networkData = await provider.getNetwork();
    let networkName = 'unknown';
    if (networkData.chainId === 1) networkName = 'mainnet';
    if (networkData.chainId === 5) networkName = 'goerli';

    console.log(userAddress);
    setConnection(`Connected to ${networkName} ${userAddress}`);
    updateBalances();
  }

  const deposit = async () => {
    let userAmount = document.getElementById('deposit-amount').value;
    const weiAmount = ethers.utils.parseEther(userAmount);
    const tx = await contract.deposit({ value: weiAmount });
    await tx.wait();
    updateBalances();
  }

  const withdraw = async () => {
    await contract.withdraw();
    updateBalances();
  }

  const updateBalances = async () => {
    const donated = await contract.donated();
    setDonated(ethers.utils.formatEther(donated));
    const lidoBalance = await contract.lidoBalance();
    setLidoBalance(ethers.utils.formatEther(lidoBalance));
    const surplus = lidoBalance.sub(donated);
    setSurplus(ethers.utils.formatEther(surplus));
  }

  setTimeout(() => {
    updateBalances();
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <h1><span className="blue">Give</span>Forever</h1>
        <p>
          A perpetual vault for charity donation
        </p>
        <div className="App-body">
          <div className="App-balances">
            Donated: {donated} ETH<br />
            Balance: {lidoBalance} ETH<br />
            Surplus: {surplus} ETH<br />
          </div>
          <div className="App-button-box">
            <div className="App-connection">
              {connectionSatus}
            </div>
            <button onClick={connect}>CONNECT</button>
          </div>
          <div className="App-button-box">
            <input type="text" id="deposit-amount" placeholder="ETH" /><br />
            <button onClick={deposit}>DEPOSIT</button>
          </div>
          <div className="App-button-box">
            <button onClick={withdraw}>WITHDRAW</button>
          </div>
          <div className="App-contract">
            Contract <a href="https://etherscan.io/address/0xf0a8B14F0A9Ae12c994872028d3B520D303A8F68" target="_blank">0xf0a8B14F0A9Ae12c994872028d3B520D303A8F68</a>
          </div>
      </div>
      </header>
    </div>
  );
}

export default App;
