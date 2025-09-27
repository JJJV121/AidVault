// scripts/interact_donationMatcher.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedContractAddress";
  const DonationMatcher = await ethers.getContractFactory("DonationMatcher");
  const matcher = DonationMatcher.attach(contractAddress);

  const [donor] = await ethers.getSigners();

  await matcher.connect(donor).donate({ value: ethers.utils.parseEther("1") });
  console.log("💸 Donation made and matched by contract");
}

main().catch(console.error);
