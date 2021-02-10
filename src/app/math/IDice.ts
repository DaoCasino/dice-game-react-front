import { GameParams } from '@daocasino/platform-back-js-lib'

export interface IDiceInitResult {
  connected: boolean
  balance: number
  params: GameParams[]
}

export interface IDicePlayResult {
  randomNumber: number
  profit: number
  isWin: boolean
}

export interface IDice {
  init(): Promise<IDiceInitResult>

  play(bet: number, number: number): Promise<IDicePlayResult>

  emit(event: any, params: any): Promise<void>

  getBalance(): Promise<number>
}
