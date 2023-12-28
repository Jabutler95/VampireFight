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
    {name: 'Silver Bullet', quantity: 2},
    {name: 'Crossbow', quantity: 2 },
    {name: 'Wooden Stake', quantity: 2}
  ],
  heals: [

  ]
}

let player1Inventory = {
  weapons: [
    {name: 'Silver Bullet', quantity: 2},
    {name: 'Crossbow', quantity: 2},
    {name: 'Wooden Stake', quantity: 2},
  ],
}


let player1HasChosen 


/*--------------- Variables ------------------*/
let player1Hp = 10
let computerHp = 10
let player1Choice, computerChoice, message

/*-------- Cached Element References-------*/

const battleResult = document.getElementById('message')

/*-------------- Event Listeners ---------------*/
document.getElementById('Bite').addEventListener('click', playGame)
document.getElementById('Scratch').addEventListener('click', playGame)
document.getElementById('Garlic').addEventListener('click', playGame)
document.getElementById('Silver Bullet').addEventListener('click', playGame)
document.getElementById('Wooden-Stake').addEventListener('click', playGame)
document.getElementById('Crossbow').addEventListener('click', playGame)



/*-------------- Functions -----------------*/
function playGame(evt) {
  getPlayer1Choice(evt)
  getComputerChoice()
  //isChoiceValid()
  compareChoices()
  checkWinner()
  updateMessage()
}

function getPlayer1Choice(evt) {
  player1Choice = evt.target.id
  console.log(`You chose ${player1Choice}`);
}

// function isChoiceValid() {
// if (computerChoice === choices[3] && computerInventory.weapons[0].quantity === 0) {
//   getComputerChoice()
// }
// if (computerChoice === choices[4] && computerInventory.weapons[1].quantity === 0) {
//   getComputerChoice()
// }
// if (computerChoice === choices[5] && computerInventory.weapons[3].quantity === 0) {
//   getComputerChoice()
// }
// }

