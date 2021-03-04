import { Utils } from '@daocasino/dc-react-gamengine'
import { ReducerAction } from '../reducers/ReducerAction'

export const VibrateMiddleware = store => next => action => {
  const payload = action.payload

  switch (action.type) {
    case ReducerAction.PLAY_SUCCESS:
      if (payload.profit <= 0) {
        Utils.vibrate(200)
      }
      break
  }

  return next(action)
}
