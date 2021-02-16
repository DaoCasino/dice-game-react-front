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
  SOUND_ON_OFF = 'ReducerAction.SOUND_ON_OFF',
  AUTOBET_COUNT = 'ReducerAction.AUTOBET_COUNT',
  AUTOBET_ON_OFF = 'ReducerAction.AUTOBET_ON_OFF',
  AUTOBET_ON_WIN_MODE = 'ReducerAction.AUTOBET_ON_WIN_MODE',
  AUTOBET_ON_LOSE_MODE = 'ReducerAction.AUTOBET_ON_LOSE_MODE',
  AUTOBET_ON_WIN_INPUT = 'ReducerAction.AUTOBET_ON_WIN_INPUT',
  AUTOBET_ON_LOSE_INPUT = 'ReducerAction.AUTOBET_ON_LOSE_INPUT',
  AUTOBET_STOP_ON_WIN_INPUT = 'ReducerAction.AUTOBET_STOP_ON_WIN_INPUT',
  AUTOBET_STOP_ON_LOSE_INPUT = 'ReducerAction.AUTOBET_STOP_ON_LOSE_INPUT',
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

export const setAutobetCountAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_COUNT, payload: payload })
}

export const autobetOnOffAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_OFF, payload: payload })
}

export const autobetOnWinInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_WIN_INPUT, payload: payload })
}

export const autobetOnLoseInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_LOSE_INPUT, payload: payload })
}

export const autobetStopOnWinInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({
      type: ReducerAction.AUTOBET_STOP_ON_WIN_INPUT,
      payload: payload,
    })
}

export const autobetStopOnLoseInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({
      type: ReducerAction.AUTOBET_STOP_ON_LOSE_INPUT,
      payload: payload,
    })
}

export const autobetOnWinModeAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_WIN_MODE, payload: payload })
}

export const autobetOnLoseModeAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_LOSE_MODE, payload: payload })
}
