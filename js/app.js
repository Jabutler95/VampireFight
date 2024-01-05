/*---------------- Constants ----------------*/

const choices = [
  'Bite', 
  'Scratch',
  'Garlic',
  'Silver Bullet',
  'Crossbow',
  'Wooden Stake',
]

/*--------------- Variables ------------------*/
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
  ]
}

let player1Choice, computerChoice, message
let gameIsOver = false
let player1Hp = 10
let computerHp = 10
let winner = false

/*-------- Cached Element References-------*/
const player1InventoryEl = document.getElementById('player1InvList')
const cpuInventoryEl = document.getElementById('cpuInvList')
const battleResult = document.getElementById('message')
const resetButton = document.getElementById('reset-btn')
const choiceButtons = document.querySelectorAll('.choices')
const comHp = document.getElementById('computerHp')
const playHp = document.getElementById('playerHp')

/*---------- Audio Elements and Functions------*/
const tieEffect = new Audio('../Audio/Tie.mp3')
const biteEffect = new Audio('../Audio/Bite.mp3')
const crossbowEffect = new Audio('../Audio/Crossbow.mp3')
const garlicEffect = new Audio('../Audio/Garlic.mp3')
const godEffect = new Audio('../Audio/God.mp3')
const loserEffect = new Audio('../Audio/Loser.mp3')
const scratchEffect = new Audio('../Audio/Scratch.mp3')
const silverBulletEffect = new Audio('../Audio/SilverBullet.mp3')
const winnerEffect = new Audio('../Audio/Winner.mp3')
const woodenStakeEffect = new Audio('../Audio/WoodenStake.mp3')
const backgroundMusic = new Audio('../Audio/CreepyBackgroundMusic.mp3')
const playPauseBtn = document.getElementById('play-pause-btn')
const volumeControl = document.getElementById('volume-control')
//loop the audio 
backgroundMusic.loop = true
playPauseBtn.addEventListener('click', playPauseMusic)
//functionality to the slider to adjust volume 
volumeControl.addEventListener('input', function() {
  backgroundMusic.volume = volumeControl.value
})

//functionality to the play/pause button
let musicPlayed = false
let musicPaused = false 
function playPauseMusic () {
  if (musicPaused) {
    backgroundMusic.play()
    musicPaused = false
    playPauseBtn.textContent = 'Pause Music'
  } else {
    backgroundMusic.pause()
    musicPaused = true
    playPauseBtn.textContent = 'Play Music'
  }
}


/*-------------- Event Listeners ---------------*/
document.getElementById('Bite').addEventListener('click', playGame)
document.getElementById('Scratch').addEventListener('click', playGame)
document.getElementById('Garlic').addEventListener('click', playGame)
document.getElementById('Silver Bullet').addEventListener('click', playGame)
document.getElementById('Wooden Stake').addEventListener('click', playGame)
document.getElementById('Crossbow').addEventListener('click', playGame)
document.getElementById('god').addEventListener('click', playGame)
document.getElementById('loser').addEventListener('click', playGame)
resetButton.addEventListener('click', resetGame)

/*-------------- Functions -----------------*/

