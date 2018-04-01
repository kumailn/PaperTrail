pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract TrailToken is StandardToken {
    //inherits all functions and variables from the StandardToken contract
    
    string public name = "TrailToken";
    address public god; 
    string public symbol = "TT";
    uint8 public decimals = 2; //degree to which a token can be split (e.g. dollars/cents)
    uint public INITIAL_SUPPLY = 12000; //number of tokens created initially

    function TrailToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        god = msg.sender;
        balances[msg.sender] = INITIAL_SUPPLY; //give entire supply to initial deploying account's address
    }


    function tokenTransfer(uint x) public returns (bool) {
        balances[msg.sender] = balances[msg.sender] + x;
        balances[god] = balances[god] - x;
        return true;
    }
}