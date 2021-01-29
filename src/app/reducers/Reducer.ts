import { ReducerAction } from './ReducerAction'

export const initialState = {
  chance: 50,
  bet: 10,
  betLimits: { min: 0, max: 0 },
  balance: 0,
}

export const reducer = (state = initialState, action) => {
  const payload = action.payload

  switch (action.type) {
    case ReducerAction.SET_CHANCE: {
      return {
        ...state,
        chance: payload,
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

    case ReducerAction.BET_MULTIPLY: {
      return {
        ...state,
        bet: Math.min(state.betLimits.max, state.bet * 2),
      }
    }

    case ReducerAction.BET_DIVIDE: {
      return {
        ...state,
        bet: Math.max(state.betLimits.min, state.bet / 2),
      }
    }

    default:
      return state
  }
}
