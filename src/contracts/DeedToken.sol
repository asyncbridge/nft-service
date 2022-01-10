pragma solidity 0.5.16;

import "./ERC721.sol";
import "./ERC165.sol";
import "./SafeMath.sol";
import "./Address.sol";

contract DeedToken is ERC721, ERC165 {

    using SafeMath for uint256;
    using Address for address;

    address payable public owner;
    mapping(bytes4 => bool) supportedInterfaces;

    mapping(uint256 => address) tokenOwners;
    mapping(address => uint256) balances;
    mapping(uint256 => address) allowance;
    mapping(address => mapping(address => bool)) operators;

    struct asset {
        uint8 x;
        uint8 y;
        uint8 z;
    }

    asset[] public allTokens;

    //for enumeration
    uint256[] public allValidTokenIds; //same as allTokens but does't have invalid tokens
    mapping(uint256 => uint256) private allValidTokenIndex;


    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    constructor() public {
        owner = msg.sender;
        supportedInterfaces[0x01ffc9a7] = true; //ERC165
        supportedInterfaces[0x80ac58cd] = true; //ERC721
    }

    function supportsInterface(bytes4 interfaceID) external view returns (bool){
        return supportedInterfaces[interfaceID];
    }

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0));
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {

        address addr_owner = tokenOwners[_tokenId];
        require(
            addr_owner != address(0),
            "Token is invalid"
        );
        return addr_owner;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public payable {

        address addr_owner = ownerOf(_tokenId);

        require(
            addr_owner == _from,
            "_from is NOT the owner of the token"
        );

        require(
            _to != address(0),
            "Transfer _to address 0x0"
        );

        address addr_allowed = allowance[_tokenId];
        bool isOp = operators[addr_owner][msg.sender];

        require(
            addr_owner == msg.sender || addr_allowed == msg.sender || isOp,
            "msg.sender does not have transferable token"
        );


        //transfer : change the owner of the token
        tokenOwners[_tokenId] = _to;
        balances[_from] = balances[_from].sub(1);
        balances[_to] = balances[_to].add(1);

        //reset approved address
        if (allowance[_tokenId] != address(0)) {
            delete allowance[_tokenId];
        }

        emit Transfer(_from, _to, _tokenId);

    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) public payable {

        transferFrom(_from, _to, _tokenId);

        //check if _to is CA
        if (_to.isContract()) {
            bytes4 result = ERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, data);

            require(
                result == bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")),
                "receipt of token is NOT completed"
            );
        }

    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public payable {
        safeTransferFrom(_from, _to, _tokenId, "");
    }


    function approve(address _approved, uint256 _tokenId) external payable {

        address addr_owner = ownerOf(_tokenId);
        bool isOp = operators[addr_owner][msg.sender];

        require(
            addr_owner == msg.sender || isOp,
            "Not approved by owner"
        );

        allowance[_tokenId] = _approved;

        emit Approval(addr_owner, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
		 require(
            _operator != msg.sender,
            "_operator is already approved."
        );
	
        operators[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }


    function getApproved(uint256 _tokenId) external view returns (address) {
        return allowance[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return operators[_owner][_operator];
    }


    //non-ERC721 standard
    //
    //
    function () external payable {}

    function mint(uint8 _x, uint8 _y, uint8 _z) external payable {

        asset memory newAsset = asset(_x, _y, _z);
        uint tokenId = allTokens.push(newAsset) - 1;
        //token id starts from 0, index of assets array
        tokenOwners[tokenId] = msg.sender;
        balances[msg.sender] = balances[msg.sender].add(1);

        //for enumeration
        allValidTokenIndex[tokenId] = allValidTokenIds.length;
        //index starts from 0
        allValidTokenIds.push(tokenId);

        emit Transfer(address(0), msg.sender, tokenId);
    }

    function burn(uint _tokenId) external {

        address addr_owner = ownerOf(_tokenId);

        require(
            addr_owner == msg.sender,
            "msg.sender is NOT the owner of the token"
        );

        //reset approved address
        if (allowance[_tokenId] != address(0)) {
            delete allowance[_tokenId];
            // tokenId => 0
        }

        //transfer : change the owner of the token, but address(0)
        tokenOwners[_tokenId] = address(0);
        balances[msg.sender] = balances[msg.sender].sub(1);

        //for enumeration
        removeInvalidToken(_tokenId);

        emit Transfer(addr_owner, address(0), _tokenId);
    }

    function removeInvalidToken(uint256 tokenIdToRemove) private {

        uint256 lastIndex = allValidTokenIds.length.sub(1);
        uint256 removeIndex = allValidTokenIndex[tokenIdToRemove];

        uint256 lastTokenId = allValidTokenIds[lastIndex];

        //swap
        allValidTokenIds[removeIndex] = lastTokenId;
        allValidTokenIndex[lastTokenId] = removeIndex;

        //delete
        //Arrays have a length member to hold their number of elements.
        //Dynamic arrays can be resized in storage (not in memory) by changing the .length member.
        allValidTokenIds.length = allValidTokenIds.length.sub(1);
        //allValidTokenIndex is private so can't access invalid token by index programmatically
        allValidTokenIndex[tokenIdToRemove] = 0;
    }

    //ERC721Enumerable
    function totalSupply() public view returns (uint) {
        return allValidTokenIds.length;
    }

    //ERC721Enumerable
    function tokenByIndex(uint256 index) public view returns (uint256) {
        require(index < totalSupply(), "out of index.");
        return allValidTokenIds[index];
    }

    //ERC721Metadata
    function name() external pure returns (string memory) {
        return "CRC Token";
    }

    //ERC721Metadata
    function symbol() external pure returns (string memory) {
        return "CRC";
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }


}

contract ERC721TokenReceiver {

    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) public returns (bytes4);
}
