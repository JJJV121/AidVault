// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EscrowAid is Ownable {
    struct Escrow {
        address donor;
        address beneficiary;
        uint256 amount;
        bool released;
    }

    uint256 public escrowCount;
    mapping(uint256 => Escrow) public escrows;

    event FundsDeposited(uint256 escrowId, address indexed donor, address indexed beneficiary, uint256 amount);
    event FundsReleased(uint256 escrowId, address indexed beneficiary, uint256 amount);

    constructor() {
        escrowCount = 0;
    }

    function deposit(address beneficiary) external payable {
        require(msg.value > 0, "Must send funds");
        escrows[escrowCount] = Escrow(msg.sender, beneficiary, msg.value, false);
        emit FundsDeposited(escrowCount, msg.sender, beneficiary, msg.value);
        escrowCount++;
    }

    function release(uint256 escrowId) external onlyOwner {
        Escrow storage e = escrows[escrowId];
        require(!e.released, "Already released");
        e.released = true;
        payable(e.beneficiary).transfer(e.amount);
        emit FundsReleased(escrowId, e.beneficiary, e.amount);
    }
}
