import dice_png from '../../res/images/dice.png'
import down_png from '../../res/images/down.png'
import up_png from '../../res/images/up.png'
import infinity_png from '../../res/images/infinity.png'
import currency_png from '../../res/images/currency.png'
import pattern_png from '../../res/images/pattern.png'
import sound_on_button_png from '../../res/images/sound_on_button.png'
import sound_off_button_png from '../../res/images/sound_off_button.png'
import roll_1_mp3 from '../../res/sounds/roll_1.mp3'
import roll_2_mp3 from '../../res/sounds/roll_2.mp3'
import roll_3_mp3 from '../../res/sounds/roll_3.mp3'
import win_mp3 from '../../res/sounds/win.mp3'
import lose_mp3 from '../../res/sounds/lose.mp3'

const resources = {
  images: {
    dice_png,
    down_png,
    up_png,
    infinity_png,
    currency_png,
    pattern_png,
    sound_on_button_png,
    sound_off_button_png,
  },
  sounds: {
    roll_1_mp3,
    roll_2_mp3,
    roll_3_mp3,
    win_mp3,
    lose_mp3,
  },
  fonts: {
    'Rajdhani-fnt': 'Rajdhani-fnt',
    'Rajdhani-Bold-fnt': 'Rajdhani-Bold-fnt',
  },
}

export { resources as ResourcesConfig }
