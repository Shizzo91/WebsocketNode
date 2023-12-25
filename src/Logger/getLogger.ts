import winston, {Logger, format } from "winston"
import { createLogger as createWinstonLogger } from "winston"
import { padEnd, padStart } from "lodash"
import {maxKeyLength, screamCase} from "../Utils"

const LENGTH_OF_MAX_LEVEL: number = maxKeyLength(winston.config.syslog.levels)

type LoggerMap = {
    [name: string]: Logger
}

const loggerMap: LoggerMap = {}

const gedFormat = (isConsole: boolean = false): winston.Logform.Format => {
    const formatList: winston.Logform.Format[] = [
        format.simple(),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS"
        }),
        format.printf(({ timestamp, level, message, service }) => {
                const nameFormatted: string = padStart(service, maxKeyLength(loggerMap), " ")
                const levelFormatted: string = padEnd(level.toUpperCase(), LENGTH_OF_MAX_LEVEL, " ")
                return `[${timestamp}] ${nameFormatted}.${levelFormatted} : ${message}`
            }
        )
    ]

    if (isConsole) {
        formatList.push(format.colorize({ all: true }))
    }


    return format.combine(...formatList)
}


const createLogger = (name: string): Logger => {
    const logger: Logger = createWinstonLogger({
        levels: winston.config.syslog.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: gedFormat(true)
            }),
            new winston.transports.File( {
                level: "error",
                filename: "error.log",
                format: gedFormat(false)
            }),
        ],
        defaultMeta: {
            service: name
        },
    })


    loggerMap[name] = logger
    return logger
}



export default function getLogger(name: string): Logger {
    name = screamCase(name)
    return loggerMap[name] ?? createLogger(name)
}