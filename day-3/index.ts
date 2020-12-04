import { readFileSync } from 'fs'

const processInput = (): number[] => {
    const data = readFileSync('./input.txt', 'utf8');
    const lines = data.split(/\r?\n/);
    return lines.map((line) => parseInt(line.trim()))
}

const entries = processInput()