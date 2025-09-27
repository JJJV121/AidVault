// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
  // Put your deployed contract address here
  const contractAddress = "0xYourDeployedContractAddress";

  const DonationNFT = await ethers.getContractFactory("DonationNFT");
  const donationNFT = DonationNFT.attach(contractAddress);

  // Example donor address (from local accounts)
  const [owner, donor] = await ethers.getSigners();

  // Mint an NFT receipt
  const tx = await donationNFT.mintReceipt(
    donor.address, 
    1000, 
    "ipfs://QmExampleMetadataURI"
  );
  await tx.wait();

  console.log(`NFT minted for donor ${donor.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
