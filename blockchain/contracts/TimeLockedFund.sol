// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TimeLockedFund {
    struct Donation {
        uint256 amount;
        uint256 releaseTime;
        address donor;
        address beneficiary;
        bool released;
    }

    Donation[] public donations;

    function donate(address beneficiary, uint256 lockSeconds) external payable {
        donations.push(Donation({
            amount: msg.value,
            releaseTime: block.timestamp + lockSeconds,
            donor: msg.sender,
            beneficiary: beneficiary,
            released: false
        }));
    }

    function release(uint256 donationId) external {
        Donation storage d = donations[donationId];
        require(!d.released, "Already released");
        require(block.timestamp >= d.releaseTime, "Locked");
        d.released = true;
        payable(d.beneficiary).transfer(d.amount);
    }
}
