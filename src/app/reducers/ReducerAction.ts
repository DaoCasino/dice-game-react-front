export enum ReducerAction {
  SET_BALANCE = 'ReducerAction.SET_BALANCE',
  SET_BET_LIMITS = 'ReducerAction.SET_BET_LIMITS',
  BET_MULTIPLY = 'ReducerAction.BET_MULTIPLY',
  BET_DIVIDE = 'ReducerAction.BET_DIVIDE',
  BET_INPUT = 'ReducerAction.BET_INPUT',
}

export const setBalanceAction = (store) => {
  store.dispatch({ type: ReducerAction.SET_BALANCE })
}

export const setBetLimitsAction = (store) => {
  store.dispatch({ type: ReducerAction.SET_BET_LIMITS })
}

export const betMultiplyAction = (store) => {
  store.dispatch({ type: ReducerAction.BET_MULTIPLY })
}

export const betDivideAction = (store) => {
  store.dispatch({ type: ReducerAction.BET_DIVIDE })
}

export const betInputAction = (store) => {
  store.dispatch({ type: ReducerAction.BET_INPUT })
}
