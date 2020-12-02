import { readFileSync } from 'fs'

const processInput = (): number[] => {
    const data = readFileSync('./input.txt', 'utf8');
    const lines = data.split(/\r?\n/);
    return lines.map((line) => parseInt(line.trim()))
}

const entries = processInput()

const partOne = () => {
    for (let i = 0; i < entries.length; i ++) {
        const entryA = entries[i]
    
        for (let j = i + 1; j < entries.length; j ++) {
            const entryB = entries[j]
    
            if (entryA + entryB === 2020) {
                console.log(entryA * entryB)
                break;
            }
        }
    }
}

const partTwo = () => {
    for (let i = 0; i < entries.length; i ++) {
        const entryA = entries[i]
    
        for (let j = i + 1; j < entries.length; j ++) {
            const entryB = entries[j]
    
            for (let k = j + 1; k < entries.length; k ++) {
                const entryC = entries[k]
    
                if (entryA + entryB + entryC === 2020) {
                    console.log(entryA * entryB * entryC)
                    break;
                }
            }
        }
    }
}

partOne()
partTwo()