import fileUtils from '../utilities/file'
import { join } from 'path'

export const partOne = (): void => {
  const getGroupAnswers = (): Record<string, boolean>[] => {
    const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
    const lines = input.split(/\r?\n/)
    const groups: Record<string, boolean>[] = []
    let currentGroupAnswers: Record<string, boolean> = {}

    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i] === '') {
        groups.push(currentGroupAnswers)
        currentGroupAnswers = {}
      } else {
        lines[i].split('').forEach((char) => (currentGroupAnswers[char] = true))
      }
    }

    groups.push(currentGroupAnswers)

    return groups
  }

  let sum = 0
  for (const answers of getGroupAnswers()) {
    sum += Object.keys(answers).length
  }

  console.log(`The sum of all the answers is ${sum}`)
}

export const partTwo = (): void => {
  const getGroups = (): Record<string, any>[] => {
    const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
    const lines = input.split(/\r?\n/)
    const groups: Record<string, any>[] = []
    let currentGroupAnswers: Record<string, number> = {}
    let count = 0

    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i] === '') {
        groups.push({
          count,
          answers: currentGroupAnswers,
        })
        count = 0
        currentGroupAnswers = {}
      } else {
        count += 1
        lines[i].split('').forEach((char) => {
          if (!currentGroupAnswers[char]) currentGroupAnswers[char] = 1
          else currentGroupAnswers[char] += 1
        })
      }
    }

    groups.push({
      count,
      answers: currentGroupAnswers,
    })

    return groups
  }

  let sum = 0
  for (const group of getGroups()) {
    for (const key of Object.keys(group.answers)) {
      if (group.answers[key] === group.count) {
        sum += 1
      }
    }
  }

  console.log(`The sum of all the answers is ${sum}`)
}
