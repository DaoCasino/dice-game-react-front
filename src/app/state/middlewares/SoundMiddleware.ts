import { Engine } from '@daocasino/dc-react-gamengine'
import { ReducerAction } from '../reducers/ReducerAction'

export const SoundMiddleware = store => next => action => {
  const payload = action.payload

  switch (action.type) {
    case ReducerAction.PLAY:
      const sounds = ['roll_1_mp3', 'roll_2_mp3', 'roll_3_mp3']
      const sound = sounds[Math.floor(Math.random() * sounds.length)]

      Engine.instance.getResourceManager().playSound(sound)
      break

    case ReducerAction.PLAY_SUCCESS:
      Engine.instance.getResourceManager().playSound(payload.profit > 0 ? 'win_mp3' : 'lose_mp3')
      break

    case ReducerAction.PLAY_ERROR:
      Engine.instance.getResourceManager().playSound('lose_mp3')
      break

    case ReducerAction.SOUND_ON_OFF:
      const soundOnOff = payload

      if (soundOnOff) {
        Engine.instance.getResourceManager().getSoundManager().unmute()
      } else {
        Engine.instance.getResourceManager().getSoundManager().mute()
      }
      break
  }

  return next(action)
}
