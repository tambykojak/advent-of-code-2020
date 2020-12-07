export enum PassportFields {
    BIRTH_YEAR = "byr",
    ISSUE_YEAR = "iyr",
    EXPIRATION_YEAR = "eyr",
    HEIGHT = "hgt",
    HAIR_COLOR = "hcl",
    EYE_COLOR = "ecl",
    PASSPORT_ID = "pid",
    COUNTRY_ID = "cid"
}

export interface Passport {
    birthYear?: string
    issueYear?: string
    expirationYear?: string
    height?: string
    hairColor?: string
    eyeColor?: string
    passportId?: string
    countryId?: string
}