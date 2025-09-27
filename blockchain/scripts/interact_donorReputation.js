// scripts/interact_donorReputation.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedContractAddress";
  const DonorReputation = await ethers.getContractFactory("DonorReputation");
  const donorReputation = DonorReputation.attach(contractAddress);

  const [owner, donor] = await ethers.getSigners();

  await donorReputation.addReputation(donor.address, 5);
  const canDonate = await donorReputation.canDonateHigh(donor.address);
  console.log(`Can donor donate high amount?`, canDonate);
}

main().catch(console.error);
