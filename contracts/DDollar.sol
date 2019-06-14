pragma solidity ^0.5.0;
library SafeMath {

  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b);

    return c;
  }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0); // Solidity only automatically asserts when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold

    return c;
  }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    uint256 c = a - b;

    return c;
  }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);

    return c;
  }

  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0);
    return a % b;
  }
}



interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes calldata _extraData) external; }

contract DDollar {
    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint8 public tadTax = 10;
    uint8 public govTax = 10;
    address public owner;
    uint256 public totalSupply;
    uint256 public govFunds = 0;
    
    address[] public governors = new address[](50);
    
    

    // This creates an array with all balances
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;
    

    // This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This notifies clients about the amount burnt
    event Burn(address indexed from, uint256 value);
    
    using SafeMath for uint256;
    /**
     * Constrctor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    constructor() public {
        totalSupply = 20000000 * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;                
        name = "DDollar";                                   
        symbol = "DDollar";                               
        owner = msg.sender;
    }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _transfer(address _from, address _to, uint _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != address(0x0));
        // Check if the sender has enough
        require(balanceOf[_from] >= _value);
        // Check for overflows
        require(balanceOf[_to] + _value > balanceOf[_to]);
        // Save this for an assertion in the future
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public
        returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public
        returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        }
    }
    
    function changeOwner(address newOwner) public returns (bool success){
        // require(msg.sender == owner);
        owner = newOwner;
        return success;
    }
    
    function mint(uint256 _value) public returns (bool success){
        // require(msg.sender == owner);
        totalSupply += _value;
        balanceOf[owner] += _value;
        return success;
    }
    
    function setGovTax(uint8 _value) public returns(bool success){
        // require(msg.sender == owner);
        govTax = _value;
        return success;
    }
    
    function setGameTax(uint8 _value) public returns(bool success){
        // require(msg.sender == owner);
        tadTax = _value;
        return success;
    }
    
    function payOutGovernors() public returns(bool success){
        // require(msg.sender == owner);
        for(uint8 x = 0; x < 50; x++){
            balanceOf[governors[x]] += govFunds.div(50);
        }
        govFunds = 0;
        return success;
    }
    
    function setGovernor(uint8 number, address user) public returns (bool success){
        // require(msg.sender == owner);
        governors[number] = user;
        return success;
    }
    
    event confirmTrade(address sender, address receiver, uint256 amount, string item);
    function makeTrade(address sender, address receiver, uint256 _value, string memory item) public returns(bool success){
        // require(msg.sender == owner);
        balanceOf[sender] -= _value;
        balanceOf[owner] += _value.div(100).mul(tadTax);
        govFunds += _value.div(100).mul(govTax);
        emit confirmTrade(sender, receiver, _value, item);
        return success;
        //give tadTax
        //set governor allowance
    }

    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        emit Burn(msg.sender, _value);
        return true;
    }

    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);    // Check allowance
        balanceOf[_from] -= _value;                         // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
        totalSupply -= _value;                              // Update totalSupply
        emit Burn(_from, _value);
        return true;
    }
}