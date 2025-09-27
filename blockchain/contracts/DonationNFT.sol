// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DonationNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    event DonationReceiptMinted(address indexed donor, uint256 tokenId, uint256 amount, uint256 timestamp);

    constructor() ERC721("DonationReceipt", "DNR") {
        tokenCounter = 0;
    }

    function mintReceipt(address donor, uint256 amount, string memory tokenURI) public onlyOwner {
        uint256 newTokenId = tokenCounter;
        _safeMint(donor, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        emit DonationReceiptMinted(donor, newTokenId, amount, block.timestamp);

        tokenCounter += 1;
    }
}
