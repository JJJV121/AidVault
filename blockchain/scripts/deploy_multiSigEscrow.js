// scripts/deploy_multiSigEscrow.js
const { ethers } = require("hardhat");

async function main() {
  const [admin1, admin2, admin3] = await ethers.getSigners();
  const admins = [admin1.address, admin2.address, admin3.address];
  const requiredApprovals = 2;

  const MultiSigEscrow = await ethers.getContractFactory("MultiSigEscrow");
  const multiSig = await MultiSigEscrow.deploy(admins, requiredApprovals);
  await multiSig.deployed();
  console.log("MultiSigEscrow deployed to:", multiSig.address);
}

main().catch(console.error);
