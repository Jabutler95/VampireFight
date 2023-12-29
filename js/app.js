/*---------------- Constants ----------------*/
const choices = [
  'Bite', 
  'Scratch',
  'Garlic',
  'Silver Bullet',
  'Crossbow',
  'Wooden Stake',
]

let computerInventory = {
  weapons: [
    {name: 'Bite', quantity: Infinity}, 
    {name: 'Scratch', quantity: Infinity},
    {name: 'Garlic', quantity: Infinity},
    {name: 'Silver Bullet', quantity: 2},
    {name: 'Crossbow', quantity: 2 },
    {name: 'Wooden Stake', quantity: 2}, 
  ]
}

let player1Inventory = {
  weapons: [
    {name: 'Bite', quantity: Infinity}, 
    {name: 'Scratch', quantity: Infinity},
    {name: 'Garlic', quantity: Infinity},
    {name: 'Silver Bullet', quantity: 2},
    {name: 'Crossbow', quantity: 2},
    {name: 'Wooden Stake', quantity: 2},
  ],
}





/*--------------- Variables ------------------*/
let player1Hp = 10
let computerHp = 10
let player1Choice, computerChoice, message

/*-------- Cached Element References-------*/

const battleResult = document.getElementById('message')

/*-------------- Event Listeners ---------------*/
document.getElementById('start-button').addEventListener('click', playGame)
document.getElementById('Bite').addEventListener('click', playGame)
document.getElementById('Scratch').addEventListener('click', playGame)
document.getElementById('Garlic').addEventListener('click', playGame)
document.getElementById('Silver Bullet').addEventListener('click', playGame)
document.getElementById('Wooden Stake').addEventListener('click', playGame)
document.getElementById('Crossbow').addEventListener('click', playGame)



/*-------------- Functions -----------------*/

function playGame(evt) {
  getPlayer1Choice(evt)
  computerChoice = getRandomWeapon(computerInventory)
  //isChoiceValid()
  compareChoices()
  checkWinner()
  updateMessage()
  console.log(computerChoice)
}

//get the player's choice
function getPlayer1Choice(evt) {
  player1Choice = evt.target.id
  //ensure the user can still select the weapon
  selectedWeapon(player1Choice)
}

function selectedWeapon(player1Choice) {
  const selectedWeapon = player1Inventory.weapons.find(weapon => weapon.name === player1Choice)
  if (selectedWeapon && selectedWeapon.quantity > 0) {
    //more dynamic way to reduce the quantity vs calling a function each time the weapon is used in the specific instance. 
    selectedWeapon.quantity--
  } else if (selectedWeapon && selectedWeapon.quantity === 0) {
    //disallow use of a weapon that is out of ammo
    document.getElementById(player1Choice).disabled = true
  } else {
    return selectedWeapon
  }
  console.log(`You chose ${player1Choice}`);
}

//Will be more dynamic if I do not set it to just the computer's inventory
function getRandomWeapon(inv) {
    // get only the weapons with ammo still using filter method
  const weaponsWithAmmo = inv.weapons.filter
  //arrow function with parameter weapon 
  (weapon => weapon.quantity > 0)
  //if the array exists..
  if (weaponsWithAmmo.length > 0) {
    //get the index of a random weapon
    const randomIndex = Math.floor(Math.random() * weaponsWithAmmo.length)
    //store the selected weapon to variable
    const selectedWeapon = weaponsWithAmmo[randomIndex]
    // Reduce the ammo each use
    selectedWeapon.quantity--
    // Return the selected weapon's name
    return selectedWeapon.name
  } 
}

