import fileUtils from './utilities/file'
import Timer from './utilities/timer'
import { join } from 'path'

const ARGS_DAY_NUMBER_INDEX = 2
const dayNumber = process.argv[ARGS_DAY_NUMBER_INDEX] || 1
const scriptPath = join(__dirname, `day-${dayNumber}`, "index.ts")

if (!fileUtils.doesFileExist(scriptPath)) {
    console.error(`Can't find ${scriptPath}. Are you sure it's there?`)
    process.exit()
}

(async () => {
    const problemModule = require(scriptPath)
    console.info(`Running Day ${dayNumber} solution...\n`)
    
    
    if (!problemModule.partOne) {
        console.error(`Day ${dayNumber} module does not export a function name "partOne".`)
        return
    }

    const timer = new Timer()

    try {
        await problemModule.partOne()
        timer.log(`\nThe day ${dayNumber}, part 1 solution took /s seconds to run.\n`)
    } catch (error) {
        timer.log(`The day ${dayNumber}, part 1 solution errored after /s seconds.\n`)
        console.error(error)
    }

    timer.reset()

    if (!problemModule.partTwo) return

    try {
        await problemModule.partTwo()
        timer.log(`\nThe day ${dayNumber}, part 2 solution took /s seconds to run.`)
    } catch (error) {
        timer.log(`The day ${dayNumber}, part 2 solution errored after /s seconds.\n`)
        console.error(error)
    }
})()