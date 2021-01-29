import { Engine } from 'dc-react-gamengine'

export enum ReducerAction {
  SET_CHANCE = 'ReducerAction.SET_CHANCE',
  SET_BALANCE = 'ReducerAction.SET_BALANCE',
  SET_BET_LIMITS = 'ReducerAction.SET_BET_LIMITS',
  BET_MULTIPLY = 'ReducerAction.BET_MULTIPLY',
  BET_DIVIDE = 'ReducerAction.BET_DIVIDE',
  BET_INPUT = 'ReducerAction.BET_INPUT',
}

export const setChanceAction = (payload) => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.SET_CHANCE, payload: payload })
}

export const setBalanceAction = (payload) => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.SET_BALANCE, payload: payload })
}

export const setBetLimitsAction = (payload) => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.SET_BET_LIMITS, payload: payload })
}

export const betMultiplyAction = (payload) => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_MULTIPLY, payload: payload })
}

export const betDivideAction = (payload) => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_DIVIDE, payload: payload })
}

export const betInputAction = (payload) => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_INPUT, payload: payload })
}
