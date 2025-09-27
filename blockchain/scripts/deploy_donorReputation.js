// scripts/deploy_donorReputation.js
const { ethers } = require("hardhat");

async function main() {
  const DonorReputation = await ethers.getContractFactory("DonorReputation");
  const donorReputation = await DonorReputation.deploy();
  await donorReputation.deployed();
  console.log("DonorReputation deployed to:", donorReputation.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