function getComputerChoice () {
  const randomIndex = Math.floor(Math.random() * choices.length)
  computerChoice = choices[randomIndex]
  console.log(`The computer chose ${computerChoice}`);
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
    updateComputerInventory()
  } 
  //player bite cpu crossbow
  else if (player1Choice === choices[0] && computerChoice === choices[4]) {
    message = `You chose Bite and the enemy chose stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
    updateComputerInventory()
  } 
  //player bite cpu wooden stake
  else if (player1Choice === choices[0] && computerChoice === choices[5]) {
    message = `You chose Bite and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
    updateComputerInventory ()
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
    updateComputerInventory ()
  }
  //player scratch cpu crossbow
  else if (player1Choice === choices[1] && computerChoice === choices[4]) {
    message = `You chose Scratch and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
    updateComputerInventory ()
  }
  //player scratch cpu stake
  else if (player1Choice === choices[1] && computerChoice === choices[5]) {
    message = `You chose Scratch and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
    updateComputerInventory ()
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
    updateComputerInventory()
  }
  //player garlic cpu crossbow
  else if (player1Choice === choices[2] && computerChoice === choices[4]) {
    message = `You chose Garlic and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
    updateComputerInventory()
  }
  //player garlic cpu wooden stake
  else if (player1Choice === choices[2] && computerChoice === choices[5]) {
    message = `You chose Garlic and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
    updateComputerInventory()
  }
  //player silver bullet cpu bite
  else if (player1Choice === choices[3] && computerChoice === choices[0]) {
    message = `You chose Silver Bullet and the enemy chose Bite! You deal 2 damage!`
    computerHp = computerHp - 2
    updatePlayer1Inventory()
  }
  //player silver bullet cpu scratch 
  else if (player1Choice === choices[3] && computerChoice === choices[1]) {
    message = `You chose Silver Bullet and the enemy chose Scratch! You deal 2 damage!`
    computerHp = computerHp - 2
    updatePlayer1Inventory()
  }
  //player silver bullet cpu garlic 
  else if (player1Choice === choices[3] && computerChoice === choices[2]) {
    message = `You chose Silver Bullet and the enemy chose Garlic! You deal 2 damage!`
    computerHp = computerHp - 2
    updatePlayer1Inventory()
  }
  //player silver bullet cpu crossbow 
  else if (player1Choice === choices[3] && computerChoice === choices[4]) {
    message = `You chose Silver Bullet and the enemy chose Crossbow! You take 1 damage!`
    player1Hp = player1Hp - 1
    updatePlayer1Inventory()
    updateComputerInventory()
  }
  //player silver bullet cpu wooden stake
  else if (player1Choice === choices[3] && computerChoice === choices[5]) {
    message = `You chose Silver Bullet and the enemy chose Wooden Stake! You deal 1 damage!`
    computerHp = computerHp - 1
    updatePlayer1Inventory()
    updateComputerInventory()
  }
  //player crossbow cpu bite
  else if (player1Choice === choices[4] && computerChoice === choices[0]) {
    message = `You chose Crossbow and the enemy chose Bite! You deal 3 damage!`
    computerHp = computerHp - 3
    updatePlayer1Inventory()
  }
  //player crossbow cpu scratch 
  else if (player1Choice === choices[4] && computerChoice === choices[1]) {
    message = `You chose Crossbow and the enemy chose Scratch! You deal 3 damage!`
    computerHp = computerHp - 3
    updatePlayer1Inventory()
  }
  //player crossbow cpu garlic 
  else if (player1Choice === choices[4] && computerChoice === choices[2]) {
    message = `You chose Crossbow and the enemy chose Garlic! You deal 3 damage!`
    computerHp = computerHp - 3
    updatePlayer1Inventory()
  }
  //player crossbow cpu silver bullet
  else if (player1Choice === choices[4] && computerChoice === choices[3]) {
    message = `You chose Crossbow and the enemy chose Silver Bullet! You deal 1 damage!`
    computerHp = computerHp - 1
    updatePlayer1Inventory()
    updateComputerInventory()
  }
  //player crossbow cpu wooden stake
  else if (player1Choice === choices[4] && computerChoice === choices[5]) {
    message = `You chose Crossbow and the enemy chose Wooden Stake! You deal 2 damage!`
    computerHp = computerHp - 2
    updatePlayer1Inventory()
    updateComputerInventory()
  }
  //player wooden stake cpu bite 
  else if (player1Choice === choices[5] && computerChoice === choices[0]) {
    message = 'You chose Wooden Stake and the enemy chose Bite! You deal 1 damage!'
    computerHp = computerHp - 1
  }
  //player wooden stake cpu scratch 
  else if (player1Choice === choices[5] && computerChoice === choices[1]) {
    message = 'You chose Wooden Stake and the enemy chose Scratch! You deal 1 damage!'
    computerHp = computerHp - 1
  }
  //player wooden stake cpu Garlic 
  else if (player1Choice === choices[5] && computerChoice === choices[2]) {
    message = 'You chose Wooden Stake and the enemy chose Garlic! You deal 1 damage!'
    computerHp = computerHp - 1
  }
  //player wooden stake cpu silver bullet
  else if (player1Choice === choices[5] && computerChoice === choices[3]) {
    message = 'You chose Wooden Stake and the enemy chose Silver Bullet! You take 1 damage!'
    player1Hp = player1Hp - 1
    updatePlayer1Inventory()
    updateComputerInventory()
  }
  //player wooden stake cpu crossbow
  else if (player1Choice === choices[5] && computerChoice === choices[4]) {
    message = 'You chose Wooden Stake and the enemy chose Crossbow! You take 2 damage!'
    player1Hp = player1Hp - 2
    updatePlayer1Inventory()
    updateComputerInventory()
  }
  console.log(player1Inventory);
  console.log(computerInventory);
  console.log(player1Hp);
  console.log(computerHp);
}

function updateComputerInventory () {
  //silver bullet
  if (computerChoice === choices[3]) {
    computerInventory.weapons[0].quantity--
  }
  //crossbow
  if (computerChoice === choices[4]) {
    computerInventory.weapons[1].quantity--
  }
  //wooden stake
  if (computerChoice === choices[5]) {
    computerInventory.weapons[2].quantity--
  }
}

function updatePlayer1Inventory () {
  if (player1Choice === choices[3]) {
    player1Inventory.weapons[0].quantity--
  }
  //crossbow
  if (player1Choice === choices[4]) {
    player1Inventory.weapons[1].quantity--
  }
  //wooden stake
  if (player1Choice === choices[5]) {
    player1Inventory.weapons[2].quantity--
  }
}

function updateMessage () {
  battleResult.textContent = message
}

function checkWinner() {
  if (player1Hp === 0) {
    message = `GAME OVER. You lose! Don't give up, try again!`
  } 
  if (computerHp === 0) {
    message = `YOU WIN!!!!!!!! Go again?`
  }
  else {
    return
  }
  console.log(message);
}