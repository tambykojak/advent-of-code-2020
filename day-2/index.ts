import fileUtils from '../utilities/file'
import { join } from 'path'

interface PasswordPolicy {
    num1: number
    num2: number
    character: string
}

interface Password {
    policy: PasswordPolicy
    value: String
}

const processInput = (): Password[] => {
    const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
    const inputLines = input.split(/\r?\n/);

    return inputLines.map((line): Password => {
        let parts = line.split(":")
        const passwordValue = parts[1]
        parts = parts[0].split(" ")
        const policyCharacter = parts[1]
        parts = parts[0].split("-")
        const policyNum1 = parseInt(parts[0])
        const policyNum2 = parseInt(parts[1])

        return {
            policy: {
                num1: policyNum1,
                num2: policyNum2,
                character: policyCharacter
            },
            value: passwordValue
        }
    })
}

const passwords = processInput()

export const partOne = () => {
    const isPasswordValid = (password: Password): boolean => {
        const passwordCharacters = password.value.split("")

        let count = 0
        for (const character of passwordCharacters) {
            if (character === password.policy.character) {
                count += 1
            }
        }

        return count >= password.policy.num1 && count <= password.policy.num2
    }

    let validPasswordsCount = 0

    for (const password of passwords) {
        if (isPasswordValid(password)) validPasswordsCount += 1
    }

    console.log(`There are ${validPasswordsCount} valid passwords.`)
}

export const partTwo = () => {
    const isPasswordValid = (password: Password): boolean => {
        return (password.value.charAt(password.policy.num1) === password.policy.character) 
                !== (password.value.charAt(password.policy.num2) === password.policy.character)
    }

    let validPasswordsCount = 0

    for (const password of passwords) {
        if (isPasswordValid(password)) validPasswordsCount += 1
    }

    console.log(`There are ${validPasswordsCount} valid passwords.`)
}