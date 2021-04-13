import { Engine } from '@daocasino/dc-react-gamengine'
import { App } from '../../App'

export enum ReducerAction {
  PLAY = 'ReducerAction.PLAY',
  PLAY_SUCCESS = 'ReducerAction.PLAY_SUCCESS',
  PLAY_ERROR = 'ReducerAction.PLAY_ERROR',
  SET_CHANCE = 'ReducerAction.SET_CHANCE',
  SET_BALANCE = 'ReducerAction.SET_BALANCE',
  SET_BET_MIN = 'ReducerAction.SET_BET_MIN',
  SET_BET_MAX = 'ReducerAction.SET_BET_MAX',
  SET_PAYOUT_MAX = 'ReducerAction.SET_PAYOUT_MAX',
  BET_MULTIPLY = 'ReducerAction.BET_MULTIPLY',
  BET_MINUS = 'ReducerAction.BET_MINUS',
  BET_PLUS = 'ReducerAction.BET_PLUS',
  BET_DIVIDE = 'ReducerAction.BET_DIVIDE',
  BET_INPUT = 'ReducerAction.BET_INPUT',
  SOUND_ON_OFF = 'ReducerAction.SOUND_ON_OFF',
  AUTOBET_STOP = 'ReducerAction.AUTOBET_STOP',
  AUTOBET_COUNT = 'ReducerAction.AUTOBET_COUNT',
  AUTOBET_COUNTER = 'ReducerAction.AUTOBET_COUNTER',
  AUTOBET_ON_OFF = 'ReducerAction.AUTOBET_ON_OFF',
  AUTOBET_ON_WIN_MODE = 'ReducerAction.AUTOBET_ON_WIN_MODE',
  AUTOBET_ON_LOSE_MODE = 'ReducerAction.AUTOBET_ON_LOSE_MODE',
  AUTOBET_ON_WIN_INPUT = 'ReducerAction.AUTOBET_ON_WIN_INPUT',
  AUTOBET_ON_WIN_MINUS = 'ReducerAction.AUTOBET_ON_WIN_MINUS',
  AUTOBET_ON_WIN_PLUS = 'ReducerAction.AUTOBET_ON_WIN_PLUS',
  AUTOBET_ON_LOSE_INPUT = 'ReducerAction.AUTOBET_ON_LOSE_INPUT',
  AUTOBET_ON_LOSE_MINUS = 'ReducerAction.AUTOBET_ON_LOSE_MINUS',
  AUTOBET_ON_LOSE_PLUS = 'ReducerAction.AUTOBET_ON_LOSE_PLUS',
  AUTOBET_STOP_ON_WIN_INPUT = 'ReducerAction.AUTOBET_STOP_ON_WIN_INPUT',
  AUTOBET_STOP_ON_WIN_MINUS = 'ReducerAction.AUTOBET_STOP_ON_WIN_MINUS',
  AUTOBET_STOP_ON_WIN_PLUS = 'ReducerAction.AUTOBET_STOP_ON_WIN_PLUS',
  AUTOBET_STOP_ON_LOSE_INPUT = 'ReducerAction.AUTOBET_STOP_ON_LOSE_INPUT',
  AUTOBET_STOP_ON_LOSE_MINUS = 'ReducerAction.AUTOBET_STOP_ON_LOSE_MINUS',
  AUTOBET_STOP_ON_LOSE_PLUS = 'ReducerAction.AUTOBET_STOP_ON_LOSE_PLUS',
}

export const playAction = () => {
  playStartAction()

  Engine.instance.getStore().dispatch((dispatch, getState) => {
    const { bet, chance } = getState()

    const gameAPI = App.instance.getGameAPI()

    gameAPI
      .play(bet, chance)
      .then(async result => {
        const balance = await gameAPI.getBalance()

        playSuccessAction({
          balance: balance,
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

export const setBetMin = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SET_BET_MIN, payload: payload })
}

export const setBetMax = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SET_BET_MAX, payload: payload })
}

export const setPayoutMax = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.SET_PAYOUT_MAX, payload: payload })
}

export const betMultiplyAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_MULTIPLY })
}

export const betDivideAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_DIVIDE })
}

export const betMinusAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_MINUS })
}

export const betPlusAction = () => {
  Engine.instance.getStore().dispatch({ type: ReducerAction.BET_PLUS })
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

export const autobetStopAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_STOP })
}

export const setAutobetCountAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_COUNT, payload: payload })
}

export const setAutobetCounterAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_COUNTER, payload: payload })
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

export const autobetOnWinMinusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_WIN_MINUS })
}

export const autobetOnWinPlusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_WIN_PLUS })
}

export const autobetOnLoseInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_LOSE_INPUT, payload: payload })
}

export const autobetOnLoseMinusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_LOSE_MINUS })
}

export const autobetOnLosePlusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_ON_LOSE_PLUS })
}

export const autobetStopOnWinInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({
      type: ReducerAction.AUTOBET_STOP_ON_WIN_INPUT,
      payload: payload,
    })
}

export const autobetStopOnWinMinusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_STOP_ON_WIN_MINUS })
}

export const autobetStopOnWinPlusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_STOP_ON_WIN_PLUS })
}

export const autobetStopOnLoseInputAction = payload => {
  Engine.instance
    .getStore()
    .dispatch({
      type: ReducerAction.AUTOBET_STOP_ON_LOSE_INPUT,
      payload: payload,
    })
}

export const autobetStopOnLoseMinusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_STOP_ON_LOSE_MINUS })
}

export const autobetStopOnLosePlusAction = () => {
  Engine.instance
    .getStore()
    .dispatch({ type: ReducerAction.AUTOBET_STOP_ON_LOSE_PLUS })
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
