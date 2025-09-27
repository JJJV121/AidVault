// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AuditTrail {
    struct Log {
        string action;
        address actor;
        uint256 timestamp;
    }

    Log[] public logs;

    event ActionLogged(string action, address indexed actor, uint256 timestamp);

    function logAction(string memory action) external {
        logs.push(Log({
            action: action,
            actor: msg.sender,
            timestamp: block.timestamp
        }));
        emit ActionLogged(action, msg.sender, block.timestamp);
    }

    function getLog(uint256 index) external view returns (Log memory) {
        return logs[index];
    }

    function getLogCount() external view returns (uint256) {
        return logs.length;
    }
}
