// scripts/interact_timeLockedFund.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedContractAddress";
  const TimeLockedFund = await ethers.getContractFactory("TimeLockedFund");
  const timeLocked = TimeLockedFund.attach(contractAddress);

  const [donor, beneficiary] = await ethers.getSigners();

  await timeLocked.connect(donor).donate(beneficiary.address, 60); // 60 sec lock
  console.log("💰 Donation made with time lock");

  // simulate wait
  console.log("⏳ Wait 60 seconds to release funds...");
}

main().catch(console.error);
