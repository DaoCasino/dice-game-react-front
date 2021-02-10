import { Utils } from '@daocasino/dc-react-gamengine'
import { GameService, getRemoteGameSerivce } from '@daocasino/platform-back-js-lib'
import { IDiceInitResult, IDice, IDicePlayResult } from './IDice'

// Number contract action
const ACTION_TYPE = 0

// Timeout for PostMessage request response between iframe platform and game
const REQUEST_TIMEOUT = 30000

const checkChance = (chance: number): void => {
  if (chance < 1 || chance > 99) {
    throw new Error('Invalid chance')
  }
}

export class DiceBackend implements IDice {
  public service: GameService

  /**
   * Init connection with platform
   * called in App.js
   */
  public async init(): Promise<IDiceInitResult> {
    const result = {
      connected: false, // connection status
      balance: 0, // current user balance
      params: null, // game parameters obtained from the contract (ex. minBet, maxBet, maxPayout...)
    }

    try {
      // 1 connect iframe
      this.service = await getRemoteGameSerivce(REQUEST_TIMEOUT)
      result.connected = true

      // 2 get user balance
      result.balance = Utils.betToFloat(await this.service.getBalance())

      // 3 get game params min max bet and max payout
      result.params = await this.service.getGameParams()

    } catch (err) {
      console.error(err)
    }

    return result
  }

  public async emit(event: any, params: any): Promise<void> {
    return this.service.emit(event, params)
  }

  public async getBalance(): Promise<number> {
    return Utils.betToFloat(await this.service.getBalance())
  }

  /**
   * @param {number} bet player's bet
   * @param {number} number the number the player has bet on
   */
  public async play(bet: number, number: number): Promise<IDicePlayResult> {
    checkChance(number)
    console.time('roll')

    // convert Float to String, ex: 0.4 = '0.4000 BET'
    const deposit = Utils.toBET(bet)

    try {
      // As a result of calling this method, a new game session is created and 'action' with parameters are send to the contract
      // Internally, the method is waiting for updates. It blocks and waits for an update with the type - end of the game
      const { data } = await this.service.newGame(deposit, ACTION_TYPE, [Number(number)])

      // see SDK type `GameSessionUpdate`
      // msg - an optional field and set by the developer of the contract. In this case, the number that dropped out is returned.
      const randomNumber = data['msg'][0]
      const profit = data['player_win_amount']

      let result: IDicePlayResult = {
        randomNumber: randomNumber,
        profit: Utils.betToFloat(profit),
        isWin: randomNumber >= number,
      }

      console.timeEnd('roll')
      return result

    } catch (err) {
      console.timeEnd('roll')
      throw err
    }
  }
}
