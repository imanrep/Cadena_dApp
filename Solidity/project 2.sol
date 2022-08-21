// SPDX-License-Identifier: UNLISCENSED

pragma solidity ^0.8.0;

contract AsepToken {

    constructor() {
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }

    address public owner;
    string public name = "Asep Bakwan";
    string public symbol = "ASEP";
    uint256 public totalSupply = 1000000000000000000000000; // 1 Million
    uint8 public decimals = 18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Access some function for only owner
    modifier onlyOwner() {
    require(msg.sender == owner, "NOT OWNER");
    _;
  }

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // Funtion Transfer to send token
    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value); // Value need under or equal of Balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }

    // Function Approve to allow or revoke spender to use transferFrom
    function approve(address _spender, uint256 _value) public {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }

    // Function TransferFrom can transfer without permission of owner but needs to be approved
    function transferFrom(address _from, address _to, uint256 _value) public {
        require(_value <= balanceOf[_from]); // Value need under or equal with balance of from address
        require(_value <= allowance[_from][msg.sender]); // sender address need to be approved from from address
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
    }

    function mint(uint256 _value) public onlyOwner {
        totalSupply += _value;
        balanceOf[msg.sender] += _value;

        emit Transfer(address(0), msg.sender , _value);
    }

    function burn(uint256 _value) public {
        require(balanceOf[msg.sender] > _value, "INVALID");
        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;

        emit Transfer(msg.sender, address(0), _value);
    }
}