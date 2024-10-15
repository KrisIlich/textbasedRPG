# Text-Based RPG - Dragon Repeller

[**Play the Game Here!**](https://krisilich.github.io/textbasedRPG/)

## Description

Welcome to **Dragon Repeller**, a simple text-based RPG where you must defeat the dragon preventing people from leaving the town. Navigate through different locations, gather resources, fight monsters, and enhance your character's abilities to emerge victorious.

## Features

- **Dynamic Gameplay**: Make choices that affect the outcome of the game.
- **Inventory System**: Collect and use various weapons and items.
- **Monsters to Defeat**: Engage in battles with different types of monsters.
- **Experience and Gold**: Gain experience points (XP) and gold to improve your character.

## How to Play

1. Start in the town square.
2. Use the buttons to navigate to the store, cave, or engage in combat.
3. Fight monsters to gain experience and gold.
4. Purchase health or weapons to aid you in your journey.
5. Complete the game by defeating the dragon!

## Game Structure

The game is built using HTML, CSS, and JavaScript. Below is a brief overview of the files included in this project:

### HTML (`index.html`)

This file contains the structure of the game interface.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title>RPG - Dragon Repeller</title>
</head>
<body>
    <div id="game">
        <div id="stats">
            <span class="stat">XP: <strong><span id="xpText">0</span></strong></span>
            <span class="stat">Health: <strong><span id="healthText">100</span></strong></span>
            <span class="stat">Gold: <strong><span id="goldText">50</span></strong></span>
        </div>
        <div id="controls">
            <button id="button1">Go to store</button>
            <button id="button2">Go to cave</button>
            <button id="button3">Fight dragon</button>
        </div>
        <div id="monsterStats">
            <span class="stat">Monster Name: <strong><span id="monsterName"></span></strong></span>
            <span class="stat">Health: <strong><span id="monsterHealth"></span></strong></span>
        </div>
        <div id="text">
            Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.
        </div>
    </div>
    <script src="./script.js"></script>
</body>
</html>
