require('dotenv').config()

/** @var {string | undefined} */
const username = process.env.DW_USERNAME
if (typeof username !== 'string') {
  console.error('set DW_USERNAME in .env file')
  process.exit(1)
}

/** @var {string | undefined} */
const password = process.env.DW_PASSWORD
if (typeof password !== 'string') {
  console.error('set DW_PASSWORD in .env file')
  process.exit(2)
}

/** @var {string | undefined} */
const characterName = process.env.DW_CHARACTER
if (typeof characterName !== 'string') {
  console.error('set DW_CHARACTER in .env file')
  process.exit(3)
}

const disableTracking = process.env.DW_DISABLE_TRACKING === "true"

const recordDeaths = process.env.DW_RECORD_DEATHS === "true"

const hideHints = process.env.DW_HIDE_HINTS === "true"

/** @var {string} */
const script = process.argv[2] ?? process.env.DW_SCRIPT ?? 'src/starter.js'

module.exports = {
  username,
  password,
  characterName,
  disableTracking,
  recordDeaths,
  hideHints,
  script,
}
