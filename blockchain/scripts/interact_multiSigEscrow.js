// scripts/interact_multiSigEscrow.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedContractAddress";
  const MultiSigEscrow = await ethers.getContractFactory("MultiSigEscrow");
  const multiSig = MultiSigEscrow.attach(contractAddress);

  const [admin1, admin2] = await ethers.getSigners();

  await multiSig.connect(admin1).deposit({ value: ethers.utils.parseEther("1") });
  await multiSig.connect(admin1).requestRelease(ethers.utils.parseEther("0.5"), admin2.address);
  await multiSig.connect(admin1).approveRelease(0);
  await multiSig.connect(admin2).approveRelease(0);

  console.log("✅ Fund released to beneficiary after multi-sig approval");
}

main().catch(console.error);
