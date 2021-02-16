import { ReducerAction } from './ReducerAction'

export const initialState = {
  chance: 50,
  bet: 10,
  betLimits: { min: 1, max: 0, maxPayout: 0 },
  balance: 0,
  isPlaying: false,
  profit: undefined,
  number: undefined,
  rolls: [],
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
        bet: Math.min(state.betLimits.max, Math.max(state.betLimits.min, payload)),
        profit: undefined,
        number: undefined,
      }
    }

    case ReducerAction.BET_MULTIPLY: {
      return {
        ...state,
        bet: Math.min(state.betLimits.max, state.bet * 2),
        profit: undefined,
        number: undefined,
      }
    }

    case ReducerAction.BET_DIVIDE: {
      return {
        ...state,
        bet: Math.max(state.betLimits.min, state.bet / 2),
        profit: undefined,
        number: undefined,
      }
    }

    default:
      return state
  }
}
