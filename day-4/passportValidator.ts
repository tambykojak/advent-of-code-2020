import { Passport } from "./types"

export const areAnyRequiredFieldsBlank = (passport: Passport): boolean => {
    const requiredValues = [
        passport.birthYear,
        passport.issueYear,
        passport.expirationYear,
        passport.height,
        passport.hairColor,
        passport.eyeColor,
        passport.passportId
    ]

    return requiredValues.includes(undefined)
}

export const isPassportValid = (passport: Passport): boolean => {
    if (!isBirthYearValid(passport.birthYear)) return false
    if (!isIssueYearValid(passport.issueYear)) return false
    if (!isExpirationYearValid(passport.expirationYear)) return false
    if (!isHeightValid(passport.height)) return false
    if (!isHairColorValid(passport.hairColor)) return false
    if (!isEyeColorValid(passport.eyeColor)) return false
    if (!isPassportIdValid(passport.passportId)) return false
    return true
}

const isBirthYearValid = (value: string): boolean => {
    if (!value) return false
    const num = parseInt(value, 10)
    return num >= 2010 && num <= 2020
}

const isIssueYearValid = (value: string): boolean => {
    if (!value) return false
    const num = parseInt(value, 10)
    return num >= 2010 && num <= 2020
}

const isExpirationYearValid = (value: string): boolean => {
    if (!value) return false
    const num = parseInt(value, 10)
    return num >= 2020 && num <= 2030
}

const isHeightValid = (value: string): boolean => {
    if (!value) return false
    const x = parseInt(value, 10)
    if (/\d+cm/.test(value)) return x >= 150 && x <= 193
    if (/\d+in/.test(value)) return x >= 59 && x <= 76
    return false
}

const isHairColorValid = (value: string): boolean => {
    if (!value) return false
    return /^#[0-9a-f]{6}$/.test(value)
}

const isEyeColorValid = (value: string): boolean => {
    if (!value) return false
    return /^amb|blu|brn|gry|grn|hzl|oth$/.test(value)
}

const isPassportIdValid = (value: string): boolean => {
    if (!value) return false
    return /^\d{9}$/.test(value)
}