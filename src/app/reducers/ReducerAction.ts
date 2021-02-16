import { Engine } from '@daocasino/dc-react-gamengine'
import { App } from '../App'

export enum ReducerAction {
  PLAY = 'ReducerAction.PLAY',
  PLAY_SUCCESS = 'ReducerAction.PLAY_SUCCESS',
  PLAY_ERROR = 'ReducerAction.PLAY_ERROR',
  SET_CHANCE = 'ReducerAction.SET_CHANCE',
  SET_BALANCE = 'ReducerAction.SET_BALANCE',
  SET_BET_LIMITS = 'ReducerAction.SET_BET_LIMITS',
  BET_MULTIPLY = 'ReducerAction.BET_MULTIPLY',
  BET_DIVIDE = 'ReducerAction.BET_DIVIDE',
  BET_INPUT = 'ReducerAction.BET_INPUT',
  SOUND_ON_OFF = 'ReducerAction.SOUND_ON_OFF'
}

export const playAction = () => {
  playStartAction()

  Engine.instance.getStore().dispatch((dispatch, getState) => {
    const { bet, chance } = getState()

    const gameAPI = App.instance.getGameAPI()

    gameAPI
      .play(bet, chance)
      .then(result => {
        playSuccessAction({
          profit: result.profit,
          number: result.randomNumber,
        })
      })
      .catch(error => {
        playErrorAction(error)
      })
  })
}

export const playStartAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.PLAY })
}

export const playSuccessAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.PLAY_SUCCESS, payload: payload })
}

export const playErrorAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.PLAY_ERROR, payload: payload })
}

export const setChanceAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SET_CHANCE, payload: payload })
}

export const setBalanceAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SET_BALANCE, payload: payload })
}

export const setBetLimitsAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SET_BET_LIMITS, payload: payload })
}

export const betMultiplyAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_MULTIPLY })
}

export const betDivideAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_DIVIDE })
}

export const betInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.BET_INPUT, payload: payload })
}

export const soundOnOffAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SOUND_ON_OFF, payload: payload })
}
