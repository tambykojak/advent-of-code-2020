export default class Timer {
    start: number

    constructor() {
        this.reset()
    }

    reset() {
        this.start = new Date().getTime()
    }

    log(message: string = "/s") {
        const duration = (new Date().getTime() - this.start)
        let finalMessage = message.replace("/ms", `${duration}`)
        finalMessage = finalMessage.replace("/s", `${duration / 1000}`)
        finalMessage = finalMessage.replace("/m", `${duration / 60000}`)
        console.log(finalMessage)
    }
}