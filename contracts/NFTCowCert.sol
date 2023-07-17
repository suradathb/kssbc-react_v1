// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCowCert is ERC721 {
    // Permission address at create Certificate and send new cert to Customers.
    uint256 public ownerCount = 0;
    uint256 public NFTCowCount = 0;
    address[] government;
    struct AdAdmin {
        uint256 userId;
        address government;
        string username;
    }
    struct AddNFTCow {
        uint256 id;
        string tokendId;
        string cowCertlist;
        string imgPath;
    }
    mapping(uint256 => AdAdmin) public TaskMapOwner;
    mapping(uint256 => AddNFTCow) public BlocklistNFTCow;
    mapping(uint256 => bool) public blockCowcert;

    // mapping(uint256 => bool) internal blockCowcert;
    constructor() ERC721("NFT Krungsri Securities Public Company Limited.", "NFTKSS") {
        TaskMapOwner[ownerCount] = AdAdmin(ownerCount, msg.sender, "Suradath");
    }

    modifier onlyGovernment() {
        for (uint256 i = 0; i <= ownerCount; i++) {
            if (TaskMapOwner[i].government == msg.sender) {
                require(
                    msg.sender == TaskMapOwner[i].government,
                    "You are not Owner!"
                );
                break;
            }
        }
        require(
            msg.sender == TaskMapOwner[ownerCount].government,
            "You are not Owner!"
        );
        _;
    }
    event TaskCreatedadmin(uint256 userId, address government, string username);
    event TaskCreateNFTCowCert(
        uint256 id,
        string tokendid,
        string cowCertlist,
        string imgPath
    );

    function addNFTCowAdmin(address _government, string memory _username) public {
        require(
            msg.sender == TaskMapOwner[0].government,
            "You are not authorized to create an Admin"
        );
        ownerCount++;
        TaskMapOwner[ownerCount] = AdAdmin(ownerCount, _government, _username);
        emit TaskCreatedadmin(ownerCount, _government, _username);
    }

    function tokenMintCowCert(
        address _custCowCert,
        string memory _tokenId,
        string memory _cowCertlist,
        string memory _imgPath
    ) public onlyGovernment {
        NFTCowCount++;
        BlocklistNFTCow[NFTCowCount] = AddNFTCow(
            NFTCowCount,
            _tokenId,
            _cowCertlist,
            _imgPath
        );
        // super._mint(_custCowCert, _tokenId);
        super._mint(_custCowCert, NFTCowCount);
        emit TaskCreateNFTCowCert(NFTCowCount, _tokenId, _cowCertlist, _imgPath);
    }

    // Stop or block Cowcoin Nft from buying or selling.
    function blockNFTCow(uint256 _tokenId) public onlyGovernment {
        blockCowcert[_tokenId] = true;
    }

    function unBlockNFTCow(uint256 _tokenId) public onlyGovernment {
        blockCowcert[_tokenId] = false;
    }

    // Setup sell  Customer Payment to sell  Customer type P2P
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public virtual override {
        require(blockCowcert[_tokenId] == false);
        super.safeTransferFrom(_from, _to, _tokenId);
    }
}
