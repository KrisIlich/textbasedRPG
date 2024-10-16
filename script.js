let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "An evil genie appears and won't let you leave until you pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
      logToConsole(`You bought 10 health for 10 gold.`);
  } else {
      text.innerText = "You do not have enough gold to buy health.";
      logToConsole(`Attempted to buy health but lacked gold.`);
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      logToConsole("You bought a new weapon for 30 gold. After buying, you have: " + inventory);
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
      logToConsole("Attempted to buy a weapon but lacked gold.");
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
    logToConsole("Attempted to sell a weapon but already had the most powerful one. Try selling the other weapons instead for 15 gold."); 
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    logToConsole(`You sold a weapon for 15 gold. After selling, you have: ${inventory}`);
  } else {
    text.innerText = "Don't sell your only weapon!";
    logToConsole("Attempted to sell a weapon but only had one.");
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  logToConsole("You engaged in a fight with a slime.");
}

function fightBeast() {
  fighting = 1;
  goFight();
  logToConsole("You engaged in a fight with a fanged beast.");
}

function fightDragon() {
  fighting = 2;
  goFight();
  logToConsole("You engaged in a fight with a dragon.");
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  let monsterDmg = getMonsterAttackValue(monsters[fighting].level);
  health -= monsterDmg;
  if (isMonsterHit()) {
    monsterDmgTaken = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= monsterDmgTaken;    
    monsterHealthText.innerText = monsterHealth;
    logToConsole(`The ${monsters[fighting].name} takes ${monsterDmgTaken} damage and the monster hit you for ${monsterDmg} damage.`);
} else {
    text.innerText += " You miss.";
    logToConsole(`You missed the attack on the ${monsters[fighting].name}.`);
    logToConsole(`The monster hit you for ${monsterDmg} damage.`);
}
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
    logToConsole(`You lost against ${monsters[locations[fighting]].name}, do you want to replay?`);
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
      logToConsole(`You defeated the dragon and won the game!`);
    } else {
      defeatMonster();
      logToConsole(`You defeated the ${monsters[locations[fighting]].name}.`);
      logToConsole(`You gained gold and ${monsters[locations[fighting]].level} experience points.`);
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  if (Math.random() <= 0.7) {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
    dodgedXP = Math.floor(monsters[fighting].level / 2);
    xp += dodgedXP;
    xpText.innerText = xp;
    logToConsole(`You dodged the attack from the ${monsters[fighting].name}.`);
    logToConsole(`You gained ${dodgedXP} experience points for dodging.`);
  }
  else {
    partialHit = Math.floor(getMonsterAttackValue(monsters[fighting].level / 2));
    health -= partialHit;
    healthText.innerText = health;
    text.innerText = "The " + monsters[fighting].name + " attacks you, you tried dodging, but failed.";
    logToConsole(`You failed your dodge! You got partially hit by the ${monsters[fighting].name} and lost ${partialHit} health.`);
    
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
  logToConsole("You have restarted the game.");
}

function easterEgg() {
  update(locations[7]);
  logToConsole("Congratulations! You found the easter egg!");
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + ", ";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
    logToConsole("You won the easter egg game!");
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    logToConsole("You lost the easter egg game!");
    if (health <= 0) {
      lose();

    }
  }
}

function logToConsole(message) {
  const consoleDiv = document.getElementById('console');
  consoleDiv.innerHTML += `<div>${message}</div>`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight; // Auto-scroll to the latest message
}
