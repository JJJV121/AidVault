// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DonorReputation is Ownable {
    mapping(address => uint256) public reputation; // Higher = more trusted
    uint256 public minReputationForHighDonation = 5;

    event ReputationUpdated(address indexed donor, uint256 newScore);

    function addReputation(address donor, uint256 points) external onlyOwner {
        reputation[donor] += points;
        emit ReputationUpdated(donor, reputation[donor]);
    }

    function reduceReputation(address donor, uint256 points) external onlyOwner {
        if(points > reputation[donor]) {
            reputation[donor] = 0;
        } else {
            reputation[donor] -= points;
        }
        emit ReputationUpdated(donor, reputation[donor]);
    }

    function canDonateHigh(address donor) external view returns (bool) {
        return reputation[donor] >= minReputationForHighDonation;
    }
}
