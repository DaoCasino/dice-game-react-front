import { ReducerAction } from './ReducerAction'
import { Utils } from '@daocasino/dc-react-gamengine/lib'

export enum AutobetMode {
  RESET = 'AutobetMode.RESET',
  INCREASE = 'AutobetMode.INCREASE',
  DECREASE = 'AutobetMode.DECREASE',
}

export const AutobetCounts = [5, 10, 25, 50, 0]

export const initialState = {
  chance: 50,
  bet: 10,
  betLimits: { min: 1, max: 0, maxPayout: 0 },
  balance: 0,
  isPlaying: false,
  profit: undefined,
  number: undefined,
  rolls: [],
  soundOnOff: true,
  autobetCount: -1,
  autobetCounter: -1,
  autobetOnOff: false,
  autobetOnWinMode: AutobetMode.RESET,
  autobetOnLoseMode: AutobetMode.RESET,
  autobetOnWin: 0,
  autobetOnLose: 0,
  autobetStopOnLose: 0,
  autobetStopOnWin: 0,
}

export const reducer = (state = initialState, action) => {
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
    case ReducerAction.SET_BET_LIMITS: {
      return {
        ...state,
        betLimits: payload,
      }
    }
    case ReducerAction.BET_INPUT: {
      return {
        ...state,
        bet: Math.min(
          state.betLimits.max,
          Math.max(state.betLimits.min, payload)
        ),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_MULTIPLY: {
      return {
        ...state,
        bet: Math.min(state.betLimits.max, Utils.formatBet(state.bet * 2)),
        profit: undefined,
        number: undefined,
      }
    }
    case ReducerAction.BET_DIVIDE: {
      return {
        ...state,
        bet: Math.max(state.betLimits.min, Utils.formatBet(state.bet / 2)),
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
