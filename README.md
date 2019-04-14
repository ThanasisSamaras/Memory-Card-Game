# Udacity - Memory Game Project

## Table of Contents

* [Project Scope](#scope)
* [Assets](#assets)
* [The Game](#game)
* [Credits](#credits)

## Scope

The scope of this project was to convert this static version of the Memory Game to an interactive project. This required modifying the HTML and CSS files, but primarily the JavaScript file.

**Disclaimer:** The initial repository is the starter code for _all_ Udacity students.

## Assets

The project consists of the following assets:

* **index.html** - contains the game's html structure
* **main.css** - contains the game's board styling
* **app.js** - contains all the board actions & logic

## Game
This is a browser-based card matching game (also known as Concentration).

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple - flip over two hidden cards at a time to locate the ones that match! 😊

Each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.
* The game ends once all cards have been correctly matched.

## Credits
To be able to shuffle cards for each new game, a shuffle js function was used from [Stack Overflow](http://stackoverflow.com/a/2450976)
