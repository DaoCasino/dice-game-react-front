import { playAction, ReducerAction, setAutobetCountAction, setAutobetCounterAction } from '../reducers/ReducerAction'
import { AutobetCounts } from '../../types/AutobetTypes'

let timeoutId = -1

export const AutobetMiddleware = store => next => action => {
  const payload = action.payload
  const state = store.getState()

  switch (action.type) {
    case ReducerAction.PLAY: {
      const { autobetOnOff, autobetCount, autobetCounter } = state

      if (autobetOnOff && autobetCounter === -1) {
        setAutobetCounterAction(autobetCount - 1)
      }

      break
    }

    case ReducerAction.PLAY_SUCCESS: {
      const { autobetOnOff, autobetCounter } = state

      if (autobetOnOff) {
        const counter = autobetCounter - 1

        if (counter >= -1) {
          setAutobetCounterAction(autobetCounter - 1)
        }

        if (counter >= 0) {
          if (timeoutId) {
            clearTimeout(timeoutId)
          }
          timeoutId = setTimeout(() => playAction(), 100)
        }
      }
      break
    }

    case ReducerAction.AUTOBET_ON_OFF: {
      const autobetOnOff = payload
      const { autobetCount } = state

      if (autobetOnOff) {
        if (autobetCount === -1) {
          setAutobetCountAction(AutobetCounts[0])
        } else {
          setAutobetCountAction(AutobetCounts[0])
        }
      } else {
        setAutobetCountAction(0)
      }
      break
    }
  }

  return next(action)
}
