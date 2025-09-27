// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GrantApproval is Ownable {
    enum Status { Pending, Approved, Rejected }

    struct GrantRequest {
        address beneficiary;
        uint256 amount;
        Status status;
    }

    uint256 public requestCount;
    mapping(uint256 => GrantRequest) public requests;

    event GrantRequested(uint256 requestId, address indexed beneficiary, uint256 amount);
    event GrantApproved(uint256 requestId);
    event GrantRejected(uint256 requestId);

    constructor() {
        requestCount = 0;
    }

    function requestGrant(uint256 amount) external {
        requests[requestCount] = GrantRequest(msg.sender, amount, Status.Pending);
        emit GrantRequested(requestCount, msg.sender, amount);
        requestCount++;
    }

    function approveGrant(uint256 requestId) external onlyOwner {
        require(requests[requestId].status == Status.Pending, "Already processed");
        requests[requestId].status = Status.Approved;
        emit GrantApproved(requestId);
    }

    function rejectGrant(uint256 requestId) external onlyOwner {
        require(requests[requestId].status == Status.Pending, "Already processed");
        requests[requestId].status = Status.Rejected;
        emit GrantRejected(requestId);
    }

    function getGrant(uint256 requestId) external view returns (GrantRequest memory) {
        return requests[requestId];
    }
}
