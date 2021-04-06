// Game params
import { IDice, IDiceInitResult, IDicePlayResult } from './IDice'

const MIN_BET = 1
const MAX_BET = 10000
const MAX_PAYOUT = 990000
const BALANCE = 20

const ALL_RANGE = 100.0 // total range of possible dice numbers
const HOUSE_EDGE = 0.01 // casino's house edge

function randomizeInteger(min: number, max: number = null) {
  if (max == null) {
    max = min == null ? Number.MAX_SAFE_INTEGER : min
    min = 0
  }

  min = Math.ceil(min) // inclusive min
  max = Math.floor(max) // exclusive max

  if (min > max - 1) {
    throw new Error('Incorrect arguments.')
  }

  return min + Math.floor((max - min) * Math.random())
}

const checkBet = (deposit: number): void => {
  if (deposit < MIN_BET) {
    throw new Error('deposit less than min bet')
  }
  if (deposit > MAX_BET) {
    throw new Error('deposit greater than max bet')
  }
}

const checkNumber = (number: number): void => {
  if (number < 0) {
    throw new Error('number should be more than 0')
  }
  if (number > ALL_RANGE) {
    throw new Error('number should be less than ' + ALL_RANGE)
  }
}

const getWinCoefficient = (number: number): number => {
  return (ALL_RANGE / (ALL_RANGE - number)) * (1 - HOUSE_EDGE)
}

const getWinPayout = (bet: number, num: number): number => {
  const result = bet * getWinCoefficient(num)
  return result < MAX_PAYOUT ? result : MAX_PAYOUT
}

const delay = (min: number, max: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, randomizeInteger(min, max)))
}

export class DiceMock implements IDice {
  public async init(): Promise<IDiceInitResult> {
    return {
      connected: true,
      balance: BALANCE,
      params: [
        { type: 0, value: (MIN_BET * 10000).toString() },
        { type: 1, value: (MAX_BET * 10000).toString() },
        { type: 2, value: (MAX_PAYOUT * 10000).toString() },
      ],
    }
  }

  public async play(bet: number, number: number): Promise<IDicePlayResult> {
    checkBet(bet)
    checkNumber(number)

    const randomNumber = randomizeInteger(ALL_RANGE)
    const profit = getWinPayout(bet, number)
    const isWin = randomNumber >= number

    await delay(1200, 2000) // simulate network latency for realism

    return {
      randomNumber,
      profit: isWin ? profit : profit * -1,
      isWin,
    }
  }

  public emit(event: string, params: any): Promise<void> {
    console.log('to frontend event', { event, params })
    return Promise.resolve()
  }

  public getBalance(): Promise<number> {
    return Promise.resolve(BALANCE)
  }
}
