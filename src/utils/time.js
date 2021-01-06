import { BREAK_TIME, WORK_TIME } from "../constant/time"

export const timeParser = (timeLeft) => `${Math.floor(timeLeft / 60)}:${('0' + timeLeft % 60).slice(-2)}`

export const getTime = (mode) => mode === 'work' ? WORK_TIME : BREAK_TIME