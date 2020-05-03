# Money-wheel

🕹 [Play game](https://cyberdex.github.io/money-wheel/ "Play game") 

![Deploy to GitHub Pages](https://github.com/CyberDex/money-wheel/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)


## Prerequisites

- Create a Money Wheel game
- Use Typescript and PixiJS 4
- Game canvas size should be 800x600

### Game has to have:
- Splash screen with button and input field where user enters starting balance in coins

- 3 bet areas where user can click to select one bet

- Spinning wheel that has to include bet multipliers where spinner can stop

- Spin button that can be clicked only when bet is placed and not while wheel is spinning

- Current Balance

- Winning status – after every spin show if player has won and how much, otherwise clear the message

- Game over popup – if balance drops to zero, show blocking Game over popup

### Gameplay

When game is loaded,  show Splash screen scene, where user enters amount of coins into the input field and clicks button to proceed to main game

After main game is loaded show Wheel, spin button, bet areas and current balance

Chip is worth 1 coin and can be placed by clicking on one of bets areas before spin

Player has to click on one of bet areas to be able to spin the wheel

After placing a bet and spinning the wheel, which takes some time to stop, update user balance and show message if user won

In case balance dropped to zero, Game Over popup is displayed


## Run the project

Copy all this and drop it to the command prompt (you can run them one by one, just remove all "&&")
```
git clone https://github.com/CyberDex/money-wheel.git && 
cd money-wheel && 
git submodule update --init --recursive && 
npm i && 
npm run dev
```
After that just open the game on https://localhost:8080

#### Local build
```
npm start
```
Run on https://localhost:8080

#### Production build
```
npm run build
```
