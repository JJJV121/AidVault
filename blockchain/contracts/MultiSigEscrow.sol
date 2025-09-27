// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiSigEscrow {
    address[] public admins;
    uint256 public requiredApprovals;
    uint256 public escrowBalance;

    struct ReleaseRequest {
        uint256 amount;
        address beneficiary;
        uint256 approvals;
        mapping(address => bool) approvedBy;
        bool released;
    }

    ReleaseRequest[] public requests;

    modifier onlyAdmin() {
        bool isAdmin = false;
        for(uint i=0; i<admins.length; i++){
            if(msg.sender == admins[i]){
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, "Not an admin");
        _;
    }

    constructor(address[] memory _admins, uint256 _requiredApprovals) {
        admins = _admins;
        requiredApprovals = _requiredApprovals;
    }

    function deposit() external payable {
        escrowBalance += msg.value;
    }

    function requestRelease(uint256 amount, address beneficiary) external onlyAdmin {
        ReleaseRequest storage r = requests.push();
        r.amount = amount;
        r.beneficiary = beneficiary;
        r.approvals = 0;
        r.released = false;
    }

    function approveRelease(uint256 requestId) external onlyAdmin {
        ReleaseRequest storage r = requests[requestId];
        require(!r.released, "Already released");
        require(!r.approvedBy[msg.sender], "Already approved");

        r.approvedBy[msg.sender] = true;
        r.approvals++;

        if(r.approvals >= requiredApprovals) {
            r.released = true;
            escrowBalance -= r.amount;
            payable(r.beneficiary).transfer(r.amount);
        }
    }
}
