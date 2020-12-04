import * as childProcess from 'child_process'
import * as fs from 'fs'

const doesFileExist = (pathName: string): boolean => {
    return fs.existsSync(pathName)
}

const runChildNodeProcess = async (path: string): Promise<void> => {
    const solutionProcess = childProcess.fork(path)
    
    return new Promise((resolve, reject) => {
        solutionProcess.on("close", (code) => {
            if (code === 0) {
                resolve()
            } else {
                reject(code)
            }
        })
    })
}

export default {
    doesFileExist,
    runChildNodeProcess
}