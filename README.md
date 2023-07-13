# Deepest World Starter

Deepest World (https://deepestworld.com/) is a browser sandbox MMORPG intended to be played by bots.
This can be a starter to enter the game.

Steps to get up and running:

1. install Node.js & NPM from https://nodejs.org/en/download or any package manager you like
2. create an account & a character on https://deepestworld.com/
3. checkout repository & install dependencies
4. cCreate a `.env` file containing your credentials like so:
```
DW_USERNAME=myUserName
DW_PASSWORD=secretPassword
```
5. start Election via:
```shell
npm start <characterName>
```
6. go to src/starter.js and change the first line to:
```js
let attackMode = true
```
7. make further changes to adjust your bot or start a new one from scratch

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
npm start [character] bar.js # for JavaScript
npm start [character] bar.ts # fot TypeScript
```
## Electron - What Is It and Why Is It Used

Electron is basically a limited version of a browser, but it also has an additional benefit:
regular browsers tend to throttle (slow down) JavaScript execution when their window/tab is no longer focussed.
This is usually a good thing, it preserves resources (CPU and energy consumption).
But slowing down you AI code will probably most likely result in poor performance or death for your character.

## Dependencies

* `@types/node` - type support for build-in Node.js modules
* `dotenv` - library to parse the `.env` files, you also can use regular environment variables, if you prefer those
* `electron` - browser like app to prevent throttling
* `esbuild` - bundler to produce one output file
* `typescript` - to improve your coding experience
