import { processPassportInput } from './passportReader'
import { areAnyRequiredFieldsBlank, isPassportValid } from './passportValidator'

const passports = processPassportInput()

export const partOne = (): void => {
    let validPassportCount = 0

    for (const passport of passports) { 
        if (!areAnyRequiredFieldsBlank(passport)) {
            validPassportCount += 1
        }
    }

    console.log(`The number of valid passports is ${validPassportCount}.`)
}

export const partTwo = (): void => {
    let validPassportCount = 0

    for (const passport of passports) { 
        if (isPassportValid(passport)) {
            validPassportCount += 1
        }
    }

    console.log(`The number of valid passports is ${validPassportCount}.`)
}
