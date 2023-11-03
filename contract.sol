// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
contract wallet {
    
    string public name="wallet";
    uint num;
     
    function setValue(uint _num) public {
        num=_num;
    }
    
    function getValue() public view returns(uint){
        return num;
    }

    function sendEthContract() public payable{ }

    function contractBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function sendEthUser(address _user) public payable{
       payable(_user).transfer(msg.value);
    }
    
    function accountBalance(address _address) public view returns(uint){
        return (_address).balance;
    }
}