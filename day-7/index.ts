import fileUtils from '../utilities/file'
import { join } from 'path'

interface Bag {
  color: string
  contains?: string[]
}

const processInput = (): Bag[] => {
  const input = fileUtils.getFileContent(join(__dirname, 'input.txt'))
  const lines = input.split(/\r?\n/)

  const bags: Bag[] = []

  for (const line of lines) {
    const parts = line.split(' contain ')
    const color = parts[0].split(' bags')[0]
    const canHoldBagRules = parts[1]
      .split('.')[0]
      .split(', ')
      .filter((s) => {
        return s !== 'no other bags'
      })

    const bagsWithinBag: string[] = []

    for (const rule of canHoldBagRules) {
      const ruleParts = rule.split(' ')
      const count = parseInt(ruleParts.shift())
      const color = ruleParts.join(' ')

      for (let i = 0; i < count; i++) {
        bagsWithinBag.push(color.split(' bag')[0])
      }
    }

    bags.push({
      color,
      contains: bagsWithinBag,
    })
  }

  return bags
}

const bags = processInput()

const createAdjacencyList = (): Record<string, Set<string>> => {
  const graph = {}

  for (const bag of bags) {
    graph[bag.color] = new Set(bag.contains || [])
  }

  return graph
}

const createNonUniqueAdjacencyList = (): Record<string, Set<string>> => {
  const graph = {}

  for (const bag of bags) {
    graph[bag.color] = bag.contains || []
  }

  return graph
}

export const partOne = (): void => {
  const getPossibleAncestors = (
    graph: Record<string, Set<string>>,
    targetBag: string
  ): string[] => {
    const possibleAncestors = []
    const parentBags = []
    for (const bag of Object.keys(graph)) {
      if (graph[bag].has(targetBag)) parentBags.push(bag)
    }

    console.log(`Found ${parentBags.length} bags that can hold a ${targetBag}.`)
    possibleAncestors.push(...parentBags)

    for (const bag of parentBags) {
      possibleAncestors.push(...getPossibleAncestors(graph, bag))
    }

    return [...new Set(possibleAncestors)]
  }

  const graph = createAdjacencyList()
  console.log(graph)
  const target = 'shiny gold'
  const ancestors = getPossibleAncestors(graph, target)
  console.log(
    `There are ${ancestors.length} possible bags that can hold a ${target} bag.`
  )
}

export const partTwo = (): void => {
  const countAllChildrenBags = (graph, targetBag): number => {
    const childBags = graph[targetBag]

    let count = childBags.length

    for (const childBag of childBags) {
      count += countAllChildrenBags(graph, childBag)
    }

    return count
  }

  const graph = createNonUniqueAdjacencyList()
  const target = 'shiny gold'
  const count = countAllChildrenBags(graph, target)
  console.log(`There should be ${count} bags within your ${target} bag.`)
}
