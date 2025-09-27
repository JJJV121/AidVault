// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const DonationNFT = await ethers.getContractFactory("DonationNFT");
  const donationNFT = await DonationNFT.deploy();

  await donationNFT.deployed();

  console.log("DonationNFT deployed to:", donationNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
