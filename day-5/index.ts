import fileUtils from '../utilities/file'
import { join } from 'path'
import { ColumnCode, RowCode, SeatCode } from './types'

const ROWS_ON_PLANE = 128
const COLUMNS_ON_PLANE = 8

const processInput = (): SeatCode[] => {
  const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
  const lines = input.split(/\r?\n/)
  return lines.map((line) => line.split(''))
}

const binarySearch = (
  input: string[],
  upperLimit: number,
  keepLowerIndicator: RowCode | ColumnCode
): number => {
  let max = upperLimit
  let midPoint = Math.floor(max / 2)
  let min = 0

  while (input.length !== 0) {
    if (input.shift() === keepLowerIndicator) {
      const temp = midPoint
      midPoint = Math.floor((midPoint - min) / 2) + min
      max = temp
    } else {
      min = midPoint
      midPoint = Math.floor((max - min) / 2) + min
    }
  }

  return midPoint
}

const getSeatRow = (seatCode: SeatCode): number => {
  const rowCode = []
  for (let i = 0; i < 7; i += 1) rowCode.push(seatCode[i])
  return binarySearch(rowCode, ROWS_ON_PLANE, RowCode.KEEP_LOWER_HALF)
}

const getSeatColumn = (seatCode: SeatCode): number => {
  const columnCode = []
  for (let i = 7; i < seatCode.length; i += 1) columnCode.push(seatCode[i])
  return binarySearch(columnCode, COLUMNS_ON_PLANE, ColumnCode.KEEP_LOWER_HALF)
}

const seatCodes = processInput()

export const partOne = (): void => {
  let maxSeatId

  for (const seatCode of seatCodes) {
    const row = getSeatRow(seatCode)
    const column = getSeatColumn(seatCode)
    const seatId = row * 8 + column

    if (!maxSeatId) maxSeatId = seatId
    else if (seatId > maxSeatId) {
      maxSeatId = seatId
    }
  }

  console.log(`The largest seat id is ${maxSeatId}`)
}

export const partTwo = (): void => {
  const seatIds: number[] = []

  for (const seatCode of seatCodes) {
    const row = getSeatRow(seatCode)
    const column = getSeatColumn(seatCode)
    const seatId = row * 8 + column
    seatIds.push(seatId)
  }

  // BAD
  const sortedSeatIds = seatIds.sort((a, b) => a - b)

  for (let i = 0; i < sortedSeatIds.length - 1; i += 1) {
    if (seatIds[i + 1] - seatIds[i] != 1) {
      console.log(seatIds[i] + 1)
    }
  }
}
