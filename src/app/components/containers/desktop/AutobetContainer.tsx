import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIList, UIRectangle, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { TripleSelectButton } from '../../elements/TripleSelectButton'
import { NumberInput } from '../../elements/NumberInput'
import { CurrencyInput } from '../../elements/CurrencyInput'
import AutobetToggleButton from '../../elements/AutobetToggleButton'
import {
  autobetOnLoseInputAction,
  autobetOnLoseModeAction,
  autobetOnWinInputAction,
  autobetOnWinModeAction,
  autobetStopOnLoseInputAction,
  autobetStopOnWinInputAction,
} from '../../../state/reducers/ReducerAction'
import { AutobetMode } from '../../../types/AutobetTypes'

class AutobetContainer extends Component<any, any> {
  render() {
    const {
      x,
      y,
      width,
      height,
      autobetCounter,
      autobetOnOff,
      autobetOnWin,
      autobetOnLose,
      autobetStopOnWin,
      autobetStopOnLose,
      autobetOnWinMode,
      autobetOnLoseMode,
    } = this.props

    const isAutobetRunning = !autobetOnOff || (autobetOnOff && autobetCounter > -1)

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
        <AutobetToggleButton x={width - 100} y={25} />
        <UIList x={25} y={18} margin={{ x: 0, y: 18 }}>
          <UIText
            key={'autobetModeLabel'}
            anchor={{ x: 0, y: 0 }}
            text={tr('autobetMode')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 23,
              align: UITextAlign.Left,
            }}
          />
          <UIText
            key={'onWinLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('onWin')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <TripleSelectButton
            key={'onWinButton'}
            width={this.props.width - 25 * 2}
            height={36}
            index={Object.values(AutobetMode).indexOf(autobetOnWinMode)}
            disabled={isAutobetRunning}
            onChange={index => autobetOnWinModeAction(Object.values(AutobetMode)[index])}
          />
          <NumberInput
            width={this.props.width - 25 * 2}
            height={36}
            text={autobetOnWin}
            min={0}
            max={100}
            disabled={isAutobetRunning}
            onBlur={value => autobetOnWinInputAction(value)}
          />
          <UIText
            key={'onLoseLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('onLose')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <TripleSelectButton
            key={'onLoseButton'}
            width={this.props.width - 25 * 2}
            height={36}
            index={Object.values(AutobetMode).indexOf(autobetOnLoseMode)}
            disabled={isAutobetRunning}
            onChange={index => autobetOnLoseModeAction(Object.values(AutobetMode)[index])}
          />
          <NumberInput
            width={this.props.width - 25 * 2}
            height={36}
            text={autobetOnLose}
            min={0}
            max={100}
            disabled={isAutobetRunning}
            onBlur={value => autobetOnLoseInputAction(value)}
          />
          <UIText
            key={'stopOnProfitLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('stopOnProfit')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <CurrencyInput
            width={this.props.width - 25 * 2}
            height={36}
            text={autobetStopOnWin}
            disabled={isAutobetRunning}
            onBlur={value => autobetStopOnWinInputAction(value)}
          />
          <UIText
            key={'stopOnLoseLabel'}
            anchor={{ x: 0, y: 0 }}
            alpha={0.4}
            text={tr('stopOnLose')}
            style={{
              fill: 0xffffff,
              fontFamily: 'Rajdhani-fnt',
              fontSize: 16,
              align: UITextAlign.Left,
            }}
          />
          <CurrencyInput
            width={this.props.width - 25 * 2}
            height={36}
            text={autobetStopOnLose}
            disabled={isAutobetRunning}
            onBlur={value => autobetStopOnLoseInputAction(value)}
          />
        </UIList>
      </UIContainer>
    )
  }
}

const mapState = state => {
  const {
    autobetCounter,
    autobetOnOff,
    autobetOnWin,
    autobetOnLose,
    autobetStopOnWin,
    autobetStopOnLose,
    autobetOnWinMode,
    autobetOnLoseMode,
  } = state

  return {
    autobetCounter,
    autobetOnOff,
    autobetOnWin,
    autobetOnLose,
    autobetStopOnWin,
    autobetStopOnLose,
    autobetOnWinMode,
    autobetOnLoseMode,
  }
}

export default connect(mapState, null)(AutobetContainer)
