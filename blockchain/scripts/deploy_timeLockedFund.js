// scripts/deploy_timeLockedFund.js
const { ethers } = require("hardhat");

async function main() {
  const TimeLockedFund = await ethers.getContractFactory("TimeLockedFund");
  const timeLocked = await TimeLockedFund.deploy();
  await timeLocked.deployed();
  console.log("TimeLockedFund deployed to:", timeLocked.address);
}

main().catch(console.error);
