// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AidVault {
    address public admin;

    constructor() {
        admin = msg.sender; // Deployer is admin
    }

    struct GrantRequest {
        address beneficiary;
        uint amount;
        bool approved;
        bool fulfilled;
    }

    uint public grantCount = 0;
    mapping(uint => GrantRequest) public grants;

    // Events
    event GrantRequested(uint grantId, address beneficiary, uint amount);
    event GrantApproved(uint grantId);
    event GrantFunded(uint grantId, uint amount);

    // Beneficiary requests a grant
    function requestGrant(uint _amount) public {
        grantCount++;
        grants[grantCount] = GrantRequest({
            beneficiary: msg.sender,
            amount: _amount,
            approved: false,
            fulfilled: false
        });

        emit GrantRequested(grantCount, msg.sender, _amount);
    }

    // Admin approves a grant
    function approveGrant(uint _grantId) public {
        require(msg.sender == admin, "Only admin can approve");
        require(!grants[_grantId].approved, "Already approved");

        grants[_grantId].approved = true;
        emit GrantApproved(_grantId);
    }

    // Donor funds a grant
    function fundGrant(uint _grantId) public payable {
        GrantRequest storage grant = grants[_grantId];
        require(grant.approved, "Grant not approved yet");
        require(!grant.fulfilled, "Grant already fulfilled");
        require(msg.value >= grant.amount, "Insufficient amount");

        payable(grant.beneficiary).transfer(grant.amount);
        grant.fulfilled = true;

        emit GrantFunded(_grantId, grant.amount);
    }

    // Check grant details
    function getGrant(uint _grantId) public view returns (
        address beneficiary,
        uint amount,
        bool approved,
        bool fulfilled
    ) {
        GrantRequest memory grant = grants[_grantId];
        return (grant.beneficiary, grant.amount, grant.approved, grant.fulfilled);
    }
}
