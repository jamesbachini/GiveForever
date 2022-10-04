/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.17" },
      { version: "0.7.6" },
      { version: "0.6.6" }
    ]
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.USER1_PRIVATE_KEY,],
    },
    local: {
      url: `http://127.0.0.1:8545`,
      accounts: [process.env.USER1_PRIVATE_KEY,],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 100000000
  },
};