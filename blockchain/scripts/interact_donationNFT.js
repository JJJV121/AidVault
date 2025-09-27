// scripts/interact_donationNFT.js
const { ethers } = require("hardhat");

async function main() {
  // ✅ Put your deployed contract address here (from deploy.js output)
  const contractAddress = "0xYourDeployedContractAddress";

  // ✅ Load contract ABI & attach
  const DonationNFT = await ethers.getContractFactory("DonationNFT");
  const donationNFT = DonationNFT.attach(contractAddress);

  // ✅ Get some signers (accounts) from Hardhat
  const [deployer, donor1] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);
  console.log("Donor:", donor1.address);

  // ✅ Mint NFT receipt for donor1
  const tx = await donationNFT.mintReceipt(
    donor1.address,
    500, // donation amount
    "ipfs://QmExampleDonationReceiptMetadata" // replace with real IPFS/URI
  );
  await tx.wait();
  console.log(`🎉 NFT minted for donor ${donor1.address}`);

  // ✅ Fetch NFT balance of donor1
  const balance = await donationNFT.balanceOf(donor1.address);
  console.log(`📦 Donor NFT balance: ${balance.toString()}`);

  // ✅ Get tokenId = first NFT of donor1 (id starts at 1)
  const tokenId = 1;
  const tokenURI = await donationNFT.tokenURI(tokenId);
  console.log(`🔗 Token URI of NFT #${tokenId}: ${tokenURI}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
