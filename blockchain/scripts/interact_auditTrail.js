// scripts/interact_auditTrail.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedContractAddress";
  const AuditTrail = await ethers.getContractFactory("AuditTrail");
  const audit = AuditTrail.attach(contractAddress);

  const [user] = await ethers.getSigners();

  await audit.connect(user).logAction("Donor verified and donated");
  const count = await audit.getLogCount();
  console.log("Total logs:", count.toString());
}

main().catch(console.error);
