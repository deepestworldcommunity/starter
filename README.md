# Deepest World Starter

Deepest World (https://deepestworld.com/) is a browser sandbox MMORPG intended to be played by bots.
This can be a starter to enter the game.

Steps to get up and running:

1. install Node.js & NPM from https://nodejs.org/en/download or any package manager you like
2. create an account & a character on https://deepestworld.com/
3. checkout repository (choose one option) & install dependencies
```shell
# Option 1: Checkout using GIT & HTTPS
git clone https://github.com/kevinsandow/deepestworld-starter.git
# Option 2: Checkout using GIT & SSH
git clone git@github.com:kevinsandow/deepestworld-starter.git
# Option 3: Checkout using GitHub CLI
gh repo clone kevinsandow/deepestworld-starter

# Install dependencies
cd deepestworld-starter
npm install
```
4. create a `.env` file containing your credentials like so:
```
DW_USERNAME=myUserName
DW_PASSWORD=secretPassword
DW_CHARACTER=Charactername
```
You might wonder how you would create a `.env` file under Windows, you can use this to create an empty one:
```shell
echo. > .env
```
5. start Election via:
```shell
npm start
```
6. go to src/starter.js and change the first line to:
```js
let attackMode = true
```
7. make further changes to adjust your bot or start a new one from scratch, I'd suggest using a different file

8. (optional) check out the `src/starter.ts` and use TypeScript

## Working with Multiple Files

Using esbuild code will be transpiled (even TypeScript) and bundled together

### Create your Functions in Separate Files

**foo.js / foo.ts**
```js
export default function foo() {
  console.log('Hello World')
}
```
### Import in Your Main File

**bar.js / bar.ts**
```js
import foo from './foo'

foo()
```
### Run & Enjoy

```sh
npm start bar.js # for JavaScript
npm start bar.ts # for TypeScript
```
## Electron - What Is It and Why Is It Used

Electron is basically a limited version of a browser, but it also has an additional benefit:
regular browsers tend to throttle (slow down) JavaScript execution when their window/tab is no longer focussed.
This is usually a good thing, it preserves resources (CPU and energy consumption).
But slowing down you AI code will probably most likely result in poor performance or death for your character.

## FAQ

### "Help, my code gets updated, but nothing is happening."

Have you checked out the developer tools of Electron? You can do so
via `Ctrl + Shift + I` under Windows/Unix or `Option + Command + I`, there might be an error.

A common pitfall for beginners is that your JavaScript code is not available in strict mode. (For further information see here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

## Dependencies

* `@types/node` - type support for build-in Node.js modules
* `dotenv` - library to parse the `.env` files, you also can use regular environment variables, if you prefer those
* `electron` - browser like app to prevent throttling
* `esbuild` - bundler to produce one output file
* `typescript` - to improve your coding experience