updateHP()
function playGame(evt) {
  if (musicPlayed === false) {
    backgroundMusic.play()
    backgroundMusic.volume = volumeControl.value
    musicPlayed = true
  }
  getPlayer1Choice(evt)
  computerChoice = getRandomWeapon(computerInventory)
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
  }
  //button now will disable immediately when quantity is 0
  //get the id of the button the user clicked on 
  const buttonEl = document.getElementById(player1Choice)
  //if they made a choice, the quantity is 0, and the button is not disabled, disable it. 
  if (selectedWeapon && selectedWeapon.quantity <= 0 && !buttonEl.disabled) {
    //disallow use of a weapon that has a quantity of 0
    document.getElementById(player1Choice).disabled = true
  } else {
    return selectedWeapon
  }
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
  if (player1Choice === 'loser') {
    player1Hp = 0
    loserEffect.volume = 0.1
    loserEffect.play()
  }
  if (player1Choice === 'god') {
    computerHp = 0
    godEffect.volume = 0.05
    godEffect.play()
  }
  //Draw condition
  if (player1Choice === computerChoice) {
    message = `You chose ${player1Choice}, the enemy chose ${computerChoice}. It's a draw! Nothing happens.`
    tieEffect.play()
  } 
  //player bite cpu scratch
  else if (player1Choice === choices[0] && computerChoice === choices[1]) {
    message = `You chose Bite and the enemy chose Scratch! You stole 1 HP!`
    player1Hp = player1Hp + 1
    computerHp = computerHp - 1
    biteEffect.volume = 0.2
    biteEffect.play()
  } 
  //player bite cpu garlic
  else if (player1Choice === choices[0] && computerChoice === choices[2]) {
    message = `You chose Bite and the enemy chose Garlic! The enemy stole 1HP!`
    player1Hp = player1Hp - 1
    computerHp = computerHp + 1
    garlicEffect.volume = 0.2
    garlicEffect.play()
  } 
  //player bite cpu silver bullet
  else if (player1Choice === choices[0] && computerChoice === choices[3]) {
    message = `You chose Bite and the enemy chose silver bullet! You lose 2 HP!`
    player1Hp = player1Hp - 2
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  } 
  //player bite cpu Wooden Stake
  else if (player1Choice === choices[0] && computerChoice === choices[5]) {
    message = `You chose Bite and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
    woodenStakeEffect.volume = 0.2
    woodenStakeEffect.play()
  } 
  //player bite cpu Crossbow
  else if (player1Choice === choices[0] && computerChoice === choices[4]) {
    message = `You chose Bite and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player scratch cpu bite
  else if (player1Choice === choices[1] && computerChoice === choices[0]) {
    message = `You chose Scratch and the enemy chose Bite! The enemy stole 1 HP!`
    player1Hp = player1Hp - 1
    computerHp = computerHp + 1
    biteEffect.volume = 0.2
    biteEffect.play()
  }
  //player scratch cpu garlic
  else if (player1Choice === choices[1] && computerChoice === choices[2]) {
    message = `You chose Scratch and the enemy chose Garlic! You stole 1 HP!`
    player1Hp = player1Hp + 1
    computerHp = computerHp - 1
    scratchEffect.volume = 0.2
    scratchEffect.play()
  }
  //player scratch cpu silver bullet
  else if (player1Choice === choices[1] && computerChoice === choices[3]) {
    message = `You chose Scratch and the enemy chose Silver Bullet! You lose 2 HP!`
    player1Hp = player1Hp - 2
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player scratch cpu crossbow
  else if (player1Choice === choices[1] && computerChoice === choices[4]) {
    message = `You chose Scratch and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player scratch cpu stake
  else if (player1Choice === choices[1] && computerChoice === choices[5]) {
    message = `You chose Scratch and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
    woodenStakeEffect.volume = 0.2
    woodenStakeEffect.play()
  }
  //player garlic cpu bite
  else if (player1Choice === choices[2] && computerChoice === choices[0]) {
    message = `You chose Garlic and the enemy chose Bite! You stole 1 HP!`
    player1Hp = player1Hp + 1
    computerHp = computerHp - 1
    garlicEffect.volume = 0.2
    garlicEffect.play()
  }
  //player garlic cpu scratch
  else if (player1Choice === choices[2] && computerChoice === choices[1]) {
    message = `You chose Garlic and the enemy chose Scratch! The enemy stole 1 HP!`
    player1Hp = player1Hp - 1
    computerHp = computerHp + 1
    scratchEffect.volume = 0.2
    scratchEffect.play()
  }
  //player garlic cpu silver bullet
  else if (player1Choice === choices[2] && computerChoice === choices[3]) {
    message = `You chose Garlic and the enemy chose Silver Bullet! You lose 2 HP!`
    player1Hp = player1Hp - 2
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player garlic cpu crossbow
  else if (player1Choice === choices[2] && computerChoice === choices[4]) {
    message = `You chose Garlic and the enemy chose Crossbow! You lose 3 HP!`
    player1Hp = player1Hp - 3
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player garlic cpu wooden stake
  else if (player1Choice === choices[2] && computerChoice === choices[5]) {
    message = `You chose Garlic and the enemy chose Wooden Stake! You lose 1 HP!`
    player1Hp = player1Hp - 1
    woodenStakeEffect.volume = 0.2
    woodenStakeEffect.play()
  }
  //player silver bullet cpu bite
  else if (player1Choice === choices[3] && computerChoice === choices[0]) {
    message = `You chose Silver Bullet and the enemy chose Bite! You deal 2 damage!`
    computerHp = computerHp - 2
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player silver bullet cpu scratch 
  else if (player1Choice === choices[3] && computerChoice === choices[1]) {
    message = `You chose Silver Bullet and the enemy chose Scratch! You deal 2 damage!`
    computerHp = computerHp - 2
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player silver bullet cpu garlic 
  else if (player1Choice === choices[3] && computerChoice === choices[2]) {
    message = `You chose Silver Bullet and the enemy chose Garlic! You deal 2 damage!`
    computerHp = computerHp - 2
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player silver bullet cpu crossbow 
  else if (player1Choice === choices[3] && computerChoice === choices[4]) {
    message = `You chose Silver Bullet and the enemy chose Crossbow! You take 1 damage!`
    player1Hp = player1Hp - 1
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player silver bullet cpu wooden stake
  else if (player1Choice === choices[3] && computerChoice === choices[5]) {
    message = `You chose Silver Bullet and the enemy chose Wooden Stake! You deal 1 damage!`
    computerHp = computerHp - 1
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player crossbow cpu bite
  else if (player1Choice === choices[4] && computerChoice === choices[0]) {
    message = `You chose Crossbow and the enemy chose Bite! You deal 3 damage!`
    computerHp = computerHp - 3
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player crossbow cpu scratch 
  else if (player1Choice === choices[4] && computerChoice === choices[1]) {
    message = `You chose Crossbow and the enemy chose Scratch! You deal 3 damage!`
    computerHp = computerHp - 3
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player crossbow cpu garlic 
  else if (player1Choice === choices[4] && computerChoice === choices[2]) {
    message = `You chose Crossbow and the enemy chose Garlic! You deal 3 damage!`
    computerHp = computerHp - 3
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player crossbow cpu silver bullet
  else if (player1Choice === choices[4] && computerChoice === choices[3]) {
    message = `You chose Crossbow and the enemy chose Silver Bullet! You deal 1 damage!`
    computerHp = computerHp - 1
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player crossbow cpu wooden stake
  else if (player1Choice === choices[4] && computerChoice === choices[5]) {
    message = `You chose Crossbow and the enemy chose Wooden Stake! You deal 2 damage!`
    computerHp = computerHp - 2
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  //player wooden stake cpu bite 
  else if (player1Choice === choices[5] && computerChoice === choices[0]) {
    message = `You chose Wooden Stake and the enemy chose Bite! You deal 1 damage!`
    computerHp = computerHp - 1
    woodenStakeEffect.volume = 0.2
    woodenStakeEffect.play()
  }
  //player wooden stake cpu scratch 
  else if (player1Choice === choices[5] && computerChoice === choices[1]) {
    message = `You chose Wooden Stake and the enemy chose Scratch! You deal 1 damage!`
    computerHp = computerHp - 1
    woodenStakeEffect.volume = 0.2
    woodenStakeEffect.play()
  }
  //player wooden stake cpu Garlic 
  else if (player1Choice === choices[5] && computerChoice === choices[2]) {
    message = `You chose Wooden Stake and the enemy chose Garlic! You deal 1 damage!`
    computerHp = computerHp - 1
    woodenStakeEffect.volume = 0.2
    woodenStakeEffect.play()
  }
  //player wooden stake cpu silver bullet
  else if (player1Choice === choices[5] && computerChoice === choices[3]) {
    message = `You chose Wooden Stake and the enemy chose Silver Bullet! You take 1 damage!`
    player1Hp = player1Hp - 1
    silverBulletEffect.volume = 0.2
    silverBulletEffect.play()
  }
  //player wooden stake cpu crossbow
  else if (player1Choice === choices[5] && computerChoice === choices[4]) {
    message = `You chose Wooden Stake and the enemy chose Crossbow! You take 2 damage!`
    player1Hp = player1Hp - 2
    crossbowEffect.volume = 0.2
    crossbowEffect.play()
  }
  updateCpuInvDis()
  updatePlayerInvDis()
  updateHP()
}

function updateMessage () {
  battleResult.textContent = message
}

function checkWinner() {
  if (player1Hp <= 0) {
    winner = true
    message = `GAME OVER. You lose! Don't give up, try again!`
    gameOver()
    loserEffect.play()
  } 
  if (computerHp <= 0) {
    winner = true
    message = `YOU WIN!!!!!!!! Go again?`
    gameOver()
    winnerEffect.volume = 0.05
    winnerEffect.play()
  }
  else {
    return
  }
}

//Funciton to disable all the buttons if there is a winner
function gameOver () {
  if (winner) {
    choiceButtons.forEach(button => {
      button.disabled = true 
    })
  }
}

//Update the inventory on the screen after each state change in the game. Display the inventory as it is updated on the screen. Iterate through and append the item to the parent ul
function updatePlayerInvDis() {
  player1InventoryEl.innerHTML = ''
  player1Inventory.weapons.forEach(weapon => {
    let weaponItem = document.createElement('li')
    weaponItem.textContent = `${weapon.name} : ${weapon.quantity}`
    player1InventoryEl.appendChild(weaponItem)
  })
}

function updateCpuInvDis() {
  cpuInventoryEl.innerHTML = ''
  computerInventory.weapons.forEach(weapon => {
    let weaponItem = document.createElement('li')
    weaponItem.textContent = `${weapon.name} : ${weapon.quantity}`
    cpuInventoryEl.appendChild(weaponItem)
  })
}

//call the functions to show the initial inventories
updatePlayerInvDis()
updateCpuInvDis()

function updateHP () {
  playHp.textContent = `Vladdy Daddy ❤️ : ${player1Hp}`
  comHp.textContent = `Vladamir B. Pootin ❤️ : ${computerHp}`
  if (player1Hp <= 0 && !gameIsOver) {
    document.getElementById('user-Vamp').style.animation = 'rotateUserVampire 30s'
    gameIsOver = true 
  }
  if (computerHp <= 0 && !gameIsOver) {
    document.getElementById('Computer-Vamp').style.animation = 'rotateCpuVampire 30s'
    gameIsOver = true
  }
}

function resetGame () {
  //reset players health
  player1Hp = 10
  computerHp = 10
  updateHP()
  //set winner to false again
  winner = false
  //change the message back
  message = `Make a choice to begin!`
  //restock inventories
  computerInventory = {
    weapons: [
      {name: 'Bite', quantity: Infinity}, 
      {name: 'Scratch', quantity: Infinity},
      {name: 'Garlic', quantity: Infinity},
      {name: 'Silver Bullet', quantity: 2},
      {name: 'Crossbow', quantity: 2 },
      {name: 'Wooden Stake', quantity: 2}, 
    ]
  }
  
  player1Inventory = {
    weapons: [
      {name: 'Bite', quantity: Infinity}, 
      {name: 'Scratch', quantity: Infinity},
      {name: 'Garlic', quantity: Infinity},
      {name: 'Silver Bullet', quantity: 2},
      {name: 'Crossbow', quantity: 2},
      {name: 'Wooden Stake', quantity: 2},
    ]
  }
  //update the displays for user
  updateCpuInvDis()
  updatePlayerInvDis()
  //ensure all the buttons are enabled again
  choices.forEach(function (choice) {
    document.getElementById(choice).disabled = false 
  })
  updateMessage()
  //Just for demo
  document.querySelector('#loser').disabled = false
  document.querySelector('#god').disabled = false
  //Just for demo 
  gameIsOver = false
  document.getElementById('user-Vamp').style.animation = ''
  document.getElementById('Computer-Vamp').style.animation = ''
}

