# Deepest World Starter

Deepest World (https://deepestworld.com/) is a browser sandbox MMORPG intended to be played by bots.
This can be a starter to enter the game.

Steps to get up and running:

1. Install Node.js & NPM from https://nodejs.org/en/download or any package manager you like
2. Create an account & a character on https://deepestworld.com/
3. Checkout repository & install dependencies
4. Create a `.env` file containing your credentials like so:
```
DW_USERNAME=myUserName
DW_PASSWORD=secretPassword
```
5. Start Election via:
```shell
npm start <characterName>
```
6. Go to src/default.js and change the first line to:
```js
let attackMode = true
```
7. Make further changes to adjust your bot or start a new one from scratch

## Electron - What Is It and Why Is It Used

Electron is basically a limited version of a browser, but it also has an additional benefit:
regular browsers tend to throttle (slow down) JavaScript execution when their window/tab is no longer focussed.
This is usually a good thing, it preserves resources (CPU and energy consumption).
But slowing down you AI code will probably most likely result in poor performance or death for your character.

## Dependencies

* @types/node - type support for build-in Node.js modules
* dotenv - library to parse the `.env` files, you also can use regular environment variables, if you prefer those
* electron - browser like app to prevent throttling
* typescript - to improve your coding experience
