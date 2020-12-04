import { readFileSync } from 'fs'
import { join } from 'path'
import Timer from '../utilities/timer'

type Slope = {
    x: number
    y: number
}

const timer = new Timer()
const processInput = (): string[][] => {
    const data = readFileSync(join(__dirname, './input.txt'), 'utf8');
    const lines = data.split(/\r?\n/);
    const map = []

    for (const line of lines) {
        map.push(line.split(''))
    }

    return map
}

const map = processInput()
const MAP_WIDTH = map[0].length

const traverseMap = (map: string[][], slope: Slope): number => {
    let treeCount = 0
    
    const currentPosition = { x: 0, y: 0 }
    while (currentPosition.y < map.length) {
        const currentTerrain = map[currentPosition.y][currentPosition.x]
    
        if (currentTerrain === "#") {
            treeCount ++
        }
    
        currentPosition.y += slope.y
        currentPosition.x += slope.x
    
        if (currentPosition.x >= MAP_WIDTH) {
            currentPosition.x -= MAP_WIDTH
        }
    }
    
    return treeCount
}

export const runSolution = (): void => {
    const slopes: Slope[] = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ]
    
    let product = 1
    
    for (const slope of slopes) {
        const treeCount = traverseMap(map, slope)
        product *= treeCount
    }

    console.log(`The answer is ${product}.`)
}
