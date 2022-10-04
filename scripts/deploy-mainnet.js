const hre = require('hardhat');

const main = async () => {
  let owner, giveForever;
  [owner] = await ethers.getSigners();
  const charityAddress = '0x7cF2eBb5Ca55A8bd671A020F8BDbAF07f60F26C1';
  const lidoAddress = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84';

  const GiveForever = await ethers.getContractFactory('GiveForever');
  giveForever = await GiveForever.deploy(charityAddress, lidoAddress);
  console.log(`Contract deployed to: ${giveForever.address}`);
};

main();