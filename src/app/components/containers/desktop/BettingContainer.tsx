import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIRectangle } from '@daocasino/dc-react-gamengine'

import PlayButton from '../../elements/PlayButton'
import BetMaxButton from '../../elements/BetMaxButton'
import ChangeBetButton from '../../elements/ChangeBetButton'

import BetAmount from '../../elements/BetAmount'
import PayoutOnWin from '../../elements/PayoutOnWin'
import RollList from '../../elements/RollList'

import { betDivideAction, betMultiplyAction, playAction } from '../../../reducers/ReducerAction'

class BettingContainer extends Component<any, any> {
  render() {
    const {
      x,
      y,
      width,
      height,
      playAction,
      betDivideAction,
      betMultiplyAction,
    } = this.props

    const margin = 14
    const totalWidth = width - margin * 5

    const playButtonWidthPercent = 80
    const betMaxButtonWidthPercent = 100 - playButtonWidthPercent

    const buttonHeight = 64

    const payoutOnWinX = margin * 3 + (totalWidth * 55) / 100
    const payoutOnWinY = height - margin * 2 - buttonHeight - margin - 40
    const payoutOnWnWidth = width - (payoutOnWinX + margin * 2)

    const betAmountWidth = (totalWidth * 32) / 100
    const betAmountX = margin * 2

    const changeBetButtonSize = 40

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
          pointerdown={() => playAction()}
        />
        <BetMaxButton
          x={margin * 3 + (totalWidth * playButtonWidthPercent) / 100}
          y={height - margin - buttonHeight}
          width={(totalWidth * betMaxButtonWidthPercent) / 100}
          height={buttonHeight}
        />
        <PayoutOnWin
          x={payoutOnWinX}
          y={payoutOnWinY}
          width={payoutOnWnWidth}
          height={40}
          value={payoutOnWinValue}
        />
        <ChangeBetButton
          x={betAmountX + betAmountWidth + margin}
          y={payoutOnWinY}
          width={changeBetButtonSize}
          height={changeBetButtonSize}
          text={tr('decreaseBetButton')}
          pointerdown={() => betDivideAction()}
        />
        <ChangeBetButton
          x={
            betAmountX +
            betAmountWidth +
            margin +
            changeBetButtonSize +
            margin / 2
          }
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
      </UIContainer>
    )
  }
}

const mapState = state => {
  return {
    state,
    playAction,
    betDivideAction,
    betMultiplyAction,
  }
}

export default connect(mapState, null)(BettingContainer)
