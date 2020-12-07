import fileUtils from '../utilities/file'
import { join } from 'path'
import { Passport, PassportFields } from './types'

export const processPassportInput = (): Passport[] => {
    const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
    const lines = input.split(/\r?\n/);
    const passports: Passport[] = []
    
    let passportFields = ""

    for (const line of lines) {
        if (line === "") {
            passports.push(processPassportFields(passportFields.trim()))
            passportFields = ""
        } else {
            passportFields += line + " "
        }
    }

    passports.push(processPassportFields(passportFields.trim()))
    return passports
}

const processPassportFields = (passportFields: string): Passport => {
    const fields = passportFields.split(" ")
    const passport: Passport = {}
    fields.forEach((field) => {
        const parts = field.split(":")
        const symbol = parts[0]
        const value = parts[1]

        switch(symbol) {
            case PassportFields.BIRTH_YEAR:
                passport.birthYear = value
                break;
            case PassportFields.ISSUE_YEAR:
                passport.issueYear = value
                break;
            case PassportFields.EXPIRATION_YEAR:
                passport.expirationYear = value
                break;
            case PassportFields.HEIGHT:
                passport.height = value
                break;
            case PassportFields.HAIR_COLOR:
                passport.hairColor = value
                break;
            case PassportFields.EYE_COLOR:
                passport.eyeColor = value
                break;
            case PassportFields.PASSPORT_ID:
                passport.passportId = value
                break;
            case PassportFields.COUNTRY_ID:
                passport.countryId = value
                break;                                                                                                                                                                                                    
        }
    })

    return passport
}