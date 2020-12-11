import fileUtils from '../utilities/file'
import { join } from 'path'

const processInput = (): string[] => {
  const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
  const commands = input.split(/\r?\n/)
  return commands
}

const commands = processInput()

export const partOne = (): void => {
  let commandIterator = 0
  const executedCommands = {}
  let accumulator = 0

  while (commandIterator < commands.length) {
    if (executedCommands[commandIterator]) {
      console.log(accumulator)
      break
    }

    executedCommands[commandIterator] = true

    const commandParts = commands[commandIterator].split(' ')
    const commandType = commandParts[0]
    const number = parseInt(commandParts[1])

    switch (commandType) {
      case 'acc':
        accumulator += number
        commandIterator += 1
        break
      case 'jmp':
        commandIterator += number
        break
      case 'nop':
        commandIterator += 1
        break
    }
  }
}
