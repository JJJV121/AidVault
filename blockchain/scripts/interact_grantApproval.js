// scripts/interact_grantApproval.js
const { ethers } = require("hardhat");

async function main() {
  // ✅ Replace with deployed contract address
  const contractAddress = "0xYourGrantApprovalContractAddress";

  const GrantApproval = await ethers.getContractFactory("GrantApproval");
  const grantApproval = GrantApproval.attach(contractAddress);

  // ✅ Get accounts
  const [admin, beneficiary] = await ethers.getSigners();

  console.log("Admin:", admin.address);
  console.log("Beneficiary:", beneficiary.address);

  // ✅ Request a grant (beneficiary)
  const requestTx = await grantApproval.connect(beneficiary).requestGrant(1000);
  await requestTx.wait();
  console.log("📌 Grant requested by:", beneficiary.address);

  // ✅ Approve grant (admin)
  const approveTx = await grantApproval.connect(admin).approveGrant(1); // grantId = 1
  await approveTx.wait();
  console.log("✅ Grant #1 approved by admin");

  // ✅ Check status
  const grant = await grantApproval.grants(1);
  console.log(`📊 Grant Status: ID=${grant.id}, Amount=${grant.amount}, Approved=${grant.approved}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
