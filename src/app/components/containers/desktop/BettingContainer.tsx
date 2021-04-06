import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIRectangle, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'

import PlayButton from '../../elements/desktop/PlayButton'
import BetMaxButton from '../../elements/BetMaxButton'
import ChangeBetButton from '../../elements/ChangeBetButton'

import BetAmount from '../../elements/BetAmount'
import PayoutOnWin from '../../elements/PayoutOnWin'
import RollList from '../../elements/RollList'
import AutobetList from '../../elements/desktop/AutobetList'

import {
  autobetStopAction,
  betDivideAction,
  betInputAction,
  betMultiplyAction,
  playAction,
} from '../../../state/reducers/ReducerAction'
import { AutobetCounts } from '../../../types/AutobetTypes'

class BettingContainer extends Component<any, any> {
  render() {
    const {
      x,
      y,
      width,
      height,
      autobetOnOff,
      autobetCounter,
      betMax,
      playAction,
      betDivideAction,
      betMultiplyAction,
      betInputAction,
    } = this.props

    const isAutobetRunning = autobetOnOff && autobetCounter > -1

    const margin = 14
    const totalWidth = width - margin * 4

    const playButtonWidthPercent = autobetOnOff ? 100 : 80
    const betMaxButtonWidthPercent = 100 - playButtonWidthPercent

    const buttonHeight = 64

    const payoutOnWinX = margin * 3 + (totalWidth * 55) / 100
    const payoutOnWinY = height - margin * 2 - buttonHeight - margin - 40
    const payoutOnWnWidth = width - (payoutOnWinX + margin * 2)

    const betAmountWidth = (totalWidth * 32) / 100
    const betAmountX = margin * 2

    const changeBetButtonSize = 40
    const changeBetDivideX = betAmountX + betAmountWidth + margin
    const changeBetMultiplyX =
      betAmountX + betAmountWidth + margin + changeBetButtonSize + margin / 2

    const payoutOnWinValue = 0
    const betAmountValue = 0

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
        <PlayButton
          x={margin * 2}
          y={height - margin - buttonHeight}
          width={(totalWidth * playButtonWidthPercent) / 100}
          height={buttonHeight}
          pointerdown={() => isAutobetRunning ? autobetStopAction() : playAction()}
        />
        {autobetOnOff ? null : (
          <BetMaxButton
            x={margin * 3 + (totalWidth * playButtonWidthPercent) / 100}
            y={height - margin - buttonHeight}
            width={(totalWidth * betMaxButtonWidthPercent) / 100 - margin}
            height={buttonHeight}
            pointerdown={() => betInputAction(betMax)}
          />
        )}
        {autobetOnOff ? null : (
          <PayoutOnWin
            x={payoutOnWinX}
            y={payoutOnWinY}
            width={payoutOnWnWidth}
            height={40}
            value={payoutOnWinValue}
          />
        )}
        <ChangeBetButton
          x={changeBetDivideX}
          y={payoutOnWinY}
          width={changeBetButtonSize}
          height={changeBetButtonSize}
          text={tr('decreaseBetButton')}
          pointerdown={() => betDivideAction()}
        />
        <ChangeBetButton
          x={changeBetMultiplyX}
          y={payoutOnWinY}
          width={changeBetButtonSize}
          height={changeBetButtonSize}
          text={tr('increaseBetButton')}
          pointerdown={() => betMultiplyAction()}
        />
        <BetAmount
          x={betAmountX}
          y={payoutOnWinY}
          width={betAmountWidth}
          height={40}
          value={betAmountValue}
        />
        <RollList x={betAmountX} y={22.5 + 18} maxRolls={8} />
        {autobetOnOff ? <UIText
          x={changeBetMultiplyX + changeBetButtonSize + margin * 2}
          y={payoutOnWinY - 8}
          anchor={{ x: 0, y: 1 }}
          alpha={0.4}
          text={tr('autobetCount')}
          style={{
            fill: 0xffffff,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 16,
            align: UITextAlign.Left,
          }}
        /> : null}
        {autobetOnOff ? (
          <AutobetList
            x={changeBetMultiplyX + changeBetButtonSize + margin * 2}
            y={payoutOnWinY + changeBetButtonSize / 2}
            counts={AutobetCounts}
          />
        ) : null}
      </UIContainer>
    )
  }
}

const mapState = state => {
  const { autobetOnOff, autobetCounter, betMax } = state
  return {
    autobetOnOff,
    autobetCounter,
    betMax,
    playAction,
    betDivideAction,
    betMultiplyAction,
    betInputAction,
  }
}

export default connect(mapState, null)(BettingContainer)
