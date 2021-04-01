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
        autobetStartBalance,
        autobetOnWin,
        autobetOnLose,
        autobetOnWinMode,
        autobetOnLoseMode,
        autobetStopOnWin,
        autobetStopOnLose,
      } = state

      const balanceDiff = autobetStartBalance > 0 ? balance - autobetStartBalance : 0

      if (autobetStopOnWin > 0 && balanceDiff > 0 && balanceDiff >= autobetStopOnWin) {
        autobetStopAction()
      }
      if (autobetStopOnLose > 0 && balanceDiff < 0 && Math.abs(balanceDiff) >= autobetStopOnLose) {
        autobetStopAction()
      }

      if (profit > 0) {
        switch (autobetOnWinMode) {
          case AutobetMode.INCREASE:
            betInputAction(
              Math.min(
                balance,
                parseFloat((bet + (bet * autobetOnWin) / 100).toFixed(4)),
              ),
            )
            break

          case AutobetMode.DECREASE:
            betInputAction(
              Math.max(
                betMin,
                parseFloat((bet - (bet * autobetOnWin) / 100).toFixed(4)),
              ),
            )
            break
        }
      } else {
        switch (autobetOnLoseMode) {
          case AutobetMode.INCREASE:
            betInputAction(
              Math.min(
                balance,
                parseFloat((bet + (bet * autobetOnLose) / 100).toFixed(2)),
              ),
            )
            break

          case AutobetMode.DECREASE:
            betInputAction(
              Math.max(
                betMin,
                parseFloat((bet - (bet * autobetOnLose) / 100).toFixed(2)),
              ),
            )
            break
        }
      }
      break
    }
  }

  return next(action)
}
