// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

contract Role {

        string[] roles;
        
        struct USER {
            address user;
            string name;
            string role;
        }
        uint totalUser = 0;
        mapping(uint => USER) public USERS;
        constructor() {
            roles =["Frontend Developer","Backend Developer","Blockchain Developer"];
        }

        function addUser(uint _id, string memory _name) public {
            require(_id < roles.length, "INVALID");
            USER storage user = USERS[totalUser];
            user.user = msg.sender;
            user.name = _name;
            user.role = roles[_id];
            totalUser++;
        }

        function getTotal() public view returns(uint){
            return totalUser;
        }

        function changeRoles(string[] memory _input) public {
            roles = _input;
        }
        function getRoles() public view returns(string[] memory) {
            return roles;
        }

    
    
}