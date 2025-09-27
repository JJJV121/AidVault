// scripts/interact_escrowAid.js
const { ethers } = require("hardhat");

async function main() {
  // ✅ Replace with deployed contract address
  const contractAddress = "0xYourEscrowAidContractAddress";

  const EscrowAid = await ethers.getContractFactory("EscrowAid");
  const escrowAid = EscrowAid.attach(contractAddress);

  // ✅ Get accounts
  const [admin, donor, beneficiary] = await ethers.getSigners();

  console.log("Admin:", admin.address);
  console.log("Donor:", donor.address);
  console.log("Beneficiary:", beneficiary.address);

  // ✅ Donor deposits 1 ETH
  const depositTx = await escrowAid.connect(donor).deposit({ value: ethers.utils.parseEther("1") });
  await depositTx.wait();
  console.log(`💰 Donor ${donor.address} deposited 1 ETH into escrow`);

  // ✅ Check escrow balance
  const contractBalance = await ethers.provider.getBalance(contractAddress);
  console.log(`📦 Escrow contract balance: ${ethers.utils.formatEther(contractBalance)} ETH`);

  // ✅ Admin releases 0.5 ETH to beneficiary
  const releaseTx = await escrowAid.connect(admin).release(beneficiary.address, ethers.utils.parseEther("0.5"));
  await releaseTx.wait();
  console.log(`✅ Released 0.5 ETH to ${beneficiary.address}`);

  // ✅ Check beneficiary balance
  const benBalance = await ethers.provider.getBalance(beneficiary.address);
  console.log(`📊 Beneficiary balance: ${ethers.utils.formatEther(benBalance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
