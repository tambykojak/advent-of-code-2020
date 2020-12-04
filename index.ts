import fileUtils from './utilities/file'
import Timer from './utilities/timer'
import * as path from 'path'

const ARGS_DAY_NUMBER_INDEX = 2
const MILIS_IN_SECOND = 1000
const dayNumber = process.argv[ARGS_DAY_NUMBER_INDEX] || 1
const scriptPath = path.join(__dirname, `day-${dayNumber}`, "index.ts")

if (!fileUtils.doesFileExist(scriptPath)) {
    console.error(`Can't find ${scriptPath}. Are you sure it's there?`)
    process.exit()
}

const run = async () => {
    const problemModule = require(scriptPath)
    console.info(`Running Day ${dayNumber} solution...\n`)
    
    const timer = new Timer()
    
    try {
        await problemModule.runSolution()
        timer.log("\nThe solution took /s (/ms) seconds to run.")
    } catch (error) {
        timer.log(`\nThe solution errored out with code ${error} after /s (/ms) seconds.`)
    }
}

run()