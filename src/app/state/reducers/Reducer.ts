import { ReducerAction } from './ReducerAction'
import { DefaultState } from '../DefaultState'
import { Utils } from '@daocasino/dc-react-gamengine'
import { App } from '../../App'

export const reducer = (state = DefaultState, action) => {
  const payload = action.payload

  switch (action.type) {
    case ReducerAction.PLAY: {
      return {
        ...state,
        isPlaying: true,
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.PLAY_SUCCESS: {
      const { bet, betMin } = state
      const { number, profit, balance } = payload

      let newBet = bet

      if (balance < Math.min(bet, betMin)) {
        App.instance.getGameAPI().emit('insufficient-balance', {})

        newBet = Math.min(balance, betMin)
      }

      state.rolls.push({
        number: number,
        profit: profit,
      })

      return {
        ...state,
        bet: newBet,
        isPlaying: false,
        profit: profit,
        number: number,
        balance: balance,
      }
    }
    case ReducerAction.PLAY_ERROR: {
      return {
        ...state,
        isPlaying: false,
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.SET_CHANCE: {
      return {
        ...state,
        chance: payload,
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.SET_BALANCE: {
      return {
        ...state,
        balance: payload,
      }
    }
    case ReducerAction.SET_BET_MIN: {
      return {
        ...state,
        betMin: payload,
      }
    }
    case ReducerAction.SET_BET_MAX: {
      return {
        ...state,
        betMax: payload,
      }
    }
    case ReducerAction.SET_PAYOUT_MAX: {
      return {
        ...state,
        payoutMax: payload,
      }
    }
    case ReducerAction.BET_INPUT: {
      return {
        ...state,
        bet: Math.min(
          state.betMax,
          Math.max(Math.min(state.balance, state.betMin), payload),
        ),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_PLUS: {
      return {
        ...state,
        bet: Math.min(Math.min(state.balance, state.betMax), Utils.formatBet(state.bet + 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_MINUS: {
      return {
        ...state,
        bet: Math.max(state.betMin, Utils.formatBet(state.bet - 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_MULTIPLY: {
      return {
        ...state,
        bet: Math.min(Math.min(state.balance, state.betMax), Utils.formatBet(state.bet * 2)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_DIVIDE: {
      return {
        ...state,
        bet: Math.max(state.betMin, Utils.formatBet(state.bet / 2)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.SOUND_ON_OFF: {
      return { ...state, soundOnOff: payload }
    }
    case ReducerAction.AUTOBET_STOP: {
      return {
        ...state,
        autobetCounter: -1,
        autobetCount: 0,
        autobetStartBalance: 0,
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_ON_OFF: {
      return { ...state, autobetOnOff: payload }
    }
    case ReducerAction.AUTOBET_COUNT: {
      return { ...state, autobetCount: payload }
    }
    case ReducerAction.AUTOBET_COUNTER: {
      return { ...state, autobetStartBalance: payload > 0 ? state.balance : 0, autobetCounter: payload }
    }
    case ReducerAction.AUTOBET_ON_WIN_INPUT: {
      return { ...state, autobetOnWin: Utils.formatBet(payload) }
    }
    case ReducerAction.AUTOBET_ON_WIN_PLUS: {
      return {
        ...state,
        autobetOnWin: Math.min(100, Utils.formatBet(state.autobetOnWin + 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_ON_WIN_MINUS: {
      return {
        ...state,
        autobetOnWin: Math.max(0, Utils.formatBet(state.autobetOnWin - 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_ON_LOSE_INPUT: {
      return { ...state, autobetOnLose: Utils.formatBet(payload) }
    }
    case ReducerAction.AUTOBET_ON_LOSE_PLUS: {
      return {
        ...state,
        autobetOnLose: Math.min(100, Utils.formatBet(state.autobetOnLose + 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_ON_LOSE_MINUS: {
      return {
        ...state,
        autobetOnLose: Math.max(0, Utils.formatBet(state.autobetOnLose - 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_STOP_ON_WIN_INPUT: {
      return { ...state, autobetStopOnWin: Utils.formatBet(payload) }
    }
    case ReducerAction.AUTOBET_STOP_ON_WIN_PLUS: {
      return {
        ...state,
        autobetStopOnWin: Math.min(state.maxPayout, Utils.formatBet(state.autobetStopOnWin + 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_STOP_ON_WIN_MINUS: {
      return {
        ...state,
        autobetStopOnWin: Math.max(0, Utils.formatBet(state.autobetStopOnWin - 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_STOP_ON_LOSE_INPUT: {
      return { ...state, autobetStopOnLose: Utils.formatBet(payload) }
    }
    case ReducerAction.AUTOBET_STOP_ON_LOSE_PLUS: {
      return {
        ...state,
        autobetStopOnLose: Math.min(state.maxPayout, Utils.formatBet(state.autobetStopOnLose + 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_STOP_ON_LOSE_MINUS: {
      return {
        ...state,
        autobetStopOnLose: Math.max(0, Utils.formatBet(state.autobetStopOnLose - 1)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.AUTOBET_ON_WIN_MODE: {
      return { ...state, autobetOnWinMode: payload }
    }
    case ReducerAction.AUTOBET_ON_LOSE_MODE: {
      return { ...state, autobetOnLoseMode: payload }
    }
    default:
      return state
  }
}
