import { AutobetMode } from '../types/AutobetTypes'

export const DefaultState = {
  chance: 50,
  bet: 10,
  betMin: 1,
  betMax: 0,
  maxPayout: 0,
  balance: 0,
  isPlaying: false,
  profit: undefined,
  number: undefined,
  rolls: [],
  soundOnOff: true,
  autobetCount: -1,
  autobetCounter: -1,
  autobetOnOff: false,
  autobetOnWinMode: AutobetMode.RESET,
  autobetOnLoseMode: AutobetMode.RESET,
  autobetOnWin: 0,
  autobetOnLose: 0,
  autobetStopOnLose: 0,
  autobetStopOnWin: 0,
}
