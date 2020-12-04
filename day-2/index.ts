import { readFileSync } from 'fs'

type Password = {
    password?: string,
    specialChar?: string,
    specialCharMin?: number,
    specialCharMax?: number
}

class CharStringHelper {
    string: string
    currentChar: any
    nextChar: any
    currentCharPos = 0
    nextCharPos = 1

    constructor(str: string) {
        this.string = str
        this.currentChar = str.charAt(this.currentCharPos)
        this.nextChar = str.charAt(this.nextCharPos)
    }

    next(): void {
        this.currentCharPos++
        this.nextCharPos++

        this.currentChar = this.string.charAt(this.currentCharPos)
        this.nextChar = this.string.charAt(this.nextCharPos)
    }
}

function processInput(): Array<string> {
    const data = readFileSync('./input.txt', 'utf8');
    const lines = data.split(/\r?\n/);

    return lines
}

function parseInput(input: Array<string>): Array<Password>{
    const parsedInput: Array<Password> = []

    input.forEach(line => {
        const parsedLine: Password = {}
        
        const char = new CharStringHelper(line)

        let stringBuffer = ""
        line.trim()

        while(char.currentChar !== "-") {
            stringBuffer += char.currentChar

            char.next()
        }
        char.next()
        parsedLine.specialCharMin = parseInt(stringBuffer)
        stringBuffer = ""

        while(char.currentChar !== " "){
            stringBuffer += char.currentChar

            char.next()
        }
        char.next()                             
        parsedLine.specialCharMax = parseInt(stringBuffer)
        stringBuffer = ""

        while(char.currentChar !== ":"){
            stringBuffer += char.currentChar

            char.next()
        }
        char.next()
        char.next()
        parsedLine.specialChar = stringBuffer
        stringBuffer = ""

        while(char.nextChar){
            stringBuffer += char.currentChar
            char.next()
        }
        stringBuffer += char.currentChar
        parsedLine.password = stringBuffer

        parsedInput.push(parsedLine)
    });

    return parsedInput
}

function part1ValidPasswordCount(passwords: Array<Password>): number {
    let validPasswordCount = 0
    passwords.forEach(password => {
        const specialCount = password.password.split(password.specialChar).length-1

        if (specialCount <= password.specialCharMax && specialCount >= password.specialCharMin){
            validPasswordCount++
        }
    });

    return validPasswordCount
}

function part2ValidPasswordCount(passwords: Array<Password>): number {
    let validPasswordCount = 0
    passwords.forEach(password => {
        if ((password.password.charAt(password.specialCharMin - 1) === password.specialChar) !==
            (password.password.charAt(password.specialCharMax - 1) === password.specialChar)){
            console.log(password)
            validPasswordCount++
        }
    });

    return validPasswordCount
}

const input = processInput()
const passwords = parseInput(input)
const answer1 = part1ValidPasswordCount(passwords)
const answer2 = part2ValidPasswordCount(passwords)

console.log(answer1)
console.log(answer2)
