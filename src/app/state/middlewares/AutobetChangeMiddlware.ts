import { autobetStopAction, betInputAction, ReducerAction } from '../reducers/ReducerAction'
import { AutobetMode } from '../../types/AutobetTypes'

export const AutobetChangeMiddleware = store => next => action => {
  const payload = action.payload
  const state = store.getState()

  switch (action.type) {
    case ReducerAction.PLAY_SUCCESS: {
      const { profit } = payload
      const {
        balance,
        bet,
        betMin,
        betMax,
        autobetOnWin,
        autobetOnLose,
        autobetOnWinMode,
        autobetOnLoseMode,
        autobetStopOnWin,
        autobetStopOnLose,
      } = state

      if (profit > 0) {
        if (autobetStopOnWin > 0 && profit >= autobetStopOnWin) {
          autobetStopAction()
        } else {
          switch (autobetOnWinMode) {
            case AutobetMode.INCREASE:
              betInputAction(
                Math.min(
                  balance,
                  parseFloat((bet + (bet * autobetOnWin) / 100).toFixed(4))
                )
              )
              break

            case AutobetMode.DECREASE:
              betInputAction(
                Math.max(
                  betMin,
                  parseFloat((bet - (bet * autobetOnWin) / 100).toFixed(4))
                )
              )
              break
          }
        }
      } else {
        if (autobetStopOnLose > 0 && Math.abs(profit) >= autobetStopOnLose) {
          autobetStopAction()
        } else {
          switch (autobetOnLoseMode) {
            case AutobetMode.INCREASE:
              betInputAction(
                Math.min(
                  balance,
                  parseFloat((bet + (bet * autobetOnLose) / 100).toFixed(2))
                )
              )
              break

            case AutobetMode.DECREASE:
              betInputAction(
                Math.max(
                  betMin,
                  parseFloat((bet - (bet * autobetOnLose) / 100).toFixed(2))
                )
              )
              break
          }
        }
      }
      break
    }
  }

  return next(action)
}