function compareChoices() {
  //Draw condition
  if (player1Choice === computerChoice) {
    message = `You chose ${player1Choice}, the enemy chose ${computerChoice}. It's a draw! Nothing happens.`
  } 
  //player bite cpu scratch
  else if (player1Choice === choices[0] && computerChoice === choices[1]) {
    message = `You chose Bite and the enemy chose Scratch you gain 1 HP and deal 1 damage.`
    player1Hp = player1Hp + 1
    computerHp = computerHp - 1
  } 
  //player bite cpu garlic
  else if (player1Choice === choices[0] && computerChoice === choices[2]) {
    message = `You chose Bite and the enemy chose Garlic! The enemy stole 1HP!`
    player1Hp = player1Hp - 1
    computerHp = computerHp + 1
  } 
  //player bite cpu silver bullet
  else if (player1Choice === choices[0] && computerChoice === choices[3]) {
    message = `You chose Bite and the enemy chose silver bullet! You lose 2 HP!`
    player1Hp = player1Hp - 2
  } 
  //player bite cpu crossbow
  else if (player1Choice === choices[0] && computerChoice === choices[5]) {
    message = `You chose Bite and the enemy chose stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
  } 
  //player bite cpu wooden stake
  else if (player1Choice === choices[0] && computerChoice === choices[4]) {
    message = `You chose Bite and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
  }
  //player scratch cpu bite
  else if (player1Choice === choices[1] && computerChoice === choices[0]) {
    message = `You chose Scratch and the enemy chose Bite! You lose 1 HP!`
    player1Hp = player1Hp - 1
  }
  //player scratch cpu garlic
  else if (player1Choice === choices[1] && computerChoice === choices[2]) {
    message = `You chose Scratch and the enemy chose Garlic! You gain 1 HP!`
    player1Hp = player1Hp + 1
  }
  //player scratch cpu silver bullet
  else if (player1Choice === choices[1] && computerChoice === choices[3]) {
    message = `You chose Scratch and the enemy chose Silver Bullet! You lose 2 HP!`
    player1Hp = player1Hp - 2
  }
  //player scratch cpu crossbow
  else if (player1Choice === choices[1] && computerChoice === choices[4]) {
    message = `You chose Scratch and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
  }
  //player scratch cpu stake
  else if (player1Choice === choices[1] && computerChoice === choices[5]) {
    message = `You chose Scratch and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
  }
  //player garlic cpu bite
  else if (player1Choice === choices[2] && computerChoice === choices[0]) {
    message = `You chose Garlic and the enemy chose Bite! You gain 1 HP!`
    player1Hp = player1Hp + 1
  }
  //player garlic cpu scratch
  else if (player1Choice === choices[2] && computerChoice === choices[1]) {
    message = `You chose Garlic and the enemy chose Scratch! You lose 1 HP!`
    player1Hp = player1Hp - 1
  }
  //player garlic cpu silver bullet
  else if (player1Choice === choices[2] && computerChoice === choices[3]) {
    message = `You chose Garlic and the enemy chose Silver Bullet! You lose 2 HP!`
    player1Hp = player1Hp - 2
  }
  //player garlic cpu crossbow
  else if (player1Choice === choices[2] && computerChoice === choices[4]) {
    message = `You chose Garlic and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
  }
  //player garlic cpu wooden stake
  else if (player1Choice === choices[2] && computerChoice === choices[5]) {
    message = `You chose Garlic and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
  }
  //player silver bullet cpu bite
  else if (player1Choice === choices[3] && computerChoice === choices[0]) {
    message = `You chose Silver Bullet and the enemy chose Bite! You deal 2 damage!`
    computerHp = computerHp - 2
    //updatePlayer1Inventory()
  }
  //player silver bullet cpu scratch 
  else if (player1Choice === choices[3] && computerChoice === choices[1]) {
    message = `You chose Silver Bullet and the enemy chose Scratch! You deal 2 damage!`
    computerHp = computerHp - 2
    //updatePlayer1Inventory()
  }
  //player silver bullet cpu garlic 
  else if (player1Choice === choices[3] && computerChoice === choices[2]) {
    message = `You chose Silver Bullet and the enemy chose Garlic! You deal 2 damage!`
    computerHp = computerHp - 2
    //updatePlayer1Inventory()
  }
  //player silver bullet cpu crossbow 
  else if (player1Choice === choices[3] && computerChoice === choices[4]) {
    message = `You chose Silver Bullet and the enemy chose Crossbow! You take 1 damage!`
    player1Hp = player1Hp - 1
    //updatePlayer1Inventory()
  }
  //player silver bullet cpu wooden stake
  else if (player1Choice === choices[3] && computerChoice === choices[5]) {
    message = `You chose Silver Bullet and the enemy chose Wooden Stake! You deal 1 damage!`
    computerHp = computerHp - 1
    //updatePlayer1Inventory()
  }
  //player crossbow cpu bite
  else if (player1Choice === choices[4] && computerChoice === choices[0]) {
    message = `You chose Crossbow and the enemy chose Bite! You deal 3 damage!`
    computerHp = computerHp - 3
    //updatePlayer1Inventory()
  }
  //player crossbow cpu scratch 
  else if (player1Choice === choices[4] && computerChoice === choices[1]) {
    message = `You chose Crossbow and the enemy chose Scratch! You deal 3 damage!`
    computerHp = computerHp - 3
    //updatePlayer1Inventory()
  }
  //player crossbow cpu garlic 
  else if (player1Choice === choices[4] && computerChoice === choices[2]) {
    message = `You chose Crossbow and the enemy chose Garlic! You deal 3 damage!`
    computerHp = computerHp - 3
    //updatePlayer1Inventory()
  }
  //player crossbow cpu silver bullet
  else if (player1Choice === choices[4] && computerChoice === choices[3]) {
    message = `You chose Crossbow and the enemy chose Silver Bullet! You deal 1 damage!`
    computerHp = computerHp - 1
    //updatePlayer1Inventory()
  }
  //player crossbow cpu wooden stake
  else if (player1Choice === choices[4] && computerChoice === choices[5]) {
    message = `You chose Crossbow and the enemy chose Wooden Stake! You deal 2 damage!`
    computerHp = computerHp - 2
    //updatePlayer1Inventory()
  }
  //player wooden stake cpu bite 
  else if (player1Choice === choices[5] && computerChoice === choices[0]) {
    message = `You chose Wooden Stake and the enemy chose Bite! You deal 1 damage!`
    computerHp = computerHp - 1
  }
  //player wooden stake cpu scratch 
  else if (player1Choice === choices[5] && computerChoice === choices[1]) {
    message = `You chose Wooden Stake and the enemy chose Scratch! You deal 1 damage!`
    computerHp = computerHp - 1
  }
  //player wooden stake cpu Garlic 
  else if (player1Choice === choices[5] && computerChoice === choices[2]) {
    message = `You chose Wooden Stake and the enemy chose Garlic! You deal 1 damage!`
    computerHp = computerHp - 1
  }
  //player wooden stake cpu silver bullet
  else if (player1Choice === choices[5] && computerChoice === choices[3]) {
    message = `You chose Wooden Stake and the enemy chose Silver Bullet! You take 1 damage!`
    player1Hp = player1Hp - 1
    //updatePlayer1Inventory()
  }
  //player wooden stake cpu crossbow
  else if (player1Choice === choices[5] && computerChoice === choices[4]) {
    message = `You chose Wooden Stake and the enemy chose Crossbow! You take 2 damage!`
    player1Hp = player1Hp - 2
    //updatePlayer1Inventory()
  }
  console.log(player1Inventory);
  console.log(computerInventory);
  console.log(player1Hp);
  console.log(computerHp);
}

function updateMessage () {
  battleResult.textContent = message
}

function checkWinner() {
  if (player1Hp <= 0) {
    message = `GAME OVER. You lose! Don't give up, try again!`
  } 
  if (computerHp <= 0) {
    message = `YOU WIN!!!!!!!! Go again?`
  }
  else {
    return
  }
  console.log(message);
}