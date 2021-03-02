import { ReducerAction } from './ReducerAction'
import { DefaultState } from '../DefaultState'
import { Utils } from '@daocasino/dc-react-gamengine'

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
      state.rolls.push({
        number: payload.number,
        profit: payload.profit,
      })

      return {
        ...state,
        isPlaying: false,
        profit: payload.profit,
        number: payload.number,
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
          Math.max(state.betMin, payload),
        ),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_PLUS: {
      return {
        ...state,
        bet: Math.min(state.betMax, Utils.formatBet(state.bet + 1)),
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
        bet: Math.min(state.betMax, Utils.formatBet(state.bet * 2)),
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
      return { ...state, autobetCounter: payload }
    }
    case ReducerAction.AUTOBET_ON_WIN_INPUT: {
      return { ...state, autobetOnWin: payload }
    }
    case ReducerAction.AUTOBET_ON_LOSE_INPUT: {
      return { ...state, autobetOnLose: payload }
    }
    case ReducerAction.AUTOBET_STOP_ON_WIN_INPUT: {
      return { ...state, autobetStopOnWin: payload }
    }
    case ReducerAction.AUTOBET_STOP_ON_LOSE_INPUT: {
      return { ...state, autobetStopOnLose: payload }
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
